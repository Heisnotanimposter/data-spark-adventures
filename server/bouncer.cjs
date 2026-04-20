const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { calculatePrice, getCostToMint, getRefundOnBurn } = require('./logic/bondingCurve.cjs');

const { calculateSynergy } = require('./logic/synergyEngine.cjs');
const { generateMergeResearch } = require('./logic/mergeAgent.cjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const STATE_PATH = path.join(__dirname, 'data', 'marketState.json');
const VAULT_PATH = path.join(__dirname, '..', '.git_vault');

const loadState = () => JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
const saveState = (state) => fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));

// --- Synergy & Merge Endpoints ---

app.post('/market/synergy', (req, res) => {
  const { repoA, repoB } = req.body;
  const analysis = calculateSynergy(repoA, repoB);
  res.json(analysis);
});

app.post('/market/merge', (req, res) => {
  const { repoA, repoB } = req.body;
  const synergyData = calculateSynergy(repoA, repoB);
  const research = generateMergeResearch(repoA, repoB, synergyData);
  res.json(research);
});

app.get('/market/state', (req, res) => {
  res.json(loadState());
});

app.post('/market/mint', (req, res) => {
  const { userId, repoId, amount } = req.body;
  const state = loadState();
  const repo = state.repos.find(r => r.repoId === repoId);
  const user = state.users[userId];
  if (!repo || !user) return res.status(404).send('Not found');

  const rawCost = getCostToMint(repo.supply, amount, repo.k, repo.basePrice);
  const fee = Math.floor(rawCost * 0.05);
  const totalCost = rawCost + fee;

  repo.supply += amount;
  user.tokens[repoId] = (user.tokens[repoId] || 0) + amount;
  state.treasury.protocolBalance += fee;
  
  saveState(state);
  res.json({ success: true, cost: totalCost, fee });
});

app.post('/market/burn', (req, res) => {
  const { userId, repoId, amount } = req.body;
  const state = loadState();
  const repo = state.repos.find(r => r.repoId === repoId);
  const user = state.users[userId];
  if (!repo || !user || (user.tokens[repoId] || 0) < amount) return res.status(400).send('Insufficient');

  const rawRefund = getRefundOnBurn(repo.supply, amount, repo.k, repo.basePrice);
  const fee = Math.floor(rawRefund * 0.05);
  const netRefund = rawRefund - fee;

  repo.supply -= amount;
  user.tokens[repoId] -= amount;
  state.treasury.protocolBalance += fee;
  
  saveState(state);
  res.json({ success: true, refund: netRefund, fee });
});

app.get('/bouncer/verify', (req, res) => {
  const { userId, repoId, machineId } = req.query;
  const state = loadState();
  const user = state.users[userId];
  const repo = state.repos.find(r => r.repoId == repoId);

  if (!user || !repo) return res.json({ active: false, reason: 'Invalid User/Repo' });

  // Auto-register machineId if user has tokens but no bound ID
  if ((user.tokens[repoId] || 0) > 0 && !user.machineId) {
    user.machineId = machineId;
    saveState(state);
    console.log(`[SECURITY] Machine ${machineId} bound to user ${userId}`);
  }

  if ((user.tokens[repoId] || 0) < 1) return res.json({ active: false, reason: 'No License' });
  if (user.machineId && user.machineId !== machineId) return res.json({ active: false, reason: 'Hardware Mismatch' });
  res.json({ active: true });
});

app.use('/vault', (req, res) => {
  const urlPath = req.url.startsWith('/') ? req.url.slice(1) : req.url;
  const repoName = urlPath.split('/')[0].replace('.git', '');
  const auth = req.headers.authorization;
  const xMachineId = req.headers['x-sentinel-id']; // Custom header for machine verification
  
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Git Bouncer"');
    return res.status(401).send('Authentication required');
  }

  const base64Auth = auth.split(' ')[1];
  if (!base64Auth) return res.status(401).send('Invalid Auth');
  
  const credentials = Buffer.from(base64Auth, 'base64').toString().split(':');
  const userId = credentials[0];

  const state = loadState();
  const user = state.users[userId];
  const repo = state.repos.find(r => r.repoFullName.includes(repoName));

  if (!user || !repo) return res.status(403).send('Forbidden: Invalid Asset/User');

  // Check if user has at least 1 token for this repo
  if ((user.tokens[repo.repoId] || 0) < 1) {
    return res.status(403).send('Forbidden: No License Found. Please buy a Star Token.');
  }

  // Auto-register Machine ID on first Clone if provided
  if (xMachineId && !user.machineId) {
    user.machineId = xMachineId;
    saveState(state);
    console.log(`[SECURITY] Auto-bound ${xMachineId} to ${userId} during Clone.`);
  }

  // Enforce hardware binding
  if (user.machineId && xMachineId && user.machineId !== xMachineId) {
    return res.status(403).send('Forbidden: Hardware Mismatch. License locked to another device.');
  }

  // --- Proxy to git http-backend ---
  const env = {
    ...process.env,
    GIT_PROJECT_ROOT: VAULT_PATH,
    GIT_HTTP_EXPORT_ALL: '1',
    PATH_INFO: '/' + urlPath,
    REMOTE_USER: userId,
  };

  const git = spawn('git', ['http-backend'], { env });
  req.pipe(git.stdin);
  git.stdout.pipe(res);
  git.stderr.on('data', data => console.error(`Git Error: ${data}`));
});

app.listen(4000, () => console.log('Bouncer on 4000'));

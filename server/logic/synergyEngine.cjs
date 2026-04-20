const { spawnSync } = require('child_process');
const path = require('path');

const VAULT_PATH = path.join(__dirname, '..', '.git_vault');

const getPackageJson = (repoName) => {
  const repoPath = path.join(VAULT_PATH, `${repoName}.git`);
  const git = spawnSync('git', ['--git-dir', repoPath, 'show', 'HEAD:package.json'], { encoding: 'utf8' });
  
  if (git.status !== 0) return null;
  return JSON.parse(git.stdout);
};

exports.calculateSynergy = (repoA, repoB) => {
  const pkgA = getPackageJson(repoA) || { dependencies: {}, keywords: [] };
  const pkgB = getPackageJson(repoB) || { dependencies: {}, keywords: [] };

  const depsA = Object.keys(pkgA.dependencies || {});
  const depsB = Object.keys(pkgB.dependencies || {});

  // 1. Dependency Overlap (Weight: 30%)
  const overlap = depsA.filter(d => depsB.includes(d));
  const overlapScore = overlap.length > 0 ? (overlap.length / Math.max(depsA.length, depsB.length)) * 100 : 0;

  // 2. Capability Complementarity (Weight: 40%)
  // Mock logic: If one has "logging" and other has "time", synergy is high.
  const keywordsA = pkgA.keywords || [];
  const keywordsB = pkgB.keywords || [];
  const combinedKeywords = [...new Set([...keywordsA, ...keywordsB])];
  const capabilityScore = Math.min(combinedKeywords.length * 10, 100);

  // 3. Technical Friction (Weight: 30%)
  // If they use the same framework (e.g. React), friction is low (High Score).
  const isReactA = depsA.includes('react');
  const isReactB = depsB.includes('react');
  const frictionScore = (isReactA === isReactB) ? 100 : 50;

  const totalScore = (overlapScore * 0.3) + (capabilityScore * 0.4) + (frictionScore * 0.3);

  return {
    score: Math.round(totalScore),
    breakdown: {
      overlap: Math.round(overlapScore),
      capability: Math.round(capabilityScore),
      friction: Math.round(frictionScore)
    },
    recommendation: totalScore > 70 ? 'HIGH SYNERGY: Recommended for Super-Project merge.' : 'MODERATE SYNERGY: Best as standalone libraries.',
    sharedDeps: overlap
  };
};

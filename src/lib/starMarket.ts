export interface RepoStarData {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  stars: number;
  price: number;
  change24h: number;
  history: { date: string; stars: number; price: number }[];
}

const GITHUB_API_BASE = 'https://api.github.com';

// Simulated historical data generation for demo purposes
const generateHistory = (currentStars: number, currentPrice: number) => {
  const history = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const fluctuation = (Math.random() - 0.5) * 0.05; // 5% fluctuation
    const historicStars = Math.floor(currentStars * (1 - i * 0.01 + fluctuation));
    history.push({
      date: date.toISOString().split('T')[0],
      stars: historicStars,
      price: historicStars * 1.0, // 1:1 match
    });
  }
  return history;
};

export const fetchRepoStars = async (repoFullName: string): Promise<RepoStarData> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${repoFullName}`);
    if (!response.ok) throw new Error('Repo not found');
    
    const data = await response.json();
    const stars = data.stargazers_count;
    const price = stars * 1.0; // 1:1 Peg
    
    return {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      owner: data.owner.login,
      stars: stars,
      price: price,
      change24h: (Math.random() - 0.4) * 5, // Simulated 24h change
      history: generateHistory(stars, price),
    };
  } catch (error) {
    console.error('Error fetching repo stars:', error);
    throw error;
  }
};

export const DEFAULT_REPOS = [
  'facebook/react',
  'shadcn-ui/ui',
  'tailwindlabs/tailwindcss',
  'vercel/next.js',
  'microsoft/vscode',
  'google/zx'
];

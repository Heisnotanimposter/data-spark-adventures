import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Holding {
  repoId: number;
  repoFullName: string;
  amount: number;
  avgCost: number;
}

interface WalletContextType {
  currentUserId: string;
  balance: number;
  holdings: Holding[];
  treasury: { protocolBalance: number; dividendsAccumulated: number } | null;
  buyToken: (repoId: number, repoFullName: string, amount: number) => void;
  sellToken: (repoId: number, amount: number) => void;
  totalValue: (currentPrices: Record<number, number>) => number;
  switchUser: (userId: string) => void;
  stakeTokens: (repoId: number, amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('active_user') || 'user123';
  });

  const [balance, setBalance] = useState<number>(100000);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [treasury, setTreasury] = useState<any>(null);

  const syncWithBackend = async (userId: string) => {
    try {
      const response = await fetch('http://localhost:4000/market/state');
      const state = await response.json();
      const userData = state.users[userId];
      
      setTreasury(state.treasury);

      if (userData) {
        const newHoldings: Holding[] = [];
        for (const [id, count] of Object.entries(userData.tokens)) {
          const repo = state.repos.find((r: any) => r.repoId == id);
          if (repo && (count as number) > 0) {
            newHoldings.push({
              repoId: parseInt(id),
              repoFullName: repo.repoFullName,
              amount: count as number,
              avgCost: repo.basePrice 
            });
          }
        }
        setHoldings(newHoldings);
        const savedBalance = localStorage.getItem(`balance_${userId}`);
        setBalance(savedBalance ? parseFloat(savedBalance) : 100000);
      }
    } catch (e) {
      console.error('Failed to sync wallet');
    }
  };

  useEffect(() => {
    localStorage.setItem('active_user', currentUserId);
    syncWithBackend(currentUserId);
  }, [currentUserId]);

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
  };

  const stakeTokens = (repoId: number, amount: number) => {
    // Simulated staking logic - for MVP we'll just show it in UI
    console.log(`User ${currentUserId} staked ${amount} tokens of repo ${repoId}`);
  };

  const buyToken = async (repoId: number, repoFullName: string, amount: number) => {
    try {
      const response = await fetch('http://localhost:4000/market/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId, repoId, amount })
      });
      const result = await response.json();
      if (result.success) {
        const newBalance = balance - result.cost;
        setBalance(newBalance);
        localStorage.setItem(`balance_${currentUserId}`, newBalance.toString());
        syncWithBackend(currentUserId);
      }
    } catch (e) {
      alert('Transaction failed');
    }
  };

  const sellToken = async (repoId: number, amount: number) => {
    try {
      const response = await fetch('http://localhost:4000/market/burn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId, repoId, amount })
      });
      const result = await response.json();
      if (result.success) {
        const newBalance = balance + result.refund;
        setBalance(newBalance);
        localStorage.setItem(`balance_${currentUserId}`, newBalance.toString());
        syncWithBackend(currentUserId);
      }
    } catch (e) {
      alert('Transaction failed');
    }
  };

  const totalValue = (currentPrices: Record<number, number>) => {
    const holdingsValue = holdings.reduce((sum, h) => sum + (h.amount * (currentPrices[h.repoId] || 0)), 0);
    return balance + holdingsValue;
  };

  return (
    <WalletContext.Provider value={{ currentUserId, balance, holdings, treasury, buyToken, sellToken, totalValue, switchUser, stakeTokens }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRepoStars, DEFAULT_REPOS, RepoStarData } from '../lib/starMarket';

interface MarketRepo {
  repoId: number;
  repoFullName: string;
  supply: number;
  basePrice: number;
  k: number;
}

interface MarketContextType {
  repos: MarketRepo[];
  isLoading: boolean;
  error: any;
  refetch: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketState'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/market/state');
      const state = await response.json();
      return state.repos as MarketRepo[];
    },
    refetchInterval: 5000,
  });

  return (
    <MarketContext.Provider value={{ repos: data || [], isLoading, error, refetch }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};

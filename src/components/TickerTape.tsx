import React from 'react';
import { useMarket } from '../contexts/MarketContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TickerTape = () => {
  const { repos } = useMarket();

  return (
    <div className="w-full bg-background/80 backdrop-blur-md border-b overflow-hidden py-2 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...repos, ...repos].map((repo, i) => {
          const price = repo.basePrice + repo.k * Math.pow(repo.supply, 2);
          const name = repo.repoFullName.split('/')[1];
          return (
            <div key={`${repo.repoId}-${i}`} className="flex items-center mx-8 space-x-2 text-[10px] tracking-tight">
              <span className="font-bold text-primary uppercase">{name}</span>
              <span className="text-muted-foreground">${price.toLocaleString()}</span>
              <div className="flex items-center text-green-500">
                <TrendingUp size={10} className="mr-1" />
                +5.20%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TickerTape;

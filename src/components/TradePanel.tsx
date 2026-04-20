import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { RepoStarData } from '../lib/starMarket';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

interface MarketRepo {
  repoId: number;
  repoFullName: string;
  supply: number;
  basePrice: number;
  k: number;
}

interface TradePanelProps {
  repo: MarketRepo;
}

const TradePanel = ({ repo }: TradePanelProps) => {
  const { balance, holdings, buyToken, sellToken } = useWallet();
  const [amount, setAmount] = useState<number>(1);
  
  const repoHolding = holdings.find(h => h.repoId === repo.repoId);
  const holdingAmount = repoHolding?.amount || 0;
  
  const handleBuy = () => {
    buyToken(repo.repoId, repo.repoFullName, amount);
  };

  const handleSell = () => {
    sellToken(repo.repoId, amount);
  };

  const cloneUrl = `http://user123:token@localhost:4000/vault/${repo.repoFullName.split('/')[1]}.git`;

  return (
    <div className="bg-card rounded-xl border p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center uppercase tracking-tighter">
          <Wallet className="mr-2 text-primary" size={20} />
          Terminal Access
        </h3>
        <div className="text-sm font-medium text-muted-foreground">
          USD: ${balance.toLocaleString()}
        </div>
      </div>

      <div className="space-y-4 mb-auto">
        <div className={`p-4 rounded-lg border transition-colors ${holdingAmount > 0 ? 'bg-primary/10 border-primary/30' : 'bg-secondary/30 border-border/50'}`}>
          <div className="text-[10px] text-muted-foreground uppercase mb-1 font-bold">Access Rights</div>
          <div className="text-xl font-bold">{holdingAmount > 0 ? 'AUTHORIZED' : 'DENIED'}</div>
          {holdingAmount > 0 && (
            <div className="text-[10px] mt-1 text-primary">
              License ID: SENTINEL-0x{Math.random().toString(16).slice(2, 6)}
            </div>
          )}
        </div>

        {holdingAmount > 0 && (
          <div className="p-3 bg-background/50 rounded-lg border border-primary/20">
            <div className="text-[10px] text-muted-foreground uppercase mb-1">Secure Clone Command</div>
            <code className="text-xs text-primary break-all">git clone {cloneUrl}</code>
          </div>
        )}

        <div className="space-y-2 pt-4">
          <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Buy Licenses</label>
          <Input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-background/50 border-border/40"
            min={1}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <Button 
          onClick={handleBuy}
          className="bg-primary hover:bg-primary/90 text-white py-6 font-bold"
        >
          <ArrowUpRight className="mr-1" size={18} />
          MINT
        </Button>
        <Button 
          onClick={handleSell}
          variant="outline"
          className="border-primary/20 text-muted-foreground hover:bg-primary/10 py-6"
        >
          <ArrowDownRight className="mr-1" size={18} />
          BURN
        </Button>
      </div>
    </div>
  );
};

export default TradePanel;

import React, { useState } from 'react';
import TickerTape from '@/components/TickerTape';
import StarPriceChart from '@/components/StarPriceChart';
import TradePanel from '@/components/TradePanel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useMarket } from '@/contexts/MarketContext';
import { useWallet } from '@/contexts/WalletContext';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Users, Activity } from 'lucide-react';

const Index = () => {
  const { repos, isLoading } = useMarket();
  const { totalValue } = useWallet();
  const [selectedRepoIndex, setSelectedRepoIndex] = useState(0);
  const [lockout, setLockout] = useState<string | null>(null);

  const selectedRepo = repos[selectedRepoIndex];

  // Bonding Curve Price Calculation for UI
  const getPrice = (repo: any) => repo.basePrice + repo.k * Math.pow(repo.supply, 2);

  const currentPrices = repos.reduce((acc, repo) => {
    acc[repo.repoId] = getPrice(repo);
    return acc;
  }, {} as Record<number, number>);

  const navItems = [
    { label: 'Demand Index', value: 'High', icon: Activity },
    { label: 'Market Supply', value: `${repos.reduce((s, r) => s + r.supply, 0)} Seats`, icon: TrendingUp },
    { label: 'Active Makers', value: '1', icon: Users },
  ];

  const [events, setEvents] = useState([
    { id: 1, type: 'Mint Approved', user: '0x71...f2e', time: 'Just now' },
    { id: 2, type: 'Access Granted', user: '0x3a...1b4', time: '2m ago' },
  ]);

  React.useEffect(() => {
    const handleLockout = (e: any) => setLockout(e.detail);
    window.addEventListener('sentinel_lockout', handleLockout);
    return () => window.removeEventListener('sentinel_lockout', handleLockout);
  }, []);

  if (lockout) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-6">
          <div className="text-red-600 font-mono text-5xl mb-4">ACCESS DENIED</div>
          <p className="text-muted-foreground font-mono uppercase tracking-widest">{lockout}</p>
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-xs text-left font-mono">
            [SENTINEL_ALERT] Machine ID Mismatch or Star Token Burned. Redistribution protocol blocked.
          </div>
          <button onClick={() => window.location.reload()} className="text-primary underline text-sm">Retry Verification</button>
        </div>
      </div>
    );
  }

  if (isLoading || !selectedRepo) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-[300px] rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <Header />
      <TickerTape />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 lg:col-span-1">
            <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest font-black">Holdings Value</div>
            <div className="text-3xl font-bold font-mono tracking-tighter">
              ${totalValue(currentPrices).toLocaleString()}
            </div>
          </Card>
          
          {navItems.map((item, i) => (
            <Card key={i} className="p-6 bg-card/50 border-border/50 backdrop-blur-sm flex items-center space-x-4">
              <div className="p-3 bg-secondary rounded-lg">
                <item.icon className="text-primary" size={20} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase text-[10px] tracking-widest font-bold">{item.label}</div>
                <div className="text-xl font-bold">{item.value}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <StarPriceChart repo={{
              id: selectedRepo.repoId,
              name: selectedRepo.repoFullName.split('/')[1],
              full_name: selectedRepo.repoFullName,
              owner: selectedRepo.repoFullName.split('/')[0],
              stars: selectedRepo.supply,
              price: getPrice(selectedRepo),
              change24h: 5.2,
              history: [] // Historical data would be fetched from backend in production
            }} />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <button
                  key={repo.repoId}
                  onClick={() => setSelectedRepoIndex(i)}
                  className={`p-4 rounded-xl border transition-all text-left group ${
                    selectedRepoIndex === i 
                    ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                    : 'border-border/50 bg-card/30 hover:bg-card/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold">{repo.repoFullName.split('/')[0]}</Badge>
                    <Zap size={14} className={selectedRepoIndex === i ? 'text-primary' : 'text-muted-foreground group-hover:text-primary transition-colors'} />
                  </div>
                  <div className="font-bold truncate text-sm uppercase">{repo.repoFullName.split('/')[1]}</div>
                  <div className="text-xs text-muted-foreground pt-1">Supply: {repo.supply}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <TradePanel repo={selectedRepo} />
            
            <Card className="p-6 bg-secondary/20 border-border/40 overflow-hidden">
              <h3 className="font-bold mb-4 flex items-center text-[10px] uppercase tracking-widest text-primary/80">
                <Activity size={16} className="mr-2" />
                Security Audit Logs
              </h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 text-xs animate-in fade-in slide-in-from-right-2 duration-500">
                    <div className="w-1 h-8 bg-primary/50 rounded-full" />
                    <div className="flex-1">
                      <div className="font-bold flex justify-between uppercase">
                        {event.type}
                        <span className="text-[9px] text-muted-foreground font-normal lowercase">{event.time}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono opacity-60">Verified {event.user}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

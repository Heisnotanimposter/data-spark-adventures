import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useMarket } from '@/contexts/MarketContext';
import { Landmark, Vote, TrendingUp, DollarSign, Users, Award, Percent, ArrowUpRight, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Governance = () => {
  const { treasury, holdings, stakeTokens } = useWallet();
  const { repos } = useMarket();
  const [activeTab, setActiveTab] = useState<'stats' | 'proposals'>('stats');

  const tvl = repos.reduce((sum, r) => sum + (r.supply * r.basePrice), 0);

  const handleVote = (proposal: string) => {
    toast.success(`Vote cast for: ${proposal}`, {
      description: "Your voting power has been recorded based on your staked tokens.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2 flex items-center uppercase">
              <Landmark className="mr-3 text-primary" size={36} />
              Governance & Treasury
            </h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Decentralized Protocol Parameters & Revenue Sharing
            </p>
          </div>
          <div className="flex gap-1 bg-secondary/30 p-1 rounded-xl border border-border/50">
            <Button 
              variant={activeTab === 'stats' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('stats')}
              className="text-[10px] font-bold uppercase tracking-widest px-6"
            >
              Protocol Stats
            </Button>
            <Button 
              variant={activeTab === 'proposals' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('proposals')}
              className="text-[10px] font-bold uppercase tracking-widest px-6"
            >
              Active Proposals
            </Button>
          </div>
        </div>

        {activeTab === 'stats' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Global Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Protocol Treasury', value: `$${treasury?.protocolBalance || 0}`, icon: DollarSign, color: 'text-green-500' },
                { label: 'Total Value Locked', value: `$${tvl.toLocaleString()}`, icon: TrendingUp, color: 'text-primary' },
                { label: 'Project Founders', value: '12', icon: Users, color: 'text-blue-500' },
                { label: 'Protocol APY', value: '14.2%', icon: Percent, color: 'text-yellow-500' },
              ].map((m, i) => (
                <Card key={i} className="p-6 bg-card border-border/50 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${m.color}`}>
                      <m.icon size={20} />
                    </div>
                    <Badge variant="outline" className="text-[9px] uppercase font-bold text-muted-foreground border-border/50">+2.4%</Badge>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">{m.label}</p>
                    <h4 className="text-2xl font-black tracking-tighter">{m.value}</h4>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Staking Dashboard */}
              <Card className="lg:col-span-2 p-8 border-primary/20 bg-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Award size={160} className="text-primary" />
                </div>
                
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Staking Rewards</h3>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Provide liquidity to earn transaction dividends</p>
                    </div>
                    <Button variant="outline" className="border-primary/50 text-primary text-[10px] uppercase font-bold">Claim $0.00</Button>
                  </div>

                  {holdings.length > 0 ? (
                    <div className="space-y-4">
                      {holdings.map(h => (
                        <div key={h.repoId} className="flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                              <Landmark size={20} />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold uppercase">{h.repoFullName.split('/')[1]}</h5>
                              <p className="text-[10px] uppercase text-muted-foreground font-bold">{h.amount} Unit(s) Liquid</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="text-[10px] uppercase font-bold bg-primary/20 text-primary hover:bg-primary/30 border-none"
                            onClick={() => stakeTokens(h.repoId, h.amount)}
                          >
                            Stake Unit
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center text-muted-foreground text-[11px] uppercase tracking-widest font-bold">
                      No assets available to stake
                    </div>
                  )}
                </div>
              </Card>

              {/* Yield Calc */}
              <Card className="p-8 border-border/50 bg-card flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  Yield Projection
                </h3>
                <div className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                      <span>Weekly Volume</span>
                      <span>$8,400</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground">
                      <span>Participant Share</span>
                      <span>0.04%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '12%' }} />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border/50 mt-auto">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Estimated Monthly Yield</p>
                    <p className="text-3xl font-black text-primary">$42.80</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {[
              { id: 'GP-01', title: 'Increase Global Bonding Curve Growth (k) by 15%', type: 'Parameter', weight: '74%', status: 'Active' },
              { id: 'GP-02', title: 'Add Vercel/Core to White-listed Synergy Assets', type: 'Whitelist', weight: '92%', status: 'Quorum Reached' },
              { id: 'GP-03', title: 'Reduce Protocol Transaction Fee to 3.5%', type: 'Economic', weight: '12%', status: 'Active' },
            ].map((p, i) => (
              <Card key={i} className="p-6 border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-black text-muted-foreground">{p.id}</div>
                    <div>
                      <h4 className="font-bold text-lg tracking-tight uppercase">{p.title}</h4>
                      <div className="flex gap-2 items-center mt-1">
                        <Badge variant="secondary" className="text-[8px] uppercase tracking-tighter">{p.type}</Badge>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{p.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-black text-primary mb-1 tracking-widest">Support Weight</p>
                    <p className="text-2xl font-black font-mono">{p.weight}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleVote('FOR')} className="flex-1 bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none uppercase font-bold text-[10px] tracking-widest">
                    VOTE FOR
                  </Button>
                  <Button onClick={() => handleVote('AGAINST')} className="flex-1 bg-red-500/20 text-red-500 hover:bg-red-500/30 border-none uppercase font-bold text-[10px] tracking-widest">
                    VOTE AGAINST
                  </Button>
                  <Button variant="outline" className="border-border/50 text-[10px] p-2 hover:bg-secondary">
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Governance;

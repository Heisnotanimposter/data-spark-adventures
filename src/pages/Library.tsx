import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useMarket } from '@/contexts/MarketContext';
import { Library as LibraryIcon, ShieldCheck, Download, Monitor, HardDrive, RefreshCw, Lock, AlertTriangle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Library = () => {
  const { holdings, currentUserId } = useWallet();
  const { repos } = useMarket();
  const [machineId, setMachineId] = useState<string | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      const res = await fetch('http://localhost:4000/market/state');
      const state = await res.json();
      setMachineId(state.users[currentUserId]?.machineId || null);
    };
    fetchState();
  }, [currentUserId]);

  const handleDownload = (repoName: string) => {
    toast.success(`Initializing secure download for ${repoName}`, {
      description: "Protected binary will be cryptographically bound to this machine.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2 flex items-center uppercase">
              <LibraryIcon className="mr-3 text-primary" size={36} />
              Asset Library
            </h1>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
              Secure License Management & Hardware Binding
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary/30 p-3 rounded-xl border border-border/50">
            <Monitor size={16} className="text-primary" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-muted-foreground">Current Hardware ID</span>
              <span className="text-[10px] font-mono font-bold tracking-tight">{machineId || 'UNBOUND'}</span>
            </div>
          </div>
        </div>

        {holdings.length === 0 ? (
          <div className="h-96 border-2 border-dashed border-border/30 rounded-3xl flex flex-col items-center justify-center text-center p-12">
            <div className="p-6 bg-secondary/30 rounded-full mb-6 text-muted-foreground grayscale">
              <HardDrive size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">Library Empty</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 uppercase tracking-wider text-[11px]">
              You do not hold any active software licenses. Visit the Market to acquire Star Tokens.
            </p>
            <Button variant="outline" className="uppercase text-[10px] font-bold tracking-widest border-primary/50 text-primary">
              Browse Market
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {holdings.map((holding) => (
              <Card key={holding.repoId} className="group relative overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={80} className="text-primary" />
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-3 text-[9px] uppercase tracking-widest bg-primary/10 text-primary border-none">
                        Active License
                      </Badge>
                      <h3 className="text-xl font-bold tracking-tight uppercase">{holding.repoFullName.split('/')[1]}</h3>
                      <p className="text-[10px] text-muted-foreground font-mono uppercase truncate max-w-[150px]">{holding.repoFullName}</p>
                    </div>
                    {machineId ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[9px] font-bold">
                        <Lock size={10} className="mr-1" /> BOUND
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[9px] font-bold">
                        OPEN
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                      <span className="text-muted-foreground flex items-center"><Zap size={12} className="mr-2 text-primary" /> License Count</span>
                      <span>{holding.amount} Unit(s)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                      <span className="text-muted-foreground flex items-center"><RefreshCw size={12} className="mr-2 text-primary" /> Hardware Lock</span>
                      {machineId ? (
                        <span className="text-primary truncate max-w-[100px]">{machineId}</span>
                      ) : (
                        <span className="text-yellow-500">Awaiting Binding</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-xs h-12"
                      onClick={() => handleDownload(holding.repoFullName)}
                    >
                      <Download size={16} className="mr-2" />
                      Download Protected Binary
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-border/50 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 uppercase text-[9px] font-bold tracking-tighter h-10 transition-all opacity-40 hover:opacity-100"
                    >
                      <RefreshCw size={14} className="mr-2" />
                      De-register Machine
                    </Button>
                  </div>
                </div>

                {!machineId && (
                  <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center p-8 text-center animate-in fade-in duration-700">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-yellow-500">First-Run Activation</h4>
                        <p className="text-[10px] text-muted-foreground uppercase leading-relaxed mt-1">Downloading the binary will lock this license to your current hardware ID.</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/5"
                        onClick={() => handleDownload(holding.repoFullName)}
                      >
                         Accept & Lock License
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Library;

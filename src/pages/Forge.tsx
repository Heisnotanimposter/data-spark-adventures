import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMarket } from '@/contexts/MarketContext';
import { FlaskConical, Merge, Sparkles, Zap, ArrowRight, Layers, FileCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Forge = () => {
  const { repos } = useMarket();
  const [selectedA, setSelectedA] = useState<string | null>(null);
  const [selectedB, setSelectedB] = useState<string | null>(null);
  const [synergy, setSynergy] = useState<any>(null);
  const [research, setResearch] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSynergy = async () => {
    if (!selectedA || !selectedB) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/market/synergy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          repoA: selectedA.split('/')[1], 
          repoB: selectedB.split('/')[1] 
        })
      });
      const data = await response.json();
      setSynergy(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const researchMerge = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/market/merge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          repoA: selectedA?.split('/')[1], 
          repoB: selectedB?.split('/')[1] 
        })
      });
      const data = await response.json();
      setResearch(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tighter mb-2 flex items-center uppercase">
            <FlaskConical className="mr-3 text-primary" size={36} />
            The Forge
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
            Autonomous Synergy & Merge Analytics Engine
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selection Area */}
          <div className="space-y-6">
            <Card className="p-6 bg-secondary/20 border-border/40">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                <Layers className="mr-2 text-primary" size={16} />
                Asset Selection
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Primary Source</label>
                  <select 
                    id="source-a"
                    className="w-full bg-background border border-border/50 rounded-lg p-3 text-sm"
                    onChange={(e) => setSelectedA(e.target.value)}
                    value={selectedA || ''}
                  >
                    <option value="">Select Asset...</option>
                    {repos.map(r => (
                      <option key={r.repoId} value={r.repoFullName}>{r.repoFullName}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center py-2">
                  <Merge className="text-muted-foreground rotate-90" size={20} />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-muted-foreground mb-2 block">Secondary Source</label>
                  <select 
                    id="source-b"
                    className="w-full bg-background border border-border/50 rounded-lg p-3 text-sm"
                    onChange={(e) => setSelectedB(e.target.value)}
                    value={selectedB || ''}
                  >
                    <option value="">Select Asset...</option>
                    {repos.map(r => (
                      <option key={r.repoId} value={r.repoFullName}>{r.repoFullName}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  id="analyze-btn"
                  onClick={analyzeSynergy} 
                  disabled={!selectedA || !selectedB || selectedA === selectedB || loading}
                  className="w-full mt-6 py-6 font-bold uppercase tracking-tighter"
                >
                  {selectedA === selectedB && selectedA !== null ? 'Select Different Assets' : 'Analyze Synergy'}
                </Button>
              </div>
            </Card>

            {synergy && (
              <Card className="p-6 bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest">Synergy Score</h3>
                  <div className="text-3xl font-black text-primary font-mono">{synergy.score}%</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold">
                      <span>Dependency Overlap</span>
                      <span>{synergy.breakdown.overlap}%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${synergy.breakdown.overlap}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold">
                      <span>Capability Match</span>
                      <span>{synergy.breakdown.capability}%</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${synergy.breakdown.capability}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg mb-6">
                  <p className="text-[10px] uppercase font-bold text-primary italic">Result: {synergy.recommendation}</p>
                </div>

                <Button 
                  id="research-btn"
                  onClick={researchMerge}
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px]"
                >
                  <Sparkles className="mr-2" size={14} />
                  Automate Research
                </Button>
              </Card>
            )}
          </div>

          {/* Research Results Area */}
          <div className="lg:col-span-2">
            {!research ? (
              <div className="h-full min-h-[500px] border-2 border-dashed border-border/30 rounded-2xl flex flex-col items-center justify-center text-center p-12">
                <div className="p-6 bg-secondary/30 rounded-full mb-6 text-muted-foreground grayscale">
                  <Zap size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">Forge Ready</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Select two private assets to begin autonomous combination research and synergy analysis.
                </p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="outline" className="text-[10px] uppercase mb-2 border-primary/50 text-primary">Research Report Available</Badge>
                    <h2 className="text-3xl font-bold tracking-tighter uppercase">{research.proposedTitle}</h2>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Deploy Prototype
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-card border-border/50">
                    <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-4 tracking-widest flex items-center">
                      <Zap className="mr-2 text-primary" size={14} />
                      Key Synergy Benefits
                    </h4>
                    <ul className="space-y-3">
                      {research.keyBenefits.map((b: string, i: number) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 bg-card border-border/50">
                    <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-4 tracking-widest flex items-center">
                      <Sparkles className="mr-2 text-primary" size={14} />
                      Automated Merge Path
                    </h4>
                    <ul className="space-y-3">
                      {research.mergeSteps.map((s: string, i: number) => (
                        <li key={i} className="text-sm flex items-start">
                          <span className="font-mono text-[10px] text-primary mr-2">[{i+1}]</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                <Card className="p-6 bg-black border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FileCode size={120} />
                  </div>
                  <h4 className="text-[10px] uppercase font-bold text-primary mb-4 tracking-widest font-mono flex items-center">
                    <FileCode className="mr-2" size={14} />
                    Autonomous Bridge API (Draft)
                  </h4>
                  <pre className="text-[11px] font-mono text-primary/80 leading-relaxed overflow-x-auto">
                    {research.bridgeStub}
                  </pre>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forge;

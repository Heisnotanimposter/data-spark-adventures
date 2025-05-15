
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="w-full py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            className="mr-2 text-accent"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
          <span className="text-xl font-semibold">DataSpark</span>
        </div>
        
        <nav className={isMobile ? "hidden" : "flex gap-8 items-center"}>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Visualizations</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Notebooks</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Learn</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className={isMobile ? "hidden" : ""}
          >
            Docs
          </Button>
          <Button variant="outline" size="sm">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

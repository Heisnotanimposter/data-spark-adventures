import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Wallet, ChevronDown, User, ShieldCheck } from 'lucide-react';

const IdentityButton = () => {
  const { currentUserId, switchUser } = useWallet();

  const users = [
    { id: 'user123', label: 'Primary Developer', role: 'Full Access' },
    { id: 'user456', label: 'Strategy Investor', role: 'Stakeholder' },
    { id: 'user789', label: 'Guest Auditor', role: 'Read-only' },
  ];

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background border-border/50 hover:bg-secondary/50 flex items-center gap-2 px-3 py-5">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={14} className="text-primary fill-primary/30" />
          </div>
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest">{currentUser.label}</span>
            <span className="text-[9px] text-muted-foreground uppercase">{currentUser.role}</span>
          </div>
          <ChevronDown size={14} className="text-muted-foreground ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-md border-border/60 p-2">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Select Identity</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/30" />
        {users.map((user) => (
          <DropdownMenuItem 
            key={user.id} 
            className={`flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg transition-colors ${currentUserId === user.id ? 'bg-primary/10' : 'hover:bg-secondary'}`}
            onClick={() => switchUser(user.id)}
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold uppercase">{user.label}</span>
              {currentUserId === user.id && <ShieldCheck size={14} className="text-primary" />}
            </div>
            <span className="text-[9px] text-muted-foreground uppercase">{user.role}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IdentityButton;

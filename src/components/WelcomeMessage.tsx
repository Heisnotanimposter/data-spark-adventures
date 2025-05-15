
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage = ({ userName = "Explorer" }: WelcomeMessageProps) => {
  // Get current time to personalize greeting
  const currentHour = new Date().getHours();
  let greeting = "Hello";
  
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Calculate the initials for the avatar
  const initials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-gradient-to-r from-secondary to-secondary/30 rounded-2xl p-8 mb-8">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-4 border-white">
          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
            {initials || "DA"}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, <span className="gradient-text">{userName}</span>!
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to your data exploration journey. Ready to uncover insights that will transform your understanding?
          </p>
          
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-2">
              🚀 Ready to explore your data?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our sample notebooks make it easy to visualize and understand your data without any coding expertise. 
              Start with a pre-built template and watch your data come to life with just a few clicks!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="sm">
                Try a Sample Notebook
              </Button>
              <Button variant="outline" size="sm">
                Take a Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

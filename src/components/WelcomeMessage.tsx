
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { BookOpen, ChartBar } from "lucide-react";
import NotebookProcessing from './NotebookProcessing';
import NotebookError from './NotebookError';
import NotebookSuccess from './NotebookSuccess';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage = ({ userName = "Explorer" }: WelcomeMessageProps) => {
  const [processingNotebook, setProcessingNotebook] = useState(false);
  const [notebookError, setNotebookError] = useState<boolean>(false);
  const [notebookSuccess, setNotebookSuccess] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<'permissions' | 'connection' | 'data' | 'unknown'>('unknown');
  const [progress, setProgress] = useState(0);
  const [visualizationType, setVisualizationType] = useState<string>("bar chart");
  
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
    
  const runSampleNotebook = () => {
    setNotebookError(false);
    setNotebookSuccess(false);
    setProcessingNotebook(true);
    setProgress(0);
    
    // Randomly select visualization type for demo
    const vizTypes = ["bar chart", "scatter plot", "line graph", "pie chart", "heat map"];
    setVisualizationType(vizTypes[Math.floor(Math.random() * vizTypes.length)]);
    
    toast("Starting Educational Visualization Demo", {
      description: "Preparing an interactive learning experience...",
    });
    
    // Simulate progress updates with a chance of random error
    const interval = setInterval(() => {
      setProgress(prev => {
        // Randomly simulate an error (20% chance) when progress is between 30-80%
        const newProgress = prev + Math.random() * 10;
        
        if (newProgress > 30 && newProgress < 80 && Math.random() < 0.2) {
          clearInterval(interval);
          
          // Randomly pick an error type
          const errorTypes = ['permissions', 'connection', 'data', 'unknown'] as const;
          const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
          
          setTimeout(() => {
            setNotebookError(true);
            setProcessingNotebook(false);
            setErrorType(randomError);
            toast("We encountered a problem", {
              description: "Something went wrong with your notebook execution.",
            });
          }, 500);
          
          return prev;
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setProcessingNotebook(false);
            setNotebookSuccess(true);
            toast("Visualization complete!", {
              description: "Your data story is ready to explore.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 800);
  };

  const handleRetry = () => {
    setNotebookError(false);
    runSampleNotebook();
  };

  const handleContactSupport = () => {
    toast("Support request sent", {
      description: "Our team will get back to you shortly to help resolve this issue.",
    });
  };

  const handleDownload = () => {
    toast("Downloading visualization", {
      description: "Your visualization is being prepared for download.",
    });
    // Simulating a download delay
    setTimeout(() => {
      toast("Download complete", {
        description: "Your visualization has been saved to your downloads folder.",
      });
    }, 1500);
  };

  const handleExplore = () => {
    toast("Exploring datasets", {
      description: "Browse our collection of sample datasets to analyze.",
    });
  };

  const handleModify = () => {
    toast("Modify parameters", {
      description: "Adjust visualization settings to highlight different aspects of your data.",
    });
    // Return to notebook processing to "modify" parameters
    setNotebookSuccess(false);
    runSampleNotebook();
  };

  const handleStartOver = () => {
    setNotebookSuccess(false);
    setNotebookError(false);
  };

  if (processingNotebook) {
    return <NotebookProcessing progress={progress} />;
  }

  if (notebookError) {
    return <NotebookError 
      errorType={errorType} 
      onRetry={handleRetry} 
      onContact={handleContactSupport} 
    />;
  }

  if (notebookSuccess) {
    return <NotebookSuccess 
      visualizationType={visualizationType}
      onDownload={handleDownload}
      onExplore={handleExplore}
      onModify={handleModify}
    />;
  }

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
            Welcome to your data visualization learning journey. We're excited to help you build your data literacy skills one insight at a time.
          </p>
          
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border shadow-sm">
            <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Start Your Data Literacy Journey
            </h3>
            <p className="text-muted-foreground mb-4">
              New to data visualization? Our educational notebooks explain <em>why</em> certain charts work best for specific data types, 
              not just how to create them. Run our beginner-friendly demo to see a visualization come to life, complete with simple 
              explanations of the principles behind effective data storytelling.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="sm" onClick={runSampleNotebook} className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Run Learning Demo
              </Button>
              <Button variant="outline" size="sm">
                Browse Tutorials
              </Button>
            </div>
          </div>
          
          <div className="mt-4 bg-primary/10 p-3 rounded-lg text-sm">
            <p className="flex items-start">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>Each visualization includes explanations of <strong>why</strong> it's effective for your data type</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;

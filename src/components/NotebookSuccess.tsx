
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileSearch, FilePen } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface NotebookSuccessProps {
  visualizationType?: string;
  onDownload?: () => void;
  onExplore?: () => void;
  onModify?: () => void;
}

const NotebookSuccess = ({
  visualizationType = "data visualization",
  onDownload,
  onExplore,
  onModify
}: NotebookSuccessProps) => {
  return (
    <div className="max-w-2xl mx-auto my-8 space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl border-2 border-primary/20 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-3">Visualization Complete!</h2>
        <p className="text-lg mb-6">
          You've successfully created an insightful {visualizationType} that transforms raw numbers into a compelling data story.
        </p>
        
        <Alert className="bg-white/80 border-primary/10 mb-6 text-left">
          <AlertDescription className="text-base">
            <p><strong>What makes this visualization effective:</strong></p>
            <p className="mt-2">
              This visualization helps you quickly identify patterns and relationships in your data. 
              The visual encoding makes it easier for your brain to process complex information at a glance - 
              what would take minutes to understand in a spreadsheet becomes instantly clear here.
            </p>
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {onDownload && (
            <Button onClick={onDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Visualization
            </Button>
          )}
          {onModify && (
            <Button variant="outline" onClick={onModify} className="flex items-center gap-2">
              <FilePen className="h-4 w-4" />
              Modify Parameters
            </Button>
          )}
          {onExplore && (
            <Button variant="secondary" onClick={onExplore} className="flex items-center gap-2">
              <FileSearch className="h-4 w-4" />
              Explore Other Datasets
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-6 border shadow-sm">
        <h3 className="text-lg font-medium mb-3">Continue Your Learning Journey</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
            <span>Try changing the visualization type to see how different charts present your data</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
            <span>Modify parameters to highlight different aspects of your dataset</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
            <span>Share your insights with teammates to collaborate on data storytelling</span>
          </li>
        </ul>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Every visualization you create builds your data literacy skills.
          <br />What will you discover next?
        </p>
      </div>
    </div>
  );
};

export default NotebookSuccess;

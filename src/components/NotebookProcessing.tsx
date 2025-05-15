
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";

interface NotebookProcessingProps {
  progress?: number;
}

const NotebookProcessing = ({ progress = 0 }: NotebookProcessingProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl border shadow-md p-8 text-center max-w-2xl mx-auto my-8">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center">
            <Loader className="w-8 h-8 text-primary animate-spin" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xs font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Transforming Your Data</h3>
      
      <p className="text-muted-foreground mb-6">
        Like an artist turning raw canvas into a masterpiece, your data is being transformed from numbers into visual stories. Our AI is carefully analyzing patterns and creating insights that will bring your information to life.
      </p>
      
      <div className="space-y-4 mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground">Your Colab notebook is running seamlessly in the background</p>
      </div>
      
      <div className="bg-secondary/20 rounded-lg p-4 text-sm">
        <p className="italic">
          "Data is the new medium of expression. We're helping you tell your story through visualization, revealing insights that were always there, just waiting to be discovered."
        </p>
      </div>
    </div>
  );
};

export default NotebookProcessing;

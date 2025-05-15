
import React from 'react';
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface NotebookErrorProps {
  errorType?: 'permissions' | 'connection' | 'data' | 'unknown';
  onRetry?: () => void;
  onContact?: () => void;
}

const NotebookError = ({ 
  errorType = 'unknown', 
  onRetry, 
  onContact 
}: NotebookErrorProps) => {
  // Friendly error messages based on error type
  const errorMessages = {
    permissions: {
      title: "Access Issue",
      description: "It looks like we don't have permission to access your notebook or data files. This often happens with Google Drive permissions.",
      solution: "Please check that your Google Drive sharing settings allow access to the notebook and any data files it needs."
    },
    connection: {
      title: "Connection Problem",
      description: "We couldn't connect to the notebook service. This might be due to internet connectivity or temporary service issues.",
      solution: "A quick refresh or trying again in a few minutes often resolves this issue."
    },
    data: {
      title: "Data Format Issue",
      description: "The notebook had trouble processing your data. This usually happens when the data format is different than what the notebook expects.",
      solution: "Check that your data file matches the format shown in our examples (CSV with proper headers, etc)."
    },
    unknown: {
      title: "Something Went Wrong",
      description: "We encountered an unexpected problem while running your notebook.",
      solution: "Try running the notebook again. If the problem continues, our support team is here to help."
    }
  };

  const message = errorMessages[errorType];

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-6">
      <Alert variant="destructive" className="border-2">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-medium ml-2">
          {message.title}
        </AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p>
            We're sorry, but we couldn't complete your notebook visualization. {message.description}
          </p>
          <div className="bg-white/20 p-3 rounded-md">
            <p className="font-medium text-sm">What you can do:</p>
            <p className="text-sm mt-1">{message.solution}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {onRetry && (
              <Button 
                variant="secondary" 
                onClick={onRetry}
                className="bg-white text-destructive hover:bg-gray-100"
              >
                Try Again
              </Button>
            )}
            {onContact && (
              <Button 
                variant="outline" 
                onClick={onContact}
                className="border-white text-white hover:bg-white/20"
              >
                Contact Support
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="bg-background rounded-lg p-6 border shadow-sm">
        <h3 className="text-lg font-medium mb-3">Common Troubleshooting Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
            <span>Check that you're logged into your Google account with the right permissions</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
            <span>Ensure your data files are in the correct format (CSV, Excel, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
            <span>Try using a different browser or disabling browser extensions</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
            <span>Restart your computer and try again with a fresh session</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotebookError;

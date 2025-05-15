
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface NotebookProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

const NotebookCard = ({ title, description, difficulty, duration }: NotebookProps) => {
  // Determine the badge color based on difficulty
  const badgeColor = 
    difficulty === 'Beginner' 
      ? 'bg-green-100 text-green-800' 
      : difficulty === 'Intermediate'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-purple-100 text-purple-800';

  return (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>
            {difficulty}
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {duration}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Launch Notebook
        </Button>
      </CardFooter>
    </Card>
  );
};

const SampleNotebooks = () => {
  const notebooks = [
    {
      title: "Data Visualization Basics",
      description: "Learn how to create compelling charts and graphs with your data",
      difficulty: "Beginner" as const,
      duration: "15 min"
    },
    {
      title: "Trend Analysis",
      description: "Identify patterns and trends in time series data",
      difficulty: "Intermediate" as const,
      duration: "25 min"
    },
    {
      title: "Interactive Dashboards",
      description: "Create interactive dashboards to showcase your insights",
      difficulty: "Intermediate" as const,
      duration: "30 min"
    },
    {
      title: "Advanced Data Storytelling",
      description: "Craft compelling narratives with your visualizations",
      difficulty: "Advanced" as const,
      duration: "45 min"
    }
  ];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sample Notebooks</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {notebooks.map((notebook, index) => (
          <NotebookCard 
            key={index}
            title={notebook.title}
            description={notebook.description}
            difficulty={notebook.difficulty}
            duration={notebook.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default SampleNotebooks;


import React, { useState } from 'react';
import Header from '@/components/Header';
import WelcomeMessage from '@/components/WelcomeMessage';
import DataCard from '@/components/DataCard';
import SampleNotebooks from '@/components/SampleNotebooks';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import vizPlaceholder from '@/assets/visualization-placeholder.svg';

const Index = () => {
  const [userName, setUserName] = useState('Data Explorer');
  
  const recentVisualizations = [
    {
      title: "Sales Performance",
      description: "Monthly revenue trends with breakdown by product category",
      imageSrc: vizPlaceholder,
      altText: "Bar chart showing sales data",
      buttonText: "View Details"
    },
    {
      title: "Customer Demographics",
      description: "Analysis of customer segments by age, location and purchasing habits",
      imageSrc: vizPlaceholder,
      altText: "Pie chart showing demographic data",
      buttonText: "View Details"
    },
    {
      title: "Engagement Metrics",
      description: "User interaction patterns across website and mobile applications",
      imageSrc: vizPlaceholder,
      altText: "Line chart showing engagement metrics",
      buttonText: "View Details"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <WelcomeMessage userName={userName} />
        
        <div className="mb-10">
          <Tabs defaultValue="recent" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Visualizations</h2>
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="recent" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentVisualizations.map((viz, index) => (
                  <DataCard
                    key={index}
                    title={viz.title}
                    description={viz.description}
                    imageSrc={viz.imageSrc}
                    altText={viz.altText}
                    buttonText={viz.buttonText}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Same visualization cards can be used here for demo purposes */}
                {recentVisualizations.map((viz, index) => (
                  <DataCard
                    key={index}
                    title={`Popular: ${viz.title}`}
                    description={viz.description}
                    imageSrc={viz.imageSrc}
                    altText={viz.altText}
                    buttonText={viz.buttonText}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Same visualization cards can be used here for demo purposes */}
                {recentVisualizations.slice(0, 2).map((viz, index) => (
                  <DataCard
                    key={index}
                    title={`Favorite: ${viz.title}`}
                    description={viz.description}
                    imageSrc={viz.imageSrc}
                    altText={viz.altText}
                    buttonText={viz.buttonText}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <SampleNotebooks />
        
        <div className="bg-secondary/50 rounded-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="md:max-w-2xl mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Discover the Power of Data</h2>
              <p className="text-muted-foreground mb-4">
                Our sample Colab notebooks are designed to help you visualize and understand your data without any coding expertise. 
                Run a notebook and watch your data transform into beautiful, insightful visualizations that tell compelling stories.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>No coding knowledge required</span>
                </li>
                <li className="flex items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Interactive visualizations</span>
                </li>
                <li className="flex items-start">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Easy sharing and collaboration</span>
                </li>
              </ul>
            </div>
            
            <div>
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

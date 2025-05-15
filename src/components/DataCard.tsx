
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DataCardProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  buttonText: string;
}

const DataCard = ({ 
  title, 
  description, 
  imageSrc, 
  altText,
  buttonText = "Explore"
}: DataCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={altText} 
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="mb-2">{title}</CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataCard;

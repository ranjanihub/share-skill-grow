
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  slug: string;
  color?: string;
}

export const CategoryCard = ({ title, icon, count, slug, color = "bg-blue-500" }: CategoryCardProps) => {
  return (
    <Link to={`/category/${slug}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 overflow-hidden border-none">
        <div className={`h-2 ${color}`} />
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-xl">{icon}</div>
              <div className="font-medium">{title}</div>
            </div>
            <div className="text-sm text-muted-foreground">{count} skills</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

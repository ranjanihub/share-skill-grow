
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  skillsWanted: string[];
}

interface SkillCardProps {
  skill: Skill;
  onRequestSwap?: (skillId: string) => void;
}

export const SkillCard = ({ skill, onRequestSwap }: SkillCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="skill-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{skill.title}</CardTitle>
            <CardDescription className="mt-1">{skill.category}</CardDescription>
          </div>
          <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
        
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Looking to learn:</p>
          <div className="flex flex-wrap gap-1">
            {skill.skillsWanted.map((wanted, index) => (
              <Badge key={index} variant="outline" className="text-xs">{wanted}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-gray-50 pt-3 pb-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={skill.user.avatar} alt={skill.user.name} />
            <AvatarFallback>{skill.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">{skill.user.name}</div>
        </div>
        {onRequestSwap && (
          <Button 
            size="sm" 
            onClick={() => onRequestSwap(skill.id)}
          >
            Request Swap
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

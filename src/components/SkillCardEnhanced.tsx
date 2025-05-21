
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface EnhancedSkill {
  id: string;
  title: string;
  description: string;
  category: string;
  level?: string;
  type: 'offered' | 'wanted';
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  skills?: string[]; // Skills wanted (for offered skills) or skills offered (for wanted skills)
}

interface SkillCardEnhancedProps {
  skill: EnhancedSkill;
  onConnect?: (skillId: string) => void;
}

export const SkillCardEnhanced = ({ skill, onConnect }: SkillCardEnhancedProps) => {
  const isOffered = skill.type === 'offered';
  
  const getBadgeColor = (type: 'offered' | 'wanted') => {
    return type === 'offered' 
      ? 'bg-skillswap-primary text-white'
      : 'bg-skillswap-secondary text-white';
  };

  const getLevelColor = (level?: string) => {
    if (!level) return 'bg-gray-100 text-gray-800';
    
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="skill-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-2">{skill.title}</CardTitle>
            <CardDescription className="mt-1">{skill.category}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getBadgeColor(skill.type)}>
              {skill.type === 'offered' ? 'Offered' : 'Wanted'}
            </Badge>
            {skill.level && (
              <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{skill.description}</p>
        
        {skill.skills && skill.skills.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">
              {isOffered ? 'Looking to learn:' : 'Can teach:'}
            </p>
            <div className="flex flex-wrap gap-1">
              {skill.skills.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">{item}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-gray-50 pt-3 pb-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={skill.user.avatar} alt={skill.user.name} />
            <AvatarFallback>{skill.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-medium">{skill.user.name}</div>
        </div>
        {onConnect && (
          <Button 
            size="sm" 
            onClick={() => onConnect(skill.id)}
          >
            Connect
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

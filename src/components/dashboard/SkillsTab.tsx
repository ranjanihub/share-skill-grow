
import React from 'react';
import { SkillCard, Skill } from '@/components/SkillCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SkillsTabProps {
  isLoading: boolean;
  mySkills: Skill[];
  setAddSkillOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SkillsTab = ({ isLoading, mySkills, setAddSkillOpen }: SkillsTabProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-skillswap-primary" />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mySkills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
      <Card className="flex items-center justify-center h-full min-h-[300px] border-dashed">
        <CardContent className="text-center">
          <div className="p-4 rounded-full bg-gray-100 inline-flex mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </div>
          <h3 className="font-medium mb-1">Add a New Skill</h3>
          <p className="text-gray-500 text-sm mb-4">Share what you can teach others</p>
          <Button 
            variant="outline" 
            onClick={() => setAddSkillOpen(true)}
          >
            Add Skill
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

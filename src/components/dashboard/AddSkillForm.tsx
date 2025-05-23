
import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Category options
export const categoryOptions = [
  'Programming',
  'Design',
  'Music',
  'Languages',
  'Cooking',
  'Fitness',
  'Photography',
  'Finance',
  'Marketing',
  'Education',
  'Business',
  'Arts & Crafts',
];

// Level options
export const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export interface NewSkill {
  title: string;
  description: string;
  category: string;
  level: string;
  skillsWanted: string[];
}

interface AddSkillFormProps {
  newSkill: NewSkill;
  setNewSkill: React.Dispatch<React.SetStateAction<NewSkill>>;
  handleAddSkill: () => Promise<void>;
  isSubmitting: boolean;
}

export const AddSkillForm = ({ newSkill, setNewSkill, handleAddSkill, isSubmitting }: AddSkillFormProps) => {
  const addWantedSkill = () => {
    setNewSkill({...newSkill, skillsWanted: [...newSkill.skillsWanted, '']});
  };

  const updateWantedSkill = (index: number, value: string) => {
    const updatedWantedSkills = [...newSkill.skillsWanted];
    updatedWantedSkills[index] = value;
    setNewSkill({...newSkill, skillsWanted: updatedWantedSkills});
  };

  const removeWantedSkill = (index: number) => {
    const updatedWantedSkills = newSkill.skillsWanted.filter((_, i) => i !== index);
    setNewSkill({...newSkill, skillsWanted: updatedWantedSkills});
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add a New Skill</DialogTitle>
        <DialogDescription>
          What can you teach others? Add details about a skill you'd like to offer.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="title" className="text-right font-medium">Title</label>
          <Input 
            id="title" 
            placeholder="e.g., Python Programming" 
            className="col-span-3"
            value={newSkill.title}
            onChange={(e) => setNewSkill({...newSkill, title: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-start gap-4">
          <label htmlFor="description" className="text-right font-medium">Description</label>
          <Textarea 
            id="description" 
            placeholder="Describe what you'll teach and what experience you have" 
            className="col-span-3"
            value={newSkill.description}
            onChange={(e) => setNewSkill({...newSkill, description: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-right font-medium">Category</label>
          <Select 
            value={newSkill.category} 
            onValueChange={(value) => setNewSkill({...newSkill, category: value})}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="level" className="text-right font-medium">Level</label>
          <Select 
            value={newSkill.level} 
            onValueChange={(value) => setNewSkill({...newSkill, level: value})}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select your expertise level" />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-4 items-start gap-4">
          <div className="text-right font-medium">
            Skills Wanted
            <p className="text-xs font-normal text-gray-500">What do you want to learn?</p>
          </div>
          <div className="col-span-3 space-y-2">
            {newSkill.skillsWanted.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  placeholder="e.g., Photography" 
                  value={skill}
                  onChange={(e) => updateWantedSkill(index, e.target.value)}
                />
                {newSkill.skillsWanted.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeWantedSkill(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </Button>
                )}
              </div>
            ))}
            {newSkill.skillsWanted.length < 5 && (
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={addWantedSkill}
              >
                Add Another Skill
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={() => setNewSkill({
          title: '',
          description: '',
          category: '',
          level: '',
          skillsWanted: ['']
        })}>
          Cancel
        </Button>
        <Button 
          type="button" 
          onClick={handleAddSkill}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            'Add Skill'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

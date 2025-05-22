
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

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
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedSkillToOffer, setSelectedSkillToOffer] = useState<string>("");
  const [mySkills, setMySkills] = useState<{id: string, title: string}[]>([
    { id: '100', title: 'Web Development' },
    { id: '101', title: 'Digital Marketing' }
  ]);
  
  const isOffered = skill.type === 'offered';
  const isOwnSkill = skill.user.id === user?.id;
  
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

  const handleConnectClick = () => {
    if (!user) {
      toast.error("Please log in to request a skill swap");
      // You can add redirection to login page here
      return;
    }
    
    // Open the request dialog to select a skill to offer
    setRequestDialogOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedSkillToOffer) {
      toast.error("Please select a skill to offer");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app with Supabase, you would send the request to the database
      // const { data, error } = await supabase.from('match_requests').insert({
      //   requesting_user_id: user.id,
      //   requested_user_id: skill.user.id,
      //   requested_skill_id: skill.id,
      //   offered_skill_id: selectedSkillToOffer,
      //   status: 'pending',
      //   created_at: new Date()
      // });
      
      // if (error) throw error;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Skill swap request sent successfully!");
      setRequestDialogOpen(false);
      setSelectedSkillToOffer("");
      
    } catch (error) {
      console.error('Error sending skill swap request:', error);
      toast.error("Failed to send skill swap request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
          {!isOwnSkill && (
            <Button 
              size="sm" 
              onClick={handleConnectClick}
              variant={isOffered ? "default" : "secondary"}
            >
              Request Swap
            </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Skill Swap</DialogTitle>
            <DialogDescription>
              You're requesting to learn "{skill.title}" from {skill.user.name}.
              Select one of your skills to offer in exchange.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h4 className="mb-2 text-sm font-medium">Select a skill to offer:</h4>
            <div className="grid gap-2">
              {mySkills.length > 0 ? mySkills.map((mySkill) => (
                <div 
                  key={mySkill.id}
                  className={`p-3 border rounded-md cursor-pointer transition-all ${
                    selectedSkillToOffer === mySkill.id 
                      ? 'border-skillswap-primary bg-skillswap-primary/10' 
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedSkillToOffer(mySkill.id)}
                >
                  <div className="font-medium">{mySkill.title}</div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">
                  You don't have any skills to offer yet. 
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm"
                    onClick={() => {
                      setRequestDialogOpen(false);
                      // Redirect to dashboard to add skills
                    }}
                  >
                    Add some skills first.
                  </Button>
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setRequestDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!selectedSkillToOffer || isSubmitting}
              onClick={handleSubmitRequest}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Request'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

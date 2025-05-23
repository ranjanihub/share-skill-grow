
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Skill } from '@/components/SkillCard';
import { MatchRequest } from '@/components/MatchRequestCard';
import { toast } from 'sonner';
import { NewSkill } from './AddSkillForm';

export const useDashboard = () => {
  const { user } = useAuth();
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState<NewSkill>({
    title: '',
    description: '',
    category: '',
    level: '',
    skillsWanted: [''] as string[]
  });
  
  // State for skills data
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<MatchRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<MatchRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's skills when component mounts
  useEffect(() => {
    if (user) {
      fetchUserSkills();
      fetchMatchRequests();
    }
  }, [user]);

  // Fetch user's skills from Supabase
  const fetchUserSkills = async () => {
    try {
      setIsLoading(true);
      
      // For now, use mock data as this is a frontend-only implementation
      // In a real app with Supabase tables set up, you would use:
      // const { data, error } = await supabase
      //   .from('skills')
      //   .select('*')
      //   .eq('user_id', user.id);
      
      // if (error) throw error;
      
      // Mock data for frontend development
      const mockSkills: Skill[] = [
        {
          id: '100',
          title: 'Web Development',
          description: 'HTML, CSS, JavaScript and React. I can help you build responsive websites and web applications.',
          category: 'Programming',
          level: 'Advanced',
          user: { id: user?.id || 'current-user', name: user?.user_metadata?.full_name || 'Current User', avatar: undefined },
          skillsWanted: ['Cooking', 'Photography', 'Spanish Language']
        },
        {
          id: '101',
          title: 'Digital Marketing',
          description: 'Social media marketing, SEO, content marketing, and analytics. I can help you market your business online.',
          category: 'Marketing',
          level: 'Intermediate',
          user: { id: user?.id || 'current-user', name: user?.user_metadata?.full_name || 'Current User', avatar: undefined },
          skillsWanted: ['Graphic Design', 'Public Speaking', 'Video Editing']
        },
      ];
      
      setMySkills(mockSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load your skills');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch match requests
  const fetchMatchRequests = async () => {
    try {
      // Mock data for frontend development
      // In a real app, you would fetch from Supabase
      const mockIncomingRequests: MatchRequest[] = [
        {
          id: 'r1',
          status: 'pending',
          date: '2023-06-15',
          otherUser: { id: 'u3', name: 'Carlos Rodriguez', avatar: undefined },
          skillOffered: { id: '3', title: 'Financial Planning' },
          skillRequested: { id: '100', title: 'Web Development' }
        },
        {
          id: 'r2',
          status: 'accepted',
          date: '2023-06-10',
          otherUser: { id: 'u7', name: 'Michael Lee', avatar: undefined },
          skillOffered: { id: '7', title: 'Photography Basics' },
          skillRequested: { id: '101', title: 'Digital Marketing' }
        }
      ];
      
      const mockOutgoingRequests: MatchRequest[] = [
        {
          id: 'r3',
          status: 'pending',
          date: '2023-06-14',
          otherUser: { id: 'u2', name: 'Maya Johnson', avatar: undefined },
          skillOffered: { id: '100', title: 'Web Development' },
          skillRequested: { id: '2', title: 'Digital Illustration' }
        },
        {
          id: 'r4',
          status: 'rejected',
          date: '2023-06-08',
          otherUser: { id: 'u8', name: 'Sophia Romano', avatar: undefined },
          skillOffered: { id: '101', title: 'Digital Marketing' },
          skillRequested: { id: '8', title: 'Italian Cooking' }
        }
      ];
      
      setIncomingRequests(mockIncomingRequests);
      setOutgoingRequests(mockOutgoingRequests);
    } catch (error) {
      console.error('Error fetching match requests:', error);
    }
  };

  const handleAddSkill = async () => {
    // Validation
    if (!newSkill.title || !newSkill.description || !newSkill.category || !newSkill.level) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // For a real app with Supabase tables set up, you would use:
      // const { data, error } = await supabase
      //   .from('skills')
      //   .insert([
      //     {
      //       user_id: user.id,
      //       title: newSkill.title,
      //       description: newSkill.description,
      //       category: newSkill.category,
      //       level: newSkill.level,
      //       skills_wanted: newSkill.skillsWanted.filter(skill => skill.trim() !== '')
      //     }
      //   ])
      //   .select();
      //
      // if (error) throw error;
      
      // For frontend-only implementation, create a mock skill
      const newMockSkill: Skill = {
        id: `${Date.now()}`,
        title: newSkill.title,
        description: newSkill.description,
        category: newSkill.category,
        level: newSkill.level,
        user: {
          id: user?.id || 'current-user',
          name: user?.user_metadata?.full_name || 'Current User',
          avatar: user?.user_metadata?.avatar_url
        },
        skillsWanted: newSkill.skillsWanted.filter(skill => skill.trim() !== '')
      };
      
      // Update local state
      setMySkills(prevSkills => [...prevSkills, newMockSkill]);
      
      toast.success("New skill added successfully!");
      setAddSkillOpen(false);
      
      // Reset form
      setNewSkill({
        title: '',
        description: '',
        category: '',
        level: '',
        skillsWanted: ['']
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error("Failed to add new skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptRequest = async (id: string) => {
    try {
      // For a real app with Supabase tables set up, you would use:
      // const { error } = await supabase
      //   .from('match_requests')
      //   .update({ status: 'accepted' })
      //   .eq('id', id);
      // 
      // if (error) throw error;
      
      // Update local state for frontend-only implementation
      setIncomingRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'accepted' } : request
        )
      );
      
      toast.success("Request accepted! You can now schedule a session.");
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error("Failed to accept request");
    }
  };

  const handleRejectRequest = async (id: string) => {
    try {
      // For a real app with Supabase tables set up, you would use:
      // const { error } = await supabase
      //   .from('match_requests')
      //   .update({ status: 'rejected' })
      //   .eq('id', id);
      // 
      // if (error) throw error;
      
      // Update local state for frontend-only implementation
      setIncomingRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'rejected' } : request
        )
      );
      
      toast.success("Request declined.");
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error("Failed to decline request");
    }
  };

  return {
    addSkillOpen,
    setAddSkillOpen,
    newSkill,
    setNewSkill,
    mySkills,
    incomingRequests,
    outgoingRequests,
    isLoading,
    isSubmitting,
    handleAddSkill,
    handleAcceptRequest,
    handleRejectRequest
  };
};

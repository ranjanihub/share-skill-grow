
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

interface AcceptedMatch {
  id: string;
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  skillOffered: {
    id: string;
    title: string;
  };
  skillRequested: {
    id: string;
    title: string;
  };
  date: string;
}

export const SessionsTab = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [acceptedMatches, setAcceptedMatches] = useState<AcceptedMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedMatches = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // In a real app with Supabase, you would fetch accepted matches from the database
        // For now, we'll use mock data for demonstration
        const mockAcceptedMatches: AcceptedMatch[] = [
          {
            id: 'r2',
            otherUser: { id: 'u7', name: 'Michael Lee', avatar: undefined },
            skillOffered: { id: '7', title: 'Photography Basics' },
            skillRequested: { id: '101', title: 'Digital Marketing' },
            date: '2023-06-10',
          },
          {
            id: 'r5',
            otherUser: { id: 'u9', name: 'Emma Watson', avatar: undefined },
            skillOffered: { id: '9', title: 'Spanish Language' },
            skillRequested: { id: '100', title: 'Web Development' },
            date: '2023-06-12',
          }
        ];
        
        setAcceptedMatches(mockAcceptedMatches);
      } catch (error) {
        console.error('Error fetching accepted matches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcceptedMatches();
  }, [user]);
  
  const handleChatClick = (userId: string, userName: string) => {
    // Navigate to messages page with the selected user
    navigate('/messages', { 
      state: { 
        selectedProfile: { 
          id: userId, 
          full_name: userName, 
          avatar_url: null 
        } 
      } 
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading your sessions...</p>
      </div>
    );
  }

  if (acceptedMatches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No sessions scheduled yet.</p>
        <p className="text-gray-500 mt-2">Once you've matched with someone, you can schedule sessions here.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {acceptedMatches.map((match) => (
        <Card key={match.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={match.otherUser.avatar} alt={match.otherUser.name} />
                  <AvatarFallback>{match.otherUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{match.otherUser.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">Matched on {new Date(match.date).toLocaleDateString()}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Match</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-xs font-medium text-muted-foreground mb-1">Skills Exchange</p>
                <p className="font-medium">{match.skillOffered.title} ↔ {match.skillRequested.title}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  className="w-full mr-2"
                  onClick={() => {/* Schedule session functionality */}}
                >
                  Schedule Session
                </Button>
                <Button 
                  className="w-full flex items-center" 
                  onClick={() => handleChatClick(match.otherUser.id, match.otherUser.name)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

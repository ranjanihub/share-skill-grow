
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, Loader2 } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface ChatListProps {
  onSelectChat: (profile: Profile) => void;
  selectedProfileId?: string;
}

export const ChatList = ({ onSelectChat, selectedProfileId }: ChatListProps) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) return;

    // Fetch profiles that the user has messages with
    const fetchChatProfiles = async () => {
      setIsLoading(true);
      try {
        // In a real app, we'd fetch profiles with a join or function
        // For now, we'll just fetch all messages and get unique user ids
        const { data: messages, error } = await supabase
          .from('chat_messages')
          .select('*')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Get unique user IDs that the current user has chatted with
        const uniqueUserIds = new Set<string>();
        messages.forEach(message => {
          const otherUserId = message.sender_id === user.id ? message.receiver_id : message.sender_id;
          uniqueUserIds.add(otherUserId);
        });

        // Fetch profiles for these users
        if (uniqueUserIds.size > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('*')
            .in('id', Array.from(uniqueUserIds));

          if (profilesError) throw profilesError;

          // Process profiles to add unread count, last message, etc.
          const processedProfiles = profilesData.map(profile => {
            const userMessages = messages.filter(msg => 
              msg.sender_id === profile.id || msg.receiver_id === profile.id
            );
            const unreadCount = userMessages.filter(msg => 
              msg.sender_id === profile.id && !msg.read
            ).length;
            const lastMessage = userMessages[0]; // Most recent message is first due to ordering

            return {
              ...profile,
              unreadCount,
              lastMessage: lastMessage?.content,
              lastMessageTime: lastMessage?.created_at
            };
          });

          // Sort by most recent message
          processedProfiles.sort((a, b) => {
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
          });

          setProfiles(processedProfiles);
        }
      } catch (error) {
        console.error('Error fetching chat profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatProfiles();

    // Set up real-time subscription for new messages to update unread counts and last messages
    const channel = supabase
      .channel('chat_list_updates')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
        }, 
        () => {
          fetchChatProfiles(); // Refresh the chat list when messages change
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => 
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Truncate message text for preview
  const truncateMessage = (text?: string, maxLength = 30) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="border rounded-lg bg-white shadow h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-2">Messages</h2>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-skillswap-primary" />
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            <p>No conversations yet</p>
          </div>
        ) : (
          <div>
            {filteredProfiles.map(profile => (
              <Button
                key={profile.id}
                variant="ghost"
                className={`w-full justify-start p-3 h-auto ${
                  selectedProfileId === profile.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => onSelectChat(profile)}
              >
                <div className="flex items-center w-full gap-3 relative">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback>
                      {profile.full_name?.[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">
                        {profile.full_name || 'User'}
                      </span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(profile.lastMessageTime)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate">
                        {truncateMessage(profile.lastMessage)}
                      </p>
                      {profile.unreadCount ? (
                        <span className="bg-skillswap-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {profile.unreadCount > 9 ? '9+' : profile.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

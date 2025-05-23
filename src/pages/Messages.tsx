
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ChatList } from '@/components/chat/ChatList';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

const Messages = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Handle navigation from SessionsTab
  useEffect(() => {
    if (location.state?.selectedProfile) {
      setSelectedProfile(location.state.selectedProfile);
    }
  }, [location.state]);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <p>Please log in to access your messages.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ChatList 
              onSelectChat={setSelectedProfile}
              selectedProfileId={selectedProfile?.id}
            />
          </div>
          
          <div className="md:col-span-2">
            {selectedProfile ? (
              <ChatWindow 
                recipientId={selectedProfile.id}
                recipientName={selectedProfile.full_name || 'User'}
                recipientAvatar={selectedProfile.avatar_url || undefined}
              />
            ) : (
              <div className="border rounded-lg bg-white shadow h-[600px] flex items-center justify-center p-4">
                <div className="text-center text-gray-500">
                  <p className="text-xl mb-2">Select a conversation</p>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;

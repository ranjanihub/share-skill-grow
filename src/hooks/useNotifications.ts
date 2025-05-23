
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type NotificationType = 'match_request' | 'session_update' | 'badge_earned' | 'message' | 'other';

interface SendNotificationOptions {
  userId: string;
  type: NotificationType;
  content: string;
  relatedEntityId?: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);

  const sendNotification = async ({ 
    userId, 
    type, 
    content, 
    relatedEntityId 
  }: SendNotificationOptions) => {
    if (!user) {
      console.error("User not authenticated");
      return { success: false, error: "Not authenticated" };
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type,
          content,
          read: false,
          related_entity_id: relatedEntityId
        })
        .select();

      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Failed to send notification');
      return { success: false, error };
    } finally {
      setIsSending(false);
    }
  };

  return { sendNotification, isSending };
};

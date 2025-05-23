
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SendMessageOptions {
  recipientId: string;
  content: string;
}

export const useChat = () => {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async ({ recipientId, content }: SendMessageOptions) => {
    if (!user) {
      console.error("User not authenticated");
      return { success: false, error: "Not authenticated" };
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: user.id,
          receiver_id: recipientId,
          content,
          read: false
        })
        .select();

      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      return { success: false, error };
    } finally {
      setIsSending(false);
    }
  };

  return { sendMessage, isSending };
};


import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  read: boolean;
  created_at: string;
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
}

export const ChatWindow = ({ recipientId, recipientName, recipientAvatar }: ChatWindowProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    // Fetch existing messages
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .or(`sender_id.eq.${recipientId},receiver_id.eq.${recipientId}`)
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        // Filter messages to only include those between current user and recipient
        const filteredMessages = data.filter(message => 
          (message.sender_id === user.id && message.receiver_id === recipientId) || 
          (message.sender_id === recipientId && message.receiver_id === user.id)
        );
        
        setMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('chat_messages_channel')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
        }, 
        (payload) => {
          const newMessage = payload.new as Message;
          // Only add message if it's part of this conversation
          if ((newMessage.sender_id === user.id && newMessage.receiver_id === recipientId) ||
              (newMessage.sender_id === recipientId && newMessage.receiver_id === user.id)) {
            setMessages(prevMessages => {
              // Check if message already exists
              const exists = prevMessages.some(msg => msg.id === newMessage.id);
              if (exists) {
                return prevMessages.map(msg => 
                  msg.id === newMessage.id ? newMessage : msg
                );
              }
              return [...prevMessages, newMessage];
            });
          }
        }
      )
      .subscribe();

    // Mark received messages as read
    const markAsRead = async () => {
      try {
        const { error } = await supabase
          .from('chat_messages')
          .update({ read: true })
          .eq('sender_id', recipientId)
          .eq('receiver_id', user.id)
          .eq('read', false);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };

    markAsRead();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: user.id,
          receiver_id: recipientId,
          content: newMessage.trim(),
          read: false
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-white shadow">
      {/* Chat header */}
      <div className="p-4 border-b flex items-center gap-2 bg-skillswap-primary text-white">
        <Avatar className="h-10 w-10">
          <AvatarImage src={recipientAvatar} />
          <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{recipientName}</h3>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-skillswap-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            <p>No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    message.sender_id === user?.id
                      ? 'bg-skillswap-primary text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender_id === user?.id ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.created_at)}
                    {message.sender_id === user?.id && (
                      <span className="ml-2">
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
        <Textarea
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="resize-none"
          rows={1}
          disabled={isSending}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isSending || !newMessage.trim()}
        >
          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Linkedin } from 'lucide-react';

const LinkedInLoginButton = () => {
  const { signInWithLinkedIn, isLoading } = useAuth();

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border border-[#0077b5] text-[#0077b5] hover:bg-[#0077b5] hover:text-white"
      onClick={signInWithLinkedIn}
      disabled={isLoading}
    >
      <Linkedin className="h-5 w-5" />
      <span>Sign in with LinkedIn</span>
    </Button>
  );
};

export default LinkedInLoginButton;

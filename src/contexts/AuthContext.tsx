import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: Error | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string, userData?: { full_name?: string }) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signOut: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message || "Failed to sign in");
        console.error('Login error:', error.message);
      } else if (data?.session) {
        toast.success("Successfully logged in!");
        console.log('Login successful, redirecting to dashboard');
        navigate('/dashboard');
      }
      
      setIsLoading(false);
      return { data: data?.session, error };
    } catch (error) {
      console.error('Unexpected login error:', error);
      setIsLoading(false);
      return { data: null, error: error as Error };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData?: { full_name?: string }
  ) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        toast.error(error.message || "Failed to create account");
        console.error('Signup error:', error.message);
      } else if (data) {
        toast.success("Account created successfully! Check your email for verification.");
        console.log('Signup successful, redirecting to dashboard');
        navigate('/dashboard');
      }
      
      setIsLoading(false);
      return { data, error };
    } catch (error) {
      console.error('Unexpected signup error:', error);
      setIsLoading(false);
      return { data: null, error: error as Error };
    }
  };

  const signInWithLinkedIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast.error(error.message || "Failed to sign in with LinkedIn");
        console.error('LinkedIn login error:', error.message);
        setIsLoading(false);
      }
      // No need to navigate here as the OAuth redirect will handle it
    } catch (error) {
      console.error('Unexpected LinkedIn login error:', error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast.error(error.message || "Failed to sign in with Google");
        console.error('Google login error:', error.message);
        setIsLoading(false);
      }
      // No need to navigate here as the OAuth redirect will handle it
    } catch (error) {
      console.error('Unexpected Google login error:', error);
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      // Clear any local state that might contain user data
      setUser(null);
      setSession(null);
      
      toast.success("Logged out successfully");
      console.log('Logout successful, redirecting to login');
      // After logout, redirect to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      isLoading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithLinkedIn,
      signInWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

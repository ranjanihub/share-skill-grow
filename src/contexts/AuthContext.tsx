
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

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      console.log('Logout successful, redirecting to login');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signIn, signUp, signOut }}>
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

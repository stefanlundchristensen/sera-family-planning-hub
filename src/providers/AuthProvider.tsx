
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface SupabaseAuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Define checkUserProfile as a useCallback to avoid dependency issues
  const checkUserProfile = useCallback(async (userId: string): Promise<void> => {
    try {
      console.info("Checking user profile for:", userId);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, date_of_birth, role')
        .eq('id', userId)
        .maybeSingle(); // Using maybeSingle instead of single to handle case where profile might not exist

      console.info("Profile check result:", profile, error);
      setIsLoading(false);

      // Only redirect if we're not already on the onboarding page
      if (!profile?.name || !profile?.date_of_birth || !profile?.role) {
        if (location.pathname !== '/onboarding') {
          console.info("Profile incomplete, redirecting to onboarding");
          navigate('/onboarding');
        }
      } else if (location.pathname === '/auth' || location.pathname === '/onboarding') {
        // Only redirect from auth or onboarding to dashboard if profile is complete
        console.info("Profile complete, redirecting to dashboard");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error checking user profile:", error);
      setIsLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    console.info("AuthProvider initialized");
    
    // First set up listener for auth state changes to prevent missing events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.info("Auth state changed:", event);
        
        // Update state synchronously to prevent React batching issues
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Use setTimeout to defer Supabase calls to prevent deadlocks
        if (newSession?.user) {
          setTimeout(() => checkUserProfile(newSession.user.id), 0);
        } else {
          setIsLoading(false);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.info("Initial session check:", currentSession ? "Found session" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkUserProfile(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      console.info("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [checkUserProfile]);

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.info("Signing out user");
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error('Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{ session, user, signOut, isLoading }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export const useSupabaseAuth = (): SupabaseAuthContextType => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within an AuthProvider');
  }
  return context;
};

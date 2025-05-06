import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Define types for user and session
interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'child' | 'extended_family';
  created_at: string;
}

interface Session {
  access_token: string;
  expires_at: number;
  user: User;
}

// Define the auth state
interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the auth actions
interface AuthActions {
  register: (email: string, name: string, password: string) => Promise<{ error: string | null }>;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

// Combine state and actions
type AuthStore = AuthState & AuthActions;

// Define a type for the response
interface AuthResponse {
  error: string | null;
}

// Create the store
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      actions: {
        // User registration
        register: async (email: string, name: string, _password: string): Promise<AuthResponse> => {
          set({ isLoading: true, error: null });

          try {
            // Simulated registration delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, we'll just set the user as authenticated
            // In a real app, this would involve an API call to register the user
            const fakeUser: User = {
              id: uuidv4(),
              email,
              name,
              role: 'parent',
              created_at: new Date().toISOString()
            };

            set({
              user: fakeUser,
              session: {
                access_token: `fake-token-${Date.now()}`,
                expires_at: Date.now() + 3600000, // 1 hour from now
                user: fakeUser
              },
              isAuthenticated: true,
              isLoading: false
            });

            return { error: null };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to register';
            set({ error: message, isLoading: false });
            return { error: message };
          }
        },

        // User login
        login: async (email: string, _password: string): Promise<AuthResponse> => {
          set({ isLoading: true, error: null });

          try {
            // Simulated login delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, we'll just set the user as authenticated
            // In a real app, this would involve an API call to authenticate the user
            const fakeUser: User = {
              id: uuidv4(),
              email,
              name: email.split('@')[0], // Use part of email as name for demo
              role: 'parent',
              created_at: new Date().toISOString()
            };

            set({
              user: fakeUser,
              session: {
                access_token: `fake-token-${Date.now()}`,
                expires_at: Date.now() + 3600000, // 1 hour from now
                user: fakeUser
              },
              isAuthenticated: true,
              isLoading: false
            });

            return { error: null };
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to login';
            set({ error: message, isLoading: false });
            return { error: message };
          }
        },

        // User logout
        logout: () => {
          set({ user: null, session: null, isAuthenticated: false });
        },

        // Set user
        setUser: (user) => {
          set({ user, isAuthenticated: !!user });
        },

        // Set session
        setSession: (session) => {
          set({ session, isAuthenticated: !!session });
        },
      },
    }),
    {
      name: 'auth-storage', // unique name
      storage: localStorage, // Use localStorage
    }
  )
);

export default useAuthStore;

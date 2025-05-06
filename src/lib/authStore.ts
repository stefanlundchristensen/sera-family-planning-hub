
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

// Define the auth response type
interface AuthResponse {
  error: string | null;
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
  register: (email: string, name: string, password: string) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

// Combine state and actions
type AuthStore = AuthState & AuthActions;

// Custom storage implementation that matches PersistStorage interface
const customStorage = {
  getItem: (name: string) => {
    if (typeof window === 'undefined') return null;
    const str = localStorage.getItem(name);
    return str ? JSON.parse(str) : null;
  },
  setItem: (name: string, value: unknown) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  },
};

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
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      // Set session
      setSession: (session: Session | null) => {
        set({ session, isAuthenticated: !!session });
      },
    }),
    {
      name: 'auth-storage', // unique name
      storage: customStorage, // Custom storage implementation
    }
  )
);

export default useAuthStore;


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, AuthActions, UserProfile, UserRole } from '@/types/auth';
import { toast } from 'sonner';

/**
 * Authentication Store
 * 
 * This is a centralized store for managing authentication state and actions.
 * It uses Zustand for state management with the persist middleware to enable
 * persistence of authentication state across page refreshes.
 * 
 * Note: This is a placeholder implementation that will be replaced with Supabase Auth.
 * The mock implementations here demonstrate the expected behavior and interface.
 */

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      /**
       * Initial Authentication State
       */
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * User Authentication Actions
       */

      /**
       * Login a user with email and password
       * 
       * @param email - User's email address
       * @param password - User's password
       * @returns Promise that resolves when login is complete
       * @throws Error if login fails
       */
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          // Placeholder for Supabase authentication
          // This will be replaced with actual Supabase auth
          console.log('Login attempt with:', email);
          
          // Mock successful login for now
          const mockUser: UserProfile = {
            id: 'temp-user-id',
            email,
            name: 'Mock User',
            role: 'parent',
            created_at: new Date().toISOString(),
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            user: mockUser,
            isAuthenticated: true,
            isLoading: false 
          });
          
          toast.success('Logged in successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to login';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },
      
      register: async (email: string, password: string, name: string, dateOfBirth: Date, role: UserRole) => {
        try {
          set({ isLoading: true, error: null });
          
          // Placeholder for Supabase registration
          console.log('Registration attempt with:', { email, name, dateOfBirth, role });
          
          // Mock successful registration
          const mockUser: UserProfile = {
            id: 'temp-user-id',
            email,
            name,
            dateOfBirth: dateOfBirth.toISOString(),
            role,
            created_at: new Date().toISOString(),
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ 
            user: mockUser,
            isAuthenticated: true,
            isLoading: false 
          });
          
          toast.success('Registered successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to register';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },
      
      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          
          // Placeholder for Supabase logout
          console.log('Logout attempt');
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 300));
          
          set({ 
            user: null,
            isAuthenticated: false,
            isLoading: false 
          });
          
          toast.success('Logged out successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },
      
      updateProfile: async (profile: Partial<UserProfile>) => {
        try {
          set({ isLoading: true, error: null });
          
          const currentUser = get().user;
          if (!currentUser) {
            throw new Error('No user logged in');
          }
          
          // Placeholder for Supabase profile update
          console.log('Profile update:', profile);
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const updatedUser: UserProfile = {
            ...currentUser,
            ...profile,
            updated_at: new Date().toISOString(),
          };
          
          set({ 
            user: updatedUser,
            isLoading: false 
          });
          
          toast.success('Profile updated successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },
      
      setLoading: (isLoading: boolean) => set({ isLoading }),
      
      setError: (error: string | null) => set({ error }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      // Only persist the user and authentication status
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;


import { useCallback } from 'react';
import useAuthStore from '@/lib/authStore';
import { UserProfile, UserRole } from '@/types/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      clearError();
      return login(email, password);
    },
    [clearError, login]
  );

  const handleRegister = useCallback(
    async (email: string, password: string, name: string, dateOfBirth: Date, role: UserRole) => {
      clearError();
      return register(email, password, name, dateOfBirth, role);
    },
    [clearError, register]
  );

  const handleLogout = useCallback(async () => {
    clearError();
    return logout();
  }, [clearError, logout]);

  const handleUpdateProfile = useCallback(
    async (profile: Partial<UserProfile>) => {
      clearError();
      return updateProfile(profile);
    },
    [clearError, updateProfile]
  );

  // Check if user has specific role
  const hasRole = useCallback(
    (role: UserRole) => {
      return user?.role === role;
    },
    [user]
  );

  // Check if user can edit content (parent or extended family)
  const canEdit = useCallback(() => {
    return user?.role === 'parent' || user?.role === 'extended_family';
  }, [user]);

  // Check if user can manage users (only parents)
  const canManageUsers = useCallback(() => {
    return user?.role === 'parent';
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    hasRole,
    canEdit,
    canManageUsers,
  };
};

export default useAuth;


import { useCallback } from 'react';
import useAuthStore from '@/lib/authStore';
import type { UserRole } from '@/types/auth';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout
  } = useAuthStore();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      return login(email, password);
    },
    [login]
  );

  const handleRegister = useCallback(
    async (email: string, password: string, name: string) => {
      return register(email, name, password);
    },
    [register]
  );

  const handleLogout = useCallback(() => {
    return logout();
  }, [logout]);

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
    hasRole,
    canEdit,
    canManageUsers,
  };
};

export default useAuth;

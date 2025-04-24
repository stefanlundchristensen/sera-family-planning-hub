
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

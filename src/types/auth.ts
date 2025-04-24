
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  dateOfBirth?: Date | string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export type UserRole = 'parent' | 'child' | 'extended_family';

export interface FamilyGroup {
  id: string;
  name: string;
  ownerId: string; // Parent user ID who created the family
  created_at?: string;
  updated_at?: string;
}

export interface FamilyMembership {
  id: string;
  familyId: string;
  userId: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, dateOfBirth: Date, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

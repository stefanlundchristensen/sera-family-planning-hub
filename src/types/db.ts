
/**
 * Database types for the SERA Family Planning Hub
 * These types should match the Supabase database schema
 */

export interface Profile {
  id: string;
  name: string;
  email: string;
  date_of_birth?: string;
  role?: UserRole;
  avatar_url?: string;
  preferences?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export type UserRole = 'parent' | 'child' | 'extended_family';

export interface FamilyGroup {
  id: string;
  name: string;
  owner_id: string;
  description?: string;
  settings?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface FamilyMembership {
  id: string;
  family_id: string;
  user_id: string;
  role: UserRole;
  status: 'pending' | 'active' | 'inactive';
  invitation_token?: string;
  invitation_expires?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  family_id: string;
  created_by?: string;
  assigned_to?: string;
  recurring_pattern?: string;
  category?: string;
  notification_time?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Invitation {
  id: string;
  family_id: string;
  email: string;
  role: UserRole;
  token: string;
  expires_at: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export interface DBSchema {
  profiles: Profile;
  family_groups: FamilyGroup;
  family_memberships: FamilyMembership;
  events: Event;
  invitations: Invitation;
}

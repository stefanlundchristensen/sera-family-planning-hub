
export interface FamilyMember {
  id: string;
  name: string;
  color: string;
  avatar?: string;
  role?: string;       // Adding role field to match UI components
  created_at?: string; // Standard Supabase timestamp
  updated_at?: string; // Standard Supabase timestamp
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  familyMemberId: string;
  color: string;
  isRecurring?: boolean;
  recurringPattern?: string;
  location?: string;    // Adding location field to match EventForm component
  created_at?: string;  // Standard Supabase timestamp
  updated_at?: string;  // Standard Supabase timestamp
}

export interface CalendarState {
  events: Event[];
  familyMembers: FamilyMember[];
  selectedDate: Date;
  viewMode: 'day' | 'week' | 'month';
  isLoading: boolean;
  error: string | null;
}

export interface CalendarActions {
  addEvent: (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) => void;
  updateFamilyMember: (member: FamilyMember) => void;
  deleteFamilyMember: (memberId: string) => void;
  setSelectedDate: (date: Date) => void;
  setViewMode: (mode: 'day' | 'week' | 'month') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { CalendarState, CalendarActions, Event, FamilyMember } from '@/types/store';
import { validateEvent, validateFamilyMember } from '@/lib/validations';
import { ensureDateFormat } from '@/utils/typeUtils';

const useCalendarStore = create<CalendarState & CalendarActions>()(
  persist(
    (set) => ({
      // Initial state
      events: [],
      familyMembers: [],
      selectedDate: new Date(),
      viewMode: 'month',
      isLoading: false,
      error: null,

      // Actions
      addEvent: (eventData) => {
        // Validate event data before adding
        const eventWithDates = ensureDateFormat(eventData);
        const validation = validateEvent({
          ...eventWithDates,
          id: uuidv4(), // Add temporary ID for validation
        });
        
        if (!validation.success) {
          console.error("Invalid event data:", validation.error);
          set({ error: "Failed to add event: Invalid data" });
          return;
        }

        set((state) => ({
          events: [
            ...state.events,
            {
              ...eventWithDates,
              id: uuidv4(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } as Event,
          ],
          error: null,
        }));
      },

      updateEvent: (updatedEvent) => {
        // Validate event data before updating
        const eventWithDates = ensureDateFormat(updatedEvent);
        const validation = validateEvent(eventWithDates);
        
        if (!validation.success) {
          console.error("Invalid event data:", validation.error);
          set({ error: "Failed to update event: Invalid data" });
          return;
        }

        set((state) => ({
          events: state.events.map((event) =>
            event.id === updatedEvent.id 
              ? { ...eventWithDates, updated_at: new Date().toISOString() } as Event
              : event
          ),
          error: null,
        }));
      },

      deleteEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== eventId),
          error: null,
        })),

      addFamilyMember: (memberData) => {
        // Validate family member data before adding
        const validation = validateFamilyMember({
          ...memberData,
          id: uuidv4(), // Add temporary ID for validation
        });
        
        if (!validation.success) {
          console.error("Invalid family member data:", validation.error);
          set({ error: "Failed to add family member: Invalid data" });
          return;
        }

        set((state) => ({
          familyMembers: [
            ...state.familyMembers,
            {
              ...memberData,
              id: uuidv4(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            } as FamilyMember,
          ],
          error: null,
        }));
      },

      updateFamilyMember: (updatedMember) => {
        // Validate family member data before updating
        const validation = validateFamilyMember(updatedMember);
        
        if (!validation.success) {
          console.error("Invalid family member data:", validation.error);
          set({ error: "Failed to update family member: Invalid data" });
          return;
        }

        set((state) => ({
          familyMembers: state.familyMembers.map((member) =>
            member.id === updatedMember.id 
              ? { ...updatedMember, updated_at: new Date().toISOString() } as FamilyMember
              : member
          ),
          error: null,
        }));
      },

      deleteFamilyMember: (memberId) =>
        set((state) => ({
          familyMembers: state.familyMembers.filter((member) => member.id !== memberId),
          events: state.events.filter((event) => event.familyMemberId !== memberId),
          error: null,
        })),

      setSelectedDate: (date) => set({ selectedDate: date }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'calendar-storage',
      partialize: (state) => ({
        events: state.events,
        familyMembers: state.familyMembers,
        selectedDate: state.selectedDate,
        viewMode: state.viewMode,
      }),
    }
  )
);

export default useCalendarStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { CalendarState, CalendarActions, Event, FamilyMember } from '@/types/store';

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
      addEvent: (eventData) =>
        set((state) => ({
          events: [
            ...state.events,
            {
              ...eventData,
              id: uuidv4(),
            },
          ],
        })),

      updateEvent: (updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        })),

      deleteEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== eventId),
        })),

      addFamilyMember: (memberData) =>
        set((state) => ({
          familyMembers: [
            ...state.familyMembers,
            {
              ...memberData,
              id: uuidv4(),
            },
          ],
        })),

      updateFamilyMember: (updatedMember) =>
        set((state) => ({
          familyMembers: state.familyMembers.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          ),
        })),

      deleteFamilyMember: (memberId) =>
        set((state) => ({
          familyMembers: state.familyMembers.filter((member) => member.id !== memberId),
          events: state.events.filter((event) => event.familyMemberId !== memberId),
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
import { useCallback, useEffect } from 'react';
import useCalendarStore from '@/lib/store';
import { Event, FamilyMember } from '@/types/store';
import { api } from '@/utils/api';

export const useCalendar = () => {
  const {
    events,
    familyMembers,
    addEvent,
    updateEvent,
    deleteEvent,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    setLoading,
    setError,
  } = useCalendarStore();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [eventsData, membersData] = await Promise.all([
          api.events.getAll(),
          api.familyMembers.getAll(),
        ]);
        
        // Only add if not already in store (prevent duplication on hot reloads)
        const existingEventIds = new Set(events.map(e => e.id));
        eventsData.forEach((event) => {
          if (!existingEventIds.has(event.id)) {
            addEvent(event);
          }
        });
        
        const existingMemberIds = new Set(familyMembers.map(m => m.id));
        membersData.forEach((member) => {
          if (!existingMemberIds.has(member.id)) {
            addFamilyMember(member);
          }
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [addEvent, addFamilyMember, events, familyMembers, setLoading, setError]);

  const handleAddEvent = useCallback(
    async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        setLoading(true);
        const newEvent = await api.events.create(eventData);
        addEvent(eventData);
        return newEvent;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to add event');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addEvent, setLoading, setError]
  );

  const handleUpdateEvent = useCallback(
    async (event: Event) => {
      try {
        setLoading(true);
        // Optimistic update
        const originalEvent = events.find((e) => e.id === event.id);
        updateEvent(event);

        try {
          await api.events.update(event);
        } catch (error) {
          // Revert optimistic update on error
          if (originalEvent) updateEvent(originalEvent);
          throw error;
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to update event');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [events, updateEvent, setLoading, setError]
  );

  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      try {
        setLoading(true);
        // Optimistic update
        const eventToDelete = events.find((e) => e.id === eventId);
        deleteEvent(eventId);

        try {
          await api.events.delete(eventId);
        } catch (error) {
          // Revert optimistic update on error
          if (eventToDelete) addEvent(eventToDelete);
          throw error;
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to delete event');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [events, deleteEvent, addEvent, setLoading, setError]
  );

  const handleAddFamilyMember = useCallback(
    async (memberData: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        setLoading(true);
        const newMember = await api.familyMembers.create(memberData);
        addFamilyMember(memberData);
        return newMember;
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to add family member');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addFamilyMember, setLoading, setError]
  );

  const handleUpdateFamilyMember = useCallback(
    async (member: FamilyMember) => {
      try {
        setLoading(true);
        // Optimistic update
        const originalMember = familyMembers.find((m) => m.id === member.id);
        updateFamilyMember(member);

        try {
          await api.familyMembers.update(member);
        } catch (error) {
          // Revert optimistic update on error
          if (originalMember) updateFamilyMember(originalMember);
          throw error;
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to update family member');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [familyMembers, updateFamilyMember, setLoading, setError]
  );

  const handleDeleteFamilyMember = useCallback(
    async (memberId: string) => {
      try {
        setLoading(true);
        // Optimistic update
        const memberToDelete = familyMembers.find((m) => m.id === memberId);
        deleteFamilyMember(memberId);

        try {
          await api.familyMembers.delete(memberId);
        } catch (error) {
          // Revert optimistic update on error
          if (memberToDelete) addFamilyMember(memberToDelete);
          throw error;
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to delete family member');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [familyMembers, deleteFamilyMember, addFamilyMember, setLoading, setError]
  );

  return {
    events,
    familyMembers,
    handleAddEvent,
    handleUpdateEvent,
    handleDeleteEvent: useCalendarStore().deleteEvent,
    handleAddFamilyMember,
    handleUpdateFamilyMember: useCalendarStore().updateFamilyMember,
    handleDeleteFamilyMember: useCalendarStore().deleteFamilyMember,
  };
};


import { useCallback, useEffect } from 'react';
import useCalendarStore from '@/lib/store';
import { Event, FamilyMember } from '@/types/store';
import { api } from '@/utils/api';
import { toast } from 'sonner';
import { validateEvent, validateFamilyMember } from '@/lib/validations';
import { ensureDateFormat } from '@/utils/typeUtils';

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
        
        // Validate and add events if not already in store
        const existingEventIds = new Set(events.map(e => e.id));
        eventsData.forEach((event) => {
          if (!existingEventIds.has(event.id)) {
            const eventWithDates = ensureDateFormat(event);
            const validation = validateEvent(eventWithDates);
            if (validation.success && validation.data) {
              addEvent(validation.data as Event);
            } else {
              console.error(`Invalid event data for ID ${event.id}:`, validation.error);
            }
          }
        });
        
        // Validate and add family members if not already in store
        const existingMemberIds = new Set(familyMembers.map(m => m.id));
        membersData.forEach((member) => {
          if (!existingMemberIds.has(member.id)) {
            const validation = validateFamilyMember(member);
            if (validation.success && validation.data) {
              addFamilyMember(validation.data as FamilyMember);
            } else {
              console.error(`Invalid family member data for ID ${member.id}:`, validation.error);
            }
          }
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load initial data');
        toast.error('Failed to load data');
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
        
        // Ensure dates are properly formatted and color is set
        const eventWithDates = ensureDateFormat(eventData) as Omit<Event, 'id' | 'created_at' | 'updated_at'>;
        
        // Validate event data
        const validation = validateEvent({
          ...eventWithDates,
          id: 'temp-id', // Add temporary ID for validation
        });
        
        if (!validation.success) {
          throw new Error('Invalid event data');
        }
        
        const newEvent = await api.events.create(eventWithDates);
        addEvent(eventWithDates);
        toast.success('Event created successfully');
        return newEvent;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add event';
        setError(errorMessage);
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addEvent, setLoading, setError]
  );

  const handleUpdateEvent = useCallback(
    async (event: Partial<Event> & { id: string }) => {
      try {
        setLoading(true);
        
        // Ensure dates are properly formatted and color is set
        const eventWithDates = ensureDateFormat(event) as Event;
        
        // Validate event data
        const validation = validateEvent(eventWithDates);
        if (!validation.success) {
          throw new Error('Invalid event data');
        }
        
        // Optimistic update
        const originalEvent = events.find((e) => e.id === event.id);
        updateEvent(eventWithDates);

        try {
          await api.events.update(eventWithDates);
          toast.success('Event updated successfully');
        } catch (error) {
          // Revert optimistic update on error
          if (originalEvent) updateEvent(originalEvent);
          throw error;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update event';
        setError(errorMessage);
        toast.error(errorMessage);
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
          toast.success('Event deleted successfully');
        } catch (error) {
          // Revert optimistic update on error
          if (eventToDelete) addEvent(eventToDelete);
          throw error;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete event';
        setError(errorMessage);
        toast.error(errorMessage);
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
        
        // Validate family member data
        const validation = validateFamilyMember({
          ...memberData,
          id: 'temp-id', // Add temporary ID for validation
        });
        
        if (!validation.success) {
          throw new Error('Invalid family member data');
        }
        
        const newMember = await api.familyMembers.create(memberData);
        addFamilyMember(memberData);
        toast.success('Family member added successfully');
        return newMember;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add family member';
        setError(errorMessage);
        toast.error(errorMessage);
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
        
        // Validate family member data
        const validation = validateFamilyMember(member);
        if (!validation.success) {
          throw new Error('Invalid family member data');
        }
        
        // Optimistic update
        const originalMember = familyMembers.find((m) => m.id === member.id);
        updateFamilyMember(member);

        try {
          await api.familyMembers.update(member);
          toast.success('Family member updated successfully');
        } catch (error) {
          // Revert optimistic update on error
          if (originalMember) updateFamilyMember(originalMember);
          throw error;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update family member';
        setError(errorMessage);
        toast.error(errorMessage);
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
          toast.success('Family member deleted successfully');
        } catch (error) {
          // Revert optimistic update on error
          if (memberToDelete) addFamilyMember(memberToDelete);
          throw error;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete family member';
        setError(errorMessage);
        toast.error(errorMessage);
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
    handleDeleteEvent,
    handleAddFamilyMember,
    handleUpdateFamilyMember,
    handleDeleteFamilyMember,
  };
};

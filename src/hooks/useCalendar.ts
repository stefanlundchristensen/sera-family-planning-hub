
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import type { Event, FamilyMember } from '@/types/store';

type EventWithMember = Event & {
  member?: FamilyMember;
};

export function useCalendar() {
  const [events, setEvents] = useState<EventWithMember[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load events and family members
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        // Load events
        const eventsResponse = await api.events.getAll();
        if (eventsResponse.error) {
          throw new Error(eventsResponse.error.message);
        }

        // Load family members
        const membersResponse = await api.familyMembers.getAll();
        if (membersResponse.error) {
          throw new Error(membersResponse.error.message);
        }

        // Map family members to events
        const eventsWithMembers: EventWithMember[] = [];
        
        if (eventsResponse.data) {
          eventsResponse.data.forEach((event: Event) => {
            const member = membersResponse.data?.find(m => m.id === event.familyMemberId);
            eventsWithMembers.push({
              ...event,
              member,
            });
          });
        }

        setEvents(eventsWithMembers);
        setFamilyMembers(membersResponse.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading calendar data');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return { events, familyMembers, isLoading, error };
}

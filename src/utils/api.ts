import { Event, FamilyMember } from '@/types/store';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const api = {
  events: {
    getAll: async (): Promise<Event[]> => {
      const cacheKey = 'events';
      const cachedData = getCachedData(cacheKey);
      if (cachedData) return cachedData;

      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    },

    create: async (event: Omit<Event, 'id'>): Promise<Event> => {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to create event');
      const data = await response.json();
      cache.delete('events');
      return data;
    },

    update: async (event: Event): Promise<Event> => {
      const response = await fetch(`${API_BASE_URL}/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to update event');
      const data = await response.json();
      cache.delete('events');
      return data;
    },

    delete: async (eventId: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      cache.delete('events');
    },
  },

  familyMembers: {
    getAll: async (): Promise<FamilyMember[]> => {
      const cacheKey = 'familyMembers';
      const cachedData = getCachedData(cacheKey);
      if (cachedData) return cachedData;

      const response = await fetch(`${API_BASE_URL}/family-members`);
      if (!response.ok) throw new Error('Failed to fetch family members');
      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    },

    create: async (member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> => {
      const response = await fetch(`${API_BASE_URL}/family-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      if (!response.ok) throw new Error('Failed to create family member');
      const data = await response.json();
      cache.delete('familyMembers');
      return data;
    },

    update: async (member: FamilyMember): Promise<FamilyMember> => {
      const response = await fetch(`${API_BASE_URL}/family-members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      if (!response.ok) throw new Error('Failed to update family member');
      const data = await response.json();
      cache.delete('familyMembers');
      return data;
    },

    delete: async (memberId: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/family-members/${memberId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete family member');
      cache.delete('familyMembers');
    },
  },
}; 
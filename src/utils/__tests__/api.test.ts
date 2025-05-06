import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { api } from '../api';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API Client', () => {
  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    
    // Reset cache between tests
    (api as any).cache = new Map();
  });

  describe('events API', () => {
    it('should fetch all events', async () => {
      // Mock successful response
      const mockEvents = [{ id: '1', title: 'Test Event' }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      });

      const result = await api.events.getAll();
      
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEvents);
    });

    it('should create an event', async () => {
      const newEvent = { 
        title: 'New Event',
        start: new Date(),
        end: new Date(),
        familyMemberId: '123',
        color: 'blue'
      };
      
      const createdEvent = { ...newEvent, id: '456' };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdEvent,
      });

      const result = await api.events.create(newEvent);
      
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch.mock.calls[0][1].method).toBe('POST');
      expect(JSON.parse(mockFetch.mock.calls[0][1].body)).toEqual(newEvent);
      expect(result).toEqual(createdEvent);
    });

    it('should handle errors properly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Server error' }),
      });

      await expect(api.events.getAll()).rejects.toThrow('Server error');
    });
  });

  describe('familyMembers API', () => {
    it('should fetch all family members', async () => {
      const mockMembers = [{ id: '1', name: 'Test Member' }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockMembers,
      });

      const result = await api.familyMembers.getAll();
      
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMembers);
    });
  });

  describe('caching', () => {
    it('should use cached data when available', async () => {
      const mockEvents = [{ id: '1', title: 'Cached Event' }];
      
      // First call - will make a fetch request
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockEvents,
      });
      
      await api.events.getAll();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      
      // Second call - should use cache
      const result = await api.events.getAll();
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1 call
      expect(result).toEqual(mockEvents);
    });

    it('should clear cache when creating/updating/deleting items', async () => {
      // First fetch to populate cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: '1', title: 'Initial Event' }],
      });
      
      await api.events.getAll();
      
      // Create event should clear cache
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: '2', title: 'New Event' }),
      });
      
      await api.events.create({ 
        title: 'New Event',
        start: new Date(),
        end: new Date(),
        familyMemberId: '123',
        color: 'blue'
      });
      
      // Next getAll should make a new fetch call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: '1' }, { id: '2' }],
      });
      
      await api.events.getAll();
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });
});
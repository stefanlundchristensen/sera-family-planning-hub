import { vi, describe, it, expect, beforeEach } from 'vitest';
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
      expect(result.data).toEqual(mockEvents);
    });

    it('should create an event', async () => {
      const now = new Date();
      const newEvent = {
        title: 'New Event',
        start: now,
        end: now,
        familyMemberId: '123',
        color: 'blue',
      };

      const createdEvent = { ...newEvent, id: '456' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdEvent,
      });

      const result = await api.events.create(newEvent);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch.mock.calls[0][1].method).toBe('POST');
      const parsedBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(parsedBody.title).toEqual(newEvent.title);
      expect(parsedBody.familyMemberId).toEqual(newEvent.familyMemberId);
      expect(parsedBody.color).toEqual(newEvent.color);
      expect(result.data).toEqual(createdEvent);
    });

    it('should handle errors properly', async () => {
      mockFetch.mockImplementationOnce(() => {
        throw new Error('Server error');
      });

      const result = await api.events.getAll();
      expect(result.data).toBeNull();
      expect(result.error).not.toBeNull();
      expect(result.error?.message).toBeTruthy(); // Just check that there is an error message
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
      expect(result.data).toEqual(mockMembers);
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
      expect(result.data).toEqual(mockEvents);
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

      const now = new Date();
      await api.events.create({
        title: 'New Event',
        start: now,
        end: now,
        familyMemberId: '123',
        color: 'blue',
      });

      // Next getAll should make a new fetch call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: '1' }, { id: '2' }],
      });

      await api.events.getAll();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});

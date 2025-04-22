
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

// --- Interceptor logic ---
type RequestInterceptor = (input: RequestInfo, init?: RequestInit) => Promise<[RequestInfo, RequestInit?]>;
type ResponseInterceptor = (response: Response) => Promise<Response>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

// Example interceptor: you can expand (e.g., add auth token)
// Adds a request logging interceptor
requestInterceptors.push(async (input, init) => {
  // For demonstration, just log every request
  // console.log("API Request:", input, init);
  return [input, init];
});

// Example response interceptor for error normalization
responseInterceptors.push(async (response) => {
  if (!response.ok) {
    let errorMsg = 'API Error';
    try {
      const data = await response.json();
      errorMsg = data?.message || data?.error || errorMsg;
    } catch {
      // ignore body errors
    }
    throw new Error(errorMsg);
  }
  return response;
});

// Run all request interceptors
async function runRequestInterceptors(input: RequestInfo, init?: RequestInit) {
  let req: [RequestInfo, RequestInit?] = [input, init];
  for (const interceptor of requestInterceptors) {
    req = await interceptor(req[0], req[1]);
  }
  return req;
}

// Run all response interceptors
async function runResponseInterceptors(response: Response) {
  let resp = response;
  for (const interceptor of responseInterceptors) {
    resp = await interceptor(resp);
  }
  return resp;
}

// Centralized fetchWithInterceptors function
async function fetchWithInterceptors(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const [newInput, newInit] = await runRequestInterceptors(input, init);
  const response = await fetch(newInput, newInit);
  return runResponseInterceptors(response);
}

export const api = {
  events: {
    getAll: async (): Promise<Event[]> => {
      const cacheKey = 'events';
      const cachedData = getCachedData(cacheKey);
      if (cachedData) return cachedData;

      const response = await fetchWithInterceptors(`${API_BASE_URL}/events`);
      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    },

    create: async (event: Omit<Event, 'id'>): Promise<Event> => {
      const response = await fetchWithInterceptors(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      cache.delete('events');
      return data;
    },

    update: async (event: Event): Promise<Event> => {
      const response = await fetchWithInterceptors(`${API_BASE_URL}/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      cache.delete('events');
      return data;
    },

    delete: async (eventId: string): Promise<void> => {
      await fetchWithInterceptors(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
      });
      cache.delete('events');
    },
  },

  familyMembers: {
    getAll: async (): Promise<FamilyMember[]> => {
      const cacheKey = 'familyMembers';
      const cachedData = getCachedData(cacheKey);
      if (cachedData) return cachedData;

      const response = await fetchWithInterceptors(`${API_BASE_URL}/family-members`);
      const data = await response.json();
      setCachedData(cacheKey, data);
      return data;
    },

    create: async (member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> => {
      const response = await fetchWithInterceptors(`${API_BASE_URL}/family-members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      const data = await response.json();
      cache.delete('familyMembers');
      return data;
    },

    update: async (member: FamilyMember): Promise<FamilyMember> => {
      const response = await fetchWithInterceptors(`${API_BASE_URL}/family-members/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
      const data = await response.json();
      cache.delete('familyMembers');
      return data;
    },

    delete: async (memberId: string): Promise<void> => {
      await fetchWithInterceptors(`${API_BASE_URL}/family-members/${memberId}`, {
        method: 'DELETE',
      });
      cache.delete('familyMembers');
    },
  },
};

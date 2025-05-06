import type {
  ApiClient,
  ApiClientConfig,
  ApiClientInterface,
  ApiError,
  ApiRequestOptions,
  ApiResponse,
  EventsApi,
  FamilyMembersApi,
} from './apiTypes';
import type { Event, FamilyMember } from '@/types/store';

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const DEFAULT_RETRIES = 1;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * A specialized Map that automatically expires entries after a specified duration
 */
class CacheMap<K, V> {
  private readonly cache = new Map<K, { data: V; timestamp: number }>();
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;
  private readonly ttl: number;

  constructor(ttl: number = CACHE_DURATION) {
    this.ttl = ttl;
    this.startCleanup();
  }

  /**
   * Start the automatic cleanup interval
   */
  private startCleanup(): void {
    // Clean up every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000);
  }

  /**
   * Clean up expired cache entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get a value from the cache if it exists and hasn't expired
   */
  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;

    // Check if the entry has expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.data;
  }

  /**
   * Set a value in the cache with the current timestamp
   */
  set(key: K, value: V): this {
    this.cache.set(key, { data: value, timestamp: Date.now() });
    return this;
  }

  /**
   * Delete a value from the cache
   */
  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear the entire cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get all keys in the cache
   */
  keys(): IterableIterator<K> {
    return this.cache.keys();
  }

  /**
   * Get all entries in the cache
   */
  entries(): IterableIterator<[K, { data: V; timestamp: number }]> {
    return this.cache.entries();
  }

  /**
   * Destroy the cache cleanup interval
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

/**
 * Base API client implementation
 */
class BaseApiClient implements ApiClientInterface {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly defaultTimeout: number;
  private readonly defaultRetries: number;
  private readonly cache: CacheMap<string, any>;

  /**
   * Create a new API client
   */
  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(config.defaultHeaders || {}),
    };
    this.defaultTimeout = config.timeout || DEFAULT_TIMEOUT;
    this.defaultRetries = config.retries || DEFAULT_RETRIES;
    this.cache = new CacheMap();
  }

  /**
   * Build the full URL for an API request
   */
  private buildUrl(path: string): string {
    // Ensure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }

  /**
   * Create a fetch request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit & { timeout?: number }
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;

    // Create an abort controller to handle timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Parse an API error from a response
   */
  private async parseError(response: Response): Promise<ApiError> {
    try {
      const data = await response.json();
      return {
        status: response.status,
        message: data.message || data.error || `HTTP Error ${response.status}`,
        details: data,
      };
    } catch (error) {
      return {
        status: response.status,
        message: response.statusText || `HTTP Error ${response.status}`,
      };
    }
  }

  /**
   * Execute a fetch request with retries and timeout
   */
  private async executeFetch<T>(
    url: string,
    options: RequestInit & { timeout?: number; retries?: number }
  ): Promise<ApiResponse<T>> {
    const { retries = this.defaultRetries, ...fetchOptions } = options;
    let lastError: ApiError | null = null;

    // Try the request multiple times based on retry count
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, fetchOptions);

        if (!response.ok) {
          lastError = await this.parseError(response);
          // Only retry on server errors (5xx) or specific client errors
          if (response.status < 500 && response.status !== 408 && response.status !== 429) {
            break;
          }
          // Add exponential backoff for retries
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 100));
          }
          continue;
        }

        // For no-content responses
        if (response.status === 204) {
          return { data: null, error: null };
        }

        const data = await response.json();
        return { data, error: null };
      } catch (error) {
        lastError = {
          status: 0,
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    return {
      data: null,
      error: lastError || {
        status: 0,
        message: 'Request failed',
      },
    };
  }

  /**
   * Perform a GET request
   */
  async get<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    const cacheKey = url;

    // Use cached data if available and not explicitly skipped
    if (!options.skipCache) {
      const cachedData = this.cache.get(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: null };
      }
    }

    const response = await this.executeFetch<T>(url, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      timeout: options.timeout,
      retries: options.retries,
    });

    // Cache successful responses
    if (response.data && !options.skipCache) {
      this.cache.set(cacheKey, response.data);
    }

    return response;
  }

  /**
   * Perform a POST request
   */
  async post<T, U = any>(
    path: string,
    data: U,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    
    const response = await this.executeFetch<T>(url, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      body: JSON.stringify(data),
      timeout: options.timeout,
      retries: options.retries,
    });

    // Invalidate cache for the base path
    this.invalidateCache(path.split('/')[0]);

    return response;
  }

  /**
   * Perform a PUT request
   */
  async put<T, U = any>(
    path: string,
    data: U,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    
    const response = await this.executeFetch<T>(url, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      body: JSON.stringify(data),
      timeout: options.timeout,
      retries: options.retries,
    });

    // Invalidate cache for the base path
    this.invalidateCache(path.split('/')[0]);

    return response;
  }

  /**
   * Perform a DELETE request
   */
  async delete<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    
    const response = await this.executeFetch<T>(url, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      timeout: options.timeout,
      retries: options.retries,
    });

    // Invalidate cache for the base path
    this.invalidateCache(path.split('/')[0]);

    return response;
  }

  /**
   * Invalidate cache entries that start with the given key prefix
   */
  private invalidateCache(prefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear the entire cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Destroy the API client and clean up resources
   */
  destroy(): void {
    this.cache.destroy();
  }
}

/**
 * Events API implementation
 */
class EventsApiClient implements EventsApi {
  private readonly api: ApiClientInterface;
  private readonly basePath = 'events';

  constructor(api: ApiClientInterface) {
    this.api = api;
  }

  /**
   * Get all events
   */
  async getAll(options?: ApiRequestOptions): Promise<ApiResponse<Event[]>> {
    return this.api.get<Event[]>(this.basePath, options);
  }

  /**
   * Get a single event by ID
   */
  async getById(id: string, options?: ApiRequestOptions): Promise<ApiResponse<Event>> {
    return this.api.get<Event>(`${this.basePath}/${id}`, options);
  }

  /**
   * Create a new event
   */
  async create(
    event: Omit<Event, 'id' | 'created_at' | 'updated_at'>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<Event>> {
    return this.api.post<Event, Omit<Event, 'id' | 'created_at' | 'updated_at'>>(
      this.basePath,
      event,
      options
    );
  }

  /**
   * Update an existing event
   */
  async update(event: Event, options?: ApiRequestOptions): Promise<ApiResponse<Event>> {
    return this.api.put<Event, Event>(`${this.basePath}/${event.id}`, event, options);
  }

  /**
   * Delete an event by ID
   */
  async delete(id: string, options?: ApiRequestOptions): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`${this.basePath}/${id}`, options);
  }
}

/**
 * Family Members API implementation
 */
class FamilyMembersApiClient implements FamilyMembersApi {
  private readonly api: ApiClientInterface;
  private readonly basePath = 'family-members';

  constructor(api: ApiClientInterface) {
    this.api = api;
  }

  /**
   * Get all family members
   */
  async getAll(options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember[]>> {
    return this.api.get<FamilyMember[]>(this.basePath, options);
  }

  /**
   * Get a single family member by ID
   */
  async getById(id: string, options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember>> {
    return this.api.get<FamilyMember>(`${this.basePath}/${id}`, options);
  }

  /**
   * Create a new family member
   */
  async create(
    member: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<FamilyMember>> {
    return this.api.post<FamilyMember, Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>>(
      this.basePath,
      member,
      options
    );
  }

  /**
   * Update an existing family member
   */
  async update(member: FamilyMember, options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember>> {
    return this.api.put<FamilyMember, FamilyMember>(`${this.basePath}/${member.id}`, member, options);
  }

  /**
   * Delete a family member by ID
   */
  async delete(id: string, options?: ApiRequestOptions): Promise<ApiResponse<void>> {
    return this.api.delete<void>(`${this.basePath}/${id}`, options);
  }
}

/**
 * Create the complete API client
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  const baseApi = new BaseApiClient(config);
  
  return {
    events: new EventsApiClient(baseApi),
    familyMembers: new FamilyMembersApiClient(baseApi),
  };
}

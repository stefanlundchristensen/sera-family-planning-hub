import type { Event, FamilyMember } from '@/types/store';

/**
 * API response types
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  status: number;
  message: string;
  details?: Record<string, any>;
}

/**
 * API client configuration options
 */
export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

/**
 * Request options for API calls
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  skipCache?: boolean;
}

/**
 * Interface for custom API fetch functions
 */
export interface ApiClientInterface {
  get<T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
  post<T, U = any>(url: string, data: U, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
  put<T, U = any>(url: string, data: U, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
  delete<T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
}

/**
 * Event API interface
 */
export interface EventsApi {
  getAll(options?: ApiRequestOptions): Promise<ApiResponse<Event[]>>;
  getById(id: string, options?: ApiRequestOptions): Promise<ApiResponse<Event>>;
  create(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>, options?: ApiRequestOptions): Promise<ApiResponse<Event>>;
  update(event: Event, options?: ApiRequestOptions): Promise<ApiResponse<Event>>;
  delete(id: string, options?: ApiRequestOptions): Promise<ApiResponse<void>>;
}

/**
 * Family Member API interface
 */
export interface FamilyMembersApi {
  getAll(options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember[]>>;
  getById(id: string, options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember>>;
  create(member: Omit<FamilyMember, 'id' | 'created_at' | 'updated_at'>, options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember>>;
  update(member: FamilyMember, options?: ApiRequestOptions): Promise<ApiResponse<FamilyMember>>;
  delete(id: string, options?: ApiRequestOptions): Promise<ApiResponse<void>>;
}

/**
 * Main API client interface
 */
export interface ApiClient {
  events: EventsApi;
  familyMembers: FamilyMembersApi;
}
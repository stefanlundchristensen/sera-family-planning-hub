
import { createApiClient } from './apiClient';
import type { ApiClient } from './apiTypes';

/**
 * API client configuration
 * Using Vite environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Create and configure the API client
 */
export const api: ApiClient = createApiClient({
  baseUrl: API_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
  retries: 1,
});

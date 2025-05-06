
import type { FamilyMember, Event } from "@/types/store";
import { validateEvent, validateFamilyMember } from "@/lib/validations";
import { ensureDateFields } from "./dateUtils";
import { COLORS } from "./colorUtils";

/**
 * Utility types for common patterns
 */

// Make a type with all properties optional and nullable
export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

// Make only specific fields of a type required
export type RequireFields<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

// Make a type with all specified fields omitted
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Create a type for new entities (omit ID and timestamps)
export type NewEntity<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

// Type for API entities with specific fields
export type ApiEntity = {
  id: string;
  created_at?: string;
  updated_at?: string;
};

/**
 * Type guard to check if an object is a valid Event
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid Event
 */
export function isEvent(obj: unknown): obj is Event {
  const result = validateEvent(obj);
  return result.success;
}

/**
 * Type guard to check if an object is a valid FamilyMember
 * 
 * @param obj - Object to check
 * @returns True if the object is a valid FamilyMember
 */
export function isFamilyMember(obj: unknown): obj is FamilyMember {
  const result = validateFamilyMember(obj);
  return result.success;
}

/**
 * Helper to ensure dates and other fields are properly formatted for an Event
 * 
 * @param event - Partial event object
 * @returns Event with properly formatted fields
 */
export function ensureDateFormat(event: Partial<Event>): Partial<Event> {
  // First ensure all date fields are Date objects
  const withDates = ensureDateFields(event);
  
  // Then ensure other fields have defaults
  if (!withDates.color) {
    withDates.color = COLORS.primary.main;
  }
  
  return withDates;
}

/**
 * Parse a JSON string safely with type checking
 * 
 * @param jsonString - JSON string to parse
 * @param validator - Validation function that returns success and data
 * @returns Parsed and validated data or null
 */
export function safeJsonParse<T>(
  jsonString: string, 
  validator: (data: unknown) => { success: boolean; data: T | null }
): T | null {
  try {
    const parsed = JSON.parse(jsonString);
    const result = validator(parsed);
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Failed to parse JSON", error);
    return null;
  }
}

/**
 * Type-safe version of Object.keys that preserves the key type
 * 
 * @param obj - Object to get keys from
 * @returns Array of keys with proper type
 */
export function typedKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Type-safe version of Object.entries
 * 
 * @param obj - Object to get entries from
 * @returns Array of typed key-value pairs
 */
export function typedEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

/**
 * Check if a value is not null or undefined
 * 
 * @param value - Value to check
 * @returns True if the value is defined and not null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Remove undefined and null values from an object
 * 
 * @param obj - Object to clean
 * @returns New object with only defined values
 */
export function removeNullish<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => isDefined(v))
  ) as Partial<T>;
}

/**
 * Deep-clones an object using JSON serialization
 * Note: This will lose functions, undefined values, and special objects like Dates
 * 
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function jsonClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

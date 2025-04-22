
import { FamilyMember, Event } from "@/types/store";
import { validateEvent, validateFamilyMember } from "@/lib/validations";

/**
 * Type guard to check if an object is a valid Event
 */
export function isEvent(obj: unknown): obj is Event {
  const result = validateEvent(obj);
  return result.success;
}

/**
 * Type guard to check if an object is a valid FamilyMember
 */
export function isFamilyMember(obj: unknown): obj is FamilyMember {
  const result = validateFamilyMember(obj);
  return result.success;
}

/**
 * Helper to ensure dates are properly formatted
 */
export function ensureDateFormat(event: Partial<Event>): Partial<Event> {
  if (!(event.start instanceof Date) && event.start) {
    event.start = new Date(event.start);
  }
  
  if (!(event.end instanceof Date) && event.end) {
    event.end = new Date(event.end);
  }
  
  return event;
}

/**
 * Parse a JSON string safely with type checking
 */
export function safeJsonParse<T>(jsonString: string, validator: (data: unknown) => { success: boolean, data: T | null }): T | null {
  try {
    const parsed = JSON.parse(jsonString);
    const result = validator(parsed);
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Failed to parse JSON", error);
    return null;
  }
}

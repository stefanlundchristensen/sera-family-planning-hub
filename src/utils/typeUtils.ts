
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
  const updatedEvent = { ...event };
  
  if (!(updatedEvent.start instanceof Date) && updatedEvent.start) {
    updatedEvent.start = new Date(updatedEvent.start);
  }
  
  if (!(updatedEvent.end instanceof Date) && updatedEvent.end) {
    updatedEvent.end = new Date(updatedEvent.end);
  }
  
  // Ensure color is set if not provided
  if (!updatedEvent.color) {
    updatedEvent.color = "#8B5CF6"; // Default color - vivid purple
  }
  
  return updatedEvent;
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

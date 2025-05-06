
import { z } from "zod";

/**
 * Type definition for validation results
 */
export interface ValidationResult<T> {
  /** The parsed and validated data (null if validation failed) */
  data: T | null;
  /** Whether validation was successful */
  success: boolean;
  /** Error information if validation failed */
  error: z.ZodFormattedError<unknown> | string | null;
}

/**
 * Schema for validating color values throughout the application
 * Colors must be at least 3 characters (e.g. hex colors) and maximum 20 characters
 */
export const colorSchema = z.string().min(3).max(20);

/**
 * Validation schema for family members
 * Defines the structure and constraints for a family member entity
 */
export const familyMemberSchema = z.object({
  /** Unique identifier (UUID format) */
  id: z.string().uuid().optional(),
  /** Family member's name (required, 1-100 characters) */
  name: z.string().min(1, "Name is required").max(100),
  /** Color associated with the family member */
  color: colorSchema,
  /** Optional URL to an avatar image */
  avatar: z.string().url().optional().nullable(),
  /** The role/relationship in the family */
  role: z.enum(["Parent", "Child", "Extended Family", "Other"]).optional(),
  /** Creation timestamp (ISO format) */
  created_at: z.string().optional(),
  /** Last update timestamp (ISO format) */
  updated_at: z.string().optional()
});

/**
 * Schema for creating a new family member
 * Omits the ID and timestamps which will be generated upon creation
 */
export const createFamilyMemberSchema = z.object({
  /** Family member's name (required, 1-100 characters) */
  name: z.string().min(1, "Name is required").max(100),
  /** Color associated with the family member */
  color: colorSchema,
  /** Optional URL to an avatar image */
  avatar: z.string().url().optional().nullable(),
  /** The role/relationship in the family */
  role: z.enum(["Parent", "Child", "Extended Family", "Other"]).optional()
});

/**
 * Validation schema for events 
 * Defines the structure and constraints for an event entity
 * Includes a refinement to ensure end time is after start time
 */
export const eventSchema = z.object({
  /** Unique identifier (UUID format) */
  id: z.string().uuid().optional(),
  /** Event title (required, 1-200 characters) */
  title: z.string().min(1, "Title is required").max(200),
  /** Optional event description */
  description: z.string().max(1000).optional().nullable(),
  /** Event start date and time */
  start: z.instanceof(Date),
  /** Event end date and time */
  end: z.instanceof(Date),
  /** ID of the family member this event is assigned to */
  familyMemberId: z.string(),
  /** Color associated with the event */
  color: colorSchema,
  /** Whether the event repeats */
  isRecurring: z.boolean().optional(),
  /** Pattern for recurring events (e.g. "weekly", "monthly") */
  recurringPattern: z.string().optional().nullable(),
  /** Optional location for the event */
  location: z.string().max(200).optional().nullable(),
  /** Creation timestamp (ISO format) */
  created_at: z.string().optional(),
  /** Last update timestamp (ISO format) */
  updated_at: z.string().optional()
}).refine(data => data.end > data.start, {
  /** Validation message if end time is not after start time */
  message: "End time must be after start time",
  /** The field to attach the error to */
  path: ["end"]
});

/**
 * Schema for creating a new event
 * Omits the ID and timestamps which will be generated upon creation
 */
export const createEventSchema = z.object({
  /** Event title (required, 1-200 characters) */
  title: z.string().min(1, "Title is required").max(200),
  /** Optional event description */
  description: z.string().max(1000).optional().nullable(),
  /** Event start date and time */
  start: z.instanceof(Date),
  /** Event end date and time */
  end: z.instanceof(Date),
  /** ID of the family member this event is assigned to */
  familyMemberId: z.string(),
  /** Color associated with the event */
  color: colorSchema,
  /** Whether the event repeats */
  isRecurring: z.boolean().optional(),
  /** Pattern for recurring events (e.g. "weekly", "monthly") */
  recurringPattern: z.string().optional().nullable(),
  /** Optional location for the event */
  location: z.string().max(200).optional().nullable(),
});

/**
 * Schema for calendar view mode
 * Defines the three possible view modes: day, week, or month
 */
export const viewModeSchema = z.enum(["day", "week", "month"]);

/**
 * Validates data against the family member schema
 * 
 * @param data - Data to validate against the family member schema
 * @returns Validation result containing success status, parsed data if successful, and errors if not
 */
export function validateFamilyMember(data: unknown): ValidationResult<z.infer<typeof familyMemberSchema>> {
  try {
    return { 
      data: familyMemberSchema.parse(data), 
      success: true, 
      error: null 
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        data: null, 
        success: false, 
        error: error.format() 
      };
    }
    return { 
      data: null, 
      success: false, 
      error: "Unknown validation error" 
    };
  }
}

/**
 * Validates data against the event schema
 * 
 * @param data - Data to validate against the event schema
 * @returns Validation result containing success status, parsed data if successful, and errors if not
 */
export function validateEvent(data: unknown): ValidationResult<z.infer<typeof eventSchema>> {
  try {
    return { 
      data: eventSchema.parse(data), 
      success: true, 
      error: null 
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        data: null, 
        success: false, 
        error: error.format() 
      };
    }
    return { 
      data: null, 
      success: false, 
      error: "Unknown validation error" 
    };
  }
}

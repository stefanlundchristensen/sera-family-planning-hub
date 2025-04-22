
import { z } from "zod";

// Color validation
export const colorSchema = z.string().min(3).max(20);

// FamilyMember validation schema
export const familyMemberSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required").max(100),
  color: colorSchema,
  avatar: z.string().url().optional().nullable(),
  role: z.enum(["Parent", "Child", "Extended Family", "Other"]).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

// For creating a new family member (no ID required)
export const createFamilyMemberSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  color: colorSchema,
  avatar: z.string().url().optional().nullable(),
  role: z.enum(["Parent", "Child", "Extended Family", "Other"]).optional()
});

// Event validation schema with proper date handling
export const eventSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional().nullable(),
  start: z.instanceof(Date),
  end: z.instanceof(Date),
  familyMemberId: z.string(),
  color: colorSchema,
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional().nullable(),
  location: z.string().max(200).optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
}).refine(data => data.end > data.start, {
  message: "End time must be after start time",
  path: ["end"]
});

// For creating a new event (no ID required)
export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional().nullable(),
  start: z.instanceof(Date),
  end: z.instanceof(Date),
  familyMemberId: z.string(),
  color: colorSchema,
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional().nullable(),
  location: z.string().max(200).optional().nullable(),
});

// Schema for view mode
export const viewModeSchema = z.enum(["day", "week", "month"]);

// Validation helper functions
export const validateFamilyMember = (data: unknown) => {
  try {
    return { data: familyMemberSchema.parse(data), success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, success: false, error: error.format() };
    }
    return { data: null, success: false, error: "Unknown validation error" };
  }
};

export const validateEvent = (data: unknown) => {
  try {
    return { data: eventSchema.parse(data), success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, success: false, error: error.format() };
    }
    return { data: null, success: false, error: "Unknown validation error" };
  }
};

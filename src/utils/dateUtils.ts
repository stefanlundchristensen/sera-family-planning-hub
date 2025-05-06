import { format, isValid, parse, parseISO } from 'date-fns';

/**
 * Date format used throughout the application
 */
export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

/**
 * Interface for date range
 */
export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Determines if a value is a valid Date object
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Ensures a value is converted to a Date object
 * 
 * @param value - Value to convert to a Date
 * @returns A valid Date object or null if conversion fails
 */
export function toDate(value: unknown): Date | null {
  if (!value) return null;
  
  // Already a Date
  if (value instanceof Date) {
    return isValidDate(value) ? value : null;
  }
  
  // String ISO format
  if (typeof value === 'string') {
    // Try direct ISO parsing first
    const isoDate = parseISO(value);
    if (isValidDate(isoDate)) return isoDate;
    
    // Try various date formats
    const formats = [DATE_FORMAT, DATETIME_FORMAT, 'yyyy/MM/dd', 'MM/dd/yyyy'];
    for (const formatStr of formats) {
      const parsedDate = parse(value, formatStr, new Date());
      if (isValidDate(parsedDate)) return parsedDate;
    }
  }
  
  // Number (timestamp)
  if (typeof value === 'number') {
    const date = new Date(value);
    return isValidDate(date) ? date : null;
  }
  
  return null;
}

/**
 * Formats a date according to the specified format
 * 
 * @param date - Date to format
 * @param formatStr - Optional format string (defaults to DATE_FORMAT)
 * @returns Formatted date string or empty string if date is invalid
 */
export function formatDate(date: Date | string | number | null | undefined, formatStr = DATE_FORMAT): string {
  const dateObj = toDate(date);
  if (!dateObj) return '';
  return format(dateObj, formatStr);
}

/**
 * Formats a time according to the specified format
 * 
 * @param date - Date to format the time from
 * @param formatStr - Optional format string (defaults to TIME_FORMAT)
 * @returns Formatted time string or empty string if date is invalid
 */
export function formatTime(date: Date | string | number | null | undefined, formatStr = TIME_FORMAT): string {
  return formatDate(date, formatStr);
}

/**
 * Formats a datetime according to the specified format
 * 
 * @param date - Date to format
 * @param formatStr - Optional format string (defaults to DATETIME_FORMAT)
 * @returns Formatted datetime string or empty string if date is invalid
 */
export function formatDateTime(date: Date | string | number | null | undefined, formatStr = DATETIME_FORMAT): string {
  return formatDate(date, formatStr);
}

/**
 * Ensures data has proper Date objects for date fields
 * This helps with serialization/deserialization and form handling
 * 
 * @param data - Object containing date fields
 * @returns New object with date fields converted to Date objects
 */
export function ensureDateFields<T extends Record<string, any>>(
  data: T, 
  dateFields: (keyof T)[] = ['start', 'end', 'date', 'createdAt', 'updatedAt']
): T {
  const result = { ...data };
  
  for (const field of dateFields) {
    if (field in data && data[field]) {
      const dateValue = toDate(data[field]);
      if (dateValue) {
        result[field] = dateValue as any;
      }
    }
  }
  
  return result;
}

/**
 * Checks if two date ranges overlap
 * 
 * @param range1 - First date range
 * @param range2 - Second date range
 * @returns True if the ranges overlap
 */
export function dateRangesOverlap(range1: DateRange, range2: DateRange): boolean {
  return range1.start < range2.end && range2.start < range1.end;
}

/**
 * Gets the current date at midnight (00:00:00)
 */
export function today(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

/**
 * Gets the start of the current week (Sunday)
 */
export function startOfCurrentWeek(): Date {
  const now = today();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  now.setDate(now.getDate() - day);
  return now;
}

/**
 * Gets the end of the current week (Saturday)
 */
export function endOfCurrentWeek(): Date {
  const start = startOfCurrentWeek();
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return end;
}
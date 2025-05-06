
import { 
  format, 
  parse, 
  addDays, 
  addMonths, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth,
  differenceInMinutes
} from 'date-fns';

/**
 * Format a date with the specified format string
 */
export function formatDate(date: Date, formatString = 'MMM d, yyyy'): string {
  return format(date, formatString);
}

/**
 * Parse a date string with the specified format
 */
export function parseDate(dateString: string, formatString = 'yyyy-MM-dd'): Date {
  return parse(dateString, formatString, new Date());
}

/**
 * Get the start date of the week for the given date
 */
export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 0 }); // Sunday
}

/**
 * Get the end date of the week for the given date
 */
export function getWeekEnd(date: Date): Date {
  return endOfWeek(date, { weekStartsOn: 0 }); // Sunday
}

/**
 * Get an array of dates for each day in the week of the given date
 */
export function getWeekDays(date: Date): Date[] {
  const start = getWeekStart(date);
  const end = getWeekEnd(date);
  
  return eachDayOfInterval({ start, end });
}

/**
 * Get the start date of the month for the given date
 */
export function getMonthStart(date: Date): Date {
  return startOfMonth(date);
}

/**
 * Get the end date of the month for the given date
 */
export function getMonthEnd(date: Date): Date {
  return endOfMonth(date);
}

/**
 * Get an array of dates for each day in the month of the given date
 * This includes days from adjacent months to fill the calendar grid
 */
export function getMonthDays(date: Date): Date[] {
  const monthStart = getMonthStart(date);
  const monthEnd = getMonthEnd(date);
  const calendarStart = getWeekStart(monthStart);
  const calendarEnd = getWeekEnd(monthEnd);
  
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

/**
 * Check if two dates are the same day
 */
export function isSameDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

/**
 * Check if two dates are in the same month
 */
export function isSameMonthDate(date1: Date, date2: Date): boolean {
  return isSameMonth(date1, date2);
}

/**
 * Format a date range
 */
export function formatDateRange(start: Date, end: Date): string {
  if (isSameDay(start, end)) {
    return `${format(start, 'MMM d, yyyy')} ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  } else {
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  }
}

/**
 * Calculate the duration in minutes between two dates
 */
export function getDurationMinutes(start: Date, end: Date): number {
  return differenceInMinutes(end, start);
}

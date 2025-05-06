
/**
 * Color utility functions for the SERA Family Planning Hub
 * These functions help maintain consistent color usage across the application
 */

/**
 * Core color palette based on SERA brand identity
 */
export const COLORS = {
  // Primary palette
  primary: {
    light: '#BFD7EA', // Pale Sky Blue
    main: '#6C9EBF',  // Medium Blue
    dark: '#2C3E50',  // Soft Deep Blue
  },
  // Secondary palette
  secondary: {
    light: '#E0E8D5', // Light Sage
    main: '#A3B18A',  // Muted Sage Green
    dark: '#588157',  // Deep Sage
  },
  // Neutral palette
  neutral: {
    white: '#FFFFFF',
    lightest: '#F8F9FA',
    light: '#F6F6F7',
    medium: '#DEE2E6',
    gray: '#6C757D',   // Deep Slate Gray
    dark: '#343A40',
    darkest: '#212529',
    black: '#000000',
  },
  // Accent colors
  accent: {
    beige: '#EDE0D4',  // Warm Sand Beige
    purple: '#E5DEFF', // Soft Purple
    coral: '#FFA69E',  // Soft Coral
    yellow: '#FFD670', // Muted Yellow
    teal: '#7DCFB6',   // Soft Teal
    pink: '#F78CAF',   // Soft Pink
  },
  // Semantic colors
  semantic: {
    success: '#43AA8B',
    warning: '#F9C74F',
    error: '#E63946',
    info: '#4EA8DE',
  }
};

/**
 * Define standard event category colors
 */
export const EVENT_CATEGORIES = {
  work: COLORS.accent.purple,
  school: COLORS.accent.teal,
  medical: COLORS.semantic.info,
  social: COLORS.accent.coral,
  sports: COLORS.accent.yellow,
  holiday: COLORS.secondary.main,
  other: COLORS.neutral.gray,
};

/**
 * Define color mapping for family members using SERA brand colors
 */
export const FAMILY_MEMBER_COLORS: Record<string, string> = {
  "Mom": COLORS.secondary.main,      // Muted Sage Green
  "Dad": COLORS.primary.dark,        // Soft Deep Blue
  "Sarah": COLORS.primary.light,     // Pale Sky Blue
  "Michael Jr": COLORS.neutral.gray, // Deep Slate Gray
  "Everyone": COLORS.neutral.gray,   // Deep Slate Gray
  "Grandma Linda": COLORS.accent.beige, // Warm Sand Beige
  "Grandpa Joe": COLORS.secondary.main, // Muted Sage Green variant
};

/**
 * Standard color options for new family members
 */
export const COLOR_OPTIONS = [
  { name: 'Blue', value: COLORS.primary.main },
  { name: 'Teal', value: COLORS.accent.teal },
  { name: 'Purple', value: COLORS.accent.purple },
  { name: 'Coral', value: COLORS.accent.coral },
  { name: 'Green', value: COLORS.secondary.main },
  { name: 'Yellow', value: COLORS.accent.yellow },
  { name: 'Pink', value: COLORS.accent.pink },
];

/**
 * Get the appropriate color for an event based on who it's assigned to and the event title
 * 
 * @param assignedTo - The person the event is assigned to
 * @param title - The event title
 * @returns A color hex code
 */
export function getEventColor(assignedTo: string, title: string): string {
  const lowerTitle = title.toLowerCase();
  
  // Check for category-based colors
  if (lowerTitle.includes('work') || lowerTitle.includes('office')) {
    if (assignedTo === 'Mom') {
      return '#E5DEFF'; // Custom color for Mom's work
    }
    if (assignedTo === 'Dad') {
      return '#D3E4FD'; // Custom color for Dad's work
    }
    return EVENT_CATEGORIES.work;
  }
  
  if (lowerTitle.includes('school') || lowerTitle.includes('class') || lowerTitle.includes('homework')) {
    return EVENT_CATEGORIES.school;
  }
  
  if (lowerTitle.includes('doctor') || lowerTitle.includes('medical') || lowerTitle.includes('appointment')) {
    return EVENT_CATEGORIES.medical;
  }
  
  if (lowerTitle.includes('party') || lowerTitle.includes('dinner') || lowerTitle.includes('lunch')) {
    return EVENT_CATEGORIES.social;
  }
  
  if (lowerTitle.includes('game') || lowerTitle.includes('practice') || lowerTitle.includes('sport')) {
    return EVENT_CATEGORIES.sports;
  }
  
  if (lowerTitle.includes('holiday') || lowerTitle.includes('vacation')) {
    return EVENT_CATEGORIES.holiday;
  }
  
  // Default to family member's color
  return FAMILY_MEMBER_COLORS[assignedTo] || COLORS.neutral.gray;
}

/**
 * Determine if a color is dark (to decide if text should be white or black)
 * 
 * @param hexColor - The hex color code
 * @returns True if the color is dark, false if it's light
 */
export function isDarkColor(hexColor: string): boolean {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');
  
  // Parse the RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate the brightness using the YIQ formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Darker colors have lower brightness
  return brightness < 128;
}

/**
 * Get the appropriate text color (black or white) for a given background color
 * 
 * @param backgroundColor - The background color hex code
 * @returns Black or white color code for optimal contrast
 */
export function getTextColorForBackground(backgroundColor: string): string {
  return isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
}

/**
 * Generate a color with adjusted opacity
 * 
 * @param hexColor - The base hex color
 * @param opacity - The opacity value (0-1)
 * @returns RGBA color string
 */
export function colorWithOpacity(hexColor: string, opacity: number): string {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');
  
  // Parse the RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return RGBA color
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


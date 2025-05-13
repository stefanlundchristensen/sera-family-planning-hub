/**
 * Mapping of family member names to their assigned colors.
 * This will be replaced with a proper database-backed system in the future.
 */
const memberColorMap: Record<string, string> = {
  "Mom": "#20B2AA",
  "Dad": "#4169E1",
  "Tommy": "#FF7F50",
  "Emma": "#9370DB",
  "Everyone": "#3CB371"
};

/**
 * Color mapping for event categories.
 * This will be expanded as event categorization is improved.
 */
const categoryColorMap: Record<string, string> = {
  "work": "#F0F0F0",
  "school": "#FFD700",
  "family": "#9ACD32",
  "health": "#FF6347"
};

/**
 * Default color to use when no matching color is found.
 */
const DEFAULT_COLOR = "#808080";

/**
 * Returns the color associated with a family member.
 * If no color is found, returns the default color.
 * 
 * @param memberId - The name or ID of the family member
 * @param title - Optional event title to check for category keywords
 * @returns A CSS color string
 */
export function getEventColor(memberId: string, title?: string): string {
  // If title is provided and contains a work-related keyword, use category color
  if (title && (title.toLowerCase().includes('work') || title.toLowerCase().includes('office'))) {
    return categoryColorMap["work"] || DEFAULT_COLOR;
  }
  
  // Otherwise use member color
  return memberColorMap[memberId] || DEFAULT_COLOR;
}

/**
 * Returns the background version of a color for event backgrounds.
 * For work events, returns gray background with normal text.
 * For other events, returns the color with opacity.
 * 
 * @param memberId - The name or ID of the family member
 * @param title - Optional event title to check for category keywords
 * @returns An object with backgroundColor and textColor
 */
export function getEventStyles(memberId: string, title?: string): { backgroundColor: string; textColor: string } {
  const color = getEventColor(memberId, title);
  
  // Work events have different styling
  if (title && (title.toLowerCase().includes('work') || title.toLowerCase().includes('office'))) {
    return {
      backgroundColor: color,
      textColor: '#333333'
    };
  }
  
  // Regular events get opacity in background and white text
  return {
    backgroundColor: `${color}`,
    textColor: '#FFFFFF'
  };
}

/**
 * Gets color value from a named color.
 * Used for family member color selection.
 * 
 * @param color - Named color
 * @returns The hexadecimal color value
 */
export function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    blue: '#4A89DC',
    teal: '#48CFAD',
    coral: '#FC6E51',
    purple: '#AC92EC',
    green: '#5DB85B',
    yellow: '#FFCE54',
    pink: '#EC87C0',
  };
  return colorMap[color] || colorMap.blue;
}

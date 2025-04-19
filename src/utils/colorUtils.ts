
// Define color mapping for family members using SERA brand colors
export const FAMILY_MEMBER_COLORS: Record<string, string> = {
  "Dad": "#2C3E50", // Soft Deep Blue
  "Mom": "#A3B18A", // Muted Sage Green  
  "Sarah": "#BFD7EA", // Pale Sky Blue
  "Michael Jr": "#6C757D", // Deep Slate Gray
  "Grandma Linda": "#EDE0D4", // Warm Sand Beige with darker text
  "Grandpa Joe": "#A3B18A", // Muted Sage Green variant
  "Everyone": "#6C757D" // Deep Slate Gray
};

export const getEventColor = (assignedTo: string) => {
  return FAMILY_MEMBER_COLORS[assignedTo] || "#6C757D"; // Default to Deep Slate Gray
};

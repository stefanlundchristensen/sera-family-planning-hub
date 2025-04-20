
// Define color mapping for family members using SERA brand colors
export const FAMILY_MEMBER_COLORS: Record<string, string> = {
  "Mom": "#A3B18A", // Muted Sage Green
  "Dad": "#2C3E50", // Soft Deep Blue
  "Sarah": "#BFD7EA", // Pale Sky Blue
  "Michael Jr": "#6C757D", // Deep Slate Gray
  "Everyone": "#6C757D", // Deep Slate Gray
  "Grandma Linda": "#EDE0D4", // Warm Sand Beige
  "Grandpa Joe": "#A3B18A", // Muted Sage Green variant
};

export const getEventColor = (assignedTo: string) => {
  return FAMILY_MEMBER_COLORS[assignedTo] || "#6C757D"; // Default to Deep Slate Gray
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for conditionally joining CSS class names together.
 * Combines clsx for class name manipulation with tailwind-merge to handle 
 * Tailwind CSS class conflicts correctly.
 * 
 * @param inputs - Class name values to merge together. Can be strings, objects,
 *                 arrays or nested combinations of these.
 * @returns Merged class string with Tailwind conflicts resolved
 * 
 * @example
 * // Basic usage 
 * cn("p-4", "bg-blue-500") // "p-4 bg-blue-500"
 * 
 * @example
 * // With conditional classes
 * cn("p-4", isActive && "bg-blue-500") // "p-4 bg-blue-500" or "p-4"
 * 
 * @example 
 * // With object syntax
 * cn("p-4", { "bg-blue-500": isBlue, "bg-red-500": isRed })
 * 
 * @example
 * // Resolving Tailwind conflicts
 * cn("p-2", "p-4") // "p-4" (p-4 wins)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}


/**
 * Type-safe way to extract values from an object
 */
export function getValues<T extends object>(obj: T): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>;
}

/**
 * Type-safe way to extract keys from an object
 */
export function getKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * Type-safe way to check if an object has a specific key
 */
export function hasKey<T extends object>(obj: T, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Type-safe way to check if a value is one of a set of values
 */
export function isOneOf<T>(value: T, values: T[]): boolean {
  return values.includes(value);
}

/**
 * Type-safe way to get a property by string path
 */
export function getPropertyByPath<T extends object, K extends keyof T>(
  obj: T, 
  path: K | string
): unknown {
  if (typeof path === 'string' && path.includes('.')) {
    return path
      .split('.')
      .reduce((acc: any, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  }
  
  return obj[path as keyof T];
}

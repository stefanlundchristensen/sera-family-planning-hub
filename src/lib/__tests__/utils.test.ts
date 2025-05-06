
import { expect, describe, it } from 'vitest';
import { cn } from '../utils';

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
      expect(cn('flex', { 'hidden': false, 'block': true })).toBe('flex block');
      expect(cn('text-xl', undefined, null, 'text-center')).toBe('text-xl text-center');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      expect(cn(
        'base-class', 
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )).toBe('base-class active-class');
    });

    it('should handle array inputs', () => {
      expect(cn(['flex', 'items-center'], ['p-4', 'mx-auto'])).toBe(
        'flex items-center p-4 mx-auto'
      );
    });
    
    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
      expect(cn(null, undefined, false, '')).toBe('');
    });
  });
});

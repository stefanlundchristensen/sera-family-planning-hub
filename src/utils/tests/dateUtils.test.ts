import { formatTimeHour, formatDayAbbrev, formatDayNumber, formatDateRange } from '../dateUtils';
import { describe, it, expect } from 'vitest';

describe('Date utility functions', () => {
  const testDate = new Date(2023, 5, 15, 13, 30); // June 15, 2023, 13:30

  describe('formatTimeHour', () => {
    it('should format time in 24-hour format', () => {
      expect(formatTimeHour(testDate)).toBe('13:30');

      const morningDate = new Date(2023, 5, 15, 9, 5);
      expect(formatTimeHour(morningDate)).toBe('09:05');
    });
  });

  describe('formatDayAbbrev', () => {
    it('should format day name in abbreviated format', () => {
      expect(formatDayAbbrev(testDate)).toBe('Thu');

      const sundayDate = new Date(2023, 5, 18); // June 18, 2023 (Sunday)
      expect(formatDayAbbrev(sundayDate)).toBe('Sun');
    });
  });

  describe('formatDayNumber', () => {
    it('should format day number', () => {
      expect(formatDayNumber(testDate)).toBe('15');

      const firstDayDate = new Date(2023, 5, 1);
      expect(formatDayNumber(firstDayDate)).toBe('1');
    });
  });

  describe('formatDateRange', () => {
    it('should format date range for same day with 24-hour time format', () => {
      const start = new Date(2023, 5, 15, 9, 0);
      const end = new Date(2023, 5, 15, 11, 30);

      expect(formatDateRange(start, end)).toBe('Jun 15, 2023 09:00 - 11:30');
    });

    it('should format date range for different days', () => {
      const start = new Date(2023, 5, 15, 9, 0);
      const end = new Date(2023, 5, 16, 11, 30);

      expect(formatDateRange(start, end)).toBe('Jun 15 - Jun 16, 2023');
    });
  });
});

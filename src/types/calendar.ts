
import type { Event } from './events';

export interface CalendarViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export type CalendarView = 'day' | 'week' | 'month';

export interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNewEvent: () => void;
  view: CalendarView;
  onChangeView: (view: CalendarView) => void;
}

export interface EventFormData {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  assignedTo: string;
  recurring?: boolean;
  description?: string;
  location?: string;
}

# Calendar Component Analysis (SCH-10)

## Component Structure Documentation

The SERA Family Planning Hub calendar functionality is built using a hierarchical component structure with the following key components:

### 1. Calendar Component (`Calendar.tsx`)

The Calendar component serves as the main orchestrator for the calendar functionality. It:

- Manages the current date and view state (day, week, month)
- Utilizes the `useCalendarEvents` hook for event management
- Renders the CalendarHeader component for navigation and view switching
- Conditionally renders the appropriate view component based on the selected view
- Handles the event creation/editing dialog with the EventForm component

```tsx
export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('week');

  const {
    events,
    isNewEventOpen,
    selectedEvent,
    openNewEventForm,
    openEventEditForm,
    closeEventForm,
    handleSaveEvent,
  } = useCalendarEvents();

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onNewEvent={openNewEventForm}
        view={view}
        onChangeView={setView}
      />

      {view === 'day' && (
        <DayView currentDate={currentDate} events={events} onEventClick={openEventEditForm} />
      )}

      {/* WeekView and MonthView rendered similarly */}

      <Dialog open={isNewEventOpen} onOpenChange={closeEventForm}>
        {/* EventForm rendered here */}
      </Dialog>
    </div>
  );
}
```

### 2. CalendarHeader Component (`CalendarHeader.tsx`)

The CalendarHeader component handles:

- Date navigation (previous/next period, today)
- View switching between day, week, and month views
- Displaying the current date/period in the appropriate format
- Providing a button to create new events

```tsx
export function CalendarHeader({
  currentDate,
  onDateChange,
  onNewEvent,
  view,
  onChangeView,
}: CalendarHeaderProps) {
  // Navigation functions
  const previousPeriod = () => {
    /* ... */
  };
  const nextPeriod = () => {
    /* ... */
  };
  const goToToday = () => {
    /* ... */
  };

  return (
    <header className="flex items-center justify-between mb-6">
      {/* Navigation buttons */}
      {/* Date display */}
      {/* View switching buttons */}
      {/* New event button */}
    </header>
  );
}
```

### 3. View Components

#### DayView Component (`DayView.tsx`)

The DayView component:

- Displays events for a single day in an hourly grid
- Renders events with appropriate positioning based on their time
- Handles event styling based on assignee and event type
- Provides event click handling for editing

```tsx
export function DayView({ currentDate, events, onEventClick }: CalendarViewProps) {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const getEventsForHour = (hour: number) => {
    /* ... */
  };
  const formatTimeLabel = (hour: number) => {
    /* ... */
  };
  const getEventHeight = (event: { start: Date; end: Date }): number => {
    /* ... */
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Day header */}
      <div className="flex-1 overflow-y-auto">{/* Hour grid with events */}</div>
    </div>
  );
}
```

#### WeekView Component (`WeekView.tsx`)

The WeekView component:

- Displays events for a week in a grid with days as columns and hours as rows
- Handles complex event positioning including overlapping events
- Calculates event dimensions based on duration and overlaps
- Provides event click handling for editing

```tsx
export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  // Create array of dates for the week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  // Hours for the day
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  // Event positioning functions
  const getEventStyle = (event: Event, overlappingEvents: Event[]) => {
    /* ... */
  };
  const findOverlappingEvents = (event: Event, dayEvents: Event[]) => {
    /* ... */
  };
  const getEventsForDay = (day: Date) => {
    /* ... */
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      {/* Week header with day names */}
      <div className="flex-1 overflow-y-auto">{/* Hour grid with events for each day */}</div>
    </div>
  );
}
```

#### MonthView Component (`MonthView.tsx`)

The MonthView component:

- Displays events for a month in a traditional calendar grid
- Shows events as colored blocks with minimal details
- Highlights the current day
- Provides event click handling for editing

```tsx
export function MonthView({ currentDate, events, onEventClick }: CalendarViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    /* ... */
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Day of week headers */}
      <div className="flex-1 grid grid-cols-7 gap-px bg-muted p-2">
        {/* Calendar days with events */}
      </div>
    </div>
  );
}
```

### 4. Supporting Hooks and Utilities

#### useCalendarEvents Hook (`useCalendarEvents.ts`)

This hook manages the state and operations for calendar events:

- Provides events data
- Handles event form state (open/close, selected event)
- Manages event CRUD operations through the useEvents hook
- Provides toast notifications for user feedback

```tsx
export function useCalendarEvents(): UseCalendarEventsReturn {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Form management functions
  const openNewEventForm = () => {
    /* ... */
  };
  const openEventEditForm = (event: Event) => {
    /* ... */
  };
  const closeEventForm = () => {
    /* ... */
  };

  // Event operations
  const handleSaveEvent = (eventData: Omit<Event, 'id'> | Event) => {
    /* ... */
  };
  const handleDeleteEvent = (eventId: string) => {
    /* ... */
  };

  return {
    events,
    isNewEventOpen,
    selectedEvent,
    openNewEventForm,
    openEventEditForm,
    closeEventForm,
    handleSaveEvent,
    handleDeleteEvent,
  };
}
```

#### useEvents Hook (`useEvents.ts`)

This hook provides the core event data management:

- Stores the events data (currently using sample data)
- Provides CRUD operations for events
- Re-exports the getEventColor utility

```tsx
export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>(createWeeklyEvents());

  const addEvent = (event: Omit<Event, 'id'>): Event => {
    /* ... */
  };
  const updateEvent = (updatedEvent: Event): void => {
    /* ... */
  };
  const deleteEvent = (eventId: string): void => {
    /* ... */
  };
  const getEventById = (eventId: string): Event | undefined => {
    /* ... */
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventColor,
  };
}
```

#### Color Utilities (`colorUtils.ts`)

These utilities handle event styling:

- `getEventColor`: Determines the base color for an event based on assignee and title
- `getEventStyles`: Provides background and text colors for events
- `getColorValue`: Maps named colors to hex values

## Component Hierarchy Diagram

```
Calendar (Calendar.tsx)
│
├── CalendarHeader (CalendarHeader.tsx)
│   │
│   ├── Navigation Controls
│   │   ├── Today Button
│   │   ├── Previous/Next Buttons
│   │   └── Date Display
│   │
│   ├── View Switching Controls
│   │   ├── Day Button
│   │   ├── Week Button
│   │   └── Month Button
│   │
│   └── New Event Button
│
├── View Components (conditionally rendered)
│   │
│   ├── DayView (DayView.tsx)
│   │   ├── Hour Grid
│   │   └── Event Blocks
│   │
│   ├── WeekView (WeekView.tsx)
│   │   ├── Day Headers
│   │   ├── Hour Grid
│   │   └── Event Blocks
│   │
│   └── MonthView (MonthView.tsx)
│       ├── Day of Week Headers
│       ├── Day Cells
│       └── Event Blocks
│
└── Event Dialog
    └── EventForm (from ../events/EventForm.tsx)

Supporting Hooks:
├── useCalendarEvents (useCalendarEvents.ts)
│   └── useEvents (useEvents.ts)
│       └── createWeeklyEvents (eventCreation.ts)
│
└── Color Utilities (colorUtils.ts)
    ├── getEventColor
    ├── getEventStyles
    └── getColorValue
```

## State Management

The calendar components use a combination of local state and custom hooks for state management:

1. **Local Component State**:

   - `Calendar.tsx` manages:
     - `currentDate`: The currently selected date
     - `view`: The current view mode (day, week, month)

2. **Custom Hooks**:

   - `useCalendarEvents`: Manages event-related state and operations

     - `isNewEventOpen`: Controls the event dialog visibility
     - `selectedEvent`: Tracks the currently selected event for editing
     - Provides functions for opening/closing forms and handling events

   - `useEvents`: Manages the core event data
     - `events`: The array of calendar events
     - Provides CRUD operations for events

3. **State Flow**:
   - User interactions in the Calendar or CalendarHeader trigger state changes
   - View components receive the current date and events as props
   - Event clicks in view components trigger the edit form to open
   - Event form submissions update the events state

## Identified Issues

### 1. Inconsistent Imports for Color Utilities

Different view components use different imports from the color utilities:

**WeekView.tsx**:

```tsx
import { getEventColor } from "@/utils/colorUtils";
// ...
style={{
  backgroundColor: getEventColor(event.assignedTo, event.title),
}}
```

**DayView.tsx** and **MonthView.tsx**:

```tsx
import { getEventStyles } from "@/utils/colorUtils";
// ...
const styles = getEventStyles(event.assignedTo, event.title);
style={{
  backgroundColor: styles.backgroundColor,
  color: styles.textColor
}}
```

### 2. Code Duplication Across View Components

Several functions are duplicated across view components with slight variations:

**Event Filtering**:

```tsx
// In DayView.tsx
const getEventsForHour = (hour: number) => {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, currentDate) && getHours(eventDate) === hour;
  });
};

// In WeekView.tsx
const getEventsForDay = (day: Date) => {
  return events
    .filter(event => isSameDay(new Date(event.start), day))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
};

// In MonthView.tsx
const getEventsForDay = (day: Date) => {
  return events.filter(event => isSameDay(new Date(event.start), day));
};
```

**Time Formatting**:

```tsx
// In DayView.tsx
const formatTimeLabel = (hour: number) => {
  return format(new Date().setHours(hour, 0, 0, 0), 'h a');
};

// In WeekView.tsx
{
  format(new Date().setHours(hour, 0, 0, 0), 'HH:mm');
}
```

### 3. Type Safety Issues

**WeekView Props Interface**:
WeekView defines its own props interface instead of using the shared CalendarViewProps:

```tsx
// In WeekView.tsx
interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}
```

**Type Assertions**:

```tsx
// In WeekView.tsx
position: 'absolute' as const,
```

**Inconsistent Type Usage**:

```tsx
// In DayView.tsx
const getEventHeight = (event: { start: Date; end: Date }): number => {
  // ...
};
```

### 4. Complex Event Positioning Logic

The WeekView component contains complex positioning logic that's mixed with rendering:

```tsx
const getEventStyle = (event: Event, overlappingEvents: Event[]) => {
  const startHour = getHours(event.start);
  const startMinute = getMinutes(event.start);
  const endHour = getHours(event.end);
  const endMinute = getMinutes(event.end);

  const totalHours = endHour - startHour + (endMinute - startMinute) / 60;
  const height = totalHours * 80; // 80px per hour
  const top = startMinute * (80 / 60); // Convert minutes to pixels

  // Calculate width based on number of overlapping events
  const totalOverlapping = overlappingEvents.length;
  const eventIndex = overlappingEvents.findIndex(e => e.id === event.id);
  const width = `${100 / totalOverlapping}%`;
  const left = `${(eventIndex * 100) / totalOverlapping}%`;

  return {
    height: `${height}px`,
    top: `${top}px`,
    position: 'absolute' as const,
    width,
    left,
    zIndex: 10,
  };
};
```

### 5. Inline Styles

All view components use inline styles for event rendering, mixing styling with component logic:

```tsx
// In DayView.tsx
<div
  key={event.id}
  onClick={() => onEventClick(event)}
  className={cn(
    'absolute top-0 left-0 right-2 m-1 p-2 rounded text-sm cursor-pointer',
    event.recurring ? 'border-l-4' : '',
    'bg-opacity-90 hover:bg-opacity-100 transition-opacity'
  )}
  style={{
    height: `${getEventHeight(event)}px`,
    backgroundColor: styles.backgroundColor,
    color: styles.textColor,
  }}
>
  {/* Event content */}
</div>
```

### 6. Separation of Concerns

The view components mix several concerns:

- Event filtering and data manipulation
- Time and date formatting
- Event positioning calculations
- Event rendering
- Event styling

## Suggested Improvements

### 1. Standardize Color Utility Usage

Create a consistent approach to using color utilities across all components:

```tsx
// Standardize on getEventStyles in all view components
import { getEventStyles } from "@/utils/colorUtils";

// In event rendering
const styles = getEventStyles(event.assignedTo, event.title);
style={{
  backgroundColor: styles.backgroundColor,
  color: styles.textColor
}}
```

### 2. Extract Shared Logic to Utilities

Create shared utilities for common operations:

```tsx
// Create a new file: src/utils/eventUtils.ts
import { isSameDay, getHours, getMinutes } from 'date-fns';
import type { Event } from '@/types/events';

export const getEventsForDay = (events: Event[], day: Date) => {
  return events
    .filter(event => isSameDay(new Date(event.start), day))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
};

export const getEventsForHour = (events: Event[], day: Date, hour: number) => {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, day) && getHours(eventDate) === hour;
  });
};

export const formatTimeLabel = (hour: number, format: string) => {
  return format(new Date().setHours(hour, 0, 0, 0), format);
};
```

### 3. Improve Type Safety

Use consistent types and interfaces:

```tsx
// Update WeekView.tsx to use the shared interface
import type { CalendarViewProps } from '@/types/calendar';

export function WeekView({ currentDate, events, onEventClick }: CalendarViewProps) {
  // ...
}

// Create a proper type for event positioning
interface EventPosition {
  height: string;
  top: string;
  position: 'absolute';
  width: string;
  left: string;
  zIndex: number;
}

const getEventStyle = (event: Event, overlappingEvents: Event[]): EventPosition => {
  // ...
};
```

### 4. Extract Event Positioning Logic

Move complex positioning logic to a dedicated utility:

```tsx
// In src/utils/eventPositioning.ts
import { getHours, getMinutes, areIntervalsOverlapping } from 'date-fns';
import type { Event } from '@/types/events';

export interface EventPosition {
  height: string;
  top: string;
  position: 'absolute';
  width: string;
  left: string;
  zIndex: number;
}

export const calculateEventPosition = (event: Event, allEvents: Event[]): EventPosition => {
  // Positioning calculation logic
};

export const findOverlappingEvents = (event: Event, events: Event[]): Event[] => {
  // Overlapping detection logic
};
```

### 5. Create Styled Components for Events

Extract inline styles to styled components:

```tsx
// In src/components/calendar/EventBlock.tsx
import { cn } from '@/lib/utils';
import { getEventStyles } from '@/utils/colorUtils';
import type { Event } from '@/types/events';

interface EventBlockProps {
  event: Event;
  onClick: (event: Event) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function EventBlock({ event, onClick, style, className }: EventBlockProps) {
  const styles = getEventStyles(event.assignedTo, event.title);

  return (
    <div
      onClick={() => onClick(event)}
      className={cn(
        'rounded text-sm cursor-pointer',
        event.recurring ? 'border-l-4' : '',
        'bg-opacity-90 hover:bg-opacity-100 transition-opacity',
        className
      )}
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.textColor,
        ...style,
      }}
    >
      {/* Event content */}
    </div>
  );
}
```

### 6. Better Separation of Concerns

Refactor components to separate concerns:

- Create a `CalendarGrid` component for the time/day grid structure
- Extract event rendering to dedicated components
- Move data filtering and manipulation to custom hooks
- Separate positioning logic from rendering logic

## Conclusion

The current calendar component structure provides a solid foundation but has several areas for improvement. By addressing the identified issues, the codebase can become more maintainable, consistent, and easier to extend with new features. The suggested improvements focus on reducing duplication, improving type safety, and better separating concerns to create a more robust calendar system.

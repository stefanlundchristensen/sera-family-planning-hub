import {
  format,
  addDays,
  startOfWeek,
  isToday,
  isSameDay,
  getHours,
  getMinutes,
  areIntervalsOverlapping,
} from 'date-fns';
import { cn } from '@/lib/utils';
import type { Event } from '@/types/events';
import { getEventColor } from '@/utils/colorUtils';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  // Create array of dates for the week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  // Hours for the day
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  // Calculate event position and dimensions
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

  // Check if events overlap
  const findOverlappingEvents = (event: Event, dayEvents: Event[]) => {
    return dayEvents.filter(otherEvent =>
      areIntervalsOverlapping(
        { start: event.start, end: event.end },
        { start: otherEvent.start, end: otherEvent.end }
      )
    );
  };

  // Group events by day for better overlap handling
  const getEventsForDay = (day: Date) => {
    return events
      .filter(event => isSameDay(new Date(event.start), day))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="grid grid-cols-8 border-b">
        {/* Time column header */}
        <div className="border-r p-2 text-center"></div>

        {/* Day headers */}
        {weekDays.map((day, i) => (
          <div
            key={i}
            className={cn('p-2 text-center border-r', isToday(day) ? 'bg-accent/10' : '')}
          >
            <div className="font-medium">{format(day, 'EEE')}</div>
            <div
              className={cn(
                'inline-flex items-center justify-center w-8 h-8 rounded-full text-sm mt-1',
                isToday(day) ? 'bg-primary text-white' : ''
              )}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 divide-y">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 col-span-8 h-20">
              {/* Time label */}
              <div className="border-r p-2 text-xs text-muted-foreground">
                {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(day);

                return (
                  <div
                    key={dayIndex}
                    className={cn('border-r h-full relative', isToday(day) ? 'bg-accent/10' : '')}
                  >
                    {dayEvents.map(event => {
                      const startHour = getHours(event.start);
                      if (startHour === hour) {
                        const overlappingEvents = findOverlappingEvents(event, dayEvents);
                        return (
                          <div
                            key={event.id}
                            onClick={() => onEventClick(event)}
                            className={cn(
                              'rounded-lg px-1 text-xs cursor-pointer shadow-sm hover:shadow-md transition-all',
                              event.title.toLowerCase().includes('work') ||
                                event.title.toLowerCase().includes('office')
                                ? 'border-l-4 border-secondary'
                                : ''
                            )}
                            style={{
                              ...getEventStyle(event, overlappingEvents),
                              backgroundColor: getEventColor(event.assignedTo, event.title),
                            }}
                          >
                            <div className="p-1 overflow-hidden">
                              <div className="font-semibold truncate">{event.title}</div>
                              <div className="truncate">
                                {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                              </div>
                              {event.assignedTo && (
                                <div className="text-xs truncate">{event.assignedTo}</div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

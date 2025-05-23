import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { getEventStyles } from '@/utils/colorUtils';
import type { CalendarViewProps } from '@/types/calendar';
import { formatTimeHour, formatDayNumber } from '@/utils/dateUtils';

export function MonthView({ currentDate, events, onEventClick }: CalendarViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day));
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-7 gap-px bg-muted p-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-px bg-muted p-2">
        {days.map(day => (
          <div
            key={day.toString()}
            className={cn(
              'min-h-[120px] bg-background p-2',
              !isSameMonth(day, currentDate) && 'text-muted-foreground bg-muted/50'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full text-sm mb-1',
                isToday(day) && 'bg-primary text-primary-foreground'
              )}
            >
              {formatDayNumber(day)}
            </div>
            <div className="space-y-1">
              {getEventsForDay(day).map(event => {
                const styles = getEventStyles(event.assignedTo, event.title);

                return (
                  <button
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="w-full text-left text-xs p-1 rounded overflow-hidden whitespace-nowrap overflow-ellipsis"
                    style={{
                      backgroundColor: styles.backgroundColor,
                      color: styles.textColor,
                    }}
                  >
                    <span>
                      {formatTimeHour(event.start)} {event.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

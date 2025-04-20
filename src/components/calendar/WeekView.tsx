
import { format, addDays, startOfWeek, isToday, isSameDay, getHours, getMinutes, areIntervalsOverlapping, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";
import { getEventColor } from "@/utils/colorUtils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    const startTime = new Date(event.start);
    
    // Calculate top position based on hours and minutes
    const startHour = getHours(startTime);
    const startMinute = getMinutes(startTime);
    
    // Calculate top position in pixels (80px per hour)
    const top = (startHour * 80) + ((startMinute / 60) * 80);
    
    // Calculate height based on event duration
    const durationMinutes = differenceInMinutes(
      new Date(event.end), 
      new Date(event.start)
    );
    const height = (durationMinutes / 60) * 80; // 80px per hour
    
    // Calculate horizontal position for staggered layout
    const eventIndex = overlappingEvents.findIndex(e => e.id === event.id);
    const offset = eventIndex * 10; // 10px offset for each overlapping event
    
    return {
      height: `${height}px`,
      top: `${top}px`,
      position: 'absolute' as const,
      width: 'calc(100% - 24px)', // Leave space for staggering
      left: `${offset}px`,
      zIndex: eventIndex + 1,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    };
  };

  // Find overlapping events within the same time block
  const findOverlappingEvents = (event: Event, dayEvents: Event[]) => {
    return dayEvents.filter(otherEvent => 
      areIntervalsOverlapping(
        { start: new Date(event.start), end: new Date(event.end) },
        { start: new Date(otherEvent.start), end: new Date(otherEvent.end) }
      )
    ).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  };

  // Group events by day - ensuring we only get events for the specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.start);
      return isSameDay(eventStart, day);
    }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
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
            className={cn(
              "p-2 text-center border-r",
              isToday(day) ? "bg-blue-50" : ""
            )}
          >
            <div className="font-medium">{format(day, 'EEE')}</div>
            <div className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm mt-1",
              isToday(day) ? "bg-primary text-white" : ""
            )}>
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
              <div className="border-r p-2 text-xs text-gray-500">
                {format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')}
              </div>
              
              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className={cn(
                  "border-r h-full relative",
                  isToday(day) ? "bg-blue-50" : ""
                )}>
                  {/* We'll render events in the day column, not in each hour cell */}
                  {hour === 0 && getEventsForDay(day).map((event) => {
                    const overlappingEvents = findOverlappingEvents(event, getEventsForDay(day));
                    return (
                      <HoverCard key={event.id}>
                        <HoverCardTrigger asChild>
                          <div
                            onClick={() => onEventClick(event)}
                            className={cn(
                              "rounded-lg px-2 cursor-pointer transition-all",
                              "border border-gray-200 hover:shadow-md"
                            )}
                            style={{
                              ...getEventStyle(event, overlappingEvents),
                              backgroundColor: getEventColor(event.assignedTo, event.title),
                            }}
                          >
                            <div className="p-1 overflow-hidden">
                              <div className="font-semibold truncate text-sm">
                                {event.title}
                              </div>
                              <div className="text-xs opacity-90">
                                {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                              </div>
                              {event.assignedTo && (
                                <div className="text-xs truncate mt-0.5 opacity-75">
                                  {event.assignedTo}
                                </div>
                              )}
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64 p-3">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{event.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(event.start), 'PPp')} - {format(new Date(event.end), 'p')}
                            </p>
                            {event.location && (
                              <p className="text-xs">📍 {event.location}</p>
                            )}
                            {event.description && (
                              <p className="text-xs mt-2">{event.description}</p>
                            )}
                            <p className="text-xs font-medium mt-1">
                              {event.assignedTo}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

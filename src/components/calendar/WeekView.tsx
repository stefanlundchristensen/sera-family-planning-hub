import { useState } from "react";
import { format, addDays, startOfWeek, isToday, isSameDay, getHours, getMinutes, areIntervalsOverlapping, differenceInMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";
import { getEventColor } from "@/utils/colorUtils";

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
    
    // Calculate top position based on start time
    const minutesSinceDayStart = startHour * 60 + startMinute;
    const top = (minutesSinceDayStart * 80) / 60; // 80px per hour
    
    // Calculate height based on event duration
    const durationMinutes = differenceInMinutes(event.end, event.start);
    const height = (durationMinutes * 80) / 60; // Convert minutes to pixels
    
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
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };
  };

  // Find overlapping events within the same time block
  const findOverlappingEvents = (event: Event, dayEvents: Event[]) => {
    return dayEvents.filter(otherEvent => 
      areIntervalsOverlapping(
        { start: event.start, end: event.end },
        { start: otherEvent.start, end: otherEvent.end }
      )
    ).sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  // Group events by day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day))
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
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(day);

                return (
                  <div key={dayIndex} className={cn(
                    "border-r h-full relative",
                    isToday(day) ? "bg-blue-50" : ""
                  )}>
                    {dayEvents.map((event) => {
                      const overlappingEvents = findOverlappingEvents(event, dayEvents);
                      const startHourOfEvent = getHours(event.start);
                      
                      // Only render the event once at its start hour
                      if (startHourOfEvent === hour) {
                        return (
                          <div
                            key={event.id}
                            onClick={() => onEventClick(event)}
                            className={cn(
                              "rounded-lg px-2 cursor-pointer transition-transform hover:translate-x-1",
                              "border border-gray-200"
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
                                {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                              </div>
                              {event.assignedTo && (
                                <div className="text-xs truncate mt-0.5 opacity-75">
                                  {event.assignedTo}
                                </div>
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

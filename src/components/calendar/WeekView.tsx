import { useState } from "react";
import { format, addDays, startOfWeek, isToday, isSameDay, getHours, getMinutes, isBefore, isAfter, areIntervalsOverlapping } from "date-fns";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";
import { getEventColor } from "@/utils/colorUtils";

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const formatTimeLabel = (hour: number) => {
    return format(new Date().setHours(hour, 0, 0, 0), 'HH:mm');
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day));
  };

  // Calculate event position and width
  const calculateEventStyle = (event: Event, dayEvents: Event[]) => {
    const startHour = getHours(event.start) + getMinutes(event.start) / 60;
    const endHour = getHours(event.end) + getMinutes(event.end) / 60;
    const duration = endHour - startHour;
    
    // Find overlapping events
    const overlappingEvents = dayEvents.filter(otherEvent => 
      otherEvent !== event &&
      areIntervalsOverlapping(
        { start: otherEvent.start, end: otherEvent.end },
        { start: event.start, end: event.end }
      )
    );

    // Calculate width based on overlaps
    const width = overlappingEvents.length > 0 ? (100 / (overlappingEvents.length + 1)) : 100;
    
    // Calculate left offset based on event order in overlapping group
    const index = overlappingEvents.filter(e => 
      isBefore(new Date(e.start), new Date(event.start))
    ).length;
    
    const left = overlappingEvents.length > 0 ? (width * index) : 0;

    return {
      top: `${(startHour) * (80 / 24)}px`,
      height: `${duration * (80 / 24)}px`,
      width: `${width}%`,
      left: `${left}%`,
      position: 'absolute' as const,
      backgroundColor: getEventColor(event.assignedTo, event.title),
    };
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
              <div className="border-r p-2 text-xs text-gray-500">
                {formatTimeLabel(hour)}
              </div>
              
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(day);
                return (
                  <div key={dayIndex} className={cn(
                    "border-r h-full relative",
                    isToday(day) ? "bg-blue-50" : ""
                  )}>
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={cn(
                          "p-1 rounded text-xs cursor-pointer overflow-hidden",
                          event.recurring ? "border-l-4" : "",
                          event.title.toLowerCase().includes('work') || event.title.toLowerCase().includes('office')
                            ? "text-gray-600 border border-gray-200"
                            : "text-white"
                        )}
                        style={calculateEventStyle(event, dayEvents)}
                      >
                        <div className={cn(
                          "font-semibold",
                          event.title.toLowerCase().includes('work') || event.title.toLowerCase().includes('office')
                            ? "text-gray-600"
                            : "text-white"
                        )}>
                          {event.title}
                        </div>
                        <div>
                          {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                        </div>
                        {event.assignedTo && (
                          <div className="text-xs opacity-90">
                            {event.assignedTo}
                          </div>
                        )}
                      </div>
                    ))}
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

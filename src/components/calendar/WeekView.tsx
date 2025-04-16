
import { useState } from "react";
import { format, addDays, startOfWeek, isToday, isSameDay, getHours, getMinutes } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for events
interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  assignedTo: string;
  color: string;
  recurring?: boolean;
}

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

  // Format time
  const formatTimeLabel = (hour: number) => {
    return format(new Date().setHours(hour, 0, 0, 0), 'h a');
  };

  // Get events for a specific day and hour
  const getEventsForTimeSlot = (day: Date, hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, day) && getHours(eventDate) === hour;
    });
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
      
      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 divide-y">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 col-span-8 h-20">
              {/* Time label */}
              <div className="border-r p-2 text-xs text-gray-500">
                {formatTimeLabel(hour)}
              </div>
              
              {/* Day columns */}
              {weekDays.map((day, dayIndex) => {
                const eventsForSlot = getEventsForTimeSlot(day, hour);
                return (
                  <div key={dayIndex} className={cn(
                    "border-r h-full relative",
                    isToday(day) ? "bg-blue-50" : ""
                  )}>
                    {eventsForSlot.map((event, eventIndex) => (
                      <div
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={cn(
                          "absolute top-0 left-0 right-0 m-1 p-1 rounded text-xs truncate cursor-pointer",
                          event.recurring ? "border-l-4" : "",
                          event.color === "blue" && "bg-family-blue-light text-white border-family-blue",
                          event.color === "teal" && "bg-family-teal text-white border-family-teal",
                          event.color === "coral" && "bg-family-coral text-white border-family-coral",
                          event.color === "purple" && "bg-family-purple text-white border-family-purple",
                          event.color === "green" && "bg-family-green text-white border-family-green",
                        )}
                        style={{height: `${getEventHeight(event)}px`}}
                      >
                        <div className="font-semibold">{event.title}</div>
                        <div>
                          {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
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

// Helper function to determine event height based on duration
function getEventHeight(event: Event): number {
  const startHour = getHours(event.start);
  const startMinute = getMinutes(event.start);
  const endHour = getHours(event.end);
  const endMinute = getMinutes(event.end);
  
  // Calculate total minutes
  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  
  // Convert to height (assuming 80px per hour)
  return Math.max(totalMinutes / 60 * 80, 20); // Minimum height of 20px
}

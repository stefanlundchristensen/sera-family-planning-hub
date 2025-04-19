import { useState } from "react";
import { format, isSameDay, getHours, getMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export function DayView({ currentDate, events, onEventClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }).map((_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, currentDate) && getHours(eventDate) === hour;
    });
  };

  const formatTimeLabel = (hour: number) => {
    return format(new Date().setHours(hour, 0, 0, 0), 'h a');
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <div className="grid grid-cols-2 border-b">
        <div className="border-r p-2 text-center"></div>
        <div className="p-2 text-center">
          <div className="font-medium">{format(currentDate, 'EEEE')}</div>
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm mt-1 bg-primary text-white">
            {format(currentDate, 'd')}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 divide-y">
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-2 col-span-2 h-20">
              <div className="border-r p-2 text-xs text-gray-500">
                {formatTimeLabel(hour)}
              </div>
              <div className="relative">
                {getEventsForHour(hour).map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className={cn(
                      "absolute top-0 left-0 right-2 m-1 p-2 rounded text-sm cursor-pointer",
                      event.recurring ? "border-l-4" : "",
                      "bg-opacity-90 hover:bg-opacity-100 transition-opacity"
                    )}
                    style={{
                      height: `${getEventHeight(event)}px`,
                      backgroundColor: getFamilyMemberColor(event.assignedTo)
                    }}
                  >
                    <div className="font-semibold text-white">{event.title}</div>
                    <div className="text-white text-xs">
                      {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                    </div>
                    {event.location && (
                      <div className="text-white text-xs mt-1">
                        📍 {event.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
  
  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  return Math.max(totalMinutes / 60 * 80, 20);
}

// Helper function to get color based on family member
function getFamilyMemberColor(member: string): string {
  const colors: { [key: string]: string } = {
    "Mom": "#20B2AA",
    "Dad": "#4169E1",
    "Tommy": "#FF7F50",
    "Emma": "#9370DB",
    "Everyone": "#3CB371"
  };
  return colors[member] || "#808080";
}

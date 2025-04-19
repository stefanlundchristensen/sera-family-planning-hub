
import { useState } from "react";
import { format, isSameDay, getHours, getMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/events";
import { getEventColor } from "@/utils/colorUtils";

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
    return format(new Date().setHours(hour, 0, 0, 0), 'HH:mm');
  };

  const getEventPosition = (event: Event) => {
    const startMinutes = getMinutes(event.start);
    const endMinutes = getMinutes(event.end);
    const startPercentage = (startMinutes / 60) * 100;
    const height = ((getHours(event.end) - getHours(event.start)) * 60 + (endMinutes - startMinutes)) / 60 * 80;
    return { startPercentage, height };
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
                {getEventsForHour(hour).map((event) => {
                  const { startPercentage, height } = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className={cn(
                        "absolute left-0 right-2 m-1 rounded text-sm cursor-pointer",
                        event.showAsLine ? "w-1 !left-4" : "",
                        event.recurring && !event.showAsLine ? "border-l-4" : "",
                        "hover:opacity-80 transition-opacity"
                      )}
                      style={{
                        top: `${startPercentage}%`,
                        height: event.showAsLine ? `${height}px` : 'auto',
                        backgroundColor: getEventColor(event.assignedTo)
                      }}
                    >
                      {!event.showAsLine && (
                        <>
                          <div className="font-semibold text-white">{event.title}</div>
                          <div className="text-white text-xs">
                            {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                          </div>
                          {event.location && (
                            <div className="text-white text-xs mt-1">
                              📍 {event.location}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

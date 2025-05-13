
import { useState } from "react";
import type { Event } from "../types/events";
import { getEventColor } from "../utils/colorUtils";
import { createWeeklyEvents } from "../utils/eventCreation";

interface UseEventsReturn {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => Event;
  updateEvent: (updatedEvent: Event) => void;
  deleteEvent: (eventId: string) => void;
  getEventById: (eventId: string) => Event | undefined;
  getEventColor: (assignedTo: string, title: string) => string; // Updated to match the signature in colorUtils.ts
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>(createWeeklyEvents());

  const addEvent = (event: Omit<Event, "id">): Event => {
    const newEvent = {
      ...event,
      id: String(Date.now()),
    };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = (updatedEvent: Event): void => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId: string): void => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventById = (eventId: string): Event | undefined => {
    return events.find(event => event.id === eventId);
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

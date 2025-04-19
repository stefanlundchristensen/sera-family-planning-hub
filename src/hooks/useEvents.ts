
import { useState } from "react";
import { Event } from "../types/events";
import { getEventColor } from "../utils/colorUtils";
import { createWeeklyEvents } from "../utils/eventCreation";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>(createWeeklyEvents());

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: String(Date.now()),
    };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const getEventById = (eventId: string) => {
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

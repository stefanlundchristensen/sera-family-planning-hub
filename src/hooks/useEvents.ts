
import { useState } from "react";

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  assignedTo: string;
  color: string;
  recurring?: boolean;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Soccer Practice",
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0, 0)),
      assignedTo: "Tommy",
      color: "blue",
      recurring: true
    },
    {
      id: "2",
      title: "Piano Lesson",
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      assignedTo: "Emma",
      color: "purple"
    }
  ]);

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
  };
}

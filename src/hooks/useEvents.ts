
import { useState } from "react";

// Define color mapping for family members
const FAMILY_MEMBER_COLORS: Record<string, string> = {
  "Mom": "teal",
  "Dad": "blue",
  "Tommy": "coral",
  "Emma": "purple",
  "Everyone": "green"
};

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  assignedTo: string;
  recurring?: boolean;
  description?: string;
  location?: string;
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Soccer Practice",
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0, 0)),
      assignedTo: "Tommy",
      recurring: true,
      location: "Community Field",
      description: "Weekly soccer practice with coach Smith"
    },
    {
      id: "2",
      title: "Piano Lesson",
      start: new Date(new Date().setHours(14, 0, 0, 0)),
      end: new Date(new Date().setHours(15, 0, 0, 0)),
      assignedTo: "Emma",
      location: "Music School",
      description: "Weekly piano lesson with Ms. Johnson"
    },
    {
      id: "3",
      title: "Family Dinner",
      start: new Date(new Date().setHours(18, 0, 0, 0)),
      end: new Date(new Date().setHours(19, 30, 0, 0)),
      assignedTo: "Everyone",
      recurring: true,
      location: "Home",
      description: "Weekly family dinner time"
    },
    {
      id: "4",
      title: "Grocery Shopping",
      start: new Date(new Date().setHours(16, 0, 0, 0)),
      end: new Date(new Date().setHours(17, 0, 0, 0)),
      assignedTo: "Mom",
      location: "Local Market",
      description: "Weekly grocery shopping"
    },
    {
      id: "5",
      title: "Dentist Appointment",
      start: new Date(new Date().setHours(9, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 0, 0, 0)),
      assignedTo: "Emma",
      location: "Dr. Smith's Office",
      description: "Regular checkup"
    },
    {
      id: "6",
      title: "Work Meeting",
      start: new Date(new Date().setHours(13, 0, 0, 0)),
      end: new Date(new Date().setHours(14, 0, 0, 0)),
      assignedTo: "Dad",
      recurring: true,
      location: "Office",
      description: "Weekly team sync"
    },
    {
      id: "7",
      title: "Baseball Game",
      start: new Date(new Date().setHours(15, 0, 0, 0)),
      end: new Date(new Date().setHours(17, 0, 0, 0)),
      assignedTo: "Tommy",
      location: "City Park",
      description: "League game vs Eagles"
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

  // Helper function to get color based on assigned family member
  const getEventColor = (assignedTo: string) => {
    return FAMILY_MEMBER_COLORS[assignedTo] || "gray";
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

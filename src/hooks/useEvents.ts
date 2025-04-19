
import { useState } from "react";

// Define color mapping for family members
const FAMILY_MEMBER_COLORS: Record<string, string> = {
  "Dad": "#4169E1",
  "Mom": "#20B2AA",
  "Sarah": "#FF7F50",
  "Michael Jr": "#9370DB",
  "Grandma Linda": "#3CB371",
  "Grandpa Joe": "#DEB887",
  "Everyone": "#808080"
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
  // Helper function to create events for the current week
  const createWeeklyEvents = () => {
    const today = new Date();
    const currentWeek = [];
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Start from Monday

    // Create events for each weekday (Monday to Friday)
    for (let i = 0; i < 5; i++) {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);

      // Sarah's drop-off
      currentWeek.push({
        id: `sarah-dropoff-${i}`,
        title: "Drop off Sarah at School",
        start: new Date(currentDay.setHours(8, 0, 0, 0)),
        end: new Date(currentDay.setHours(8, 30, 0, 0)),
        assignedTo: i % 2 === 0 ? "Dad" : "Mom",
        recurring: true,
        location: "Primary School"
      });

      // Michael Jr's drop-off
      currentWeek.push({
        id: `michael-dropoff-${i}`,
        title: "Drop off Michael Jr at School",
        start: new Date(currentDay.setHours(8, 15, 0, 0)),
        end: new Date(currentDay.setHours(8, 45, 0, 0)),
        assignedTo: i % 2 === 0 ? "Mom" : "Dad",
        recurring: true,
        location: "Middle School"
      });

      // Sarah's pickup
      currentWeek.push({
        id: `sarah-pickup-${i}`,
        title: "Pick up Sarah from School",
        start: new Date(currentDay.setHours(15, 0, 0, 0)),
        end: new Date(currentDay.setHours(15, 30, 0, 0)),
        assignedTo: i % 2 === 0 ? "Grandma Linda" : "Mom",
        recurring: true,
        location: "Primary School"
      });

      // Michael Jr's pickup
      currentWeek.push({
        id: `michael-pickup-${i}`,
        title: "Pick up Michael Jr from School",
        start: new Date(currentDay.setHours(15, 30, 0, 0)),
        end: new Date(currentDay.setHours(16, 0, 0, 0)),
        assignedTo: i % 2 === 0 ? "Grandpa Joe" : "Dad",
        recurring: true,
        location: "Middle School"
      });

      // Dinner preparation
      currentWeek.push({
        id: `dinner-${i}`,
        title: "Prepare Family Dinner",
        start: new Date(currentDay.setHours(17, 30, 0, 0)),
        end: new Date(currentDay.setHours(18, 30, 0, 0)),
        assignedTo: i % 2 === 0 ? "Mom" : "Dad",
        recurring: true,
        location: "Home",
        description: "Family dinner preparation"
      });
    }

    // Add some additional family events
    currentWeek.push({
      id: "family-dinner-sunday",
      title: "Sunday Family Dinner",
      start: new Date(weekStart.setDate(weekStart.getDate() + 6)).setHours(18, 0, 0, 0),
      end: new Date(weekStart.setDate(weekStart.getDate())).setHours(20, 0, 0, 0),
      assignedTo: "Everyone",
      recurring: true,
      location: "Home",
      description: "Weekly family gathering"
    });

    return currentWeek;
  };

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

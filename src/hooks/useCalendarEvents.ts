
import { useState } from "react";
import type { Event } from "../types/events";
import { useEvents } from "./useEvents";
import { toast } from "sonner";

interface UseCalendarEventsReturn {
  events: Event[];
  isNewEventOpen: boolean;
  selectedEvent: Event | null;
  openNewEventForm: () => void;
  openEventEditForm: (event: Event) => void;
  closeEventForm: () => void;
  handleSaveEvent: (eventData: Omit<Event, "id"> | Event) => void;
  handleDeleteEvent: (eventId: string) => void;
}

/**
 * Custom hook to handle calendar event operations
 * Provides a reusable way to manage events across different calendar views
 */
export function useCalendarEvents(): UseCalendarEventsReturn {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openNewEventForm = () => {
    setSelectedEvent(null);
    setIsNewEventOpen(true);
  };

  const openEventEditForm = (event: Event) => {
    setSelectedEvent(event);
    setIsNewEventOpen(true);
  };

  const closeEventForm = () => {
    setIsNewEventOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData: Omit<Event, "id"> | Event) => {
    if ("id" in eventData) {
      updateEvent(eventData as Event);
      toast.success("Event updated successfully");
    } else {
      addEvent(eventData);
      toast.success("Event created successfully");
    }
    closeEventForm();
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    toast.success("Event deleted successfully");
  };

  return {
    events,
    isNewEventOpen,
    selectedEvent,
    openNewEventForm,
    openEventEditForm,
    closeEventForm,
    handleSaveEvent,
    handleDeleteEvent
  };
}

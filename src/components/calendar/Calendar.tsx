
import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { WeekView } from "./WeekView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "../events/EventForm";

// Mock data for events
const MOCK_EVENTS = [
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
  },
  {
    id: "3",
    title: "Family Dinner",
    start: new Date(new Date().setHours(18, 0, 0, 0)),
    end: new Date(new Date().setHours(19, 30, 0, 0)),
    assignedTo: "Everyone",
    color: "teal",
    recurring: true
  },
  {
    id: "4",
    title: "Grocery Shopping",
    start: new Date(new Date().setHours(16, 0, 0, 0)),
    end: new Date(new Date().setHours(17, 0, 0, 0)),
    assignedTo: "Mom",
    color: "coral"
  }
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState(MOCK_EVENTS);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsNewEventOpen(true);
  };

  const handleNewEvent = () => {
    setSelectedEvent(null);
    setIsNewEventOpen(true);
  };

  const handleSaveEvent = (event: any) => {
    if (event.id) {
      // Update existing event
      setEvents(events.map(e => e.id === event.id ? event : e));
    } else {
      // Add new event
      setEvents([...events, { ...event, id: String(Date.now()) }]);
    }
    setIsNewEventOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate} 
        onDateChange={setCurrentDate} 
        onNewEvent={handleNewEvent}
        view={view}
        onChangeView={setView}
      />
      
      {view === "week" && (
        <WeekView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />
      )}
      
      <Dialog open={isNewEventOpen} onOpenChange={setIsNewEventOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Edit Event" : "New Event"}</DialogTitle>
          </DialogHeader>
          <EventForm 
            initialValues={selectedEvent || {
              title: "",
              start: new Date(),
              end: new Date(new Date().getTime() + 60 * 60 * 1000),
              assignedTo: "",
              color: "blue"
            }}
            onSave={handleSaveEvent}
            onCancel={() => setIsNewEventOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

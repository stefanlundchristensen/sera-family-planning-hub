
import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "../events/EventForm";
import { useEvents } from "@/hooks/useEvents";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();

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
      updateEvent(event);
    } else {
      addEvent(event);
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
      
      {view === "day" && (
        <DayView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />
      )}
      
      {view === "week" && (
        <WeekView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />
      )}
      
      {view === "month" && (
        <MonthView 
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
            }}
            onSave={handleSaveEvent}
            onCancel={() => setIsNewEventOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

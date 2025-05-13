
import { useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { WeekView } from "./WeekView";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "../events/EventForm";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import type { CalendarView } from "@/types/calendar";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("week");
  
  const {
    events,
    isNewEventOpen,
    selectedEvent,
    openNewEventForm,
    openEventEditForm,
    closeEventForm,
    handleSaveEvent
  } = useCalendarEvents();

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate} 
        onDateChange={setCurrentDate} 
        onNewEvent={openNewEventForm}
        view={view}
        onChangeView={setView}
      />
      
      {view === "day" && (
        <DayView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={openEventEditForm} 
        />
      )}
      
      {view === "week" && (
        <WeekView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={openEventEditForm} 
        />
      )}
      
      {view === "month" && (
        <MonthView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={openEventEditForm} 
        />
      )}
      
      <Dialog open={isNewEventOpen} onOpenChange={closeEventForm}>
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
            onCancel={closeEventForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

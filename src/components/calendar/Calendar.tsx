import { useState, useEffect } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { MonthView } from './MonthView';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventForm } from '../events/EventForm';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import type { CalendarView } from '@/types/calendar';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('week');

  const {
    events,
    isNewEventOpen,
    selectedEvent,
    openNewEventForm,
    openEventEditForm,
    closeEventForm,
    handleSaveEvent,
  } = useCalendarEvents();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'ArrowLeft') {
          const newDate = new Date(currentDate);
          if (view === 'day') {
            newDate.setDate(currentDate.getDate() - 1);
          } else if (view === 'week') {
            newDate.setDate(currentDate.getDate() - 7);
          } else {
            newDate.setMonth(currentDate.getMonth() - 1);
          }
          setCurrentDate(newDate);
        } else if (e.key === 'ArrowRight') {
          const newDate = new Date(currentDate);
          if (view === 'day') {
            newDate.setDate(currentDate.getDate() + 1);
          } else if (view === 'week') {
            newDate.setDate(currentDate.getDate() + 7);
          } else {
            newDate.setMonth(currentDate.getMonth() + 1);
          }
          setCurrentDate(newDate);
        } else if (e.key === 't') {
          setCurrentDate(new Date());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDate, view]);

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onNewEvent={openNewEventForm}
        view={view}
        onChangeView={setView}
      />

      {view === 'day' && (
        <DayView currentDate={currentDate} events={events} onEventClick={openEventEditForm} />
      )}

      {view === 'week' && (
        <WeekView currentDate={currentDate} events={events} onEventClick={openEventEditForm} />
      )}

      {view === 'month' && (
        <MonthView currentDate={currentDate} events={events} onEventClick={openEventEditForm} />
      )}

      <Dialog open={isNewEventOpen} onOpenChange={closeEventForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Edit Event' : 'New Event'}</DialogTitle>
          </DialogHeader>
          <EventForm
            initialValues={
              selectedEvent || {
                title: '',
                start: new Date(),
                end: new Date(new Date().getTime() + 60 * 60 * 1000),
                assignedTo: '',
              }
            }
            onSave={handleSaveEvent}
            onCancel={closeEventForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

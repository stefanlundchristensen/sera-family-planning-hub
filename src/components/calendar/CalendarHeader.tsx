import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onNewEvent: () => void;
  view: 'day' | 'week' | 'month';
  onChangeView: (view: 'day' | 'week' | 'month') => void;
}

export function CalendarHeader({
  currentDate,
  onDateChange,
  onNewEvent,
  view,
  onChangeView,
}: CalendarHeaderProps) {
  // Calculate week start and end
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }); // End on Sunday

  const previousPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    onDateChange(newDate);
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <header className="flex items-center justify-between mb-6 p-2 rounded-lg bg-background soft-shadow">
      <div className="flex items-center gap-2">
        <Button onClick={goToToday} variant="outline">
          Today
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={previousPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="text-xl font-bold">
          {view === 'day' && format(currentDate, 'MMMM d, yyyy')}
          {view === 'week' && (
            <>
              {format(weekStart, 'MMM d')} – {format(weekEnd, 'MMM d, yyyy')}
            </>
          )}
          {view === 'month' && format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={view === 'day' ? 'default' : 'ghost'}
            className="rounded-none"
            onClick={() => onChangeView('day')}
          >
            Day
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'ghost'}
            className="rounded-none"
            onClick={() => onChangeView('week')}
          >
            Week
          </Button>
          <Button
            variant={view === 'month' ? 'default' : 'ghost'}
            className="rounded-none"
            onClick={() => onChangeView('month')}
          >
            Month
          </Button>
        </div>

        <Button onClick={onNewEvent}>
          <Plus className="mr-2 h-4 w-4" /> New Event
        </Button>
      </div>
    </header>
  );
}

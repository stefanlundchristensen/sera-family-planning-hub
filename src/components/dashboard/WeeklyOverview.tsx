import { useState } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { cn } from "@/lib/utils";

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

export function WeeklyOverview() {
  const [currentDate] = useState(new Date());
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date) => {
    return MOCK_EVENTS.filter(event => 
      format(event.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {weekDays.map((day, index) => (
        <div key={index} className="space-y-2">
          <h2 className={cn(
            "text-lg font-semibold",
            isToday(day) && "text-primary"
          )}>
            {format(day, 'EEEE')} <span className="text-muted-foreground font-normal">({format(day, 'MMM d')})</span>
          </h2>
          {getEventsForDay(day).length > 0 ? (
            <ul className="list-disc pl-4 space-y-2">
              {getEventsForDay(day).map((event) => (
                <li key={event.id} className="text-sm">
                  <span className="font-medium">{format(event.start, 'h:mm a')}:</span>{' '}
                  {event.title}{' '}
                  <span className="text-muted-foreground">({event.assignedTo})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground pl-4">No events scheduled</p>
          )}
        </div>
      ))}
    </div>
  );
}

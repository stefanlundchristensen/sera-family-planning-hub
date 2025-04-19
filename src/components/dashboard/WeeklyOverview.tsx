
import { useState } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Using the same mock events from Calendar component for now
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
  
  // Get the start of the week (Monday)
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Create array for the week
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return MOCK_EVENTS.filter(event => 
      format(event.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {weekDays.map((day, index) => (
        <Card key={index} className={cn(
          "transition-colors",
          isToday(day) && "border-primary"
        )}>
          <CardHeader>
            <CardTitle className={cn(
              "text-lg flex items-center justify-between",
              isToday(day) && "text-primary"
            )}>
              <span>{format(day, 'EEEE')}</span>
              <span className="text-sm font-normal">{format(day, 'MMM d')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {getEventsForDay(day).map((event) => (
              <div
                key={event.id}
                className={cn(
                  "p-2 rounded-md text-sm",
                  event.color === "blue" && "bg-family-blue-light text-white",
                  event.color === "purple" && "bg-family-purple text-white",
                  event.color === "teal" && "bg-family-teal text-white",
                  event.color === "coral" && "bg-family-coral text-white"
                )}
              >
                <div className="font-semibold">{event.title}</div>
                <div className="text-xs opacity-90">
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                </div>
                <div className="text-xs mt-1">{event.assignedTo}</div>
              </div>
            ))}
            {getEventsForDay(day).length === 0 && (
              <p className="text-sm text-muted-foreground">No events scheduled</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

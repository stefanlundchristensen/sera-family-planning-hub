
import { useState } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useEvents } from "@/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WeeklyOverview() {
  const [currentDate] = useState(new Date());
  const { events, deleteEvent, getEventColor } = useEvents();
  const { toast } = useToast();
  
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      format(event.start, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    toast({
      description: "Event deleted successfully",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {weekDays.map((day, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className={cn(
              "text-lg font-semibold",
              isToday(day) && "text-primary"
            )}>
              {format(day, 'EEEE')} <span className="text-muted-foreground font-normal">({format(day, 'MMM d')})</span>
            </h2>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {getEventsForDay(day).length > 0 ? (
            <ul className="space-y-2">
              {getEventsForDay(day).map((event) => (
                <li 
                  key={event.id} 
                  className={cn(
                    "flex items-center justify-between group rounded-lg p-2 hover:bg-accent transition-colors",
                    `bg-family-${getEventColor(event.assignedTo)}-light`
                  )}
                >
                  <div>
                    <span className="font-medium">{format(event.start, 'h:mm a')}:</span>{' '}
                    {event.title}{' '}
                    <span className="text-muted-foreground">({event.assignedTo})</span>
                    {event.location && (
                      <div className="text-sm text-muted-foreground">📍 {event.location}</div>
                    )}
                  </div>
                  <div className="space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive" 
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
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

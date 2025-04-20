
import { Event } from "../types/events";

export const createWeeklyEvents = (): Event[] => {
  const today = new Date();
  const currentWeek = [];
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Start from Monday

  // Create events for each weekday (Monday to Friday)
  for (let i = 0; i < 5; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);

    // Morning Routine Events
    currentWeek.push({
      id: `breakfast-${i}`,
      title: "Family Breakfast",
      start: new Date(currentDay.setHours(7, 0, 0, 0)),
      end: new Date(currentDay.setHours(7, 45, 0, 0)),
      assignedTo: "Everyone",
      recurring: true,
      location: "Home",
      description: "Family breakfast time before school and work"
    });

    // School-related events
    currentWeek.push({
      id: `sarah-school-${i}`,
      title: "Sarah - School",
      start: new Date(currentDay.setHours(8, 30, 0, 0)),
      end: new Date(currentDay.setHours(15, 0, 0, 0)),
      assignedTo: "Sarah",
      recurring: true,
      location: "Primary School"
    });

    currentWeek.push({
      id: `michael-jr-school-${i}`,
      title: "Michael Jr - School",
      start: new Date(currentDay.setHours(8, 0, 0, 0)),
      end: new Date(currentDay.setHours(15, 30, 0, 0)),
      assignedTo: "Michael Jr",
      recurring: true,
      location: "Middle School"
    });

    // Work schedules
    currentWeek.push({
      id: `mom-work-${i}`,
      title: "Mom - Remote Work",
      start: new Date(currentDay.setHours(9, 0, 0, 0)),
      end: new Date(currentDay.setHours(17, 0, 0, 0)),
      assignedTo: "Mom",
      recurring: true,
      location: "Home Office"
    });

    currentWeek.push({
      id: `dad-work-${i}`,
      title: "Dad - Office",
      start: new Date(currentDay.setHours(8, 30, 0, 0)),
      end: new Date(currentDay.setHours(16, 30, 0, 0)),
      assignedTo: "Dad",
      recurring: true,
      location: "Downtown Office"
    });

    // After-school activities
    if (i % 2 === 0) { // Monday, Wednesday, Friday
      currentWeek.push({
        id: `sarah-piano-${i}`,
        title: "Sarah - Piano Lesson",
        start: new Date(currentDay.setHours(16, 0, 0, 0)),
        end: new Date(currentDay.setHours(17, 0, 0, 0)),
        assignedTo: "Sarah",
        recurring: true,
        location: "Music School"
      });
    }

    if (i % 2 === 1) { // Tuesday, Thursday
      currentWeek.push({
        id: `michael-soccer-${i}`,
        title: "Michael Jr - Soccer Practice",
        start: new Date(currentDay.setHours(16, 0, 0, 0)),
        end: new Date(currentDay.setHours(17, 30, 0, 0)),
        assignedTo: "Michael Jr",
        recurring: true,
        location: "Sports Center"
      });
    }

    // Evening activities
    currentWeek.push({
      id: `dinner-${i}`,
      title: "Family Dinner",
      start: new Date(currentDay.setHours(18, 30, 0, 0)),
      end: new Date(currentDay.setHours(19, 30, 0, 0)),
      assignedTo: "Everyone",
      recurring: true,
      location: "Home",
      description: "Family dinner time"
    });
  }

  // Weekend activities
  const saturday = new Date(weekStart);
  saturday.setDate(saturday.getDate() + 5);

  currentWeek.push({
    id: "weekend-grocery",
    title: "Grocery Shopping",
    start: new Date(saturday.setHours(10, 0, 0, 0)),
    end: new Date(saturday.setHours(11, 30, 0, 0)),
    assignedTo: "Mom",
    recurring: true,
    location: "Supermarket"
  });

  currentWeek.push({
    id: "sarah-art",
    title: "Sarah - Art Class",
    start: new Date(saturday.setHours(13, 0, 0, 0)),
    end: new Date(saturday.setHours(14, 30, 0, 0)),
    assignedTo: "Sarah",
    recurring: true,
    location: "Art Center"
  });

  currentWeek.push({
    id: "family-movie",
    title: "Family Movie Night",
    start: new Date(saturday.setHours(19, 0, 0, 0)),
    end: new Date(saturday.setHours(21, 0, 0, 0)),
    assignedTo: "Everyone",
    recurring: true,
    location: "Home",
    description: "Weekly family movie night"
  });

  const sunday = new Date(weekStart);
  sunday.setDate(sunday.getDate() + 6);

  currentWeek.push({
    id: "church",
    title: "Church Service",
    start: new Date(sunday.setHours(10, 0, 0, 0)),
    end: new Date(sunday.setHours(11, 30, 0, 0)),
    assignedTo: "Everyone",
    recurring: true,
    location: "Local Church"
  });

  currentWeek.push({
    id: "sunday-brunch",
    title: "Family Brunch",
    start: new Date(sunday.setHours(12, 0, 0, 0)),
    end: new Date(sunday.setHours(13, 30, 0, 0)),
    assignedTo: "Everyone",
    recurring: true,
    location: "Home",
    description: "Weekly family brunch"
  });

  currentWeek.push({
    id: "park-visit",
    title: "Park Visit",
    start: new Date(sunday.setHours(14, 0, 0, 0)),
    end: new Date(sunday.setHours(16, 0, 0, 0)),
    assignedTo: "Everyone",
    recurring: true,
    location: "Central Park",
    description: "Family outdoor time"
  });

  return currentWeek;
};

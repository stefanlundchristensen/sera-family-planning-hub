
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

    // Sarah's drop-off
    currentWeek.push({
      id: `sarah-dropoff-${i}`,
      title: "Drop off Sarah at School",
      start: new Date(currentDay.setHours(8, 0, 0, 0)),
      end: new Date(currentDay.setHours(8, 30, 0, 0)),
      assignedTo: i % 2 === 0 ? "Dad" : "Mom",
      recurring: true,
      location: "Primary School"
    });

    // Michael Jr's drop-off
    currentWeek.push({
      id: `michael-dropoff-${i}`,
      title: "Drop off Michael Jr at School",
      start: new Date(currentDay.setHours(8, 15, 0, 0)),
      end: new Date(currentDay.setHours(8, 45, 0, 0)),
      assignedTo: i % 2 === 0 ? "Mom" : "Dad",
      recurring: true,
      location: "Middle School"
    });

    // Sarah's pickup
    currentWeek.push({
      id: `sarah-pickup-${i}`,
      title: "Pick up Sarah from School",
      start: new Date(currentDay.setHours(15, 0, 0, 0)),
      end: new Date(currentDay.setHours(15, 30, 0, 0)),
      assignedTo: i % 2 === 0 ? "Grandma Linda" : "Mom",
      recurring: true,
      location: "Primary School"
    });

    // Michael Jr's pickup
    currentWeek.push({
      id: `michael-pickup-${i}`,
      title: "Pick up Michael Jr from School",
      start: new Date(currentDay.setHours(15, 30, 0, 0)),
      end: new Date(currentDay.setHours(16, 0, 0, 0)),
      assignedTo: i % 2 === 0 ? "Grandpa Joe" : "Dad",
      recurring: true,
      location: "Middle School"
    });

    // Parents' working hours
    currentWeek.push({
      id: `dad-work-${i}`,
      title: "Dad at Work",
      start: new Date(currentDay.setHours(9, 0, 0, 0)),
      end: new Date(currentDay.setHours(17, 0, 0, 0)),
      assignedTo: "Dad",
      recurring: true,
      location: "Office"
    });

    currentWeek.push({
      id: `mom-work-${i}`,
      title: "Mom at Work",
      start: new Date(currentDay.setHours(9, 30, 0, 0)),
      end: new Date(currentDay.setHours(16, 30, 0, 0)),
      assignedTo: "Mom",
      recurring: true,
      location: "Home Office"
    });

    // Dinner preparation
    currentWeek.push({
      id: `dinner-${i}`,
      title: "Prepare Family Dinner",
      start: new Date(currentDay.setHours(17, 30, 0, 0)),
      end: new Date(currentDay.setHours(18, 30, 0, 0)),
      assignedTo: i % 2 === 0 ? "Mom" : "Dad",
      recurring: true,
      location: "Home",
      description: "Family dinner preparation"
    });

    // After-school activities
    if (i % 2 === 0) { // Monday, Wednesday, Friday
      currentWeek.push({
        id: `sarah-swimming-${i}`,
        title: "Sarah's Swimming Practice",
        start: new Date(currentDay.setHours(16, 0, 0, 0)),
        end: new Date(currentDay.setHours(17, 0, 0, 0)),
        assignedTo: "Sarah",
        recurring: true,
        location: "Community Pool"
      });
    }

    if (i % 2 === 1) { // Tuesday, Thursday
      currentWeek.push({
        id: `michael-basketball-${i}`,
        title: "Michael Jr's Basketball Practice",
        start: new Date(currentDay.setHours(16, 30, 0, 0)),
        end: new Date(currentDay.setHours(17, 30, 0, 0)),
        assignedTo: "Michael Jr",
        recurring: true,
        location: "School Gym"
      });
    }
  }

  // Weekend activities
  const saturday = new Date(weekStart);
  saturday.setDate(saturday.getDate() + 5);

  currentWeek.push({
    id: "sarah-art-class",
    title: "Sarah's Art Class",
    start: new Date(saturday.setHours(10, 0, 0, 0)),
    end: new Date(saturday.setHours(11, 30, 0, 0)),
    assignedTo: "Sarah",
    recurring: true,
    location: "Art Center"
  });

  currentWeek.push({
    id: "michael-coding-class",
    title: "Michael Jr's Coding Class",
    start: new Date(saturday.setHours(13, 0, 0, 0)),
    end: new Date(saturday.setHours(14, 30, 0, 0)),
    assignedTo: "Michael Jr",
    recurring: true,
    location: "Learning Center"
  });

  // Sunday family dinner
  const sunday = new Date(weekStart);
  sunday.setDate(sunday.getDate() + 6);
  
  currentWeek.push({
    id: "family-dinner-sunday",
    title: "Sunday Family Dinner",
    start: new Date(sunday.setHours(18, 0, 0, 0)),
    end: new Date(sunday.setHours(20, 0, 0, 0)),
    assignedTo: "Everyone",
    recurring: true,
    location: "Home",
    description: "Weekly family gathering"
  });

  return currentWeek;
};

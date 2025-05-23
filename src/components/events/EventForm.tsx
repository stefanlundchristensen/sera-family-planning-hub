
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

import type { Event } from "@/types/events";

const FAMILY_MEMBERS = [
  { id: "1", name: "Mom" },
  { id: "2", name: "Dad" },
  { id: "3", name: "Tommy" },
  { id: "4", name: "Emma" },
  { id: "5", name: "Everyone" },
];

interface EventFormProps {
  initialValues?: Partial<Event>;
  onSave: (event: Omit<Event, "id">) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function EventForm({ initialValues, onSave, onCancel, isLoading = false, error }: EventFormProps) {
  const [event, setEvent] = useState<Partial<Event>>({
    title: "",
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    assignedTo: "",
    recurring: false,
    description: "",
    location: "",
    ...initialValues
  });

  const handleChange = (field: string, value: any) => {
    setEvent({ ...event, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(event as Omit<Event, "id">);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded bg-red-100 text-red-700 px-3 py-2 mb-2 text-sm">{error}</div>
      )}
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={event.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter event title"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start">Start Time</Label>
          <Input
            id="start"
            type="datetime-local"
            value={formatDatetimeLocal(event.start)}
            onChange={(e) => handleChange("start", new Date(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="end">End Time</Label>
          <Input
            id="end"
            type="datetime-local"
            value={formatDatetimeLocal(event.end)}
            onChange={(e) => handleChange("end", new Date(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Select 
          value={event.assignedTo} 
          onValueChange={(value) => handleChange("assignedTo", value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select family member" />
          </SelectTrigger>
          <SelectContent>
            {FAMILY_MEMBERS.map(member => (
              <SelectItem key={member.id} value={member.name}>
                {member.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={event.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Enter location"
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={event.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter event description"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={event.recurring}
          onCheckedChange={(checked) => handleChange("recurring", !!checked)}
          disabled={isLoading}
        />
        <Label htmlFor="recurring">Recurring Event</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner className="w-5 h-5 mr-2" /> : null}
          Save Event
        </Button>
      </div>
    </form>
  );
}

// Helper function to format date for datetime-local input
function formatDatetimeLocal(date: Date | undefined) {
  if (!date) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}

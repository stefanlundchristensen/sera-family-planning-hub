
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for family members
const FAMILY_MEMBERS = [
  { id: "1", name: "Mom", color: "teal" },
  { id: "2", name: "Dad", color: "blue" },
  { id: "3", name: "Tommy", color: "coral" },
  { id: "4", name: "Emma", color: "purple" },
  { id: "5", name: "Everyone", color: "green" },
];

interface EventFormProps {
  initialValues: any;
  onSave: (event: any) => void;
  onCancel: () => void;
}

export function EventForm({ initialValues, onSave, onCancel }: EventFormProps) {
  const [event, setEvent] = useState(initialValues);

  const handleChange = (field: string, value: any) => {
    setEvent({ ...event, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(event);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Event Title</Label>
        <Input
          id="title"
          value={event.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter event title"
          required
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
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Select 
          value={event.assignedTo} 
          onValueChange={(value) => handleChange("assignedTo", value)}
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
        <Label htmlFor="color">Color</Label>
        <div className="flex space-x-2 mt-2">
          {["blue", "teal", "coral", "purple", "green"].map(color => (
            <div 
              key={color} 
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${event.color === color ? 'border-black' : 'border-transparent'}`}
              style={{
                backgroundColor: getColorValue(color),
              }}
              onClick={() => handleChange("color", color)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="recurring"
          checked={event.recurring || false}
          onCheckedChange={(checked) => handleChange("recurring", !!checked)}
        />
        <Label htmlFor="recurring" className="cursor-pointer">
          Recurring Event
        </Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Event
        </Button>
      </div>
    </form>
  );
}

// Helper function to format date for datetime-local input
function formatDatetimeLocal(date: Date) {
  if (!date) return "";
  
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

// Helper function to get color values
function getColorValue(color: string) {
  const colorMap: Record<string, string> = {
    blue: "#4A89DC",
    teal: "#48CFAD",
    coral: "#FC6E51",
    purple: "#AC92EC",
    green: "#5DB85B",
  };
  return colorMap[color] || colorMap.blue;
}

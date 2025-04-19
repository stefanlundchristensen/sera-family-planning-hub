
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditFamilyMemberFormProps {
  member: {
    id: number;
    name: string;
    role: string;
    color: string;
  };
  onSave: (member: any) => void;
  onCancel: () => void;
}

export function EditFamilyMemberForm({ member, onSave, onCancel }: EditFamilyMemberFormProps) {
  const [editedMember, setEditedMember] = useState({ ...member });

  const handleChange = (field: string, value: any) => {
    setEditedMember({ ...editedMember, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedMember);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={editedMember.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter name"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="role">Role</Label>
        <Select 
          value={editedMember.role} 
          onValueChange={(value) => handleChange("role", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Extended Family">Extended Family</SelectItem>
            <SelectItem value="Child">Child</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="color">Color</Label>
        <div className="flex space-x-2 mt-2">
          {["blue", "teal", "coral", "purple", "green", "yellow", "pink"].map(color => (
            <div 
              key={color} 
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${editedMember.color === color ? 'border-black' : 'border-transparent'}`}
              style={{
                backgroundColor: getColorValue(color),
              }}
              onClick={() => handleChange("color", color)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
}

// Helper function to get color values
function getColorValue(color: string) {
  const colorMap: Record<string, string> = {
    blue: "#4A89DC",
    teal: "#48CFAD",
    coral: "#FC6E51",
    purple: "#AC92EC",
    green: "#5DB85B",
    yellow: "#FFCE54",
    pink: "#EC87C0",
  };
  return colorMap[color] || colorMap.blue;
}

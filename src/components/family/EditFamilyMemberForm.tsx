import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AvatarUpload } from '@/components/ui/AvatarUpload';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  color: string;
  avatar?: string;
}

interface EditFamilyMemberFormProps {
  member: FamilyMember;
  onSave: (member: FamilyMember, avatarFile?: File | null) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function EditFamilyMemberForm({
  member,
  onSave,
  onCancel,
  isLoading = false,
  error,
}: EditFamilyMemberFormProps): JSX.Element {
  const [editedMember, setEditedMember] = useState<FamilyMember>({ ...member });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleChange = (field: string, value: unknown): void => {
    setEditedMember({ ...editedMember, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSave(editedMember, avatarFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded bg-red-100 text-red-700 px-3 py-2 mb-2 text-sm">{error}</div>
      )}
      <div className="flex flex-col items-center mb-4">
        <Label className="mb-2">Profile Picture</Label>
        <AvatarUpload
          currentAvatar={editedMember.avatar}
          onAvatarChange={setAvatarFile}
          name={editedMember.name}
        />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={editedMember.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Enter name"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={editedMember.role}
          onValueChange={value => handleChange('role', value)}
          disabled={isLoading}
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
          {['blue', 'teal', 'coral', 'purple', 'green', 'yellow', 'pink'].map(color => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer border-2 ${editedMember.color === color ? 'border-black' : 'border-transparent'}`}
              style={{
                backgroundColor: getColorValue(color),
              }}
              onClick={() => handleChange('color', color)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner className="w-5 h-5 mr-2" /> : null}
          Save Changes
        </Button>
      </div>
    </form>
  );
}

// Helper function to get color values
function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    blue: '#4A89DC',
    teal: '#48CFAD',
    coral: '#FC6E51',
    purple: '#AC92EC',
    green: '#5DB85B',
    yellow: '#FFCE54',
    pink: '#EC87C0',
  };
  return colorMap[color] || colorMap.blue;
}

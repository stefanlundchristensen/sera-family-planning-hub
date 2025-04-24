
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useSupabaseAuth } from '@/providers/AuthProvider';
import { DateInputPicker } from '@/components/DateInputPicker';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseAuth();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [role, setRole] = useState<'parent' | 'child' | 'extended_family'>('parent');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      toast.error('User not found. Please log in again.');
      return;
    }

    if (!name || !dateOfBirth) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          date_of_birth: dateOfBirth.toISOString().split('T')[0],
          role
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Help us personalize your experience
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <DateInputPicker
                date={dateOfBirth}
                onDateChange={setDateOfBirth}
                disabled={(date) => date > new Date()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Family Role</Label>
              <Select 
                value={role} 
                onValueChange={(value: 'parent' | 'child' | 'extended_family') => setRole(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="extended_family">Extended Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Complete Profile'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Onboarding;

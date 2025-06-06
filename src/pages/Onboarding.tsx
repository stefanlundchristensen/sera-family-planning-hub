
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
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useSupabaseAuth();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [role, setRole] = useState<'parent' | 'child' | 'extended_family'>('parent');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      toast.error('User not found. Please log in again.');
      navigate('/auth');
      setIsSubmitting(false);
      return;
    }

    if (!name || !dateOfBirth) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Updating profile for user:", user.id);
      const formattedDate = dateOfBirth.toISOString().split('T')[0];
      console.log("Submitting data:", { name, date_of_birth: formattedDate, role });

      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          date_of_birth: formattedDate,
          role
        })
        .eq('id', user.id);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      toast.success('Profile updated successfully');
      console.log("Profile updated successfully, navigating to dashboard");
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Complete Profile'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Onboarding;


import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Image, User } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "",
  });

  const [connectedCalendars, setConnectedCalendars] = useState([
    { id: 1, name: "Google Calendar", connected: true, email: "sarah.johnson@gmail.com" },
    { id: 2, name: "iCloud Calendar", connected: false, email: "" },
  ]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  const handleCalendarConnect = (id: number) => {
    setConnectedCalendars(
      connectedCalendars.map(cal => 
        cal.id === id ? { ...cal, connected: !cal.connected } : cal
      )
    );
    
    const calendar = connectedCalendars.find(cal => cal.id === id);
    if (calendar) {
      if (!calendar.connected) {
        toast.success(`Connected to ${calendar.name} successfully!`);
      } else {
        toast.success(`Disconnected from ${calendar.name} successfully!`);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="calendars" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Connected Calendars
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleUpdateProfile}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile picture.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-3">
                    <Avatar className="w-24 h-24">
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Image className="h-4 w-4" /> Upload Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={user.name} 
                        onChange={e => setUser({...user, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={user.email} 
                        onChange={e => setUser({...user, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendars">
          <Card>
            <CardHeader>
              <CardTitle>Connected Calendars</CardTitle>
              <CardDescription>
                Sync your family calendar with external calendars to see all your events in one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedCalendars.map(calendar => (
                  <div key={calendar.id} className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">{calendar.name}</h3>
                      {calendar.connected && calendar.email && (
                        <p className="text-sm text-muted-foreground">{calendar.email}</p>
                      )}
                    </div>
                    <Button
                      variant={calendar.connected ? "outline" : "default"}
                      onClick={() => handleCalendarConnect(calendar.id)}
                    >
                      {calendar.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;

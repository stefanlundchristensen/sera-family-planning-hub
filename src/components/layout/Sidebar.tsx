import type { ReactNode } from "react";
import { CalendarDays, Users, Settings, Menu, X, LayoutDashboard, LogOut, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useSupabaseAuth();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut();
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <div className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && <h1 className="font-bold text-lg text-sidebar-foreground">Family Hub</h1>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <SidebarItem icon={<LayoutDashboard />} collapsed={collapsed}>Dashboard</SidebarItem>
        <SidebarItem icon={<CalendarDays />} collapsed={collapsed}>Calendar</SidebarItem>
        <SidebarItem icon={<CalendarCheck />} collapsed={collapsed}>Weekly Planning</SidebarItem>
        <SidebarItem icon={<Users />} collapsed={collapsed}>Family</SidebarItem>
        <SidebarItem icon={<Settings />} collapsed={collapsed}>Settings</SidebarItem>
      </nav>
      
      {/* Logout Button at bottom */}
      <div className={cn(
        "mt-auto border-t border-sidebar-border p-4",
        collapsed ? "flex justify-center" : ""
      )}>
        <button 
          onClick={handleLogout}
          className={cn(
            "flex items-center text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors w-full",
            collapsed ? "justify-center p-3" : "p-3"
          )}
        >
          <span className="flex-shrink-0 text-red-500"><LogOut size={20} /></span>
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  children: ReactNode;
  icon: ReactNode;
  collapsed: boolean;
}

function SidebarItem({ children, icon, collapsed }: SidebarItemProps): JSX.Element {
  // Determine href based on menu item
  let href = "#";
  if (children === "Dashboard") href = "/dashboard";
  else if (children === "Calendar") href = "/";
  else if (children === "Weekly Planning") href = "/weekly-planning";
  else if (children === "Family") href = "/family";
  else if (children === "Settings") href = "/settings";

  return (
    <a 
      href={href}
      className={cn(
        "flex items-center text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors",
        collapsed ? "mx-2 justify-center p-3" : "mx-3 p-3"
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="ml-3">{children}</span>}
    </a>
  );
}


import { ReactNode } from "react";
import { CalendarDays, Users, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
        <SidebarItem icon={<CalendarDays />} collapsed={collapsed}>Calendar</SidebarItem>
        <SidebarItem icon={<Users />} collapsed={collapsed}>Family</SidebarItem>
        <SidebarItem icon={<Settings />} collapsed={collapsed}>Settings</SidebarItem>
      </nav>
    </div>
  );
}

interface SidebarItemProps {
  children: ReactNode;
  icon: ReactNode;
  collapsed: boolean;
}

function SidebarItem({ children, icon, collapsed }: SidebarItemProps) {
  // Determine href based on menu item
  let href = "#";
  if (children === "Calendar") href = "/";
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

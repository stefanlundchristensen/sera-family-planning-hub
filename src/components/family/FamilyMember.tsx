
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface FamilyMemberProps {
  name: string;
  role: string;
  color: string;
  avatar?: string;
  className?: string;
}

export function FamilyMember({ name, role, color, avatar, className }: FamilyMemberProps): JSX.Element {
  return (
    <div className={cn("flex items-center p-4 bg-white rounded-lg border", className)}>
      <div 
        className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-white mr-3",
          color === "blue" && "bg-family-blue",
          color === "teal" && "bg-family-teal",
          color === "coral" && "bg-family-coral",
          color === "purple" && "bg-family-purple",
          color === "green" && "bg-family-green",
          color === "yellow" && "bg-family-yellow",
          color === "pink" && "bg-family-pink",
        )}
      >
        {avatar ? (
          <img 
            src={avatar} 
            alt={name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User size={24} />
        )}
      </div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}

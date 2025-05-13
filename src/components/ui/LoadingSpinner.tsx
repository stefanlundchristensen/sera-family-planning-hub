
import { Loader } from "lucide-react";

export function LoadingSpinner({ className = "" }: { className?: string }): JSX.Element {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader className="animate-spin text-primary" size={28} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

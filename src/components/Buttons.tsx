import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg";
}

export function PrimaryButton({ children, className, size = "default", ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl",
        className
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}

export function WhiteButton({ children, className, size = "default", ...props }: PrimaryButtonProps) {
  return (
    <Button
      className={cn(
        "bg-white text-slate-900 hover:bg-gray-100 shadow-lg font-semibold transition-all hover:scale-105 hover:shadow-xl",
        "!text-slate-900",
        className
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}

export function OutlineButton({ children, className, size = "default", ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-2 border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105",
        className
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
}

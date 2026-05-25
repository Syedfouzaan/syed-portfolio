import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "cyan" | "violet" | "green" | "yellow";
  className?: string;
}

const variants = {
  blue: "bg-blue-900/30 text-blue-300 border border-blue-800/50",
  cyan: "bg-cyan-900/30 text-cyan-300 border border-cyan-800/50",
  violet: "bg-violet-900/30 text-violet-300 border border-violet-800/50",
  green: "bg-green-900/30 text-green-300 border border-green-800/50",
  yellow: "bg-yellow-900/30 text-yellow-300 border border-yellow-800/50",
};

export function Badge({ children, variant = "blue", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

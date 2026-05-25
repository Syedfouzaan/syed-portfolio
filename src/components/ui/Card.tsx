import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow }: CardProps) {
  return (
    <div
      className={cn(
        "card-base p-6",
        hover && "cursor-pointer",
        glow && "glow-blue",
        className
      )}
    >
      {children}
    </div>
  );
}

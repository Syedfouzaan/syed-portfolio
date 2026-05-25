"use client";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "primary", size = "md", loading, disabled, ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-[#1e88e5] to-[#00bcd4] text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "bg-[#0d1f3c] text-[#f0f4ff] border border-[#1a2e50] hover:border-[#1e88e5] hover:bg-[#1a2e50]",
      ghost: "text-[#7a90b8] hover:text-[#f0f4ff] hover:bg-[#0a1628]",
      outline:
        "border border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5]/10",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

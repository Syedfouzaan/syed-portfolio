"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ tag, title, subtitle, center }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16", center && "text-center")}
    >
      <p className="section-tag mb-3">{tag}</p>
      <h2
        style={{ fontFamily: "var(--font-display)" }}
        className="text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#7a90b8] text-lg max-w-2xl" style={{ ...(center ? { marginLeft: "auto", marginRight: "auto" } : {}) }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

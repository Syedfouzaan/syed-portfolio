"use client";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useSpring(scrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollY.set(totalHeight > 0 ? window.scrollY / totalHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return { scrollYProgress };
}

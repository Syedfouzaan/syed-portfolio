"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/data/skills";

const CATEGORIES = Object.keys(skills);

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "AI/ML":           { bg: "rgba(0,212,255,0.07)",    text: "var(--cyan)",    border: "rgba(0,212,255,0.3)" },
  "Computer Vision": { bg: "rgba(99,102,241,0.1)",   text: "#818cf8",       border: "rgba(99,102,241,0.3)" },
  "Frontend":        { bg: "rgba(168,85,247,0.1)",   text: "#c084fc",       border: "rgba(168,85,247,0.3)" },
  "Backend":         { bg: "rgba(0,255,136,0.07)",   text: "var(--emerald)",border: "rgba(0,255,136,0.3)" },
  "Tools":           { bg: "rgba(245,158,11,0.08)",  text: "var(--amber)",  border: "rgba(245,158,11,0.3)" },
};

// HUD Segmented progress meter
function SkillBar({ value, animate, color }: { value: number; animate: boolean; color: string }) {
  const segments = 12;
  const filled = Math.round((value / 100) * segments);
  return (
    <div style={{ display: "flex", gap: "3px", marginTop: "0.625rem" }}>
      {Array.from({ length: segments }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? (i < filled ? 1 : 0.12) : 0 }}
          transition={{ duration: 0.5, delay: i * 0.04 }}
          style={{
            flex: 1,
            height: "3px",
            background: i < filled
              ? color
              : "rgba(255,255,255,0.06)",
            boxShadow: i < filled ? `0 0 4px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const cat = CATEGORY_COLORS[active] ?? CATEGORY_COLORS["AI / ML"];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-py"
      style={{ backgroundColor: "var(--bg-1)", position: "relative" }}
    >
      <div
        className="orb orb-violet"
        style={{ width: 400, height: 400, bottom: "-5%", left: "-5%", opacity: 0.07 }}
      />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "3rem" }}
        >
          <span className="section-label">skills</span>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>Technical Arsenal</h2>
          <p className="section-subtitle">
            From CV models to LLM pipelines — the stack I build with daily.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {CATEGORIES.map((catName) => {
            const c = CATEGORY_COLORS[catName] ?? CATEGORY_COLORS["AI/ML"];
            const isActive = active === catName;
            return (
              <button
                key={catName}
                onClick={() => setActive(catName)}
                aria-pressed={isActive}
                style={{
                  padding: "0.35rem 0.875rem",
                  borderRadius: "0",
                  border: `1px solid ${isActive ? c.border : "var(--border)"}`,
                  backgroundColor: isActive ? c.bg : "transparent",
                  color: isActive ? c.text : "var(--text-400)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textShadow: isActive ? `0 0 10px ${c.text}` : "none",
                }}
              >
                {catName}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.875rem",
            }}
            className="skills-grid"
          >
            {skills[active].map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="glass-card"
                style={{ padding: "1.25rem 1.5rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.25rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "0.06em",
                      color: "var(--text-100)",
                    }}
                  >
                    {skill.name}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      color: CATEGORY_COLORS[active]?.text ?? "var(--cyan)",
                      marginLeft: "0.5rem",
                      flexShrink: 0,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {skill.level}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-400)", letterSpacing: "0.08em" }}>
                    PROFICIENCY
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: CATEGORY_COLORS[active]?.text ?? "var(--cyan)" }}>
                    {skill.proficiency}%
                  </span>
                </div>
                <SkillBar value={skill.proficiency} animate={inView} color={CATEGORY_COLORS[active]?.text ?? "var(--cyan)"} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 1280px) {
          .skills-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

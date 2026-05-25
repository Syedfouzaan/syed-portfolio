"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, BookOpen, Star, Users } from "lucide-react";
import { achievements } from "@/data/achievements";

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  trophy: (c) => <Trophy size={20} style={{ color: c }} />,
  medal:  (c) => <Medal size={20} style={{ color: c }} />,
  book:   (c) => <BookOpen size={20} style={{ color: c }} />,
  star:   (c) => <Star size={20} style={{ color: c }} />,
  users:  (c) => <Users size={20} style={{ color: c }} />,
};

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Research:    { bg: "rgba(99,102,241,0.1)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  Hackathon:   { bg: "rgba(245,158,11,0.1)",  text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Competition: { bg: "rgba(6,182,212,0.1)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
  Leadership:  { bg: "rgba(16,185,129,0.1)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="section-py"
      style={{ backgroundColor: "var(--bg-0)", position: "relative" }}
    >
      <div className="orb orb-indigo" style={{ width: 400, height: 400, top: "15%", left: "-10%", opacity: 0.05 }} />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
          <span className="section-label">wins</span>
          <h2 className="section-title">Awards & Recognition</h2>
          <p className="section-subtitle">IEEE published. Hackathon-tested. Award-winning AI engineering.</p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1.25rem",
          }}
          className="achieve-grid"
        >
          {achievements.map((ach, i) => {
            const cat = CAT_COLORS[ach.category] ?? CAT_COLORS["Research"];
            const iconRender = ICONS[ach.icon] ? ICONS[ach.icon](cat.text) : <Trophy size={20} style={{ color: cat.text }} />;

            return (
              <motion.article
                key={i}
                {...fadeUp(i * 0.05)}
                style={{
                  background: "rgba(11,22,41,0.7)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                  height: "100%",
                }}
                whileHover={{
                  y: -4,
                  borderColor: cat.border,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${cat.border}`,
                }}
              >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {iconRender}
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-mono)",
                      padding: "0.25rem 0.625rem",
                      borderRadius: 6,
                      border: `1px solid ${cat.border}`,
                      background: cat.bg,
                      color: cat.text,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {ach.category}
                  </span>
                </div>

                {/* Main info */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--text-100)",
                      lineHeight: 1.3,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {ach.title}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: cat.text, fontWeight: 500 }}>
                    {ach.event}
                  </p>
                </div>

                {/* Impact / Desc */}
                <p style={{ fontSize: "0.85rem", color: "var(--text-300)", lineHeight: 1.6, flex: 1 }}>
                  {ach.impact}
                </p>

                {/* Date */}
                <div style={{ display: "flex", alignItems: "center", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--text-450)" }}>
                    {ach.date}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .achieve-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .achieve-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}

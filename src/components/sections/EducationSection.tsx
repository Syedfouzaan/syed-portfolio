"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Star } from "lucide-react";
import { education } from "@/data/education";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function EducationSection() {
  return (
    <section
      id="education"
      className="section-py"
      style={{ backgroundColor: "var(--bg-0)", position: "relative" }}
    >
      <div className="orb orb-cyan" style={{ width: 400, height: 400, top: "20%", right: "-5%", opacity: 0.05 }} />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
          <span className="section-label">education</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">Building the theoretical foundation for AI & Machine Learning.</p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className="glass-card"
              style={{
                padding: "2rem",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-card)";
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="edu-layout">
                {/* Icon wrapper */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid rgba(6, 182, 212, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={24} style={{ color: "var(--cyan)" }} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-100)", marginBottom: "0.25rem" }}>
                        {edu.degree}
                      </h3>
                      <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--cyan)" }}>
                        {edu.institution}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", alignItems: "flex-end", flexShrink: 0 }} className="edu-meta">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-400)", fontFamily: "var(--font-mono)" }}>
                        <Calendar size={11} /> {edu.period}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "var(--cyan)", fontWeight: 600, fontFamily: "var(--font-mono)" }}>
                        <Star size={11} /> CGPA: {edu.cgpa}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.875rem", color: "var(--text-300)", marginBottom: "1.25rem" }}>
                    Specialization: <span style={{ color: "var(--text-100)", fontWeight: 500 }}>{edu.specialization}</span>
                  </p>

                  {/* Coursework */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--text-400)",
                        letterSpacing: "0.08em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      KEY COURSEWORK
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            padding: "0.25rem 0.625rem",
                            borderRadius: 6,
                            border: "1px solid var(--border)",
                            color: "var(--text-400)",
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .edu-layout { flex-direction: row !important; }
          .edu-meta { align-items: flex-end !important; }
        }
        @media (max-width: 767px) {
          .edu-meta { align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}

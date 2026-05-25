"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { experience } from "@/data/experience";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section-py"
      style={{ backgroundColor: "var(--bg-1)", position: "relative" }}
    >
      <div className="orb orb-indigo" style={{ width: 350, height: 350, top: "10%", left: "-5%", opacity: 0.06 }} />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
          <span className="section-label">experience</span>
          <h2 className="section-title">Work & Training</h2>
          <p className="section-subtitle">Building real skills through hands-on engineering.</p>
        </motion.div>

        <div style={{ position: "relative" }}>
          {/* Vertical rail line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: "linear-gradient(to bottom, transparent, var(--indigo) 10%, var(--cyan) 90%, transparent)",
              opacity: 0.3,
              display: "none",
            }}
            className="timeline-rail-line"
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.12)}
                style={{ position: "relative", paddingLeft: "0" }}
                className="exp-row"
              >
                {/* Dot */}
                <div
                  className="exp-dot"
                  style={{
                    position: "absolute",
                    left: "-1.25rem",
                    top: "1.75rem",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--indigo)",
                    border: "2px solid var(--bg-1)",
                    boxShadow: "0 0 0 3px rgba(99,102,241,0.25), 0 0 12px rgba(99,102,241,0.4)",
                    display: "none",
                  }}
                />

                {/* Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: "1.75rem 2rem",
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
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      {/* Role */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "rgba(99,102,241,0.1)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Briefcase size={16} style={{ color: "var(--indigo)" }} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-100)", lineHeight: 1.2 }}>
                            {exp.role}
                          </h3>
                          <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--indigo)" }}>{exp.company}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", alignItems: "flex-end", flexShrink: 0 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          padding: "0.25rem 0.625rem",
                          borderRadius: 6,
                          border: "1px solid rgba(99,102,241,0.3)",
                          background: "rgba(99,102,241,0.08)",
                          color: "#818cf8",
                        }}
                      >
                        {exp.type}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-400)", fontFamily: "var(--font-mono)" }}>
                        <Calendar size={11} /> {exp.period}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-400)", fontFamily: "var(--font-mono)" }}>
                        <MapPin size={11} /> {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.8, color: "var(--text-300)", marginBottom: "1rem" }}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {exp.achievements.map((a) => (
                      <li key={a} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-300)" }}>
                        <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: "0.25rem" }}>▸</span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  {/* Tech */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          padding: "0.2rem 0.575rem",
                          borderRadius: 5,
                          border: "1px solid var(--border)",
                          color: "var(--text-400)",
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .timeline-rail-line { display: block !important; }
          .exp-row { padding-left: 2rem !important; }
          .exp-dot { display: block !important; }
        }
      `}</style>
    </section>
  );
}

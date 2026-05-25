"use client";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/LinkedinIcon";
import { Mail } from "lucide-react";

const GRID_ITEMS = [
  {
    id: "bio",
    colSpan: "lg:col-span-2",
    content: (
      <div style={{ padding: "2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--indigo)",
            letterSpacing: "0.08em",
            marginBottom: "1rem",
          }}
        >
          // about.me
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text-100)",
            letterSpacing: "0.04em",
            marginBottom: "1.25rem",
            lineHeight: 1.1,
            textTransform: "uppercase",
          }}
        >
          Engineering{" "}
          <span className="text-gradient">Intelligent</span>{" "}
          Systems
        </h2>
        <p
          style={{
            fontSize: "0.9875rem",
            lineHeight: 1.8,
            color: "var(--text-300)",
            marginBottom: "1rem",
          }}
        >
          I&apos;m Syed Fouzan — AI Engineer and Full Stack Developer completing my
          B.E. in Computer Science (AI &amp; ML) at{" "}
          <span style={{ color: "var(--text-200)" }}>R.L. Jalappa Institute of Technology, VTU</span>{" "}
          with a CGPA of <span style={{ color: "var(--cyan)" }}>8.11/10</span>.
        </p>
        <p
          style={{
            fontSize: "0.9875rem",
            lineHeight: 1.8,
            color: "var(--text-300)",
          }}
        >
          My work spans{" "}
          <span style={{ color: "var(--cyan)", fontWeight: 500 }}>real-time computer vision</span>{" "}
          (YOLOv8, MediaPipe),{" "}
          <span style={{ color: "var(--indigo)", fontWeight: 500 }}>agentic LLM systems</span>{" "}
          (Gemini API, RAG), and{" "}
          <span style={{ color: "var(--violet)", fontWeight: 500 }}>full-stack platforms</span>{" "}
          (React, Next.js, Flask). IEEE published. Multiple award-winner.
        </p>
      </div>
    ),
  },
  {
    id: "status",
    colSpan: "lg:col-span-1",
    content: (
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            marginBottom: "1.5rem",
          }}
        >
          <span className="status-dot" />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#34d399",
              letterSpacing: "0.04em",
            }}
          >
            Available for work
          </span>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          {/* Angular HUD frame avatar */}
          <div style={{
            position: "relative",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
          }}>
            {/* Corner brackets */}
            <svg style={{ position: "absolute", inset: 0 }} width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M0 16 L0 0 L16 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M56 16 L56 0 L40 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M0 40 L0 56 L16 56" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.7" />
              <path d="M56 40 L56 56 L40 56" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.7" />
              <rect x="8" y="8" width="40" height="40" stroke="rgba(0,212,255,0.12)" strokeWidth="1" />
            </svg>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "1rem",
              color: "var(--cyan)",
              letterSpacing: "0.05em",
              textShadow: "0 0 12px rgba(0,212,255,0.8)",
            }}>SF</span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-100)",
            }}
          >
            Syed Fouzan
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-400)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            LOC: BANGALORE, INDIA &nbsp;·&nbsp; ROLE: AI ENGINEER
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { href: "https://github.com/syed-fouzaan", icon: <GithubIcon size={14} />, label: "GH" },
            { href: "https://www.linkedin.com/in/syed-fouzan-404461283", icon: <LinkedinIcon size={14} />, label: "LI" },
            { href: "mailto:syedfouzaan00@gmail.com", icon: <Mail size={14} />, label: "ML" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                width: 36,
                height: 36,
                border: "1px solid var(--border-hud)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-400)",
                transition: "all 0.2s ease",
                borderRadius: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--cyan)";
                e.currentTarget.style.color = "var(--cyan)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0,212,255,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border-hud)";
                e.currentTarget.style.color = "var(--text-400)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

const STATS = [
  { value: "8.11", label: "CGPA", sub: "VTU · AI & ML" },
  { value: "5+", label: "AI Projects", sub: "Shipped & deployed" },
  { value: "IEEE", label: "Published", sub: "Apr 2026" },
  { value: "3×", label: "Award Winner", sub: "Hackathon & Expo" },
];

const SKILLS_QUICK = [
  "YOLOv8", "MediaPipe", "OpenCV", "Gemini API",
  "PyTorch", "React", "Next.js", "Flask", "Python", "TypeScript",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-py"
      style={{ backgroundColor: "var(--bg-0)", position: "relative" }}
    >
      {/* Subtle bg glow */}
      <div
        className="orb orb-indigo"
        style={{ width: 500, height: 500, top: "20%", right: "-10%", opacity: 0.06 }}
      />

      <div className="section-container">
        {/* Section label */}
        <motion.div {...fadeUp(0)}>
          <span className="section-label">ABOUT</span>
        </motion.div>

        {/* Main bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
          className="about-grid"
        >
          {GRID_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              {...fadeUp(i * 0.1 + 0.05)}
              className={`glass-card ${item.colSpan}`}
            >
              {item.content}
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.07 + 0.2)}
              className="glass-card"
              style={{ padding: "1.25rem 1.5rem", textAlign: "center" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
                className="text-gradient"
              >
                {stat.value}
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-200)" }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-400)", marginTop: "0.125rem" }}>
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick skills tags */}
        <motion.div {...fadeUp(0.35)} className="glass-card" style={{ padding: "1.25rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-400)",
              letterSpacing: "0.08em",
              marginBottom: "0.875rem",
            }}
          >
            CORE STACK
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {SKILLS_QUICK.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  color: "var(--text-300)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 2fr 1fr !important; }
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

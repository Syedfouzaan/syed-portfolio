"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Mail, Cpu, Shield, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/LinkedinIcon";

const ROLES = [
  "AI ENGINEER",
  "COMPUTER VISION ENGINEER",
  "FULL STACK DEVELOPER",
  "LLM & AGENTIC AI BUILDER",
];

const STATS = [
  { label: "PROJECTS DEPLOYED", value: "25+", icon: Cpu },
  { label: "AI MODELS BUILT", value: "12+", icon: Zap },
  { label: "YEARS EXPERIENCE", value: "3+", icon: Shield },
];

// Typewriter cursor
function Cursor() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "2px",
        height: "1em",
        background: "var(--cyan)",
        marginLeft: "2px",
        verticalAlign: "middle",
        boxShadow: "0 0 8px var(--cyan)",
        animation: "blink-cursor 1s step-end infinite",
      }}
    />
  );
}

// HUD corner brackets SVG
function HUDBracket({ className }: { className?: string }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* TL */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
        <path d="M0 18 L0 0 L18 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
      </svg>
      {/* TR */}
      <svg style={{ position: "absolute", top: 0, right: 0, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
        <path d="M24 18 L24 0 L6 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
      </svg>
      {/* BL */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
        <path d="M0 6 L0 24 L18 24" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
      </svg>
      {/* BR */}
      <svg style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24 }} viewBox="0 0 24 24" fill="none">
        <path d="M24 6 L24 24 L6 24" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

// HUD stat card
function StatCard({ label, value, icon: Icon, delay }: { label: string; value: string; icon: typeof Cpu; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      style={{
        position: "relative",
        padding: "1rem 1.25rem",
        background: "rgba(10, 16, 32, 0.7)",
        border: "1px solid var(--border-hud)",
        backdropFilter: "blur(12px)",
        flex: "1",
        minWidth: 120,
      }}
    >
      <HUDBracket />
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
        <Icon size={11} color="var(--cyan)" strokeWidth={1.5} />
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          color: "var(--text-400)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}>
          {label}
        </span>
      </div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--cyan)",
        textShadow: "0 0 12px rgba(0,212,255,0.5)",
        letterSpacing: "0.05em",
      }}>
        {value}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];

    if (!isDeleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 70);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, 35);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }
  }, [roleIndex, charIndex, isDeleting]);

  // HUD readout counter
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "130px",
      }}
    >
      {/* HUD grid background */}
      <div
        className="grid-bg"
        style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }}
      />

      {/* Ambient glow orbs */}
      <div className="orb orb-indigo" style={{ width: 500, height: 500, top: "-10%", left: "-10%", opacity: 0.06 }} />
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: "10%", right: "5%", opacity: 0.05 }} />

      {/* HUD header readout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          position: "absolute",
          top: "68px",
          left: "1.5rem",
          right: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span className="hud-readout" style={{ color: "var(--text-400)" }}>
          SYS:PORTFOLIO_v4.1 &nbsp;|&nbsp; STATUS:ONLINE
        </span>
        <span className="hud-readout" style={{ color: "var(--cyan)", opacity: 0.7 }}>
          FRAME:{String(tick % 9999).padStart(4, "0")} &nbsp;|&nbsp; LOC:12.9716°N
        </span>
      </motion.div>

      {/* Main content */}
      <div
        style={{
          maxWidth: 1240,
          width: "100%",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ maxWidth: 680 }}
        >
          {/* System tag */}
          <div
            className="section-label"
            style={{ marginBottom: "1.75rem", display: "inline-flex" }}
          >
            <span className="status-dot" style={{ marginRight: "0.375rem" }} />
            ONLINE &nbsp;·&nbsp; SYED FOUZAN PORTFOLIO
          </div>

          {/* Name */}
          <div style={{ marginBottom: "0.5rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--cyan)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.5rem",
              }}>
                &gt; IDENTITY.CONFIRMED
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--text-100)",
                lineHeight: 1.0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              SYED
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                lineHeight: 1.0,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                background: "linear-gradient(135deg, var(--cyan) 0%, var(--indigo) 60%, var(--violet) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 0 30px rgba(0,212,255,0.35))",
              }}
            >
              FOUZAN
            </motion.h1>
          </div>

          {/* Role typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.75rem, 2vw, 1.0rem)",
              color: "var(--cyan)",
              letterSpacing: "0.14em",
              marginBottom: "1.75rem",
              height: "1.6em",
              display: "flex",
              alignItems: "center",
              minHeight: 32,
            }}
          >
            <span style={{ color: "var(--text-400)", marginRight: "0.5rem" }}>&gt;</span>
            {displayText}
            <Cursor />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontSize: "1rem",
              color: "var(--text-300)",
              lineHeight: 1.85,
              marginBottom: "2.25rem",
              maxWidth: "52ch",
              fontFamily: "var(--font-body)",
            }}
          >
            Building intelligent systems at the intersection of computer vision, LLMs,
            and scalable full-stack architecture. 3+ years engineering production AI solutions
            that push the boundaries of what machines can perceive and decide.
          </motion.p>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {STATS.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.7 + i * 0.1} />
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              href="#contact"
              className="btn btn-primary btn-lg"
              aria-label="Contact Syed Fouzan"
            >
              <Mail size={16} strokeWidth={1.5} />
              INITIATE CONTACT
            </a>

            <a
              href="#projects"
              className="btn btn-secondary btn-lg"
              aria-label="View Projects"
            >
              VIEW PROJECTS
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>

            <a
              href="/resume.pdf"
              download
              className="btn btn-ghost btn-lg"
              aria-label="Download Resume"
              style={{ borderColor: "rgba(0,212,255,0.2)" }}
            >
              <Download size={15} strokeWidth={1.5} />
              RESUME.PDF
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{ display: "flex", gap: "1rem", marginTop: "1.75rem" }}
          >
            <a
              href="https://github.com/syed-fouzaan"
              target="_blank" rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-400)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                padding: "0.4rem 0.75rem",
                border: "1px solid var(--border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hud)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-400)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <GithubIcon size={13} />
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/syed-fouzan-404461283"
              target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-400)",
                letterSpacing: "0.1em",
                textDecoration: "none",
                padding: "0.4rem 0.75rem",
                border: "1px solid var(--border)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hud)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-400)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <LinkedinIcon size={13} />
              LINKEDIN
            </a>
          </motion.div>
        </motion.div>

        {/* Right column — HUD display frame */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            display: "none",
            position: "relative",
            height: "clamp(320px, 45vw, 580px)",
          }}
          className="hero-canvas-col"
        />
      </div>

      {/* Bottom HUD scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          color: "var(--text-400)",
          letterSpacing: "0.2em",
        }}>
          SCROLL TO PROCEED
        </span>
        <div style={{
          width: "1px",
          height: "40px",
          background: "linear-gradient(to bottom, var(--cyan), transparent)",
          animation: "fade-up 1.5s ease-in-out infinite",
        }} />
      </motion.div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/LinkedinIcon";
import { projects } from "@/data/projects";
import { useAppStore } from "@/stores/useAppStore";
import type { Project } from "@/types";

const FILTERS = ["All", "Computer Vision", "LLM", "AI/ML", "Web App"];

const CAT_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  "Computer Vision": { bg: "rgba(6,182,212,0.1)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
  "LLM":             { bg: "rgba(167,139,250,0.1)", text: "#c4b5fd", border: "rgba(167,139,250,0.3)" },
  "AI/ML":           { bg: "rgba(99,102,241,0.1)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  "Web App":         { bg: "rgba(16,185,129,0.1)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cat = CAT_STYLE[project.category] ?? CAT_STYLE["AI/ML"];

  return (
    <motion.article
      {...fadeUp(0)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View details for ${project.title}`}
      style={{
        background: "rgba(11,22,41,0.7)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "1.5rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        height: "100%",
      }}
      whileHover={{
        y: -6,
        borderColor: cat.border,
        boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${cat.border}`,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          {project.category}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            fontFamily: "var(--font-mono)",
            padding: "0.2rem 0.5rem",
            borderRadius: 99,
            border: "1px solid rgba(16,185,129,0.3)",
            background: "rgba(16,185,129,0.08)",
            color: "#34d399",
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.125rem",
          fontWeight: 700,
          color: "var(--text-100)",
          lineHeight: 1.25,
        }}
      >
        {project.title}
      </h3>

      {/* Short description */}
      <p style={{ fontSize: "0.875rem", color: "var(--text-300)", lineHeight: 1.7, flex: 1 }}>
        {project.shortDesc}
      </p>

      {/* Key metric */}
      <div
        style={{
          padding: "0.625rem 0.875rem",
          borderRadius: 10,
          background: cat.bg,
          border: `1px solid ${cat.border}`,
        }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-400)", marginBottom: "0.2rem" }}>
          KEY METRIC
        </p>
        <p style={{ fontWeight: 600, fontSize: "0.85rem", color: cat.text }}>
          {project.metrics[0].value} — {project.metrics[0].label}
        </p>
      </div>

      {/* Tech stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.675rem",
              padding: "0.2rem 0.5rem",
              borderRadius: 5,
              border: "1px solid var(--border)",
              color: "var(--text-400)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.675rem",
              padding: "0.2rem 0.5rem",
              borderRadius: 5,
              border: "1px solid var(--border)",
              color: "var(--text-400)",
            }}
          >
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.25rem", borderTop: "1px solid var(--border)" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--text-400)", textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-100)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-400)")}
        >
          <GithubIcon size={13} /> Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--text-400)", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = cat.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-400)")}
          >
            <ExternalLink size={13} /> Demo
          </a>
        )}
        <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: cat.text, fontFamily: "var(--font-mono)" }}>
          Details →
        </span>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [tab, setTab] = useState<"problem" | "solution" | "architecture">("problem");
  const cat = CAT_STYLE[project.category] ?? CAT_STYLE["AI/ML"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3,7,18,0.88)",
        backdropFilter: "blur(14px)",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 20,
          background: "rgba(10,16,35,0.98)",
          border: `1px solid ${cat.border}`,
          boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${cat.border}`,
          padding: "2rem",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                padding: "0.25rem 0.625rem",
                borderRadius: 6,
                border: `1px solid ${cat.border}`,
                background: cat.bg,
                color: cat.text,
                display: "inline-block",
                marginBottom: "0.625rem",
              }}
            >
              {project.category}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.625rem", fontWeight: 700, color: "var(--text-100)" }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "0.5rem",
              cursor: "pointer",
              color: "var(--text-300)",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"; e.currentTarget.style.color = "#f87171"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-300)"; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Full desc */}
        <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--text-300)", marginBottom: "1.75rem" }}>
          {project.fullDesc}
        </p>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(project.metrics.length, 3)}, 1fr)`, gap: "0.75rem", marginBottom: "1.75rem" }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                textAlign: "center",
                padding: "0.875rem",
                borderRadius: 12,
                background: cat.bg,
                border: `1px solid ${cat.border}`,
              }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: cat.text, marginBottom: "0.25rem" }}>
                {m.value}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-400)" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {(["problem", "solution", "architecture"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "0.4rem 0.875rem",
                borderRadius: 8,
                border: `1px solid ${tab === t ? cat.border : "var(--border)"}`,
                background: tab === t ? cat.bg : "transparent",
                color: tab === t ? cat.text : "var(--text-400)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ borderRadius: 12, padding: "1.125rem", background: "rgba(3,7,18,0.8)", border: "1px solid var(--border)", fontSize: "0.875rem", lineHeight: 1.75, color: "var(--text-300)", marginBottom: "1.5rem" }}>
          {project[tab]}
        </div>

        {/* Challenges */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-400)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
            CHALLENGES OVERCOME
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {project.challenges.map((c) => (
              <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-300)" }}>
                <span style={{ color: cat.text, flexShrink: 0, marginTop: "0.2rem" }}>▸</span> {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
          {project.tech.map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", padding: "0.25rem 0.625rem", borderRadius: 6, border: "1px solid var(--border)", color: "var(--text-400)", background: "rgba(255,255,255,0.02)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-md"
            style={{ flex: 1, justifyContent: "center" }}
          >
            <GithubIcon size={15} /> View Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md"
              style={{ flex: 1, justifyContent: "center" }}
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const { selectedProject, setSelectedProject } = useAppStore();

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const modalProject = projects.find((p) => p.id === selectedProject);

  return (
    <>
      <section
        id="projects"
        className="section-py"
        style={{ backgroundColor: "var(--bg-0)", position: "relative" }}
      >
        <div className="orb orb-indigo" style={{ width: 400, height: 400, top: "5%", right: "0%", opacity: 0.07 }} />
        <div className="orb orb-cyan" style={{ width: 300, height: 300, bottom: "10%", left: "5%", opacity: 0.05 }} />

        <div className="section-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: "3rem", textAlign: "center" }}>
            <span className="section-label">projects</span>
            <h2 className="section-title">Selected Work</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Real systems. Real metrics. Production-grade AI engineering.
            </p>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}
          >
            {FILTERS.map((f) => {
              const c = CAT_STYLE[f];
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: 99,
                    border: `1px solid ${isActive && c ? c.border : "var(--border)"}`,
                    background: isActive && c ? c.bg : "transparent",
                    color: isActive && c ? c.text : "var(--text-400)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "var(--border-accent)"; e.currentTarget.style.color = "var(--text-200)"; } }}
                  onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-400)"; } }}
                >
                  {f}
                </button>
              );
            })}
          </motion.div>

          {/* Project grid */}
          <AnimatePresence mode="popLayout">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: "1.25rem",
              }}
              className="projects-grid"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project.id)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1280px) { .projects-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </>
  );
}

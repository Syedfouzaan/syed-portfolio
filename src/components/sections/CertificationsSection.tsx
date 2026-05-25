"use client";
import { motion } from "framer-motion";
import { ExternalLink, Shield } from "lucide-react";
import { certifications } from "@/data/certifications";

const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "AI/ML":    { bg: "rgba(167,139,250,0.1)", text: "#c4b5fd", border: "rgba(167,139,250,0.3)" },
  "Frontend": { bg: "rgba(99,102,241,0.1)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  "Cloud":    { bg: "rgba(6,182,212,0.1)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
  "Backend":  { bg: "rgba(16,185,129,0.1)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
  "Tools":    { bg: "rgba(245,158,11,0.1)",  text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="section-py"
      style={{ backgroundColor: "var(--bg-1)", position: "relative" }}
    >
      <div className="orb orb-violet" style={{ width: 350, height: 350, bottom: "10%", right: "-5%", opacity: 0.05 }} />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem" }}>
          <span className="section-label">certifications</span>
          <h2 className="section-title">Verified Credentials</h2>
          <p className="section-subtitle">Verified credentials from industry leaders in AI, Cloud, and Web Architecture.</p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "1.25rem",
          }}
          className="certs-grid"
        >
          {certifications.map((cert, i) => {
            const cat = CAT_COLORS[cert.category] ?? CAT_COLORS["AI/ML"];
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
                {/* Top layout */}
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: cat.bg,
                      border: `1px solid ${cat.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Shield size={18} style={{ color: cat.text }} />
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
                    {cert.category}
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
                    {cert.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: cat.text, fontWeight: 500 }}>
                    {cert.provider}
                  </p>
                </div>

                {/* Date */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-400)" }}>
                    ISSUED: {cert.year}
                  </span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: "auto",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.75rem",
                      color: "var(--text-400)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = cat.text)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-400)")}
                  >
                    <ExternalLink size={12} /> Verify
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .certs-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 1024px) { .certs-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}

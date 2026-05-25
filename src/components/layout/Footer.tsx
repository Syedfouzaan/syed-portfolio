"use client";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/LinkedinIcon";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "var(--bg-0)",
        padding: "3rem 0",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--indigo), var(--cyan))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#fff",
              }}
            >
              SF
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.0625rem",
                color: "var(--text-100)",
              }}
            >
              Syed Fouzan
            </p>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-400)",
              letterSpacing: "0.04em",
              textAlign: "center",
            }}
          >
            AI Engineer · Computer Vision · Full Stack Developer
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[
              { href: "https://github.com/syed-fouzaan", icon: <GithubIcon size={17} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/syed-fouzan-404461283", icon: <LinkedinIcon size={17} />, label: "LinkedIn" },
              { href: "mailto:syedfouzaan00@gmail.com", icon: <Mail size={17} />, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "9px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-400)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-accent)";
                  e.currentTarget.style.color = "var(--text-100)";
                  e.currentTarget.style.backgroundColor = "rgba(99,102,241,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-400)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, backgroundColor: "var(--border)" }} />

          {/* Copyright */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--text-400)",
            }}
          >
            <span>© {new Date().getFullYear()} Syed Fouzan</span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span>
              Built with{" "}
              <span style={{ color: "var(--indigo)" }}>Next.js 15</span> +{" "}
              <span style={{ color: "var(--cyan)" }}>Three.js</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

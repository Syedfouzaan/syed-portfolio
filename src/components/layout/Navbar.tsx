"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { useAppStore } from "@/stores/useAppStore";

const NAV_LINKS = [
  { href: "#home",          label: "HOME",    code: "01" },
  { href: "#about",         label: "ABOUT",   code: "02" },
  { href: "#skills",        label: "SKILLS",  code: "03" },
  { href: "#projects",      label: "PROJECTS",code: "04" },
  { href: "#experience",    label: "EXP",     code: "05" },
  { href: "#education",     label: "EDU",     code: "06" },
  { href: "#certifications",label: "CERTS",   code: "07" },
  { href: "#achievements",  label: "WINS",    code: "08" },
  { href: "#contact",       label: "CONTACT", code: "09" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const { mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(0,212,255,0.12)"
            : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(3,4,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(150%)" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Scan line on header bottom */}
        {scrolled && (
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--cyan), var(--indigo), transparent)",
            opacity: 0.4,
          }} />
        )}

        <div className="section-container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              aria-label="Home"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              {/* HUD logo */}
              <div style={{
                position: "relative",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* Corners */}
                <svg style={{ position: "absolute", inset: 0 }} width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M0 10 L0 0 L10 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.8" />
                  <path d="M36 10 L36 0 L26 0" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.8" />
                  <path d="M0 26 L0 36 L10 36" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.8" />
                  <path d="M36 26 L36 36 L26 36" stroke="var(--cyan)" strokeWidth="1.5" strokeOpacity="0.8" />
                </svg>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "0.7rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 10px rgba(0,212,255,0.8)",
                }}>
                  SF
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "var(--text-200)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "none",
                }}
                className="sm:block"
              >
                SYED FOUZAN
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "0.125rem" }} aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  aria-current={active === link.href ? "page" : undefined}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.35rem 0.7rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    color: active === link.href ? "var(--cyan)" : "var(--text-400)",
                    textShadow: active === link.href ? "0 0 10px rgba(0,212,255,0.6)" : "none",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={e => {
                    if (active !== link.href) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-200)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (active !== link.href) {
                      (e.currentTarget as HTMLElement).style.color = "var(--text-400)";
                    }
                  }}
                >
                  <span style={{ color: "var(--border-hud)", marginRight: "0.25rem", opacity: 0.6 }}>{link.code}.</span>
                  {link.label}
                  {active === link.href && (
                    <div style={{
                      position: "absolute",
                      bottom: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "70%",
                      height: "1px",
                      background: "var(--cyan)",
                      boxShadow: "0 0 6px var(--cyan)",
                    }} />
                  )}
                </button>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <a
                href="/resume.pdf"
                download
                className="btn btn-primary btn-sm hidden sm:inline-flex"
                aria-label="Download Resume"
              >
                <Download size={12} />
                RESUME
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid var(--border-hud)",
                  borderRadius: "0",
                  padding: "0.45rem 0.5rem",
                  cursor: "pointer",
                  color: "var(--cyan)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-72"
            style={{
              background: "rgba(3,4,10,0.98)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid var(--border-hud)",
              padding: "5rem 1.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {/* Mobile header */}
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              color: "var(--text-400)",
              letterSpacing: "0.18em",
              marginBottom: "1.25rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--border-hud)",
            }}>
              NAVIGATION SYSTEM
            </div>

            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: active === link.href ? "rgba(0,212,255,0.06)" : "transparent",
                  border: "1px solid",
                  borderColor: active === link.href ? "rgba(0,212,255,0.2)" : "transparent",
                  borderRadius: "0",
                  padding: "0.7rem 1rem",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  color: active === link.href ? "var(--cyan)" : "var(--text-300)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ opacity: 0.4, fontSize: "0.6rem" }}>{link.code}</span>
                {link.label}
              </motion.button>
            ))}

            <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-hud)" }}>
              <a
                href="/resume.pdf"
                download
                className="btn btn-primary btn-md"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Download size={13} /> DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

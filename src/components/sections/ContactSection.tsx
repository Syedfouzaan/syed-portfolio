"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Clock } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/LinkedinIcon";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try emailing me directly.");
    }
  };

  return (
    <section
      id="contact"
      className="section-py"
      style={{ backgroundColor: "var(--bg-1)", position: "relative" }}
    >
      <div className="orb orb-cyan" style={{ width: 450, height: 450, bottom: "-5%", left: "-10%", opacity: 0.06 }} />

      <div className="section-container">
        <motion.div {...fadeUp(0)} style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <span className="section-label">contact</span>
          <h2 className="section-title">Let&apos;s Build Something</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Open to AI engineering roles, collaborative research, and scalable full-stack developments.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="contact-grid">
          {/* Info Column */}
          <motion.div {...fadeUp(0.08)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="glass-card" style={{ padding: "2rem", height: "100%" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-100)", marginBottom: "1rem" }}>
                Initiate Connection
              </h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-300)", marginBottom: "1.75rem" }}>
                Whether you have an open opportunity, a project proposal, or simply want to debate computer vision vs LLM limits, drop a line.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  {
                    icon: <Mail size={16} />,
                    label: "Email",
                    value: "syedfouzaan00@gmail.com",
                    href: "mailto:syedfouzaan00@gmail.com",
                  },
                  {
                    icon: <LinkedinIcon size={16} />,
                    label: "LinkedIn",
                    value: "syed-fouzan-404461283",
                    href: "https://www.linkedin.com/in/syed-fouzan-404461283",
                  },
                  {
                    icon: <GithubIcon size={16} />,
                    label: "GitHub",
                    value: "syed-fouzaan",
                    href: "https://github.com/syed-fouzaan",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      padding: "1rem 0",
                      borderBottom: "1px solid var(--border)",
                      textDecoration: "none",
                      color: "var(--text-300)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-100)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-300)";
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "rgba(99,102,241,0.08)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--indigo)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <span style={{ display: "block", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-400)", textTransform: "uppercase" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--text-400)", marginTop: "2rem", fontFamily: "var(--font-mono)" }}>
                <Clock size={12} style={{ color: "var(--cyan)" }} />
                RESPONSE SPEED: &lt; 24 HOURS
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div {...fadeUp(0.15)} className="form-col">
            <div className="glass-card" style={{ padding: "2rem" }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <CheckCircle2 size={32} style={{ color: "var(--emerald)" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--text-100)", marginBottom: "0.5rem" }}>
                    Transmission Successful
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-300)" }}>
                    Thank you. Your message has been logged. I will follow up shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="form-inputs-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-400)", marginBottom: "0.5rem" }}>
                        NAME
                      </label>
                      <input
                        type="text"
                        placeholder="Elon Musk"
                        className={`input-field ${errors.name ? "error" : ""}`}
                        suppressHydrationWarning
                        {...register("name")}
                      />
                      {errors.name && (
                        <span style={{ display: "block", color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-400)", marginBottom: "0.5rem" }}>
                        EMAIL
                      </label>
                      <input
                        type="email"
                        placeholder="elon@spacex.com"
                        className={`input-field ${errors.email ? "error" : ""}`}
                        suppressHydrationWarning
                        {...register("email")}
                      />
                      {errors.email && (
                        <span style={{ display: "block", color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-400)", marginBottom: "0.5rem" }}>
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="Opportunities at SpaceX"
                      className={`input-field ${errors.subject ? "error" : ""}`}
                      suppressHydrationWarning
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <span style={{ display: "block", color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        {errors.subject.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-400)", marginBottom: "0.5rem" }}>
                      MESSAGE
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Hi Syed, I reviewed your CV pipeline and RAG benchmarks..."
                      style={{ resize: "vertical" }}
                      className={`input-field ${errors.message ? "error" : ""}`}
                      suppressHydrationWarning
                      {...register("message")}
                    />
                    {errors.message && (
                      <span style={{ display: "block", color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {serverError && (
                    <span style={{ display: "block", color: "#f87171", fontSize: "0.85rem", textAlign: "center" }}>
                      {serverError}
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <Send size={16} /> {isSubmitting ? "Transmitting..." : "Transmit Message"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 2fr 3fr !important; }
          .form-inputs-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

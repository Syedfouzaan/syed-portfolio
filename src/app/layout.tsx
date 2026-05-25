import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://syedfouzan.dev"),
  title: {
    default: "Syed Fouzan — AI Engineer & Full Stack Developer",
    template: "%s | Syed Fouzan",
  },
  description:
    "AI Engineer and Full Stack Developer specializing in computer vision, LLM pipelines, and scalable web architecture. Based in Bangalore, India.",
  keywords: [
    "Syed Fouzan",
    "AI Engineer",
    "Computer Vision",
    "YOLOv8",
    "Full Stack Developer",
    "Next.js",
    "Machine Learning",
    "LLM",
    "Bangalore",
  ],
  authors: [{ name: "Syed Fouzan", url: "https://syedfouzan.dev" }],
  creator: "Syed Fouzan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://syedfouzan.dev",
    siteName: "Syed Fouzan Portfolio",
    title: "Syed Fouzan — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent systems at the intersection of computer vision, LLMs, and scalable web architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Fouzan — AI Engineer",
    description: "AI Engineer | Computer Vision | LLM Pipelines | Full Stack",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Syed Fouzan",
  url: "https://syedfouzan.dev",
  email: "syedfouzaan00@gmail.com",
  jobTitle: "AI Engineer",
  worksFor: { "@type": "Organization", name: "Dhee Coding Lab" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "R.L. Jalappa Institute of Technology, VTU" },
  knowsAbout: ["Computer Vision", "Machine Learning", "Python", "React", "Next.js", "LLM"],
  sameAs: [
    "https://github.com/syed-fouzaan",
    "https://www.linkedin.com/in/syed-fouzan-404461283",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Orbitron + Space Grotesk + JetBrains Mono + Inter + Fira Code */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

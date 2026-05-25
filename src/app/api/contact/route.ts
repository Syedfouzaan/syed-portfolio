import { z } from "zod/v4";

// Simple in-memory rate limiter: 3 requests per IP per hour
const rateLimit = new Map<string, { count: number; reset: number }>();

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(4),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (limit) {
    if (now < limit.reset && limit.count >= 3) {
      return Response.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429 }
      );
    }
    if (now >= limit.reset) {
      rateLimit.set(ip, { count: 1, reset: now + 3600000 });
    } else {
      rateLimit.set(ip, { count: limit.count + 1, reset: limit.reset });
    }
  } else {
    rateLimit.set(ip, { count: 1, reset: now + 3600000 });
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  // Send email via Resend (only if API key present)
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio Contact <contact@syedfouzan.dev>",
        to: "syedfouzaan00@gmail.com",
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } catch (err) {
      console.error("Email send failed:", err);
      // Still return success so the form doesn't block the user
    }
  }

  return Response.json({ success: true });
}

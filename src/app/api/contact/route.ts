import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatMessageToHtml } from "@/lib/format-to-html";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required").max(5000),
  honeypot: z.string().max(0).optional(),
});

const ALLOWED_ORIGINS = [
  "https://satyamdas.site",
  "https://www.satyamdas.site",
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  // Layer 1: Content-Type check
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 }
    );
  }

  // Layer 2: Origin check (production only)
  if (process.env.NODE_ENV === "production") {
    const origin = request.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Layer 3: Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0].trim() || "unknown";
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    const retryAfterSeconds = Math.ceil((rateCheck.retryAfterMs || 0) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Layer 4: Zod validation
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return NextResponse.json(
      { error: firstError.message },
      { status: 400 }
    );
  }

  const { name, email, message, honeypot } = result.data;

  // Layer 5: Honeypot check — silent success (no email sent)
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  // Layer 6 & 7: HTML escaping + formatted message
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const formattedMessage = formatMessageToHtml(message);

  // Build email HTML for notification to site owner (plain Gmail-style)
  const notificationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#111;line-height:1.6;">
  <div>${formattedMessage}</div>
</body>
</html>`;

  // Build confirmation email HTML for the sender (plain Gmail-style)
  const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#111;line-height:1.7;">
  <p>Hi ${safeName},</p>
  <p>Thanks for contacting me through my website &mdash; I&rsquo;ve successfully received your message.</p>
  <p>I&rsquo;ll review your inquiry and get back to you within <strong>24 hours</strong>.</p>
  <p>If you&rsquo;d like, you can reply to this email with any information you may have missed while submitting the form, such as:</p>
  <ul style="margin:0;padding-left:20px;">
    <li>Project overview or idea</li>
    <li>Type of website / application</li>
    <li>References or examples</li>
    <li>Expected timeline</li>
    <li>Budget considerations (optional)</li>
    <li>Available assets or materials</li>
  </ul>
  <p>Even rough details are perfectly fine 🙂</p>
  <p>
    Best regards,<br>
    <strong>Satyam Das</strong><br>
    Freelance Web Developer
  </p>
</body>
</html>`;

  try {
    // Send both emails in parallel
    await Promise.all([
      resend.emails.send({
        from: "Portfolio Contact <mail@satyamdas.site>",
        to: "hi@satyamdas.site",
        replyTo: email,
        subject: `New message from ${name}`,
        html: notificationHtml,
      }),
      resend.emails.send({
        from: "Satyam Das <mail@satyamdas.site>",
        to: email,
        replyTo: "hi@satyamdas.site",
        subject: "Thanks for reaching out — Message received 👍",
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { subscribeSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { success, remaining } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, name, source } = parsed.data;

  const existing = await prisma.subscriber.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { success: true, message: "You're already on the list!", position: existing.position },
      { status: 200 }
    );
  }

  const confirmToken = randomBytes(32).toString("hex");

  const subscriber = await prisma.subscriber.create({
    data: {
      email,
      name,
      source,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent"),
      confirmToken,
    },
  });

  const confirmUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/waitlist/confirm?token=${confirmToken}`;

  try {
    await getResend().emails.send({
      from: process.env.EMAIL_FROM || "MVP Launchpad <noreply@example.com>",
      to: email,
      subject: "Confirm your waitlist signup",
      html: `
        <h2>Welcome to MVP Launchpad!</h2>
        <p>Please confirm your email to secure your spot on the waitlist.</p>
        <a href="${confirmUrl}" style="display:inline-block;padding:12px 24px;background:#6366f1;color:white;text-decoration:none;border-radius:8px;">Confirm Email</a>
        <p style="color:#666;margin-top:16px;">If you didn't sign up, you can safely ignore this email.</p>
      `,
    });
  } catch {
    // Email sending failed but subscription is recorded
    console.error("Failed to send confirmation email");
  }

  return NextResponse.json(
    {
      success: true,
      position: subscriber.position,
      message: "Check your email to confirm!",
    },
    {
      status: 201,
      headers: { "X-RateLimit-Remaining": String(remaining) },
    }
  );
}

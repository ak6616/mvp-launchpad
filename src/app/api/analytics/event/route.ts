import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyticsEventSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = analyticsEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { eventType, sessionId, referrer, utmSource, utmMedium, utmCampaign, metadata } =
    parsed.data;

  await prisma.analyticsEvent.create({
    data: {
      eventType,
      sessionId,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
    },
  });

  return NextResponse.json({ success: true }, { status: 201 });
}

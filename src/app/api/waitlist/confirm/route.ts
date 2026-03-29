import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || token.length !== 64) {
    return NextResponse.json(
      { error: "Invalid or missing confirmation token" },
      { status: 400 }
    );
  }

  const subscriber = await prisma.subscriber.findFirst({
    where: { confirmToken: token },
  });

  if (!subscriber) {
    return NextResponse.json(
      { error: "Invalid confirmation token" },
      { status: 404 }
    );
  }

  if (subscriber.confirmed) {
    return NextResponse.redirect(
      new URL("/thank-you?already=true", request.url)
    );
  }

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: { confirmed: true, confirmToken: null },
  });

  // Track confirmation event
  await prisma.analyticsEvent.create({
    data: { eventType: "confirmed" },
  });

  return NextResponse.redirect(new URL("/thank-you", request.url));
}

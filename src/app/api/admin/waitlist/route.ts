import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const url = request.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10)));
  const search = url.searchParams.get("search") || "";
  const confirmedOnly = url.searchParams.get("confirmed") === "true";

  const where = {
    ...(search ? { email: { contains: search, mode: "insensitive" as const } } : {}),
    ...(confirmedOnly ? { confirmed: true } : {}),
  };

  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.subscriber.count({ where }),
  ]);

  return NextResponse.json({
    subscribers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const url = request.nextUrl;
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing subscriber id" }, { status: 400 });
  }

  const subscriber = await prisma.subscriber.findUnique({ where: { id } });
  if (!subscriber) {
    return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
  }

  await prisma.subscriber.delete({ where: { id } });

  return NextResponse.json({ success: true, message: "Subscriber removed" });
}

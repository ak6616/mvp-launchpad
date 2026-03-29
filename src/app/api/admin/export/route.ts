import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { position: "asc" },
  });

  const headers = ["position", "email", "name", "source", "confirmed", "created_at"];
  const csvRows = [headers.join(",")];

  for (const sub of subscribers) {
    csvRows.push(
      [
        sub.position,
        `"${sub.email}"`,
        `"${sub.name || ""}"`,
        `"${sub.source || ""}"`,
        sub.confirmed,
        sub.createdAt.toISOString(),
      ].join(",")
    );
  }

  const csv = csvRows.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="waitlist-export-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}

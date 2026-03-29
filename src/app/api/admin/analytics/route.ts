import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const days = Math.min(
    90,
    Math.max(1, parseInt(request.nextUrl.searchParams.get("days") || "30", 10))
  );
  const since = new Date();
  since.setDate(since.getDate() - days);

  const [funnel, topSources, dailySignups, totalSubscribers, confirmedSubscribers] =
    await Promise.all([
      prisma.analyticsEvent.groupBy({
        by: ["eventType"],
        _count: { id: true },
        where: { createdAt: { gte: since } },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["utmSource"],
        _count: { id: true },
        where: {
          createdAt: { gte: since },
          utmSource: { not: null },
        },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),
      prisma.subscriber.groupBy({
        by: ["createdAt"],
        _count: { id: true },
        where: { createdAt: { gte: since } },
      }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { confirmed: true } }),
    ]);

  const funnelMap: Record<string, number> = {};
  for (const row of funnel) {
    funnelMap[row.eventType] = row._count.id;
  }

  const pageViews = funnelMap["page_view"] || 0;
  const conversionRate =
    pageViews > 0 ? ((totalSubscribers / pageViews) * 100).toFixed(2) + "%" : "0%";

  return NextResponse.json({
    funnel: {
      page_views: pageViews,
      cta_clicks: funnelMap["cta_click"] || 0,
      form_submits: funnelMap["form_submit"] || 0,
      confirmed: funnelMap["confirmed"] || 0,
    },
    conversion_rate: conversionRate,
    total_subscribers: totalSubscribers,
    confirmed_subscribers: confirmedSubscribers,
    top_sources: topSources.map((s) => ({
      source: s.utmSource,
      count: s._count.id,
    })),
    daily_signups: dailySignups.map((d) => ({
      date: d.createdAt,
      count: d._count.id,
    })),
  });
}

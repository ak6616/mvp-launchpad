"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  MousePointerClick,
  UserPlus,
  Target,
  Loader2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface Analytics {
  funnel: {
    page_views: number;
    cta_clicks: number;
    form_submits: number;
    confirmed: number;
  };
  conversion_rate: string;
  total_subscribers: number;
  confirmed_subscribers: number;
  top_sources: { source: string; count: number }[];
  daily_signups: { date: string; count: number }[];
}

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#c084fc", "#e879f9", "#818cf8"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/analytics?days=${days}`);
        if (res.ok) {
          setData(await res.json());
        }
      } catch {
        // Network error
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [days]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24 text-zinc-500">
        Failed to load analytics data
      </div>
    );
  }

  const funnelData = [
    { name: "Page Views", value: data.funnel.page_views },
    { name: "CTA Clicks", value: data.funnel.cta_clicks },
    { name: "Form Submits", value: data.funnel.form_submits },
    { name: "Confirmed", value: data.funnel.confirmed },
  ];

  const dailyData = data.daily_signups.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    signups: d.count,
  }));

  return (
    <div className="space-y-6">
      {/* Date range selector */}
      <div className="flex items-center gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              days === d
                ? "bg-indigo-500/20 text-indigo-400"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
            }`}
          >
            Last {d}d
          </button>
        ))}
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Eye className="w-5 h-5 text-indigo-400" />}
          label="Page Views"
          value={data.funnel.page_views}
        />
        <MetricCard
          icon={<MousePointerClick className="w-5 h-5 text-purple-400" />}
          label="CTA Clicks"
          value={data.funnel.cta_clicks}
        />
        <MetricCard
          icon={<UserPlus className="w-5 h-5 text-green-400" />}
          label="Total Signups"
          value={data.total_subscribers}
        />
        <MetricCard
          icon={<Target className="w-5 h-5 text-yellow-400" />}
          label="Conversion Rate"
          value={data.conversion_rate}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily signups line chart */}
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-300 mb-4">
            Signups Over Time
          </h3>
          {dailyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" tick={{ fill: "#71717a", fontSize: 12 }} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    color: "#fafafa",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="signups"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: "#6366f1", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-zinc-500 text-sm text-center py-12">
              No signup data yet
            </p>
          )}
        </div>

        {/* Funnel bar chart */}
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-300 mb-4">
            Conversion Funnel
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #3f3f46",
                  borderRadius: "8px",
                  color: "#fafafa",
                }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources pie chart */}
        {data.top_sources.length > 0 && (
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-300 mb-4">
              Traffic Sources
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data.top_sources.map((s) => ({
                    name: s.source,
                    value: s.count,
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {data.top_sources.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #3f3f46",
                    borderRadius: "8px",
                    color: "#fafafa",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Subscribers summary */}
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-300 mb-4">
            Subscriber Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total subscribers</span>
              <span className="text-lg font-bold text-white">
                {data.total_subscribers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Confirmed</span>
              <span className="text-lg font-bold text-green-400">
                {data.confirmed_subscribers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Pending</span>
              <span className="text-lg font-bold text-yellow-400">
                {data.total_subscribers - data.confirmed_subscribers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Conversion rate</span>
              <span className="text-lg font-bold text-indigo-400">
                {data.conversion_rate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-xs text-zinc-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

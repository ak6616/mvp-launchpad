"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  LayoutDashboard,
  BarChart3,
  Globe,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Animated Landing Pages",
    description:
      "Stunning, conversion-optimized templates ready in minutes.",
  },
  {
    icon: Mail,
    title: "Email Waitlist Capture",
    description:
      "Collect and manage signups with built-in double opt-in.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "Manage your list, segment users, export CSV anytime.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion",
    description:
      "Track page views, signups, and conversion rates in real time.",
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Connect your own domain in one click.",
  },
  {
    icon: Users,
    title: "Referral Engine",
    description:
      "Viral loop — reward subscribers who invite friends.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400 mb-3">
            Everything You Need
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Built for founders who move fast
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

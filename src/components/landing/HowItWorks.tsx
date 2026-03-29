"use client";

import { motion } from "framer-motion";
import { FileEdit, Share2, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    number: "01",
    title: "Create your page",
    description: "Customize your hero, colors, and copy in minutes.",
  },
  {
    icon: Share2,
    number: "02",
    title: "Share your link",
    description: "One URL to share anywhere — social, email, ads.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Watch signups grow",
    description: "Track analytics and export your list anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-zinc-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400 mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-6">
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs font-bold text-indigo-400 mb-2">
                STEP {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

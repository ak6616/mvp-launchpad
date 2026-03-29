"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "1 landing page",
      "Up to 1,000 signups",
      "Basic analytics",
      "MVP Launchpad branding",
      "Email export",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    features: [
      "Unlimited pages",
      "Unlimited signups",
      "Advanced analytics",
      "Custom domain + remove branding",
      "Referral engine + integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400 mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Simple, transparent pricing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`p-8 rounded-2xl border ${
                plan.highlighted
                  ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-lg shadow-indigo-500/10"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block w-full text-center py-3 rounded-full font-medium text-sm transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

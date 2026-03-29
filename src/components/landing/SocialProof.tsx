"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "MVP Launchpad helped us validate our idea in a weekend. The waitlist grew to 500 in the first week.",
    name: "Sarah Chen",
    title: "CEO, LaunchKit",
    rating: 5,
  },
  {
    quote: "The admin panel and analytics are exactly what we needed. No more spreadsheets!",
    name: "Marcus Johnson",
    title: "Founder, DataFlow",
    rating: 5,
  },
  {
    quote: "Beautiful templates, easy setup, and the conversion tracking is a game-changer.",
    name: "Elena Rodriguez",
    title: "Co-Founder, PixelSync",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-indigo-400 mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Trusted by founders worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

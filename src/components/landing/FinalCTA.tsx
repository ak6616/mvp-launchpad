"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to launch?
        </h2>
        <p className="text-lg text-indigo-100 mb-8">
          Join thousands of founders building their next big thing.
        </p>
        <div className="flex justify-center">
          <WaitlistForm variant="inline" />
        </div>
      </motion.div>
    </section>
  );
}

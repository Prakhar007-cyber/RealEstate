"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

/* Animated success confirmation shared by both auth forms. */
export default function AuthSuccess({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center py-8 text-center"
    >
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full border border-gold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 260 }}
        >
          <Check className="h-9 w-9 text-gold" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
      <h2 className="mt-8 font-serif text-3xl font-light text-ivory">{title}</h2>
      <p className="mt-3 max-w-xs text-sm text-stone">{message}</p>
    </motion.div>
  );
}

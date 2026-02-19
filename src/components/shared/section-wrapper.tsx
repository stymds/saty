"use client";

import { motion } from "motion/react";

export function SectionWrapper({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-24 px-6 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </motion.section>
  );
}

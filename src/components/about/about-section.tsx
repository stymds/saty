"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
];

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-heading md:text-4xl"
      >
        Who I am?
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-3 h-px w-12 origin-left bg-accent-cyan"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 max-w-2xl text-base leading-relaxed text-sub md:text-lg"
      >
        I&apos;m a freelance web developer focused on building fast, polished, and user-centric web applications.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 max-w-2xl text-base leading-relaxed text-sub md:text-lg"
      >
        I work primarily with Next.js and modern web technologies to design and develop products that are clean, performant, and easy to scale — from SaaS MVPs and dashboards to landing pages and e-commerce experiences.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 max-w-2xl text-base leading-relaxed text-sub md:text-lg"
      >
        My approach is simple: build things that look great, feel intuitive, and work reliably.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-sub md:text-lg"
      >
        Here are some technologies I have been working with:
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {techStack.map((tech) => (
          <span
            key={tech}
            className="glass glass-hover rounded-full px-3 py-1 text-xs font-medium text-sub"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

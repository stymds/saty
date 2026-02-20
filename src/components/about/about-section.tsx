"use client";

import { LayoutGroup, motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Shadcn",
  "Motion",
  "GASP",
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
        Who I Am?
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-3 h-px w-12 origin-left bg-accent-cyan"
      />

      <div className="mt-6 flex flex-col md:flex-row md:items-start md:gap-12">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base leading-relaxed text-sub md:text-lg"
          >
            I&apos;m a freelance web developer focused on building fast,
            polished, and user-centric web applications.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-base leading-relaxed text-sub md:text-lg"
          >
            I work primarily with Next.js and modern web technologies to design
            and develop products that are clean, performant, and easy to scale —
            from SaaS MVPs and dashboards to landing pages and e-commerce
            experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-base leading-relaxed text-sub md:text-lg"
          >
            My approach is simple: build things that look great, feel intuitive,
            and work reliably.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap gap-4 md:mt-0 md:max-w-xs md:justify-center"
        >
          <LayoutGroup>
            {techStack.map((tech) => (
              <motion.span
                key={tech}
                layout
                whileHover={{ scale: 1.15, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group relative cursor-default rounded-full px-5 py-2.5 text-sm font-medium text-accent-cyan"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.789 0.154 195 / 12%), oklch(0.789 0.154 195 / 4%))",
                  boxShadow: [
                    "inset 0 1px 0 oklch(0.789 0.154 195 / 15%)",
                    "inset 0 -1px 1px oklch(0 0 0 / 30%)",
                    "0 2px 8px oklch(0.789 0.154 195 / 10%)",
                    "0 4px 16px oklch(0 0 0 / 40%)",
                  ].join(", "),
                  border: "1px solid oklch(0.789 0.154 195 / 18%)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(1 0 0 / 10%) 0%, oklch(1 0 0 / 3%) 35%, transparent 60%)",
                  }}
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.789 0.154 195 / 20%) 0%, oklch(0.789 0.154 195 / 6%) 35%, transparent 60%)",
                    boxShadow:
                      "inset 0 1px 0 oklch(0.789 0.154 195 / 25%), 0 0 20px oklch(0.789 0.154 195 / 15%)",
                  }}
                />
                <span className="relative">{tech}</span>
              </motion.span>
            ))}
          </LayoutGroup>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

"use client";

import { motion } from "motion/react";
import { Monitor, Rocket, LayoutDashboard, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Monitor,
    title: "Landing Pages",
    description:
      "High-converting, responsive landing pages built with Next.js and Tailwind CSS. Fast, accessible, and designed to impress.",
  },
  {
    icon: Rocket,
    title: "SaaS MVPs",
    description:
      "Full-stack MVP development — auth, dashboards, billing, and database. Ship your idea fast without cutting corners.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards & Admin Panels",
    description:
      "Data-rich admin interfaces with charts, role-based access, and real-time updates. Built to scale with your business.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Apps",
    description:
      "Integrate OpenAI and intelligent features into your product. From smart assistants to AI-driven workflows and automation.",
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-heading md:text-4xl"
      >
        What I Offer?
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-3 h-px w-12 origin-left bg-accent-cyan"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
          >
            <Card className="glass glass-hover rounded-2xl p-0 gap-0">
              <CardContent className="p-6">
                <service.icon className="h-6 w-6 text-accent-cyan" />
                <h3 className="mt-4 text-lg font-semibold text-heading">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

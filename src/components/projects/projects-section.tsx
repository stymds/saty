"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { ProjectCard } from "@/components/shared/project-card";

const projects = [
  {
    title: "VibeList",
    description:
      "AI-powered SaaS that generates Spotify playlists from text prompts or images. Describe a mood, upload a photo — get a perfect playlist.",
    tech: ["Next.js", "OpenAI", "Spotify", "Supabase"],
    status: "Live",
    linkText: "View project",
  },
  {
    title: "Bitebox",
    description:
      "A food ordering and meal subscription platform with real-time tracking, menu customization, and integrated payments.",
    tech: ["Next.js", "Node.js", "Supabase", "Razorpay"],
    status: "In Development",
    linkText: "Coming soon",
  },
  {
    title: "PulseCom",
    description:
      "E-commerce analytics dashboard providing real-time insights into sales, customer behavior, and inventory trends.",
    tech: ["Next.js", "Supabase", "Tailwind", "Charts"],
    status: "Coming Soon",
    linkText: "Coming soon",
  },
];

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-heading md:text-4xl"
      >
        Explore My Work:
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-3 h-px w-12 origin-left bg-accent-cyan"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            tech={project.tech}
            status={project.status}
            linkText={project.linkText}
            index={index}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

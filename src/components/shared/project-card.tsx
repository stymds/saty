"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  status: string;
  statusColor?: string;
  linkText?: string;
  linkHref?: string;
  index?: number;
}

export function ProjectCard({
  title,
  description,
  tech,
  status,
  linkText,
  linkHref = "#",
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 * index }}
    >
      <Card className="group glass glass-hover rounded-2xl p-0 gap-0 h-full">
        <CardContent className="py-7 px-6 flex flex-col h-full">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-accent-cyan">
              {status}
            </span>
          </div>

          <h3 className="text-lg font-bold text-heading mt-3">{title}</h3>

          <p className="text-sm text-dim leading-relaxed mt-2 grow">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge
                key={t}
                className="bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 rounded-sm"
              >
                {t}
              </Badge>
            ))}
          </div>

          {linkText && (
            <a
              href={linkHref}
              className="text-sm text-heading mt-4 inline-flex items-center gap-1 hover:text-accent-cyan transition-colors"
            >
              {linkText}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
                &rarr;
              </span>
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

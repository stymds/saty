"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-heading md:text-4xl"
      >
        Let’s Work Together
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
        className="mt-6 max-w-xl text-base leading-relaxed text-sub md:text-lg"
      >
        Have a project in mind or idea? Feel free to reach out —
        I&apos;m always Open to freelance & collaborations.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-xl space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Tell me about your project..."
            rows={5}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="bg-accent-cyan text-zinc-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <Send size={18} />
          Send message
        </Button>
      </motion.form>

    </SectionWrapper>
  );
}

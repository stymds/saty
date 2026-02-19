"use client";

import { motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-xl"
      >
        <Card className="glass glass-hover rounded-2xl p-0 gap-0">
          <CardContent className="py-7 px-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium uppercase tracking-widest text-dim">
                  NAME
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="bg-white/5 border-white/10 placeholder:text-dim"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium uppercase tracking-widest text-dim">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/5 border-white/10 placeholder:text-dim"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-medium uppercase tracking-widest text-dim">
                  MESSAGE
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-white/5 border-white/10 placeholder:text-dim resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent-cyan text-zinc-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] lowercase tracking-wide"
              >
                send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

    </SectionWrapper>
  );
}

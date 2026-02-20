"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { formatMessage } from "./format-text";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [manualFlip, setManualFlip] = useState<boolean | null>(null);

  const hasContent = !!(name || email || message);
  const isFlipped = manualFlip !== null ? manualFlip : hasContent;

  const formattedMessage = formatMessage(message);

  return (
    <SectionWrapper id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-3xl font-bold text-heading md:text-4xl"
      >
        Let&apos;s Work Together
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
        I&apos;m always Open to freelance &amp; collaborations.
      </motion.p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch items-start max-w-5xl">
        {/* LEFT: Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass glass-hover rounded-2xl p-0 gap-0">
            <CardContent className="py-7 px-6">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs font-medium uppercase tracking-widest text-dim"
                  >
                    NAME
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setManualFlip(null);
                    }}
                    className="bg-white/5 border-white/10 placeholder:text-dim"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-widest text-dim"
                  >
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setManualFlip(null);
                    }}
                    className="bg-white/5 border-white/10 placeholder:text-dim"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-xs font-medium uppercase tracking-widest text-dim"
                  >
                    MESSAGE
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={7}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setManualFlip(null);
                    }}
                    className="bg-white/5 border-white/10 placeholder:text-dim resize-none !field-sizing-fixed overflow-y-auto"
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

        {/* RIGHT: Preview flip-card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-full"
        >
          <div className="perspective-1000 h-full">
            <div
              className={`relative preserve-3d transition-transform duration-500 h-full ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* FRONT — Formatting guide */}
              <Card className="glass rounded-2xl p-0 gap-0 backface-hidden h-full">
                <CardContent className="py-7 px-6 relative">
                  <button
                    type="button"
                    onClick={() =>
                      setManualFlip((prev) =>
                        prev === null ? !hasContent : !prev
                      )
                    }
                    className="absolute top-4 right-4 text-dim hover:text-heading transition-colors z-10"
                    aria-label="Flip to preview"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <h3 className="text-xs font-medium uppercase tracking-widest text-dim mb-4">
                    formatting guide
                  </h3>

                  <div className="space-y-4">
                    {/* STYLE */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-dim/60 mb-1.5">style</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        {/* col 1 */}
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">*bold*</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <strong className="text-heading">bold</strong>
                        </div>
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">_italic_</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <em className="text-heading">italic</em>
                        </div>
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">+under+</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <u className="text-heading">under</u>
                        </div>
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">~strike~</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <s className="text-heading">strike</s>
                        </div>
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">`code`</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <span><code className="bg-sub/10 px-1 rounded text-sub">code</code></span>
                        </div>
                        <div className="grid grid-cols-[4rem_1rem_1fr] items-center">
                          <code className="text-accent-cyan font-mono">- item</code>
                          <span className="text-dim text-center">&rarr;</span>
                          <span className="text-heading">&bull; item</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5" />

                    {/* SIZE & COLOR */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-dim/60 mb-1.5">size &amp; color</p>
                      <div className="grid grid-cols-[5.5rem_1rem_1fr] gap-y-2 items-center text-xs">
                        <code className="text-accent-cyan font-mono">{"{big:text}"}</code>
                        <span className="text-dim text-center">&rarr;</span>
                        <span className="text-heading text-lg leading-none">big</span>

                        <code className="text-accent-cyan font-mono">{"{small:text}"}</code>
                        <span className="text-dim text-center">&rarr;</span>
                        <span className="text-heading text-[10px]">small</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-red-400">{"{red:t}"}</span>
                        <span className="text-pink-400">{"{pink:t}"}</span>
                        <span className="text-yellow-400">{"{yellow:t}"}</span>
                        <span className="text-green-400">{"{green:t}"}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/5" />

                    {/* LINK */}
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-dim/60 mb-1.5">link</p>
                      <div className="grid grid-cols-[5.5rem_1rem_1fr] items-center text-xs">
                        <code className="text-accent-cyan font-mono">[text](url)</code>
                        <span className="text-dim text-center">&rarr;</span>
                        <span className="text-cyan-400 underline decoration-cyan-400/50">link</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-dim">
                    start typing to see preview &rarr;
                  </p>
                </CardContent>
              </Card>

              {/* BACK — Live preview */}
              <Card className="glass rounded-2xl p-0 gap-0 backface-hidden rotate-y-180 absolute inset-0">
                <CardContent className="py-7 px-6 relative">
                  <button
                    type="button"
                    onClick={() =>
                      setManualFlip((prev) =>
                        prev === null ? !hasContent : !prev
                      )
                    }
                    className="absolute top-4 right-4 text-dim hover:text-heading transition-colors z-10"
                    aria-label="Flip to formatting guide"
                  >
                    <RotateCcw size={16} />
                  </button>

                  <h3 className="text-xs font-medium uppercase tracking-widest text-dim mb-6">
                    message preview
                  </h3>

                  <div className="space-y-5 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-dim mb-1">
                        to
                      </p>
                      <p className="text-accent-cyan">hi@satyamdas.site</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-dim mb-1">
                        from
                      </p>
                      <p className={email ? "text-sub" : "text-dim italic"}>
                        {email || "you@example.com"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-dim mb-1">
                        message
                      </p>
                      <div
                        className={
                          message ? "text-sub leading-relaxed overflow-y-auto max-h-32 custom-scrollbar" : "text-dim italic"
                        }
                      >
                        {formattedMessage || "Your message will appear here..."}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-dim mb-1">
                        regards
                      </p>
                      <p
                        className={
                          name ? "text-heading font-medium" : "text-dim italic"
                        }
                      >
                        {name || "Your name"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

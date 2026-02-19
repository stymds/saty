import Image from "next/image";
import { FolderKanban, MessageSquare } from "lucide-react";
import { Typewriter } from "@/components/hero/typewriter";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full">
      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Image column — top on mobile, left on desktop */}
          <div className="flex items-center justify-center">
            <Image
              src="/hero-left.png"
              alt="Saty"
              width={400}
              height={480}
              priority
              className="mx-auto max-w-[280px] sm:max-w-[340px] md:max-w-[400px]"
            />
          </div>

          {/* Text column — bottom on mobile, right on desktop */}
          <div className="text-center md:text-left">
            <Typewriter />
            <div className="mt-12 flex items-center justify-center gap-4 md:justify-start">
              <Button asChild size="lg" className="bg-accent-cyan text-zinc-950 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                <a href="#contact">
                  <MessageSquare size={18} />
                  let&apos;s talk
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="#projects">
                  <FolderKanban size={18} />
                  my work
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

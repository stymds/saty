import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x={2} y={2} width={20} height={20} rx={5} />
      <circle cx={12} cy={12} r={5} />
      <circle cx={17.5} cy={6.5} r={1.5} fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="text-sm text-dim">
          &copy; 2026 Satyam Das
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:hi@satyamdas.site" className="text-dim transition-colors hover:text-heading">
            <Mail className="h-5 w-5" />
          </a>
          <a href="https://instagram.com/saty.site" target="_blank" rel="noopener noreferrer" className="text-dim transition-colors hover:text-heading">
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dim transition-colors hover:text-heading">
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

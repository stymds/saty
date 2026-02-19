import { User, Briefcase, FolderKanban, Mail } from "lucide-react";

const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="inline-block text-2xl font-bold tracking-tighter text-heading transition-transform duration-300 ease-out hover:scale-110">
          saty
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-lg text-sub transition-colors duration-200 hover:text-heading after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-accent-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile icon nav */}
        <ul className="flex items-center gap-6 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sub transition-colors duration-200 hover:text-heading"
                  aria-label={item.label}
                >
                  <Icon size={20} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

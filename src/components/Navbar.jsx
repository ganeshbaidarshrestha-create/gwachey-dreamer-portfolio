import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";

export function Navbar({ sections }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    sectionElements.forEach((section) => observer.observe(section));

    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, [isOpen]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Container className="pt-4">
        <div
          className={`border px-4 py-3 transition duration-500 sm:px-6 ${
            isScrolled
              ? "glass-panel border-white/10 shadow-soft"
              : "border-white/5 bg-transparent"
          } ${isOpen ? "rounded-[2rem]" : "rounded-full"}`}
        >
          <div className="flex items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="group flex items-center gap-3 text-left"
              aria-label="Go to home section"
            >
              <img
                src="/gwacheydreamer-logo.png"
                alt="Gwachey Dreamer logo"
                className="h-11 w-11 rounded-full border border-white/10 bg-white/5 object-cover p-1"
              />
              <div>
                <div className="font-display text-sm uppercase tracking-cinematic text-slate transition group-hover:text-white">
                  Gwachey Dreamer
                </div>
                <div className="mt-1 text-sm text-white/80">Ganesh Baidar Shrestha</div>
              </div>
            </button>

            <nav className="hidden items-center gap-2 lg:flex">
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={`relative rounded-full px-4 py-2 text-sm transition ${
                      isActive ? "text-white" : "text-slate hover:text-white"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full bg-white/8"
                        transition={{ type: "spring", stiffness: 280, damping: 26 }}
                      />
                    ) : null}
                    <span className="relative z-10">{section.label}</span>
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              onClick={() => setIsOpen((value) => !value)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 pb-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                        activeSection === section.id
                          ? "bg-white/8 text-white"
                          : "text-slate hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </Container>
    </header>
  );
}

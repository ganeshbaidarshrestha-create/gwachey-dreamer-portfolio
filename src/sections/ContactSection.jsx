import { motion } from "framer-motion";
import { Facebook, Github, Instagram, Mail, MoveRight, Music4 } from "lucide-react";
import { Container } from "../components/Container";
import { socialLinks } from "../lib/content";

export function ContactSection() {
  const openExternalLink = (href) => {
    if (!href || href === "#") return;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const platformIcons = {
    Instagram,
    Facebook,
    TikTok: Music4,
    GitHub: Github,
  };

  const platformStyles = {
    Instagram: {
      button: "hover:border-[#d9a3d6]/30 hover:bg-[#d9a3d6]/[0.06]",
      badge: "border-[#d9a3d6]/18 bg-[#d9a3d6]/[0.08] text-[#f1d8ed] group-hover:border-[#d9a3d6]/35 group-hover:bg-[#d9a3d6]/[0.16] group-hover:text-[#f8e4f5]",
    },
    Facebook: {
      button: "hover:border-[#8db2ff]/30 hover:bg-[#8db2ff]/[0.06]",
      badge: "border-[#8db2ff]/18 bg-[#8db2ff]/[0.08] text-[#dce8ff] group-hover:border-[#8db2ff]/35 group-hover:bg-[#8db2ff]/[0.16] group-hover:text-[#eef4ff]",
    },
    TikTok: {
      button: "hover:border-[#9fe7db]/30 hover:bg-[#9fe7db]/[0.06]",
      badge: "border-[#9fe7db]/18 bg-[#9fe7db]/[0.08] text-[#dcfffa] group-hover:border-[#9fe7db]/35 group-hover:bg-[#9fe7db]/[0.16] group-hover:text-white",
    },
    GitHub: {
      button: "hover:border-[#c6ccd6]/28 hover:bg-[#c6ccd6]/[0.06]",
      badge: "border-[#c6ccd6]/18 bg-[#c6ccd6]/[0.08] text-[#eef1f5] group-hover:border-[#c6ccd6]/35 group-hover:bg-[#c6ccd6]/[0.16] group-hover:text-white",
    },
  };

  return (
    <section id="contact" className="section-shell relative py-24 sm:py-32 lg:py-36">
      <Container>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="glass-panel overflow-hidden rounded-[2.5rem] p-8 sm:p-10 lg:p-14"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr,0.75fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Contact</p>
              <h2 className="mt-5 font-display text-4xl leading-tight text-white sm:text-5xl lg:text-[4.2rem]">
                Let's build something that feels alive.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate sm:leading-9">
                Open to collaborations, product ideas, design-forward digital work, and meaningful creative conversations.
              </p>

              <a
                href="mailto:ganeshbaidarshrestha@gmail.com"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white px-6 py-3.5 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Mail size={18} />
                ganeshbaidarshrestha@gmail.com
              </a>
            </div>

            <div className="space-y-5">
              {socialLinks.filter((link) => link.href && link.href !== "#").map((link) => {
                const Icon = platformIcons[link.label] ?? MoveRight;
                const styles = platformStyles[link.label] ?? {
                  button: "hover:border-white/20 hover:bg-white/5",
                  badge: "border-white/12 bg-white/[0.06] text-white group-hover:border-white/20 group-hover:bg-white/[0.1]",
                };

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => openExternalLink(link.href)}
                    className={`group flex w-full items-center justify-between rounded-[1.4rem] border border-white/10 px-5 py-4 text-sm text-slate transition hover:text-white ${styles.button}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${styles.badge}`}>
                        <Icon size={17} strokeWidth={2.2} className="shrink-0" />
                      </span>
                      <span>{link.label}</span>
                    </span>
                    <MoveRight size={16} className="transition group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

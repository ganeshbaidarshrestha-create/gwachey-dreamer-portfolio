import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "../components/Container";
import { SectionIntro } from "../components/SectionIntro";

export function ProjectsSection({ items, onOpenCaseStudy }) {
  return (
    <section
      id="work"
      className="section-shell relative border-b border-white/6 py-24 sm:py-32 lg:py-36"
    >
      <Container>
        <SectionIntro
          eyebrow="Selected Work"
          title="Digital products built with ambition, clarity, and a strong sense of direction."
          body="Platforms, products, and systems shaped with clarity, usefulness, and a distinct point of view."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2 xl:gap-7">
          {items.length ? items.map((project, index) => (
            <motion.article
              key={project.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101b]/90 p-7 shadow-card transition duration-500 hover:-translate-y-1 hover:border-white/16 sm:p-8"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70`} />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_36%,rgba(0,0,0,0.22))]" />
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="relative flex h-full flex-col">
                {project.image ? (
                  <div className="mb-7 overflow-hidden rounded-[1.6rem] border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-52 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate">
                      {project.category}
                    </p>
                    <h3 className="mt-4 max-w-md font-display text-[2rem] leading-tight text-white sm:text-[2.2rem]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-slate transition group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-slate">
                  <span className="rounded-full border border-white/10 px-3 py-1.5">{project.year}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">{project.status}</span>
                </div>

                <p className="mt-8 flex-1 max-w-xl text-base leading-8 text-slate sm:leading-9">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy?.(project)}
                  className="mt-10 inline-flex w-fit items-center gap-2 text-sm text-white transition group-hover:text-ember"
                >
                  View Case Study
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.article>
          )) : (
            <div className="glass-panel rounded-[2rem] p-8 text-center lg:col-span-2">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-slate">Work Shelf</p>
              <h3 className="mt-4 font-serif text-3xl italic text-white">Projects will appear here.</h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate sm:leading-9">
                Add project entries from the admin dashboard to bring this shelf to life.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

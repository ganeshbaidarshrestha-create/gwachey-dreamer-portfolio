import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Layers3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../components/Container";

function buildFallbackCaseStudy(project) {
  return {
    headline: project.description,
    summary:
      "A focused concept shaped into a more complete case study view, showing the product direction, system thinking, and tone behind the work.",
    challenge:
      "The goal was to shape the idea into a clearer digital product direction with stronger structure, better user trust, and more coherent storytelling.",
    outcome:
      "The result is a more articulated product concept that communicates intent, value, and the broader system behind the interface direction.",
    metrics: [
      { label: "Primary Focus", value: project.category || "Product Direction" },
      { label: "Status", value: project.status || "Concept" },
      { label: "Timeline", value: project.year || "Ongoing" },
    ],
    pillars: project.tags?.length
      ? project.tags.map((tag) => `Built around ${tag.toLowerCase()} as a defining direction.`)
      : [
          "Clear concept framing",
          "Stronger product storytelling",
          "A more premium presentation layer",
        ],
  };
}

export function CaseStudyPage({ project, onBack, onOpenPoetryBook }) {
  const caseStudy = project.caseStudy ?? buildFallbackCaseStudy(project);
  const galleryImages = project.gallery?.length
    ? project.gallery
    : project.image
      ? [project.image]
      : [];
  const heroImage = galleryImages[0] || "";
  const supportingImages = heroImage ? galleryImages.slice(1) : galleryImages;

  return (
    <section className="section-shell relative min-h-screen overflow-hidden border-b border-white/6 py-24 sm:py-28 lg:py-32">
      <div className="case-study-backdrop pointer-events-none absolute inset-0" />

      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
          <button
            type="button"
            onClick={onOpenPoetryBook}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
          >
            Visit Poetry Book
            <ArrowUpRight size={16} />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 grid gap-8 lg:grid-cols-[1.05fr,0.95fr]"
        >
          <div className="glass-panel relative overflow-hidden rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent || "from-white/10 via-transparent to-transparent"} opacity-80`} />
            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-slate">
                <BriefcaseBusiness size={15} />
                Case Study
              </div>
              <p className="mt-8 text-[0.68rem] uppercase tracking-[0.35em] text-slate">
                {project.category} / {project.year}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] leading-[0.94] text-white sm:text-6xl lg:text-[4.9rem]">
                {project.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl sm:leading-9">
                {caseStudy.headline}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-slate"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-[1.7rem] p-6">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate">{metric.label}</p>
                <p className="mt-3 font-serif text-3xl italic text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="editorial-panel rounded-[2rem] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3 text-slate">
              <Layers3 size={18} />
              <p className="text-[0.68rem] uppercase tracking-[0.34em]">Project Overview</p>
            </div>
            <p className="mt-6 text-base leading-8 text-mist sm:text-lg sm:leading-9">
              {caseStudy.summary}
            </p>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.05 }}
            className="glass-panel rounded-[2rem] p-7 sm:p-8"
          >
            <div className="flex items-center gap-3 text-slate">
              <Sparkles size={18} />
              <p className="text-[0.68rem] uppercase tracking-[0.34em]">Direction Pillars</p>
            </div>
            <div className="mt-6 space-y-4">
              {caseStudy.pillars.map((pillar) => (
                <div key={pillar} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm leading-7 text-mist">{pillar}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.article
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="glass-panel rounded-[2rem] p-7 sm:p-8"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-slate">Challenge</p>
            <h2 className="mt-5 font-serif text-3xl italic text-white">What needed to change</h2>
            <p className="mt-6 text-base leading-8 text-mist sm:leading-9">{caseStudy.challenge}</p>
          </motion.article>

          <motion.article
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.05 }}
            className="editorial-panel rounded-[2rem] p-7 sm:p-8"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-slate">Outcome</p>
            <h2 className="mt-5 font-serif text-3xl italic text-white">What the concept became</h2>
            <p className="mt-6 text-base leading-8 text-mist sm:leading-9">{caseStudy.outcome}</p>
          </motion.article>
        </div>

        <div className="mt-10">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="glass-panel rounded-[2rem] p-7 sm:p-8"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-slate">Gallery</p>
                <h2 className="mt-5 font-serif text-3xl italic text-white">Built Screens & Visuals</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-mist">
                This section now prioritizes the actual project imagery you add from the admin dashboard, so each case study feels like a real product build instead of a concept card.
              </p>
            </div>

            {galleryImages.length ? (
              <div className="mt-8 grid gap-4 xl:grid-cols-[1.18fr,0.82fr]">
                <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03]">
                  <img
                    src={heroImage}
                    alt={`${project.title} primary preview`}
                    className="h-[22rem] w-full object-cover sm:h-[28rem] xl:h-[34rem]"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {supportingImages.length ? (
                    supportingImages.map((image, index) => (
                      <div
                        key={`${project.title}-gallery-${index + 1}`}
                        className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
                      >
                        <img
                          src={image}
                          alt={`${project.title} gallery ${index + 2}`}
                          className="h-52 w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-56 xl:h-[10.35rem]"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
                      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-slate">Image Focus</p>
                      <h3 className="mt-3 font-serif text-2xl italic text-white">Primary Build View</h3>
                      <p className="mt-4 text-sm leading-7 text-mist">
                        This project currently has one uploaded hero image. Add more gallery frames from the admin dashboard to expand the case study story.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(project.tags || ["System Thinking", "Premium Direction", "Product Story"]).slice(0, 3).map((tag, index) => (
                  <div
                    key={`${project.title}-fallback-${tag}`}
                    className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07101b]/90 p-6"
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent || "from-white/10 via-transparent to-transparent"} opacity-70`} />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%,rgba(0,0,0,0.2))]" />
                    <div className="relative flex h-64 flex-col justify-between">
                      <p className="text-[0.62rem] uppercase tracking-[0.3em] text-slate">
                        Frame {index + 1}
                      </p>
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.3em] text-slate">
                          Visual Motif
                        </p>
                        <h3 className="mt-3 font-serif text-3xl italic text-white">{tag}</h3>
                        <p className="mt-4 max-w-xs text-sm leading-7 text-mist">
                          Add your real project screens from the admin dashboard and they will appear here as the visual case study gallery.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {supportingImages.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${project.title}-thumb-${index}`}
                    className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.03]"
                  >
                    <img
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="h-28 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

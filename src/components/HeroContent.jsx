import { motion } from "framer-motion";
import { ArrowDown, BookOpenText, BriefcaseBusiness } from "lucide-react";

export function HeroContent({ onOpenPoetryBook }) {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-center px-5 pb-10 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:max-w-[50rem] lg:px-12 lg:pb-24 lg:pr-16">
      <motion.p
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mb-5 text-[0.65rem] uppercase tracking-[0.42em] text-slate sm:text-sm"
      >
        Kathmandu, Nepal
      </motion.p>

      <motion.h1
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.2 }}
        className="max-w-4xl font-display text-[2.85rem] leading-[0.88] tracking-[-0.03em] text-white sm:text-6xl lg:text-[5.7rem]"
      >
        <span className="text-gradient-soft">Builder of Ideas.</span>
        <br />
        Writer of Feelings.
      </motion.h1>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.32 }}
        className="mt-8 space-y-4"
      >
        <p className="font-serif text-[1.7rem] italic leading-tight text-white/92 sm:text-3xl lg:text-[2.15rem]">
          Ganesh Baidar Shrestha / Gwachey Dreamer
        </p>
        <p className="max-w-2xl text-base leading-8 text-slate sm:text-xl sm:leading-9">
          I build ideas into reality and emotions into words, creating digital products,
          thoughtful systems, and poetic worlds where code meets poetry.
        </p>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.46 }}
        className="mt-11 flex flex-col gap-4 sm:flex-row"
      >
        <button
          type="button"
          onClick={() => goTo("work")}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-glow/40 bg-white px-6 py-3.5 text-sm font-medium text-abyss transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <BriefcaseBusiness size={18} />
          View My Work
        </button>
        <button
          type="button"
          onClick={onOpenPoetryBook}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
        >
          <BookOpenText size={18} />
          Read My Poetry
        </button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.62 }}
        className="mt-10 grid gap-4 sm:grid-cols-3"
      >
        {[
          { label: "Based In", value: "Kathmandu, Nepal" },
          { label: "Practice", value: "Products, systems, poetry" },
          { label: "Signature", value: "Modern builder with soul" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-sm"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.32em] text-slate">{item.label}</p>
            <p className="mt-3 text-sm leading-7 text-white/90">{item.value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-14 flex items-center gap-4 text-slate"
      >
        <div className="flex h-12 w-7 justify-center rounded-full border border-white/12 pt-2">
          <ArrowDown className="animate-scroll" size={14} />
        </div>
        <p className="text-[0.7rem] uppercase tracking-[0.32em] sm:text-sm">
          Where code meets poetry
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, BookHeart } from "lucide-react";
import { Container } from "../components/Container";

export function FeaturedPoemSection({ poem, onOpenPoetryBook }) {
  return (
    <section className="section-shell relative border-b border-white/6 py-20 sm:py-24 lg:py-28">
      <Container>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75 }}
          className="editorial-panel relative overflow-hidden rounded-[2.4rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          <div className="pointer-events-none absolute right-[-4rem] top-[-4rem] h-32 w-32 rounded-full border border-white/8" />
          <div className="pointer-events-none absolute bottom-[-5rem] left-[-3rem] h-40 w-40 rounded-full border border-white/8" />
          <div className="relative grid gap-8 lg:grid-cols-[0.86fr,1.14fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.68rem] uppercase tracking-[0.3em] text-slate">
                <BookHeart size={15} />
                {poem.label}
              </div>
              <h2 className="mt-6 max-w-md font-serif text-4xl italic leading-[0.98] text-white sm:text-5xl">
                {poem.title}
              </h2>
            </div>

            <div>
              <blockquote className="border-l border-white/12 pl-6 font-serif text-[1.55rem] italic leading-relaxed text-mist sm:text-[1.9rem] lg:text-[2.2rem]">
                "{poem.excerpt}"
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate sm:leading-9">
                {poem.reflection}
              </p>
              <button
                type="button"
                onClick={onOpenPoetryBook}
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
              >
                Enter The Reading Room
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

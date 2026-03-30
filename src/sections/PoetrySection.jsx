import { motion } from "framer-motion";
import { ArrowUpRight, BookOpenText, Headphones } from "lucide-react";
import { Container } from "../components/Container";
import { SectionIntro } from "../components/SectionIntro";

export function PoetrySection({ items, onOpenPoetryBook }) {
  return (
    <section
      id="poetry"
      className="section-shell relative border-b border-white/6 py-24 sm:py-32 lg:py-36"
    >
      <Container>
        <SectionIntro
          eyebrow="Poetry & Writings"
          title="The part of my work that listens more deeply."
          body="Under Gwachey Dreamer, I write through memory, longing, identity, and the quiet weight beneath ordinary moments."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.28fr,0.72fr] xl:gap-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="editorial-panel relative overflow-hidden rounded-[2.4rem] p-8 sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute right-[-5rem] top-[-4rem] h-48 w-48 rounded-full border border-white/8" />
            <div className="pointer-events-none absolute bottom-[-6rem] left-[-3rem] h-56 w-56 rounded-full border border-white/8" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Featured Voice</p>
              <h3 className="mt-6 max-w-lg font-serif text-4xl italic leading-[0.95] text-white sm:text-5xl lg:text-[4.4rem]">
                Gwachey Dreamer
              </h3>
              <blockquote className="mt-12 max-w-3xl border-l border-white/12 pl-6 font-serif text-2xl italic leading-relaxed text-mist sm:text-3xl lg:text-[2.6rem] lg:leading-[1.45]">
                "I build with the mind that solves, and write with the heart that remains
                unsolved."
              </blockquote>
              <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-[0.7fr,1fr]">
                <p className="text-[0.7rem] uppercase tracking-[0.32em] text-slate">
                  Notebook
                </p>
                <div>
                  <p className="max-w-2xl text-base leading-8 text-slate sm:leading-9">
                    Future collections, spoken-word pieces, and longer editions will gather here in time.
                  </p>
                  <button
                    type="button"
                    onClick={onOpenPoetryBook}
                    className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white transition hover:bg-white/[0.08]"
                  >
                    <BookOpenText size={16} />
                    Show Full Poetry Page
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {items.length ? items.map((card, index) => (
              <motion.article
                key={card.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="editorial-panel relative overflow-hidden rounded-[1.85rem] p-6 sm:p-7"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {card.image ? (
                  <div className="mb-6 overflow-hidden rounded-[1.4rem] border border-white/10">
                    <img src={card.image} alt={card.title} className="h-48 w-full object-cover" />
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate">
                    Selected Lines
                  </p>
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate">
                    {card.type}
                  </p>
                </div>
                <h4 className="mt-5 font-display text-2xl text-white sm:text-[1.9rem]">
                  {card.title}
                </h4>
                <p className="mt-6 font-serif text-[1.4rem] leading-relaxed text-mist sm:text-[1.55rem]">
                  {card.excerpt}
                </p>
                <p className="mt-6 border-t border-white/8 pt-5 text-sm leading-7 text-slate">
                  {card.note}
                </p>
                {card.audio ? (
                  <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-slate">
                      <Headphones size={14} />
                      Listen
                    </div>
                    <audio controls className="w-full">
                      <source src={card.audio} />
                    </audio>
                  </div>
                ) : null}
              </motion.article>
            )) : (
              <div className="editorial-panel rounded-[1.85rem] p-6 sm:p-7">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate">
                  Poetry Shelf
                </p>
                <h4 className="mt-5 font-display text-2xl text-white sm:text-[1.9rem]">
                  More writings will appear here.
                </h4>
                <p className="mt-6 text-base leading-8 text-slate sm:leading-9">
                  New writings added from the admin dashboard will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

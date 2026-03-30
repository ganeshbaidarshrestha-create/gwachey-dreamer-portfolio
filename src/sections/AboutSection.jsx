import { motion } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { Container } from "../components/Container";
import { SectionIntro } from "../components/SectionIntro";
import { identityPillars } from "../lib/content";

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell section-grid relative border-b border-white/6 py-24 sm:py-32 lg:py-36"
    >
      <Container>
        <SectionIntro
          eyebrow="About"
          title="A modern creator shaping systems with logic and feeling."
          body="I come from Kathmandu with a builder's discipline and a dreamer's instinct. My work lives at the meeting point of technical clarity, thoughtful design, and emotional resonance. I create products that solve real problems, and I write poetry that stays with people after the page goes quiet."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr,0.95fr] lg:gap-7">
          <AnimatedSection className="glass-panel rounded-[2rem] p-7 sm:p-10 lg:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(117,150,225,0.2),transparent_45%)] px-6 pt-6 lg:w-[19rem]">
                <img
                  src="/ganesh-profile.png"
                  alt="Portrait of Ganesh Baidar Shrestha"
                  className="h-[20rem] w-full object-contain object-bottom"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.35em] text-slate">Personal Note</p>
                <p className="mt-6 font-serif text-[2rem] italic leading-tight text-white sm:text-4xl lg:text-[2.8rem]">
                  I build with intention, create with curiosity, and write with the honesty of
                  someone still listening to the inner world.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate sm:leading-9">
              As Ganesh Baidar Shrestha, I focus on products, platforms, and digital systems that
              move ideas toward reality. As Gwachey Dreamer, I explore silence, longing, identity,
              and the subtle emotions people often feel before they know how to name them.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate sm:leading-9">
              The ambition is simple: to create work that is technically sharp, visually distinct,
              and emotionally memorable enough to leave a trace.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="grid gap-5 sm:grid-cols-2">
            {identityPillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.12 + index * 0.08 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 sm:p-7"
              >
                <div className="mb-4 text-xs uppercase tracking-[0.32em] text-slate">
                  {pillar.title}
                </div>
                <h3 className="font-display text-2xl text-white sm:text-[1.7rem]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate sm:text-[0.95rem] sm:leading-8">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}

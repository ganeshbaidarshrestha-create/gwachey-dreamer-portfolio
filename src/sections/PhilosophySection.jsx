import { motion } from "framer-motion";
import { Container } from "../components/Container";
import { SectionIntro } from "../components/SectionIntro";
import { philosophyPoints } from "../lib/content";

export function PhilosophySection() {
  return (
    <section className="section-shell relative border-b border-white/6 py-24 sm:py-32 lg:py-36">
      <Container>
        <SectionIntro
          eyebrow="Signature"
          title="The soul of the work lives where structure and emotion meet."
          body="I'm interested in building things that function beautifully and feel deeply human. That intersection is not a contrast in my work. It is the core philosophy behind it."
          align="center"
        />

        <div className="mt-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-8 sm:p-10 lg:p-14">
          <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate">Code x Poetry</p>
              <p className="mt-6 font-serif text-3xl italic leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
                Structure is not the opposite of feeling.
                <br />
                It is one of the ways feeling learns to stay.
              </p>
            </motion.div>

            <div className="space-y-4">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={point}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5"
                >
                  <p className="text-base leading-8 text-slate sm:leading-9">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

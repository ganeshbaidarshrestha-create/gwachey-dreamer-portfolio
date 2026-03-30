import { motion } from "framer-motion";

export function SectionIntro({ eyebrow, title, body, align = "left" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const bodyAlignment = align === "center" ? "mx-auto" : "";

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-4xl ${alignment}`}
    >
      <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.42em] text-slate sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="max-w-4xl font-display text-3xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p
        className={`mt-6 max-w-3xl text-base leading-8 text-slate sm:text-lg sm:leading-9 ${bodyAlignment}`}
      >
        {body}
      </p>
    </motion.div>
  );
}

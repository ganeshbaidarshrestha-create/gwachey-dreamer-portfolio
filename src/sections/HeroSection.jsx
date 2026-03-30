import { Suspense, lazy } from "react";
import { HeroContent } from "../components/HeroContent";

const Hero3DScene = lazy(() =>
  import("../components/Hero3DScene").then((module) => ({ default: module.Hero3DScene })),
);

export function HeroSection({ onOpenPoetryBook }) {
  return (
    <section
      id="home"
      className="noise section-shell relative isolate min-h-screen overflow-hidden border-b border-white/6"
    >
      <div className="hero-backdrop absolute inset-0" />
      <div className="halo-ring left-[-16rem] top-[8rem] h-[28rem] w-[28rem]" />
      <div className="halo-ring right-[-10rem] top-[12rem] h-[18rem] w-[18rem]" />
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <Hero3DScene className="hero-scene-shell absolute inset-x-0 top-[8rem] h-[40vh] opacity-40 sm:top-[7rem] sm:h-[46vh] sm:opacity-50 lg:inset-y-0 lg:right-0 lg:left-auto lg:h-auto lg:w-[54%] lg:opacity-100" />
        </Suspense>
      </div>
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center px-2 lg:grid-cols-[1.02fr,0.98fr] lg:px-6">
        <HeroContent onOpenPoetryBook={onOpenPoetryBook} />
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}

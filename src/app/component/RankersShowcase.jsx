"use client";
import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RankersShowcase({ rankers }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - section.offsetWidth);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [rankers]);

  return (
    <div ref={sectionRef} className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 will-change-transform lg:gap-10 lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {rankers.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -14, scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="card-light group relative w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl p-7 sm:w-[380px] lg:w-[420px]"
          >
            <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-[#F0B429]/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <div className="absolute right-5 top-5">
              <span className="rounded-full bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-3 py-1 text-xs font-black text-[#06142D] shadow-md">
                {r.tag}
              </span>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#FDD34F] to-[#F0B429] opacity-50 blur-sm transition group-hover:opacity-90" />
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  className="relative h-24 w-24 rounded-full border-2 border-white object-cover shadow-[0_8px_24px_rgba(11,30,61,0.18)]"
                />
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-black tracking-wide text-[#0B1E3D]">{r.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{r.exam}</p>
              <div className="mt-4 rounded-2xl border border-[#F0B429]/25 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-4 py-2">
                <p className="text-sm font-bold text-[#804501]">{r.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="hidden shrink-0 lg:block lg:w-24" aria-hidden="true" />
      </div>
    </div>
  );
}

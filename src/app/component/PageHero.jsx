"use client";

/* ============================================================================
   PageHero — ONE hero identity for every interior page.

   Before this, each page invented its own. The worst case was /contact, which
   set the light `bg-section-hero` background and then covered it with an
   opaque dark gradient, leaving navy #0B1E3D body copy on a near-black ground
   — effectively invisible. Books and Admission ran dark heroes while About
   ran light, so the site read as four templates stitched together.

   The palette here is About's, because that is the one the brand settled on:
   warm cream ground, gold grid, gold + bronze orbs, navy headline with a
   gold-gradient accent line.

   Every colour is a logo-derived token (see globals.css).
   ========================================================================= */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PageHero({
  badge,
  title,
  accent,
  subtitle,
  actions,
  stats,
  media,
  align = "left",
}) {
  const ref = useRef(null);

  /* Orbs drift against the scroll. `offset` is measured from the top of the
     document because this hero always sits at the top of its page. */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const centred = align === "center";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-section-hero pb-28 pt-24"
    >
      {/* Warm gold graph-paper texture — the About hero's signature. */}
      <div className="pointer-events-none absolute inset-0 grid-gold" />

      <motion.div
        style={{ y: orbY1 }}
        className="pointer-events-none absolute left-1/4 top-10 h-[36rem] w-[36rem] rounded-full bg-[#F0B429]/12 blur-[140px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="pointer-events-none absolute bottom-10 right-10 h-[28rem] w-[28rem] rounded-full bg-[#804501]/15 blur-[120px]"
      />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-[#FDD34F]/8 blur-[60px]" />

      {/* Keeps the cream hero from meeting the next section on a hard seam. */}
      <div className="vignette-light pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div
          className={
            media
              ? "grid items-center gap-14 lg:grid-cols-2"
              : centred
                ? "mx-auto max-w-4xl text-center"
                : "max-w-3xl"
          }
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            {badge && (
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
                  {badge.icon}
                  {badge.text}
                </span>
              </motion.div>
            )}

            <motion.h1
              variants={fadeInUp}
              className="font-[family-name:var(--font-display)] text-5xl font-black leading-[1.0] tracking-tight text-[#0B1E3D] sm:text-7xl"
            >
              {title}
              {accent && (
                <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(253,211,79,0.3)]">
                  {accent}
                </span>
              )}
            </motion.h1>

            {subtitle && (
              <motion.p
                variants={fadeInUp}
                className={`text-lg leading-relaxed text-slate-500 ${
                  centred && !media ? "mx-auto max-w-2xl" : "max-w-xl"
                }`}
              >
                {subtitle}
              </motion.p>
            )}

            {actions && (
              <motion.div
                variants={fadeInUp}
                className={`flex flex-wrap gap-4 ${centred && !media ? "justify-center" : ""}`}
              >
                {actions}
              </motion.div>
            )}

            {stats?.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-1 gap-6 border-t border-[#0B1E3D]/8 pt-7 sm:grid-cols-3"
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className={centred && !media ? "text-center" : ""}
                  >
                    <p className="font-[family-name:var(--font-display)] text-3xl font-black text-[#B26E02] sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {media && <div className="relative">{media}</div>}
        </div>
      </motion.div>
    </section>
  );
}

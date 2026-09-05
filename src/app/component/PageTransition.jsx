"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const barRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const bar = barRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.fromTo(
      bar,
      { scaleX: 0, opacity: 1 },
      {
        scaleX: 1,
        duration: 0.55,
        ease: "power2.out",
        onComplete: () => gsap.to(bar, { opacity: 0, duration: 0.3, delay: 0.05 }),
      }
    );
  }, [pathname]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[250] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#FDD34F] opacity-0 shadow-[0_0_12px_rgba(240,180,41,0.6)]"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          data-page-transition
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

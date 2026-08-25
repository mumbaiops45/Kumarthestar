"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "power3.out";
const DUR = 1;

const FROM = {
  up: { y: 64, opacity: 0 },
  down: { y: -64, opacity: 0 },
  left: { x: -70, opacity: 0 },
  right: { x: 70, opacity: 0 },
  scale: { scale: 0.9, opacity: 0 },
  blur: { opacity: 0, filter: "blur(14px)", y: 30 },
  fade: { opacity: 0 },
};

const TO = {
  up: { y: 0, opacity: 1 },
  down: { y: 0, opacity: 1 },
  left: { x: 0, opacity: 1 },
  right: { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  blur: { opacity: 1, filter: "blur(0px)", y: 0 },
  fade: { opacity: 1 },
};


export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = DUR,
  stagger = false,
  staggerAmount = 0.12,
  start = "top 85%",
  once = true,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      if (stagger && !targets.length) return;

      gsap.set(targets, FROM[from] ?? FROM.up);

      gsap.to(targets, {
        ...(TO[from] ?? TO.up),
        duration,
        delay,
        ease: EASE,
        stagger: stagger ? staggerAmount : 0,
        clearProps: "filter",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play reverse play reverse",
          once,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [from, delay, duration, stagger, staggerAmount, start, once]);

  return (
    <Tag ref={ref} data-reveal className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function SplitReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  trigger = "scroll", 
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: "lines,words",
        linesClass: "overflow-hidden",
      });

      gsap.set(el, { opacity: 1 });

      const tween = {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: "power4.out",
        stagger: 0.055,
      };

      gsap.set(split.words, { yPercent: 118, rotate: 3, opacity: 0 });

      if (trigger === "mount") {
        gsap.to(split.words, tween);
      } else {
        gsap.to(split.words, {
          ...tween,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [delay, trigger, children]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }} {...rest}>
      {children}
    </Tag>
  );
}

export function Parallax({
  children,
  speed = 0.25,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

export function ScrollProgress() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#FDD34F] shadow-[0_0_12px_rgba(240,180,41,0.6)]"
      />
    </div>
  );
}

export default Reveal;

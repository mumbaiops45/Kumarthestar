"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll
 * -------------------------------------------------------------
 * Wraps the whole app in Lenis momentum scrolling and hands the
 * scroll loop to GSAP's ticker so Lenis and ScrollTrigger stay on
 * the exact same frame. Running two independent RAF loops is what
 * makes most "smooth scroll + GSAP" sites feel like the pinned
 * sections lag a frame behind the page — this avoids that.
 *
 * Exposes the instance on window.__lenis so any component can call
 * scrollTo() without prop-drilling a context.
 */
export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Respect the OS "reduce motion" setting — never trap those users
    // in momentum scrolling they can't turn off.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // 1.15 felt floaty — the page kept gliding after the wheel stopped,
      // which reads as "laggy" rather than smooth. 0.9 keeps the polish
      // but lets the page settle when the user stops.
      duration: 0.9,
      // Exponential ease-out: fast pickup, clean settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native touch scrolling stays — momentum on mobile feels sluggish
      // and fights the OS scroller.
      syncTouch: false,
      // We drive raf ourselves through the GSAP ticker below.
      autoRaf: false,
    });

    window.__lenis = lenis;

    // Every Lenis scroll frame updates ScrollTrigger in the same tick.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000); // GSAP time is seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth-scroll any in-page anchor (#faq, #contact ...)
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    /* ------------------------------------------------------------------
       Re-measure after the page actually settles.
       ScrollTrigger caches every trigger's pixel position on creation.
       These pages are full of remote Unsplash images with no width/height,
       so the document grows by thousands of pixels AFTER those positions
       were computed — triggers then fire at the wrong place and the page
       visibly jumps mid-scroll. Refreshing on load, on late-loading media
       and on any body size change is what makes the scroll feel solid.
       ------------------------------------------------------------------ */
    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("load", refresh);

    // Fonts swapping in reflows every text block.
    document.fonts?.ready.then(refresh);

    // Catch each image/video as it decodes.
    const media = Array.from(document.querySelectorAll("img, video"));
    media.forEach((el) => {
      el.addEventListener("load", refresh, { once: true });
      el.addEventListener("loadeddata", refresh, { once: true });
    });

    // Debounced observer for anything else that changes height
    // (filter tabs, FAQ accordions, testimonial swaps).
    let resizeTimer;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 180);
    });
    ro.observe(document.body);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", refresh);
      media.forEach((el) => {
        el.removeEventListener("load", refresh);
        el.removeEventListener("loadeddata", refresh);
      });
      clearTimeout(resizeTimer);
      ro.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // On route change: jump to top instantly and re-measure every trigger,
  // otherwise ScrollTrigger keeps the previous page's positions.
  // The refresh is deferred a frame so the new page has painted first —
  // refreshing against the outgoing page's layout is what causes the
  // "first scroll on a new page is broken" symptom.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return children;
}

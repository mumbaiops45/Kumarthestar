"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { categoryTheme } from "../../data/divisions";
import { whatsappLink } from "../../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedServiceCard({ division, index }) {
  const root = useRef(null);
  const frame = useRef(null);
  const img = useRef(null);

  const theme = categoryTheme[division.category];
  const Icon = division.icon;
  const imageOnRight = index % 2 !== 0;
  const comingSoon = division.status === "coming-soon";

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const clipFrom = imageOnRight ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

      gsap.set(frame.current, { clipPath: clipFrom });
      gsap.set(img.current, { scale: 1.25 });
      gsap.set(el.querySelectorAll("[data-card-fade]"), { opacity: 0, y: 22 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });

      tl.to(frame.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power4.inOut",
      })
        .to(img.current, { scale: 1, duration: 1.3, ease: "power3.out" }, 0)
        .to(
          el.querySelectorAll("[data-card-fade]"),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.65"
        );
    }, el);

    return () => ctx.revert();
  }, [imageOnRight]);

  return (
    <article
      ref={root}
      className="group grid grid-cols-1 overflow-hidden rounded-[2rem] border border-[#0B1E3D]/8 bg-white shadow-[0_10px_40px_rgba(11,30,61,0.08)] transition-shadow duration-500 ease-premium hover:shadow-[0_30px_80px_rgba(11,30,61,0.16)] md:grid-cols-2"
    >
      <div
        className={`relative min-h-[300px] overflow-hidden md:min-h-[440px] ${
          imageOnRight ? "md:order-2" : "md:order-1"
        }`}
      >
        <div ref={frame} className="absolute inset-0">
          <img
            ref={img}
            src={division.image}
            alt={division.imageAlt || division.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06142D]/70 via-[#06142D]/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-premium group-hover:opacity-100 mix-blend-soft-light" style={{ background: `linear-gradient(135deg, ${theme.from}, transparent 55%, ${theme.to})` }} />
        </div>

        <span
          data-card-fade
          className="absolute right-6 top-6 z-10 font-[family-name:var(--font-display)] text-sm font-bold tracking-widest text-white/85 mix-blend-difference"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          data-card-fade
          className="absolute -bottom-7 left-7 z-10 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_14px_34px_rgba(6,20,45,0.35)] ring-4 ring-white transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.9} />
        </span>
      </div>

      <div
        className={`flex flex-col justify-center p-8 pt-12 sm:p-10 sm:pt-12 lg:p-14 ${
          imageOnRight ? "md:order-1" : "md:order-2"
        }`}
      >
        <span
          data-card-fade
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest"
          style={{ color: theme.text }}
        >
          {theme.label}
        </span>

        <h3 data-card-fade className="mt-5 font-[family-name:var(--font-display)] text-2xl font-black leading-snug text-[#0B1E3D] transition-colors duration-500 group-hover:text-[#804501] sm:text-3xl">
          {division.title}
        </h3>

        <p data-card-fade className="mt-2 text-sm font-semibold" style={{ color: theme.text }}>
          {division.tagline}
        </p>

        <span
          data-card-fade
          className="mt-4 block h-[2px] w-10 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] transition-all duration-700 ease-premium group-hover:w-20"
        />

        <p data-card-fade className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
          {division.description}
        </p>

        {division.points?.length ? (
          <ul data-card-fade className="mt-6 space-y-2.5">
            {division.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-[#F0B429]/15 text-[#B26E02]">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <div data-card-fade className="mt-8 flex flex-wrap items-center gap-4">
          {division.href ? (
            <Link
              href={division.href}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#804501] transition-colors hover:text-[#0B1E3D]"
            >
              View details
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : null}

          <a
            href={whatsappLink(
              comingSoon
                ? `Hello Kumarthestar, I would like to support / know more about ${division.title}.`
                : `Hello Kumarthestar, I am interested in ${division.title}. Please share the details.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#0B1E3D]/10 bg-[#F7F3EA] px-4 py-2.5 text-xs font-bold text-[#0B1E3D] transition-all duration-300 hover:border-[#F0B429]/60 hover:bg-[#F0B429]/10 hover:text-[#804501]"
          >
            <FaWhatsapp className="text-sm text-[#25D366]" />
            {comingSoon ? "Get updates" : "Enquire"}
          </a>
        </div>
      </div>
    </article>
  );
}

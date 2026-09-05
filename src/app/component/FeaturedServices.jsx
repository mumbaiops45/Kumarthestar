"use client";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import FeaturedServiceCard from "./FeaturedServiceCard";
import { divisions } from "../../data/divisions";

const DEFAULT_SLUGS = ["online-coaching", "drama", "cooking-classes", "real-estate"];

export default function FeaturedServices({
  slugs = DEFAULT_SLUGS,
  eyebrow = "Signature Services",
  heading = "A Closer Look At",
  accent = "What We Do Best",
  intro = "Four service lines that show the range of the firm - from the classroom to the stage to the site visit. The full catalogue is one scroll away.",
}) {
  const items = slugs.map((slug) => divisions.find((d) => d.slug === slug)).filter(Boolean);
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[#F0B429]/8 blur-[170px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-[#804501]/6 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal from="up" className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </span>

          <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
            {heading}
            <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
              {accent}
            </span>
          </h2>

          <div className="mx-auto my-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] shadow-[0_0_12px_rgba(240,180,41,0.6)]" />

          <p className="text-base leading-7 text-slate-500">{intro}</p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-14 lg:gap-20">
          {items.map((division, i) => (
            <FeaturedServiceCard key={division.slug} division={division} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#0B1E3D] px-8 py-4 text-sm font-bold text-[#FDD34F] shadow-[0_16px_40px_rgba(11,30,61,0.25)] transition-transform duration-300 hover:scale-[1.03]"
          >
            See all {divisions.length} services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

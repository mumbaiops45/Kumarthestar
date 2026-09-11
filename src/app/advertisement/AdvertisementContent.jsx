"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  Globe,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { Reveal } from "../component/Reveal";
import PageHero from "../component/PageHero";
import ContactForm from "../component/ContactForm";
import { ads, adCategories } from "../../data/ads";

const SectionBadge = ({ children, variant = "gold" }) => {
  const variants = {
    gold: "bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 text-[#804501] border-[#F0B429]/30",
    white: "bg-white/12 text-white border-white/25 backdrop-blur-sm",
  };
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const categoryIcon = {
  "Academic Institution": GraduationCap,
  Company: Building2,
};

const benefits = [
  {
    icon: <Target />,
    title: "A Focused Audience",
    desc: "Every visitor here is already a student, parent or alumnus actively looking at coaching, admissions or campus services — not a cold, general audience.",
  },
  {
    icon: <ShieldCheck />,
    title: "Placed on a Trusted Page",
    desc: "Your listing sits alongside Kumarthestar's own courses and services, on a site families already return to for admissions and results.",
  },
  {
    icon: <Megaphone />,
    title: "Simple, Flexible Listings",
    desc: "A logo, a one-line pitch and a link to your site — updated whenever you need, with no long-term lock-in.",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

function AdCard({ ad }) {
  const Icon = categoryIcon[ad.category] ?? Building2;
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = ad.logo && !logoFailed;
  return (
    <article className="card-light group flex h-full flex-col rounded-3xl p-7 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-16 w-16 flex-shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-lg font-black text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.3)]">
          {showLogo ? (
            <img
              src={ad.logo}
              alt={`${ad.name} logo`}
              className="h-full w-full object-cover"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            initials(ad.name)
          )}
        </div>
        {ad.featured && (
          <span className="rounded-full bg-[#0B1E3D] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#FDD34F]">
            Featured
          </span>
        )}
      </div>

      <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F0B429]/30 bg-[#F0B429]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#804501]">
        <Icon className="h-3 w-3" />
        {ad.category}
      </span>

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-black text-[#0B1E3D]">
        {ad.name}
      </h3>
      <p className="mt-1 text-sm font-semibold text-[#B26E02]">{ad.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
        {ad.description}
      </p>

      {ad.website && (
        <a
          href={ad.website}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B1E3D] transition-colors hover:text-[#804501]"
        >
          <Globe className="h-4 w-4 text-[#B26E02]" />
          Visit Website
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
        </a>
      )}
    </article>
  );
}

function AdsGrid() {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...adCategories];

  const filtered = useMemo(
    () => (active === "All" ? ads : ads.filter((a) => a.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
              active === tab
                ? "bg-[#0B1E3D] text-[#FDD34F] shadow-[0_8px_24px_rgba(11,30,61,0.3)]"
                : "border border-[#0B1E3D]/8 bg-white text-slate-600 hover:border-[#F0B429]/40"
            }`}
          >
            {tab === "Academic Institution" ? "Academic Institutions" : tab === "Company" ? "Companies" : tab}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </motion.div>
      ) : (
        <div className="mt-12 rounded-3xl border border-dashed border-[#0B1E3D]/15 bg-white/60 py-16 text-center">
          <p className="text-slate-500">
            No placements listed here yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdvertisementContent() {
  return (
    <div className="overflow-x-clip">
      <PageHero
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5 text-[#B26E02]" />,
          text: "Advertise With Us",
        }}
        title="Put Your Institution"
        accent="In Front of Our Students"
        subtitle="Academic institutions and companies can place their ad here — reaching the students, parents and alumni who already visit Kumarthestar for coaching, admissions and career services."
        actions={
          <>
            <a
              href="#enquire"
              className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.32)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.48)]"
            >
              <span className="relative">Advertise With Us</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#ads"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-9 py-4 text-base font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#804501]"
            >
              View Current Placements
            </a>
          </>
        }
      />

      <section id="ads" className="relative overflow-hidden bg-section py-18">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Current Placements</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Academic institutions &amp;{" "}
              <span className="text-gold-gradient">companies</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <Reveal className="mt-12">
            <AdsGrid />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B1E3D] py-18">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,180,41,0.14),transparent_65%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge variant="white">Why Advertise Here</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-white md:text-5xl">
              Speak directly to a{" "}
              <span className="text-gold-gradient-on-dark">ready audience</span>
            </h2>
          </Reveal>

          <Reveal stagger staggerAmount={0.12} className="mt-14 grid gap-7 md:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="glass-dark group rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F0B429]/45"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.3)] [&>svg]:h-6 [&>svg]:w-6">
                  {b.icon}
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-black text-white">
                  {b.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/60">{b.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="enquire" className="relative overflow-hidden bg-section-cream py-18">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[150px]" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <Reveal from="left">
            <SectionBadge>Get Listed</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight text-[#0B1E3D] md:text-5xl">
              Tell us about your{" "}
              <span className="text-gold-gradient">institution or company</span>
            </h2>
            <div className="hairline-gold my-6 max-w-[10rem]" />
            <p className="max-w-md text-lg leading-relaxed text-slate-500">
              Share a few details below and our team will get back to you with
              available placements and pricing.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "A callback within 24 hours",
                "Placement options for every budget",
                "Your logo and link live within days of confirmation",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B26E02]" />
                  <span className="leading-relaxed text-slate-600">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-[#0B1E3D]/8 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#804501]/70">
                Prefer to talk?
              </p>
              <Link
                href="/contact"
                className="group mt-3 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-black text-[#0B1E3D] transition-colors hover:text-[#804501]"
              >
                <Megaphone className="h-5 w-5 text-[#B26E02]" />
                Reach our advertising desk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal from="right">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

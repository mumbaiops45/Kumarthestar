"use client";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {ArrowRight,Building2,ClipboardList,Handshake,LayoutGrid,Mail,MessageSquare,Phone,Sparkles,Users,Wallet} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageHero from "../component/PageHero";
import DivisionsShowcase from "../component/DivisionsShowcase";
import { Reveal } from "../component/Reveal";
import { contact, whatsappLink } from "../../data/site";
import { divisions, divisionCategories, categoryTheme } from "../../data/divisions";

const serviceLineCount = divisions.length;
const categoryCount = divisionCategories.length - 1; 
 
const categoryBlurbs = {
  education:
    "Tuition, entrance coaching, defence and civil services, and the admissions desk.",
  language: "Spoken English, the languages of the region, and foreign languages.",
  media: "Stage training and short-film production, from script to screen.",
  food: "Estate coffee and tea supply, plus hands-on cooking classes in Mysuru.",
  business: "Gifting, promotions, recruitment, property and security staffing.",
  lifestyle: "Uniforms, team apparel and printed merchandise in batch quantities.",
  impact: "Our animal welfare initiative - rescue, treatment and rehoming.",
};

const audiences = [
  {
    icon: Users,
    title: "Students & parents",
    desc: "Tuition from Class 1 to 12, entrance and competitive exam coaching, defence and civil services preparation, and an admissions desk that handles the paperwork and the deadlines.",
    lines: ["Coaching and tuition", "Entrance exams", "School & college admissions", "Languages"],
  },
  {
    icon: Building2,
    title: "Businesses & institutions",
    desc: "Corporate gifting, on-ground sales promotions and brand activations, recruitment for domestic and overseas roles, security personnel, and pantry supply of coffee and tea.",
    lines: ["Corporate gifts", "Sales promotions", "Recruitment", "Security & bouncers"],
  },
  {
    icon: Handshake,
    title: "Households & individuals",
    desc: "Property buying and selling with verified titles, cooking classes in Mysuru, custom clothing batches, and coffee and tea delivered for the home.",
    lines: ["Real estate", "Cooking classes", "Clothing", "Coffee & tea"],
  },
];

const process = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Tell us the problem",
    desc: "One sentence is enough. Call, WhatsApp or use the form - you reach the firm directly, not a call centre reading from a script.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "We scope it honestly",
    desc: "We tell you what the service covers, what it does not, and whether we are even the right people for it. If we are not, we say so and point you elsewhere.",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Quoted before it starts",
    desc: "Fees, timelines and inclusions are agreed in writing before any work begins. No revised numbers halfway through the job.",
  },
  {
    icon: Handshake,
    step: "04",
    title: "One contact throughout",
    desc: "Whichever service line you used, the same proprietor stays accountable for it - during the work and after it is delivered.",
  },
];

function CategoryCard({ cat, count, isActive, onSelect }) {
  const theme = categoryTheme[cat.key];
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(cat.key)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      aria-pressed={isActive}
      style={{ transitionProperty: "box-shadow, border-color" }}
      className={`card-light group relative overflow-hidden rounded-3xl p-6 text-left ${
        isActive ? "ring-2 ring-[#F0B429] shadow-[0_22px_54px_rgba(240,180,41,0.28)]" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, ${theme.from}, ${theme.to})` }}
      />
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-snug text-[#0B1E3D] transition-colors duration-500 group-hover:text-[#804501]">
          {cat.label}
        </h3>
        <span
          className="grid h-9 min-w-9 flex-shrink-0 place-items-center rounded-xl px-2 text-sm font-black text-white shadow-[0_8px_20px_rgba(11,30,61,0.2)]"
          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
        >
          {count}
        </span>
      </div>
      <p className="mt-2.5 text-sm leading-6 text-slate-500">{categoryBlurbs[cat.key]}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#804501]">
        {isActive ? "Showing below" : "Show these"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}

export default function ServicesContent() {
  const [active, setActive] = useState("all");
  const counts = useMemo(() => {
    const map = {};
    for (const d of divisions) map[d.category] = (map[d.category] ?? 0) + 1;
    return map;
  }, []);
  const selectCategory = useCallback((key) => {
    setActive((current) => (current === key ? "all" : key));
    const el = document.getElementById("catalogue");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased">
      <PageHero
        badge={{ icon: <LayoutGrid className="h-3.5 w-3.5" />, text: "What We Do" }}
        title="Every service,"
        accent="on one page."
        subtitle={`All ${serviceLineCount} service lines Kumarthestar runs, across ${categoryCount} categories - coaching and admissions, languages, drama and short films, coffee, tea and cooking classes, corporate services, real estate, staffing and animal welfare. Pick a category, or read the whole list.`}
        align="left"
      />

      <section className="relative overflow-hidden bg-section-alt py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-60" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[#F0B429]/10 blur-[160px]" />
        <div className="relative max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up" className=" max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
              Start Here
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
              Browse by {" "}
              <span className=" bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                category.
              </span>
            </h2>
            <p className="text-base mt-4 leading-7 text-slate-500">
              Tap a category to filter the full catalogue below, or scroll straight past this to
              read all {serviceLineCount} in order.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {divisionCategories
              .filter((cat) => cat.key !== "all")
              .map((cat) => (
                <Reveal key={cat.key} from="up">
                  <CategoryCard
                    cat={cat}
                    count={counts[cat.key] ?? 0}
                    isActive={active === cat.key}
                    onSelect={selectCategory}
                  />
                </Reveal>
              ))}
          </div>
        </div>
      </section>
      <DivisionsShowcase
        id="catalogue"
        eyebrow="The Full List"
        heading="Every service line, in detail."
        accent=""
        intro="Each card carries what the service covers, who it is for and how to start. Filter with the pills, or send one message and we will point you to the right desk."
        category={active}
        onCategoryChange={setActive}
        className="text-left"
      />
     
      <section className="relative overflow-hidden bg-[#FAFAF8] py-20 sm:py-8">
        <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-[#804501]/8 blur-[160px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up" className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#804501]/25 bg-[#804501]/8 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501]">
              Who We Work With
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
              Three kinds of caller, {" "}
              <span className=" bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                one phone number.
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {audiences.map((audience) => (
              <Reveal key={audience.title} from="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  style={{ transitionProperty: "box-shadow, border-color" }}
                  className="card-light group flex h-full flex-col rounded-3xl p-7"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0B1E3D] to-[#1a3a6e] text-[#FDD34F] shadow-[0_10px_26px_rgba(11,30,61,0.22)] transition-transform duration-500 group-hover:scale-105">
                    <audience.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-extrabold text-[#0B1E3D] transition-colors duration-500 group-hover:text-[#804501]">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{audience.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {audience.lines.map((line) => (
                      <span
                        key={line}
                        className="rounded-lg border border-[#0B1E3D]/8 bg-[#F7F3EA] px-2.5 py-1.5 text-[11px] font-bold text-[#0B1E3D]"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-section-alt py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up" className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
              How It Works
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
              From first call {" "}
              <span className=" bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                to finished job.
              </span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((stage) => (
              <Reveal key={stage.step} from="up">
                <div className="card-light group relative h-full overflow-hidden rounded-3xl p-7">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-[family-name:var(--font-display)] text-7xl font-black text-[#0B1E3D]/5 transition-colors duration-500 group-hover:text-[#F0B429]/20">
                    {stage.step}
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#804501] text-[#06142D] shadow-[0_10px_26px_rgba(240,180,41,0.3)] transition-transform duration-500 group-hover:scale-105">
                    <stage.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-lg font-extrabold text-[#0B1E3D]">
                    {stage.title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-6 text-slate-500">{stage.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-section-hero py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#F0B429]/12 blur-[170px]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0B1E3D] to-[#06142D] p-8 shadow-[0_30px_80px_rgba(6,20,45,0.32)] sm:p-12">
              <div className="pointer-events-none absolute inset-0 grid-gold opacity-20" />
              <div className="relative text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDD34F]">
                  One Message Is Enough
                </span>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-black leading-[1.1] tracking-tight text-white sm:text-4xl">
                  Not sure which of the {serviceLineCount}
                  <span className="block bg-gradient-to-r from-[#FDD34F] via-[#F0B429] to-[#FDD34F] bg-clip-text text-transparent">
                    you actually need?
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
                  Describe the problem in one sentence. We will tell you which desk handles it, what
                  it costs, and whether we are the right people for it at all.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#804501] px-7 py-3.5 text-sm font-bold text-[#06142D] shadow-[0_12px_30px_rgba(240,180,41,0.32)] transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <Mail className="h-4 w-4" />
                    Send an enquiry
                  </Link>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/15"
                  >
                    <FaWhatsapp className="text-base text-[#25D366]" />
                    WhatsApp us
                  </a>
                  <a
                    href={`tel:+${contact.phones[0].raw}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-[#F0B429]/60 hover:bg-[#F0B429]/15"
                  >
                    <Phone className="h-4 w-4 text-[#FDD34F]" />
                    {contact.phones[0].label}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

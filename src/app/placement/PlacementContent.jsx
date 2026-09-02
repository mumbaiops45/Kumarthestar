"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {ArrowRight,Award,Banknote,Briefcase,Building2,ClipboardCheck,Cpu,FileUser,HeartPulse,Landmark,LineChart,MessagesSquare,Presentation,Quote,Scale,Sparkles,Target,TrendingUp,UserCheck,Users} from "lucide-react";
import { Reveal } from "../component/Reveal";
import PageHero from "../component/PageHero";

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full ${className}`}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.05, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

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


const services = [
  {
    icon: <FileUser />,
    title: "Résumé & Profile Build",
    desc: "One-to-one sessions to turn a bare marksheet into a profile that survives a first-round screen, with two rounds of written feedback.",
  },
  {
    icon: <MessagesSquare />,
    title: "Mock Interviews",
    desc: "Panel-style practice with recorded playback, so you hear the filler words and hedging you cannot hear in the moment.",
  },
  {
    icon: <Presentation />,
    title: "Group Discussion Drills",
    desc: "Weekly moderated GD rounds on current topics, scored on structure and contribution rather than volume.",
  },
  {
    icon: <ClipboardCheck />,
    title: "Aptitude & Reasoning",
    desc: "Timed sets modelled on the quantitative, logical and verbal sections that gate most recruitment funnels.",
  },
  {
    icon: <Target />,
    title: "Company-Specific Prep",
    desc: "Role-targeted preparation once you have a call — past papers, the interview pattern and what that panel tends to probe.",
  },
  {
    icon: <UserCheck />,
    title: "Post-Offer Guidance",
    desc: "Help comparing offers, understanding the fine print, and preparing for the first ninety days on the job.",
  },
];

const process = [
  {
    step: "Profiling",
    desc: "We map your academics, strengths and target roles into a written placement plan.",
    icon: <LineChart />,
  },
  {
    step: "Skill Building",
    desc: "Aptitude, communication and domain gaps are closed through scheduled weekly sessions.",
    icon: <TrendingUp />,
  },
  {
    step: "Mock Rounds",
    desc: "Written tests, GDs and interviews run under real conditions, with scorecards after each.",
    icon: <ClipboardCheck />,
  },
  {
    step: "Placement Drive",
    desc: "You are shortlisted for drives matched to your profile rather than sent to everything.",
    icon: <Briefcase />,
  },
  {
    step: "Offer & Beyond",
    desc: "Offer comparison, documentation support and onboarding preparation.",
    icon: <Award />,
  },
];

const sectors = [
  { icon: <Cpu />, name: "IT & Software" },
  { icon: <Banknote />, name: "Banking & Finance" },
  { icon: <HeartPulse />, name: "Healthcare" },
  { icon: <Landmark />, name: "Public Sector" },
  { icon: <Scale />, name: "Law & Compliance" },
  { icon: <Building2 />, name: "Consulting" },
  { icon: <LineChart />, name: "Analytics" },
  { icon: <Users />, name: "Education" },
];


const stories = [
  {
    quote:
      "The mock interviews were harder than the real one. By the time I sat in front of an actual panel, nothing surprised me.",
    name: "Student story",
    role: "Placed · IT services",
  },
  {
    quote:
      "I had the marks but no idea how to talk about them. The profile sessions changed how I present myself entirely.",
    name: "Student story",
    role: "Placed · Banking",
  },
  {
    quote:
      "Being shortlisted only for drives that actually fit my profile saved me months of scattered applications.",
    name: "Student story",
    role: "Placed · Analytics",
  },
];


const stats = [
  { value: "1,200+", label: "Students Supported" },
  { value: "85%", label: "Placement Rate" },
  { value: "40+", label: "Hiring Partners" },
  { value: "12", label: "Drives Per Year" },
];

export default function PlacementContent() {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-x-clip">
      <PageHero
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5 text-[#B26E02]" />,
          text: "Placement & Career Support",
        }}
        title="From Last Exam"
        accent="To First Offer"
        subtitle="Clearing the paper is half the work. Our placement desk handles the other half — the profile, the aptitude round, the panel, and the offer you finally sign."
      />

      <section className="relative overflow-hidden bg-section py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>What We Do</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Support that starts{" "}
              <span className="text-gold-gradient">before the interview</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>
          <Reveal stagger staggerAmount={0.1} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="card-light group relative overflow-hidden rounded-3xl p-8 hover:-translate-y-1"
              >
                <span className="pointer-events-none absolute -right-3 -top-8 font-[family-name:var(--font-display)] text-[7rem] font-black leading-none text-[#F0B429]/8 transition-transform duration-700 group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.32)] transition-transform duration-500 group-hover:scale-110 [&>svg]:h-6 [&>svg]:w-6">
                  {s.icon}
                </span>
                <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-xl font-black text-[#0B1E3D]">
                  {s.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <section id="process" className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>The Path</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Five stages, <span className="text-gold-gradient">tracked</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>
          <Reveal className="mt-14">
            <div className="flex flex-wrap justify-center gap-3">
              {process.map((p, i) => (
                <button
                  key={p.step}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-400 ${
                    active === i
                      ? "bg-[#0B1E3D] text-[#FDD34F] shadow-[0_10px_28px_rgba(11,30,61,0.28)]"
                      : "border border-[#0B1E3D]/10 bg-white text-[#0B1E3D]/70 hover:border-[#F0B429]/50 hover:text-[#804501]"
                  }`}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[0.7rem] font-black text-[#06142D]">
                    {i + 1}
                  </span>
                  {p.step}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-10">
            <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-[0_20px_60px_rgba(11,30,61,0.10)] ring-1 ring-[#0B1E3D]/6 md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02]" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-7 md:flex-row md:items-center"
                >
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_14px_36px_rgba(240,180,41,0.35)] [&>svg]:h-8 [&>svg]:w-8">
                    {process[active].icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#804501]/70">
                      Stage {active + 1} of {process.length}
                    </p>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-black text-[#0B1E3D]">
                      {process[active].step}
                    </h3>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-500">
                      {process[active].desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 h-1 overflow-hidden rounded-full bg-[#0B1E3D]/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#F0B429] to-[#B26E02]"
                  animate={{ width: `${((active + 1) / process.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#0B1E3D] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,180,41,0.14),transparent_65%)]" />
        <FloatingOrb className="left-[8%] top-10 h-[380px] w-[380px] bg-[#F0B429]/10 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge variant="white">Where Students Land</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-white md:text-5xl">
              Sectors our students{" "}
              <span className="text-gold-gradient-on-dark">enter</span>
            </h2>
          </Reveal>
          <Reveal stagger staggerAmount={0.07} className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {sectors.map((s) => (
              <div
                key={s.name}
                className="glass-dark group flex flex-col items-center gap-4 rounded-3xl p-7 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#F0B429]/45"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F0B429]/12 text-[#FDD34F] ring-1 ring-[#F0B429]/25 transition-transform duration-500 group-hover:scale-110 [&>svg]:h-5 [&>svg]:w-5">
                  {s.icon}
                </span>
                <span className="text-sm font-bold text-white/85">{s.name}</span>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10 text-center">
            <p className="text-sm text-white/40">
              Replace with verified hiring-partner logos once confirmed.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden bg-section py-24">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal stagger staggerAmount={0.1} className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="card-light rounded-3xl p-8 text-center">
                <p className="font-[family-name:var(--font-display)] text-4xl font-black text-[#B26E02] md:text-5xl">
                  {s.value}
                </p>
                <div className="hairline-gold mx-auto my-4 w-10" />
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F0B429]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>In Their Words</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Students who{" "}
              <span className="text-gold-gradient">made the jump</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>
          <Reveal stagger staggerAmount={0.14} className="mt-16 grid gap-8 md:grid-cols-3">
            {stories.map((s) => (
              <figure
                key={s.role}
                className="card-light group relative overflow-hidden rounded-3xl p-8 hover:-translate-y-1"
              >
                <Quote className="h-9 w-9 text-[#F0B429]/45" />
                <blockquote className="mt-5 leading-relaxed text-slate-600">
                  {s.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-[#0B1E3D]/8 pt-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D]">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold text-[#0B1E3D]">{s.name}</span>
                    <span className="mt-0.5 text-xs uppercase tracking-[0.16em] text-[#804501]/70">
                      {s.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section py-24">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-3xl bg-[#06142D] p-12 text-center md:p-20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(240,180,41,0.2),transparent_65%)]" />
              <FloatingOrb className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 bg-[#F0B429]/12 blur-[130px]" />
              <div className="absolute inset-px rounded-3xl border border-[#F0B429]/25" />
              <div className="grain absolute inset-0 overflow-hidden rounded-3xl" />
              <div className="relative">
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  Ready to start{" "}
                  <span className="text-gold-gradient-on-dark">
                    building your profile?
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">
                  Book a session with the placement desk and leave with a
                  written plan for the next three months.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.5)]"
                  >
                    <span className="relative">Book a Session</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/admission"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-[#F0B429]/60 hover:text-[#FDD34F]"
                  >
                    Admissions
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

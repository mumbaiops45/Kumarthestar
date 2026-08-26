"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {AlertCircle,ArrowRight,BadgeCheck,CalendarDays,CheckCircle2,ChevronDown,ClipboardList,CreditCard,FileText,GraduationCap,Loader2,Minus,Phone,Send,Sparkles,UserCheck,Wallet} from "lucide-react";
import { Reveal } from "../component/Reveal";
import PageHero from "../component/PageHero";

gsap.registerPlugin(ScrollTrigger);

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

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`pointer-events-none absolute rounded-full ${className}`}
    animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.05, 1] }}
    transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const steps = [
  {
    icon: <ClipboardList />,
    title: "Submit an Enquiry",
    desc: "Send the short form below, or call the admissions desk. Tell us the exam you are targeting and your current class or qualification.",
    meta: "Takes 2 minutes",
  },
  {
    icon: <Phone />,
    title: "Counselling Call",
    desc: "A counsellor calls back within 24 hours to understand your goals, current preparation level and the batch timings that suit you.",
    meta: "Within 24 hours",
  },
  {
    icon: <FileText />,
    title: "Diagnostic Test",
    desc: "A short, no-stakes assessment so we place you in a batch that matches your pace — neither ahead of you nor holding you back.",
    meta: "45–60 minutes",
  },
  {
    icon: <UserCheck />,
    title: "Seat Confirmation",
    desc: "Submit your documents, confirm the batch and complete the fee formalities. Scholarship eligibility is decided at this stage.",
    meta: "Same day",
  },
  {
    icon: <GraduationCap />,
    title: "Orientation & Start",
    desc: "You receive your study plan, material and portal login, then join the orientation session before classes begin.",
    meta: "Before term start",
  },
];


const documents = [
  "Completed application form",
  "Most recent marksheet or transcript",
  "School or college transfer certificate",
  "Government photo ID (Aadhaar / passport)",
  "Four passport-size photographs",
  "Category or income certificate, if applying for a scholarship",
];


const eligibility = [
  {
    track: "Foundation (Classes 8–10)",
    detail: "Open to students currently enrolled in Class 8, 9 or 10.",
  },
  {
    track: "JEE / NEET (Classes 11–12)",
    detail: "Class 10 passed, with Science in the current or upcoming term.",
  },
  {
    track: "Professional (CA / CS / CMA)",
    detail: "Class 12 passed, or appearing in the current academic year.",
  },
  {
    track: "Language & Overseas",
    detail: "Open to all applicants; a placement test sets the starting level.",
  },
];

const dates = [
  { label: "Applications open", value: "Rolling intake", note: "All programmes" },
  { label: "Diagnostic test window", value: "Every Saturday", note: "By appointment" },
  { label: "Summer term begins", value: "To be announced", note: "Foundation & Target batches" },
  { label: "Scholarship deadline", value: "To be announced", note: "Merit & need based" },
];


const feeNotes = [
  {
    icon: <Wallet />,
    title: "Instalments Available",
    desc: "Fees can be split across the term rather than paid up front. The counsellor sets the schedule at confirmation.",
  },
  {
    icon: <BadgeCheck />,
    title: "Merit Scholarships",
    desc: "Strong diagnostic scores and prior board results are both considered. Awards are applied directly against tuition.",
  },
  {
    icon: <CreditCard />,
    title: "What Fees Include",
    desc: "Tuition, printed study material, every weekly mock test and portal access for recorded sessions.",
  },
];


const faqs = [
  {
    q: "Is there an entrance exam to join?",
    a: "There is no pass-or-fail entrance exam. The diagnostic test exists only to place you in the right batch, and it never affects whether you are admitted.",
  },
  {
    q: "Can I join mid-term?",
    a: "Yes. Batches run on a rolling intake, and you receive catch-up recordings plus a bridging plan for whatever has already been covered.",
  },
  {
    q: "Do you offer online admission?",
    a: "The entire process — enquiry, counselling, diagnostic test and document submission — can be completed remotely if you cannot visit the campus.",
  },
  {
    q: "What if I want to change my batch later?",
    a: "Within the first two weeks of a term you can switch batch timing, or move between related exam tracks after speaking to a counsellor, at no extra cost.",
  },
  {
    q: "Are the fees refundable?",
    a: "Refund terms are shared in writing at the time of confirmation. Ask the admissions desk for the current policy before you pay.",
  },
];


function ProcessTimeline() {
  const root = useRef(null);
  const fill = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(fill.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative mt-16">
      <div className="pointer-events-none absolute inset-y-0 left-[27px] hidden w-px bg-[#0B1E3D]/10 md:block">
        <div
          ref={fill}
          className="h-full w-full origin-top bg-gradient-to-b from-[#F0B429] via-[#FDD34F] to-[#804501] shadow-[0_0_12px_rgba(240,180,41,0.6)]"
        />
      </div>

      <ol className="space-y-6">
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            from="left"
            delay={i * 0.06}
            className="relative md:pl-24"
          >
            <span className="absolute left-0 top-6 hidden h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.35)] ring-4 ring-[#F7F3EA] md:grid [&>svg]:h-6 [&>svg]:w-6">
              {s.icon}
            </span>

            <article className="card-light group rounded-3xl p-8 hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] md:hidden [&>svg]:h-5 [&>svg]:w-5">
                  {s.icon}
                </span>
                <span className="rounded-full bg-[#0B1E3D] px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#FDD34F]">
                  Step {i + 1}
                </span>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#804501]/70">
                  {s.meta}
                </span>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-500">{s.desc}</p>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}


const FieldError = ({ message }) =>
  message ? (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#804501]"
    >
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </motion.p>
  ) : null;

const PROGRAMMES = [
  "Foundation (Classes 8–10)",
  "JEE Main / Advanced",
  "NEET UG / PG",
  "NTSE & Olympiads",
  "CA / CS / CMA / ACCA",
  "Spoken English & IELTS",
  "Foreign Languages",
  "Overseas Counselling",
];

function EnquiryForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    programme: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Please enter your full name.";
    else if (form.fullName.trim().length < 2)
      e.fullName = "Name must be at least 2 characters.";

    if (!form.email) e.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";

    if (!form.phone) e.phone = "Please enter your phone number.";
    else if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Please enter a valid phone number.";

    if (!form.programme) e.programme = "Please choose a programme.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((x) => ({ ...x, [name]: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitted(false);
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ fullName: "", email: "", phone: "", programme: "", message: "" });
  };

  const field =
    "w-full rounded-2xl border bg-white px-5 py-3.5 text-sm text-[#0B1E3D] transition-all placeholder:text-[#0B1E3D]/35 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50";
  const ok = "border-[#0B1E3D]/10 hover:border-[#F0B429]/40";
  const bad = "border-[#804501]/60 bg-[#804501]/[0.03]";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#0B1E3D]/60">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Your name"
            aria-invalid={!!errors.fullName}
            className={`${field} ${errors.fullName ? bad : ok}`}
          />
          <FieldError message={errors.fullName} />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#0B1E3D]/60">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
            className={`${field} ${errors.phone ? bad : ok}`}
          />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#0B1E3D]/60">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          className={`${field} ${errors.email ? bad : ok}`}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label htmlFor="programme" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#0B1E3D]/60">
          Programme of Interest
        </label>
        <div className="relative">
          <select
            id="programme"
            name="programme"
            value={form.programme}
            onChange={onChange}
            aria-invalid={!!errors.programme}
            className={`${field} ${errors.programme ? bad : ok} cursor-pointer appearance-none pr-12`}
          >
            <option value="">Select a programme…</option>
            {PROGRAMMES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0B1E3D]/40" />
        </div>
        <FieldError message={errors.programme} />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#0B1E3D]/60">
          Anything We Should Know <span className="normal-case tracking-normal text-[#0B1E3D]/35">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={onChange}
          placeholder="Current class, target exam year, preferred batch timing…"
          className={`${field} ${ok} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.02 }}
        whileTap={{ scale: submitting ? 1 : 0.98 }}
        className="shine group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-8 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.32)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.48)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="relative h-4 w-4 animate-spin" />
            <span className="relative">Sending…</span>
          </>
        ) : (
          <>
            <Send className="relative h-4 w-4" />
            <span className="relative">Submit Enquiry</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="status"
            className="flex items-start gap-3 overflow-hidden rounded-2xl border border-[#F0B429]/35 bg-[#F0B429]/10 p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B26E02]" />
            <p className="text-sm font-semibold leading-relaxed text-[#804501]">
              Thank you — your enquiry has been recorded. A counsellor will call
              you within 24 hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-14 space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.05}>
            <div
              className={`overflow-hidden rounded-3xl border bg-white transition-all duration-500 ${
                isOpen
                  ? "border-[#F0B429]/45 shadow-[0_20px_50px_rgba(11,30,61,0.10)]"
                  : "border-[#0B1E3D]/8 hover:border-[#F0B429]/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
              >
                <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[#0B1E3D]">
                  {f.q}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${
                    isOpen
                      ? "rotate-180 bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D]"
                      : "bg-[#F0EBE0] text-[#804501]"
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-7 pb-7 leading-relaxed text-slate-500">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function AdmissionContent() {
  return (
    <div className="overflow-x-clip">
      <PageHero
        // align="center"
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5 text-[#B26E02]" />,
          text: "Admissions Open · Rolling Intake",
        }}
        title="Your Seat Starts"
        accent="With One Conversation"
        subtitle="No entrance hurdle, no queue. Five clear steps from your first enquiry to your first class — and a counsellor with you at each one."
        actions={
          <>
            <a
              href="#enquire"
              className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.32)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.48)]"
            >
              <span className="relative">Start Your Application</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-9 py-4 text-base font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#804501]"
            >
              See the Process
            </a>
          </>
        }
      />


      <section id="process" className="relative overflow-hidden bg-section py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Five steps, <span className="text-gold-gradient">no guesswork</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>
          <ProcessTimeline />
        </div>
      </section>
      <section className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Before You Apply</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Eligibility &amp; <span className="text-gold-gradient">paperwork</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal from="left">
              <div className="card-light h-full rounded-3xl p-9">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.3)]">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                  Who Can Apply
                </h3>

                <ul className="mt-7 space-y-5">
                  {eligibility.map((e) => (
                    <li key={e.track} className="border-l-2 border-[#F0B429]/40 pl-5">
                      <p className="font-bold text-[#0B1E3D]">{e.track}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {e.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="card-light h-full rounded-3xl p-9">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#804501] to-[#985801] text-[#FDD34F] shadow-[0_10px_28px_rgba(128,69,1,0.3)]">
                  <FileText className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                  What to Bring
                </h3>

                <ul className="mt-7 space-y-4">
                  {documents.map((d) => (
                    <li key={d} className="group flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#B26E02] transition-transform duration-300 group-hover:scale-110" />
                      <span className="leading-relaxed text-slate-600">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

   
      <section className="relative overflow-hidden bg-[#0B1E3D] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,180,41,0.14),transparent_65%)]" />
        <FloatingOrb className="right-[8%] top-10 h-[380px] w-[380px] bg-[#F0B429]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge variant="white">
              <CalendarDays className="h-3.5 w-3.5 text-[#FDD34F]" />
              Key Dates
            </SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-white md:text-5xl">
              Mark your <span className="text-gold-gradient-on-dark">calendar</span>
            </h2>
          </Reveal>

          <Reveal stagger staggerAmount={0.1} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dates.map((d) => (
              <div
                key={d.label}
                className="glass-dark group rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#F0B429]/45"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#FDD34F]/80">
                  {d.label}
                </p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-black leading-tight text-white">
                  {d.value}
                </p>
                <div className="hairline-gold my-4 w-10" />
                <p className="text-xs leading-relaxed text-white/45">{d.note}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-white/40">
              Dates are confirmed by the admissions desk at the time of
              counselling.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Fees &amp; Support</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Nothing hidden, <span className="text-gold-gradient">nothing sprung on you</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <Reveal stagger staggerAmount={0.12} className="mt-16 grid gap-8 md:grid-cols-3">
            {feeNotes.map((f) => (
              <article key={f.title} className="card-light group rounded-3xl p-8 hover:-translate-y-1">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.3)] transition-transform duration-500 group-hover:scale-110 [&>svg]:h-6 [&>svg]:w-6">
                  {f.icon}
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-xl font-black text-[#0B1E3D]">
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-500">{f.desc}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="enquire" className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[150px]" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <Reveal from="left">
            <SectionBadge>Start Here</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight text-[#0B1E3D] md:text-5xl">
              Tell us what you&apos;re{" "}
              <span className="text-gold-gradient">aiming for</span>
            </h2>
            <div className="hairline-gold my-6 max-w-[10rem]" />
            <p className="max-w-md text-lg leading-relaxed text-slate-500">
              Fill this in and a counsellor calls you back within 24 hours. No
              obligation, and no fee is due until you confirm a seat.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "A callback within 24 hours",
                "A batch matched to your pace",
                "Scholarship options reviewed up front",
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
                <Phone className="h-5 w-5 text-[#B26E02]" />
                Reach the admissions desk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="card-light rounded-3xl p-8 md:p-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section py-28">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Questions</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Admission <span className="text-gold-gradient">FAQ</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <Faq />
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream py-24">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal from="scale">
            <div className="relative overflow-hidden rounded-3xl bg-[#06142D] p-12 text-center md:p-20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(240,180,41,0.2),transparent_65%)]" />
              <FloatingOrb className="left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 bg-[#F0B429]/12 blur-[130px]" />
              <div className="absolute inset-px rounded-3xl border border-[#F0B429]/25" />
              <div className="grain absolute inset-0 overflow-hidden rounded-3xl" />

              <div className="relative">
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  Still deciding?{" "}
                  <span className="text-gold-gradient-on-dark">
                    Talk to a counsellor first.
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">
                  A fifteen-minute call is usually enough to know whether we are
                  the right fit for your target exam.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href="#enquire"
                    className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.5)]"
                  >
                    <span className="relative">Book My Callback</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-[#F0B429]/60 hover:text-[#FDD34F]"
                  >
                    Browse Courses
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

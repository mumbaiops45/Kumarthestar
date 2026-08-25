"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {motion,useMotionValue,useSpring,useTransform} from "framer-motion";
import {ArrowRight,BookOpen,Calendar,Feather,GraduationCap,Languages,Lightbulb,Mail,Quote,Sparkles,Star,Target,Users} from "lucide-react";
import { Reveal } from "../component/Reveal";
import PageHero from "../component/PageHero";
import bookCover from "../../../public/book.jpeg";
import authorPortrait from "../../../public/owner.jpeg";


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


function TiltCover() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-18deg", "18deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["14deg", "-14deg"]);
  const shineX = useTransform(sx, [-0.5, 0.5], ["130%", "-30%"]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto w-full max-w-[340px]"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute -inset-16 rounded-full bg-[#F0B429]/20 blur-[90px]" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, rotateZ: -6 }}
        animate={{ opacity: 1, y: 0, rotateZ: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative"
      >
        <div
          className="absolute inset-y-2 -right-2 w-3 rounded-r-sm bg-[linear-gradient(90deg,#FEEB80_0%,#FDFBF5_18%,#E8E2D4_40%,#FDFBF5_62%,#D9D2C2_100%)] shadow-[2px_0_10px_rgba(6,20,45,0.35)]"
          style={{ transform: "translateZ(-6px) rotateY(6deg)" }}
        />
        <div className="relative overflow-hidden rounded-r-md rounded-l-sm shadow-[0_30px_70px_-18px_rgba(11,30,61,0.45)] ring-1 ring-[#F0B429]/45">
          <Image
            src={bookCover}
            alt='Cover of "MBA is Fun Da" by Kumara Swamy N'
            placeholder="blur"
            priority
            sizes="(max-width: 768px) 70vw, 340px"
            className="h-auto w-full select-none"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/45 via-black/12 to-transparent" />
          <motion.div
            style={{ x: shineX }}
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/28 to-transparent"
          />
        </div>
      </motion.div>
      <div
        aria-hidden="true"
        className="relative mx-auto mt-2 w-full max-w-[340px] scale-y-[-1] opacity-20 [mask-image:linear-gradient(to_top,transparent_72%,black_100%)]"
      >
        <Image
          src={bookCover}
          alt=""
          sizes="(max-width: 768px) 70vw, 340px"
          className="h-auto w-full blur-[1px]"
        />
      </div>
    </div>
  );
}

const specs = [
  { icon: <Calendar className="h-4 w-4" />, label: "Published", value: "2014" },
  { icon: <BookOpen className="h-4 w-4" />, label: "Edition", value: "First" },
  { icon: <Languages className="h-4 w-4" />, label: "Language", value: "English" },
  { icon: <Feather className="h-4 w-4" />, label: "Author", value: "Kumara Swamy N" },
];

const themes = [
  {
    icon: <Lightbulb />,
    title: "Management, Minus the Jargon",
    desc: "The core ideas of an MBA classroom retold in plain language, so a first-year student can follow them without a glossary.",
  },
  {
    icon: <Target />,
    title: "Case Studies That Stick",
    desc: "Familiar situations from Indian campuses and workplaces, used to explain strategy, pricing and positioning.",
  },
  {
    icon: <Users />,
    title: "People Before Frameworks",
    desc: "Why teams behave the way they do, and how the textbook models hold up when real personalities are involved.",
  },
  {
    icon: <GraduationCap />,
    title: "For the Exam and After",
    desc: "Written to serve both the student preparing for entrance papers and the graduate on their first management job.",
  },
];

const praise = [
  {
    quote:
      "Makes management concepts feel like conversation rather than coursework. My students finish a chapter and actually want the next one.",
    name: "Faculty feedback",
    role: "Management studies",
  },
  {
    quote:
      "The examples come from places we recognise, which is exactly why the ideas stayed with me long after the semester ended.",
    name: "Reader feedback",
    role: "MBA graduate",
  },
];

export default function BooksContent() {
  return (
    <div className="overflow-x-clip">
      <PageHero
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5 text-[#B26E02]" />,
          text: "Published 2014 · First Book",
        }}
        title="MBA is"
        accent="Fun Da"
        subtitle={
          "A first book, written for anyone who suspects management is simpler than the textbooks make it sound — and who would rather enjoy learning it than survive it."
        }
        actions={
          <>
            <Link
              href="/contact"
              className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-8 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.32)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.48)]"
            >
              <span className="relative">Request a Copy</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#inside"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-8 py-4 text-base font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#804501]"
            >
              <BookOpen className="h-4 w-4" />
              What&apos;s Inside
            </a>
          </>
        }
        media={<TiltCover />}
      />

      <div className="relative bg-section-hero pb-6">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="hairline-gold w-12" />
          <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#804501]">
            by Kumara Swamy N
          </span>
        </div>
      </div>

      <section className="relative border-y border-[#0B1E3D]/8 bg-section-alt py-10">
        <Reveal stagger className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F0B429]/12 text-[#B26E02] ring-1 ring-[#F0B429]/25">
                {s.icon}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#804501]/70">
                  {s.label}
                </span>
                <span className="mt-1 font-[family-name:var(--font-display)] text-lg font-black text-[#0B1E3D]">
                  {s.value}
                </span>
              </span>
            </div>
          ))}
        </Reveal>
      </section>

   
      <section id="inside" className="relative overflow-hidden bg-section py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Inside the Book</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Management, told as a{" "}
              <span className="text-gold-gradient">story</span>
            </h2>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <Reveal stagger staggerAmount={0.14} className="mt-16 grid gap-8 md:grid-cols-2">
            {themes.map((t, i) => (
              <article
                key={t.title}
                className="card-light group relative overflow-hidden rounded-3xl p-8 hover:-translate-y-1"
              >
                <span className="pointer-events-none absolute -right-3 -top-8 font-[family-name:var(--font-display)] text-[7rem] font-black leading-none text-[#F0B429]/8 transition-transform duration-700 group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#B26E02] text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.32)] transition-transform duration-500 group-hover:scale-110 [&>svg]:h-6 [&>svg]:w-6">
                  {t.icon}
                </span>

                <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                  {t.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-slate-500">
                  {t.desc}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B1E3D] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,180,41,0.14),transparent_65%)]" />
        <FloatingOrb className="left-[10%] top-0 h-[380px] w-[380px] bg-[#F0B429]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge variant="white">In Praise Of</SectionBadge>
          </Reveal>

          <Reveal stagger staggerAmount={0.16} className="mt-14 grid gap-8 md:grid-cols-2">
            {praise.map((p) => (
              <figure
                key={p.name}
                className="glass-dark relative rounded-3xl p-9 transition-colors duration-500 hover:border-[#F0B429]/40"
              >
                <Quote className="h-9 w-9 text-[#F0B429]/45" />
                <blockquote className="mt-5 text-lg leading-relaxed text-white/85">
                  {p.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <div className="hairline-gold w-8" />
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold text-[#FDD34F]">{p.name}</span>
                    <span className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/45">
                      {p.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F0B429]/10 blur-[150px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[auto_1fr] lg:px-8">
          <Reveal from="left" className="mx-auto lg:mx-0">
            <div className="relative h-[200px] w-[200px]">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-[#F0B429] via-[#FDD34F] to-[#804501] opacity-25 blur-xl" />
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#F0B429] to-[#804501]" />
              <Image
                src={authorPortrait}
                alt="Kumara Swamy N, author and founder"
                placeholder="blur"
                sizes="200px"
                className="relative h-full w-full rounded-full object-cover ring-4 ring-white"
              />
              <span className="absolute -bottom-1 -right-1 grid h-12 w-12 place-items-center rounded-full bg-[#0B1E3D] text-[#FDD34F] shadow-[0_8px_24px_rgba(11,30,61,0.35)] ring-2 ring-[#F0B429]/40">
                <Feather className="h-5 w-5" />
              </span>
            </div>
          </Reveal>

          <Reveal from="right">
            <SectionBadge>The Author</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Kumara Swamy N
            </h2>
            <div className="hairline-gold my-6 max-w-[10rem]" />
            <p className="max-w-2xl text-lg leading-relaxed text-slate-500">
              Educator, mentor and founder of Kumar The Star. After years in
              classrooms watching bright students bounce off dense management
              texts, he wrote the book he wished they had been handed on day
              one — the same instinct that shapes how the institute teaches
              today.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-7 py-3.5 text-sm font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#B26E02]"
              >
                <Star className="h-4 w-4" />
                More About the Institute
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
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
                  Want a copy of{" "}
                  <span className="text-gold-gradient-on-dark">
                    MBA is Fun Da
                  </span>
                  ?
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">
                  Tell us where to send it and our team will get back to you
                  with availability and pricing.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.5)]"
                  >
                    <Mail className="relative h-4 w-4" />
                    <span className="relative">Enquire Now</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-[#F0B429]/60 hover:text-[#FDD34F]"
                  >
                    Explore Courses
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

"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {ArrowRight,Award,BadgeCheck,Building2,Compass,Mail,MapPin,Phone,ShieldCheck,Sparkles,Target,UserRound} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageHero from "../component/PageHero";
import CandyWelfare from "../component/CandyWelfare";
import { Reveal } from "../component/Reveal";
import { contact, founder, site, whatsappLink } from "../../data/site";
import { divisions, divisionCategories, categoryTheme } from "../../data/divisions";
import ownerPortrait from "../../../public/owner.jpeg";

const serviceLineCount = divisions.length;
const categoryCount = divisionCategories.length - 1; 


const categorySummary = divisionCategories
  .filter((cat) => cat.key !== "all")
  .map((cat) => {
    const inCategory = divisions.filter((d) => d.category === cat.key);
    return {
      key: cat.key,
      label: cat.label,
      count: inCategory.length,
      icon: inCategory[0].icon,
      from: categoryTheme[cat.key].from,
      to: categoryTheme[cat.key].to,
    };
  });

const principles = [
  {
    icon: UserRound,
    title: "One Person Accountable",
    desc: "Whichever service you use, the same proprietor stands behind it. No passing you between departments that do not talk to each other.",
  },
  {
    icon: BadgeCheck,
    title: "Quoted Before It Starts",
    desc: "Fees, timelines and what is included are agreed in writing before any work begins. No revised numbers halfway through.",
  },
  {
    icon: Compass,
    title: "Honest Direction",
    desc: "If a service is not right for you - or we are not the right people for it - we say so and point you elsewhere. It costs us a job and keeps a reputation.",
  },
  {
    icon: ShieldCheck,
    title: "Verified People",
    desc: "Every tutor, promoter, guard and counsellor working under our name is background-checked before they reach a client or a classroom.",
  },
];

const milestones = [
  {
    label: "The firm",
    title: "A proprietorship, not a chain",
    desc: "Kumarthestar is a proprietorship firm. Decisions are made by the person whose name is on the door, which is why answers come the same day rather than after three approvals.",
  },
  {
    label: "The range",
    title: `${serviceLineCount} service lines, ${categoryCount} categories`,
    desc: "Education and coaching sit alongside languages, drama and short films, coffee and tea, cooking classes in Mysuru, corporate services, real estate and security staffing.",
  },
  {
    label: "The reason",
    title: "Fewer vendors to chase",
    desc: "Most families and businesses juggle a different contact for every need. We built one firm that can pick up the phone for all of them, at a single standard.",
  },
];

function FounderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#F0B429]/25 via-transparent to-[#804501]/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-[#0B1E3D]/8 bg-white shadow-[0_40px_90px_rgba(11,30,61,0.16)]">
        <div className="relative  w-full overflow-hidden bg-[#F0EBE0]">
          <Image
            src={ownerPortrait}
            alt={`${founder.name}, ${founder.role} of ${site.name}`}
            placeholder="blur"
            fetchPriority="high"
            sizes="(max-width: 1024px) 90vw, 480px"
            className="h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06142D]/90 via-[#06142D]/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#FDD34F]">
              {founder.role}
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-black text-white">
              {founder.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-white/70">{founder.qualification}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased">
      <PageHero
        badge={{
          icon: <Building2 className="h-3.5 w-3.5" />,
          text: `${site.entityType} · ${contact.address.city}`,
        }}
        title="Kumarthestar."
        accent="One Firm. Many Services."
        subtitle={site.shortIntro}
        media={<FounderCard />}
      />

      <section id="who-we-are" className="relative overflow-hidden bg-[#FAFAF8] py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-[#F0B429]/8 blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal from="left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
                <Target className="h-3.5 w-3.5" />
                Who We Are
              </span>

              <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
                A single firm behind
                <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                  a very wide counter.
                </span>
              </h2>

              <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] shadow-[0_0_12px_rgba(240,180,41,0.6)]" />

              <p className="mt-7 text-base leading-7 text-slate-500">
                {site.name} is a {site.entityType.toLowerCase()} based in {contact.address.city},{" "}
                {contact.address.state}. It began with coaching - Classes 1 to 12, entrance exams,
                defence and civil services - and grew into the other things the same families and
                businesses kept asking for.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-500">{founder.bio}</p>

              <div className="mt-9 space-y-5">
                {milestones.map((item) => (
                  <div
                    key={item.title}
                    className="relative rounded-2xl border border-[#0B1E3D]/8 bg-white p-6 shadow-[0_10px_30px_rgba(11,30,61,0.06)] transition-all duration-500 hover:border-[#F0B429]/40 hover:shadow-[0_18px_44px_rgba(11,30,61,0.1)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">
                      {item.label}
                    </span>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-[#0B1E3D]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal from="right" className="lg:pt-16">
              <div className="grid gap-5 sm:grid-cols-2">
                {principles.map((principle) => (
                  <div
                    key={principle.title}
                    className="card-light group rounded-3xl p-6 sm:p-7"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0B1E3D] to-[#1a3a6e] text-[#FDD34F] shadow-[0_10px_26px_rgba(11,30,61,0.22)] transition-transform duration-500 group-hover:scale-105">
                      <principle.icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-extrabold text-[#0B1E3D]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{principle.desc}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1E3D] to-[#06142D] p-7 shadow-[0_30px_70px_rgba(6,20,45,0.3)]">
                <div className="pointer-events-none absolute inset-0 grid-gold opacity-30" />
                <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FDD34F]">
                  <Award className="h-3 w-3" />
                  Our Promise
                </span>
                <p className="relative mt-4 font-[family-name:var(--font-display)] text-xl font-bold leading-relaxed text-white sm:text-2xl">
                  &ldquo;Whatever you came to us for - a tuition batch, a job, a property, a
                  security team or a kilo of coffee - you will get a straight answer and a fair
                  price.&rdquo;
                </p>
                <p className="relative mt-5 text-sm font-bold text-[#FDD34F]">
                  {founder.name}, {founder.qualification}
                </p>
                <p className="relative text-xs text-white/50">{founder.role}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    
      <section id="divisions" className="relative overflow-hidden bg-section-alt py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-60" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up" className=" max-w-3xl ">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
              What We Do
            </span>

            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
              {categoryCount} categories, {" "}
              <span className=" bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                {serviceLineCount} service lines.
              </span>
            </h2>
            <p className="text-base leading-7 mt-4 text-slate-500">
              This page is about the firm and the person behind it. The services themselves - what
              each one covers, who it is for and what it costs to start - live on their own page.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorySummary.map((cat) => (
              <Reveal key={cat.key} from="up">
                <Link
                  href="/services"
                  className="card-light group flex h-full items-center gap-4 rounded-2xl p-5"
                >
                  <span
                    className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_26px_rgba(11,30,61,0.2)] transition-transform duration-500 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${cat.from}, ${cat.to})` }}
                  >
                    <cat.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-[family-name:var(--font-display)] text-base font-extrabold leading-snug text-[#0B1E3D] transition-colors duration-500 group-hover:text-[#804501]">
                      {cat.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      {cat.count} {cat.count === 1 ? "service" : "services"}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CandyWelfare id="candy-international" />
      <section
        id="contact-founder"
        className="relative overflow-hidden bg-section-hero py-20 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 grid-gold" />
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#F0B429]/12 blur-[170px]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal from="up" className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#804501]/25 bg-[#804501]/8 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501]">
              Contact Us 
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.08] tracking-tight text-[#0B1E3D] sm:text-5xl">
              Speak directly to {" "}
              <span className=" bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent">
                the proprietor.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              No call centre and no forms you never hear back from. Both numbers below reach us
              directly during working hours.
            </p>
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#0B1E3D]/8 bg-white shadow-[0_30px_80px_rgba(11,30,61,0.12)]">
            <div className="flex flex-col items-center gap-5 border-b border-[#0B1E3D]/8 bg-gradient-to-r from-[#0B1E3D] to-[#112448] p-8 text-center sm:flex-row sm:text-left">
              <span className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#804501] text-[#06142D] shadow-[0_12px_30px_rgba(240,180,41,0.3)]">
                <UserRound className="h-8 w-8" strokeWidth={1.8} />
              </span>
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl font-black text-white">
                  {founder.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#FDD34F]">
                  {founder.qualification} &middot; {founder.role}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {site.name} &mdash; {site.entityType}
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-[#0B1E3D]/8 sm:grid-cols-2">
              {contact.phones.map((phone, i) => (
                <a
                  key={phone.raw}
                  href={`tel:+${phone.raw}`}
                  className="group flex items-center gap-4 bg-white p-6 transition-colors duration-300 hover:bg-[#F0B429]/8"
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all duration-300 group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {i === 0 ? "Primary line" : "Alternate line"}
                    </p>
                    <p className="mt-1 text-lg font-black text-[#0B1E3D] transition-colors group-hover:text-[#804501]">
                      {phone.label}
                    </p>
                  </div>
                </a>
              ))}

              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-4 bg-white p-6 transition-colors duration-300 hover:bg-[#F0B429]/8"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all duration-300 group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-bold text-[#0B1E3D] transition-colors group-hover:text-[#804501]">
                    {contact.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white p-6">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Based in
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#0B1E3D]">{contact.address.full}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#0B1E3D]/8 bg-[#F7F3EA] p-6 sm:flex-row">
              <p className="text-xs font-semibold text-slate-500">{contact.hours}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(37,211,102,0.3)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(37,211,102,0.42)]"
                >
                  <FaWhatsapp className="text-base" />
                  WhatsApp us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0B1E3D] to-[#112448] px-6 py-3 text-sm font-bold text-[#FDD34F] shadow-[0_10px_26px_rgba(11,30,61,0.25)] transition-all duration-300"
                >
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs leading-6 text-slate-400">
            More detailed pages for each service line are being added. Until then, everything is
            listed on this page.
          </p>
        </div>
      </section>
    </div>
  );
}

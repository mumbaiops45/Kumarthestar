"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {divisions,divisionCategories,categoryTheme} from "../../data/divisions";
import { whatsappLink } from "../../data/site";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: Math.min(i, 8) * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};


function DivisionMedia({ division, theme, comingSoon }) {
  const Icon = division.icon;
  const [hasImage, setHasImage] = useState(Boolean(division.image));
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ backgroundColor: division.tint ?? theme.from }}
    >
      {hasImage ? (
        <Image
          src={division.image}
          alt={division.imageAlt || division.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setLoaded(true)}
          onError={() => setHasImage(false)}
          className={`object-cover saturate-[0.88] transition-all duration-[900ms] ease-premium will-change-transform group-hover:scale-[1.08] group-hover:saturate-[1.12] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
        >
          <div className="pointer-events-none absolute inset-0 grid-gold opacity-25" />
          <Icon
            className="relative h-16 w-16 text-white/85 transition-transform duration-700 ease-premium group-hover:scale-110"
            strokeWidth={1.4}
          />
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06142D]/85 via-[#06142D]/20 to-[#06142D]/10 transition-opacity duration-700 ease-premium group-hover:opacity-70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-700 ease-premium group-hover:opacity-90"
        style={{ background: `linear-gradient(135deg, ${theme.from}, transparent 55%, ${theme.to})` }}
      />

      <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#FDD34F]/35 to-transparent transition-transform duration-[1100ms] ease-premium group-hover:translate-x-[420%]" />

      <div className="absolute inset-x-4 top-4 flex justify-end">
        {comingSoon ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FDD34F]/40 bg-[#06142D]/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FDD34F] backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F0B429]" />
            Coming Soon
          </span>
        ) : (
          <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors duration-500 group-hover:border-[#FDD34F]/50 group-hover:text-[#FDD34F]">
            {theme.label}
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#FDD34F] transition-transform duration-700 ease-premium group-hover:scale-x-100" />
    </div>
  );
}

function DivisionCard({ division, index }) {
  const theme = categoryTheme[division.category];
  const Icon = division.icon;
  const comingSoon = division.status === "coming-soon";

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -6 }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ transitionProperty: "box-shadow, border-color" }}
      className="card-light group relative flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative">
        <DivisionMedia division={division} theme={theme} comingSoon={comingSoon} />
        <span
          className="absolute -bottom-7 left-6 z-10 grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_14px_34px_rgba(6,20,45,0.35)] ring-4 ring-white transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
        >
          <Icon className="h-6 w-6" strokeWidth={1.9} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-11 sm:p-7 sm:pt-11">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold leading-snug text-[#0B1E3D] transition-colors duration-500 group-hover:text-[#804501]">
          {division.title}
        </h3>

        <p className="mt-1.5 text-sm font-semibold" style={{ color: theme.text }}>
          {division.tagline}
        </p>

        <span className="mt-3 block h-[2px] w-9 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] transition-all duration-700 ease-premium group-hover:w-20" />

        <p className="mt-3 text-sm leading-6 text-slate-500">{division.description}</p>

        <ul className="mt-5 space-y-2.5">
          {division.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-[#F0B429]/15 text-[#B26E02] transition-colors duration-500 group-hover:bg-[#F0B429]/30">
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>

        {division.highlight && (
          <p className="mt-4 inline-flex items-center gap-1.5 self-start rounded-lg bg-[#0B1E3D]/5 px-2.5 py-1.5 text-xs font-bold text-[#0B1E3D]">
            <MapPin className="h-3 w-3 text-[#B26E02]" />
            {division.highlight}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {division.href && !comingSoon ? (
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
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#0B1E3D]/10 bg-white px-3.5 py-2 text-xs font-bold text-[#0B1E3D] transition-all duration-300 hover:border-[#F0B429]/60 hover:bg-[#F0B429]/10 hover:text-[#804501]"
          >
            <FaWhatsapp className="text-sm text-[#25D366]" />
            {comingSoon ? "Get updates" : "Enquire"}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function DivisionsShowcase({
  id = "divisions",
  showFilters = true,
  limit,
  heading = "Everything We Do",
  accent = "Under One Roof",
  eyebrow = "Our Services",
  intro = "Kumarthestar runs each of these as its own service line, with one point of accountability across all of them. Filter by what you need.",
  footer = null,
  category,
  onCategoryChange,
}) {
  const [internalActive, setInternalActive] = useState("all");
  const active = category ?? internalActive;
  const setActive = onCategoryChange ?? setInternalActive;

  const visible = useMemo(() => {
    const list = active === "all" ? divisions : divisions.filter((d) => d.category === active);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [active, limit]);

  const counts = useMemo(() => {
    const map = { all: divisions.length };
    for (const d of divisions) map[d.category] = (map[d.category] ?? 0) + 1;
    return map;
  }, []);

  return (
    <section id={id} className="relative overflow-hidden bg-section-alt py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-gold opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#804501]/8 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#F0B429]/30 bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#804501] shadow-sm">
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
        </motion.div>

        {showFilters && (
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {divisionCategories.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActive(cat.key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition-all duration-300 sm:px-5 ${
                    isActive
                      ? "bg-[#0B1E3D] text-[#FDD34F] shadow-[0_10px_26px_rgba(11,30,61,0.25)]"
                      : "border border-[#0B1E3D]/10 bg-white text-[#0B1E3D]/75 hover:border-[#F0B429]/50 hover:text-[#804501]"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                      isActive ? "bg-white/15 text-[#FDD34F]" : "bg-[#F0B429]/15 text-[#B26E02]"
                    }`}
                  >
                    {counts[cat.key] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((division, i) => (
              <DivisionCard key={division.slug} division={division} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* {footer ?? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 flex flex-col items-center justify-center gap-4 rounded-3xl border border-[#0B1E3D]/8 bg-white p-7 text-center shadow-[0_20px_50px_rgba(11,30,61,0.08)] sm:flex-row sm:text-left"
          >
            <p className="flex-1 text-sm leading-6 text-slate-600">
              <span className="font-bold text-[#0B1E3D]">Not sure which service you need?</span>{" "}
              Tell us the problem in one sentence and we will point you to the right desk.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#0B1E3D] to-[#112448] px-6 py-3 text-sm font-bold text-[#FDD34F] shadow-[0_8px_24px_rgba(11,30,61,0.28)] transition-all duration-300 hover:shadow-[0_12px_34px_rgba(240,180,41,0.32)]"
              >
                <Phone className="h-4 w-4" />
                Contact us
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-6 py-3 text-sm font-bold text-[#0B1E3D] transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/8"
              >
                <FaWhatsapp className="text-base text-[#25D366]" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )} */}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, PawPrint, Stethoscope, Syringe, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../data/site";

const pillars = [
  {
    icon: Stethoscope,
    title: "Rescue & Treatment",
    desc: "Injured and abandoned street animals picked up, treated and given time to recover.",
  },
  {
    icon: Syringe,
    title: "Sterilisation & Vaccination",
    desc: "Community drives that control street populations humanely and keep neighbourhoods safe.",
  },
  {
    icon: Heart,
    title: "Adoption & Rehoming",
    desc: "Screened, patient rehoming - the right family for the animal, not the first one available.",
  },
  {
    icon: Users,
    title: "Awareness Programmes",
    desc: "School and community sessions on feeding, first aid and reporting cruelty.",
  },
];


function CandyPortrait() {
  const [hasImage, setHasImage] = useState(true);
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#F0B429]/25 via-transparent to-[#804501]/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#0B1E3D] to-[#06142D] shadow-[0_40px_100px_rgba(6,20,45,0.45)]">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-30" />

        {hasImage ? (
          <img
            src="/dog.jpeg"
            alt="Candy - the rescue our animal welfare organization is named after"
            onError={() => setHasImage(false)}
            loading="lazy"
            className="relative aspect-square w-full object-cover"
          />
        ) : (
          <div className="relative grid aspect-square w-full place-items-center">
            <div className="text-center">
              <span className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#804501] shadow-[0_20px_50px_rgba(240,180,41,0.35)]">
                <PawPrint className="h-14 w-14 text-[#06142D]" strokeWidth={1.6} />
              </span>
              <p className="mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-white">
                Candy
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-[#FDD34F]">
                Our Namesake
              </p>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06142D] to-transparent" />
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -right-4 rounded-2xl border border-[#F0B429]/30 bg-white px-5 py-4 shadow-[0_20px_50px_rgba(11,30,61,0.2)] sm:-right-8"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">Status</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-black text-[#0B1E3D]">
          Launching Soon
        </p>
      </motion.div>
    </div>
  );
}

export default function CandyWelfare({ id = "candy-international" }) {
  return (
    <section id={id} className="relative overflow-hidden bg-[#06142D] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-gold opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-[#F0B429]/12 blur-[180px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[#804501]/18 blur-[180px]" />
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#FDD34F] backdrop-blur-sm">
              <PawPrint className="h-3.5 w-3.5" />
              Our Social Initiative
            </span>

            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl">
              Candy International
              <span className="block text-gold-gradient-on-dark">
                Animal Welfare Organization
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
              Kumarthestar is setting up Candy International as its animal welfare arm - a
              non-commercial initiative to rescue, treat and rehome street animals, and to run
              sterilisation, vaccination and awareness drives in the communities we already work in.
            </p>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/60">
              Registration and the first programmes are being put in place now. If you want to
              volunteer, foster, donate or partner with us, reach out and we will add you to the
              launch list.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-dark rounded-2xl p-5 transition-colors duration-500 hover:border-[#F0B429]/40"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#F0B429] to-[#804501] text-[#06142D]">
                    <pillar.icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-3.5 text-sm font-extrabold text-white">{pillar.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-white/50">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={whatsappLink(
                  "Hello Kumarthestar, I would like to volunteer / donate / partner with Candy International Animal Welfare Organization."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-7 py-3.5 text-sm font-black text-[#06142D] shadow-[0_12px_34px_rgba(240,180,41,0.32)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(240,180,41,0.45)]"
              >
                <FaWhatsapp className="relative text-base" />
                <span className="relative">Join the launch list</span>
              </a>

              <Link
                href="/about-us#contact-founder"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#F0B429]/50 hover:bg-white/10"
              >
                Talk to us first
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <CandyPortrait />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

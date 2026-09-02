import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { contact, founder, site, socials, whatsappLink } from "../../data/site";
import { divisions } from "../../data/divisions";

const socialIcons = {
  facebook: <FaFacebookF />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  youtube: <FaYoutube />,
};

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "All Services", href: "/services" },
  { name: "Tutoring", href: "/courses" },
  { name: "Placements", href: "/placement" },
  { name: "Candy Tees", href: "/candy" },
  { name: "Contact", href: "/contact" },
];

const featuredServices = [
  "online-coaching",
  "competitive-exams",
  "defence-entrance",
  "spoken-english",
  "cooking-classes",
  "job-consultancy",
  "real-estate",
  "candy-international",
]
  .map((slug) => divisions.find((d) => d.slug === slug))
  .filter(Boolean);

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-section-hero text-slate-600">
      <div className="hairline-gold absolute left-0 right-0 top-0" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[170px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#804501]/12 blur-[170px]" />
      <div className="pointer-events-none absolute inset-0 grid-gold" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3.5">
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#06142D] ring-1 ring-[#F0B429]/45 shadow-[0_6px_18px_rgba(11,30,61,0.25)]">
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(240,180,41,0.3),transparent_68%)]" />
                <img
                  src="/logo.png"
                  alt={site.displayName + " logo"}
                  className="relative h-9 w-9 object-contain mix-blend-screen"
                />
              </span>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold leading-none text-[#0B1E3D]">
                  Kumar<span className="text-[#F0B429]">The</span>Star
                </h2>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">
                  {site.entityType}
                </p>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-500">
              {site.name} runs coaching and admissions, language training, drama and short films,
              coffee, tea and cooking classes, corporate services, real estate and security
              staffing &mdash; all under one proprietorship.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2.5 text-xs font-bold text-[#0B1E3D] transition-all duration-300 hover:border-[#25D366]/60 hover:bg-[#25D366]/20"
            >
              <FaWhatsapp className="text-base text-[#25D366]" />
              Chat on WhatsApp
            </a>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-slate-500 transition-colors duration-300 hover:text-[#B26E02]"
                  >
                    <span className="h-px w-4 bg-[#F0B429]/40 transition-all duration-300 group-hover:w-7 group-hover:bg-[#F0B429]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Our Services
            </h3>
            <ul className="space-y-3">
              {featuredServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href ?? "/services"}
                    className="group inline-flex items-start gap-2.5 text-sm text-slate-500 transition-colors duration-300 hover:text-[#B26E02]"
                  >
                    <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#F0B429]/40 transition-all duration-300 group-hover:w-7 group-hover:bg-[#F0B429]" />
                    <span>
                      {service.title}
                      {service.status === "coming-soon" && (
                        <span className="ml-1.5 rounded bg-[#F0B429]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#B26E02]">
                          Soon
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#804501] transition-colors hover:text-[#0B1E3D]"
                >
                  View all {divisions.length} services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Contact Us
            </h3>
            <div className="mb-5 rounded-2xl border border-[#0B1E3D]/8 bg-white/70 p-4">
              <p className="text-sm font-black text-[#0B1E3D]">{founder.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-[#B26E02]">
                {founder.qualification} &middot; {founder.role}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02]">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <p className="leading-relaxed text-slate-500">
                  {contact.address.city}, {contact.address.state},
                  <br />
                  {contact.address.country}
                </p>
              </div>

              {contact.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={"tel:+" + phone.raw}
                  className="group flex items-center gap-3.5 text-slate-500 transition-colors hover:text-[#B26E02]"
                >
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                    <FaPhoneAlt className="text-xs" />
                  </span>
                  {phone.label}
                </a>
              ))}

              <a
                href={"mailto:" + contact.email}
                className="group flex items-center gap-3.5 break-all text-slate-500 transition-colors hover:text-[#B26E02]"
              >
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                  <FaEnvelope className="text-xs" />
                </span>
                {contact.email}
              </a>
            </div>

            <h3 className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-[#0B1E3D]/8 bg-white text-slate-600 transition-all duration-400 hover:-translate-y-1 hover:border-[#F0B429]/60 hover:bg-gradient-to-br hover:from-[#F0B429] hover:to-[#804501] hover:text-white hover:shadow-[0_10px_26px_rgba(240,180,41,0.32)]"
                >
                  {socialIcons[s.key]}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline-gold my-10" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-600">{site.name}</span>. All rights reserved.
            <span className="mt-1 block text-xs text-slate-400">
              A {site.entityType} &middot; Proprietor: {founder.name}, {founder.qualification}
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.nakshatranamahacreations.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#B26E02]"
            >
              Developed By Nakshatra Namaha Creations
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

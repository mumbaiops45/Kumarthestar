import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "Placements", href: "/placement" },
  { name: "Admissions", href: "/admission" },
  { name: "Books", href: "/books" },
  { name: "Candy T-Shirts", href: "/candy" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: <FaFacebookF />, label: "Facebook", href: "#" },
  { icon: <FaInstagram />, label: "Instagram", href: "#" },
  { icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
  { icon: <FaYoutube />, label: "YouTube", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-section-hero text-slate-600">
      {/* Gold hairline seam — reads as a finished edge, not a hard cut */}
      <div className="hairline-gold absolute left-0 right-0 top-0" />

      {/* Ambient brand glow, matched to the hero */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#F0B429]/10 blur-[170px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#804501]/12 blur-[170px]" />
      <div className="pointer-events-none absolute inset-0 grid-gold" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-5 flex items-center gap-3.5">
              {/* Disc stays deep navy even though the footer is now light:
                  mix-blend-screen maps black to the backdrop, so on a WHITE
                  disc the entire gold logo would blend out to white. The
                  medallion needs a dark ground to work. */}
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#06142D] ring-1 ring-[#F0B429]/45 shadow-[0_6px_18px_rgba(11,30,61,0.25)]">
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(240,180,41,0.3),transparent_68%)]" />
                <img
                  src="/logo.png"
                  alt="Kumar The Star logo"
                  className="relative h-9 w-9 object-contain mix-blend-screen"
                />
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[#0B1E3D]">
                Kumar<span className="text-[#F0B429]">The</span>Star
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-500">
              KumarTheStar is committed to providing quality education,
              innovation, and career-focused learning to empower students for a
              successful future.
            </p>
          </div>

          {/* Quick links */}
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

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02]">
                  <FaMapMarkerAlt className="text-xs" />
                </span>
                <p className="leading-relaxed text-slate-500">
                  123 Education Street,
                  <br />
                  Pune, Maharashtra, India
                </p>
              </div>
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3.5 text-slate-500 transition-colors hover:text-[#B26E02]"
              >
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                  <FaPhoneAlt className="text-xs" />
                </span>
                +91 98765 43210
              </a>
              <a
                href="mailto:info@abccollege.edu"
                className="group flex items-center gap-3.5 text-slate-500 transition-colors hover:text-[#B26E02]"
              >
                <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/10 text-[#B26E02] transition-all group-hover:border-[#F0B429]/60 group-hover:bg-[#F0B429]/20">
                  <FaEnvelope className="text-xs" />
                </span>
                info@abccollege.edu
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
              Follow Us
            </h3>
            <p className="mb-6 text-sm leading-7 text-slate-500">
              Stay connected with us on social media for the latest news,
              events, and announcements.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-[#0B1E3D]/8 bg-white text-slate-600 transition-all duration-400 hover:-translate-y-1 hover:border-[#F0B429]/60 hover:bg-gradient-to-br hover:from-[#F0B429] hover:to-[#804501] hover:text-white hover:shadow-[0_10px_26px_rgba(240,180,41,0.32)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline-gold my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-600">KumarTheStar</span>.
            All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="transition-colors hover:text-[#B26E02]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#B26E02]">
              Terms &amp; Conditions
            </a>
            <a href="#" className="transition-colors hover:text-[#B26E02]">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

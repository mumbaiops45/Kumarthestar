"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
   { name: "About Us", href: "/about-us" },
  { name: "Tutoring", href: "/courses" },
  { name: "Admissions", href: "/admission" },
  { name: "Placements", href: "/placement" },
  { name: "Candy T-Shirts", href: "/candy" },
  { name: "Contact", href: "/contact" },
];


function BrandMark({ compact = false }) {
  return (
    <Link href="/" className="group flex items-center gap-3.5" aria-label="Kumar The Star — home">
      <span
        className={`relative grid place-items-center rounded-full bg-[#06142D] ring-1 ring-[#F0B429]/45 shadow-[0_6px_20px_rgba(11,30,61,0.28)] transition-all duration-500 group-hover:ring-[#F0B429] group-hover:shadow-[0_8px_28px_rgba(240,180,41,0.4)] ${
          compact ? "h-12 w-12" : "h-14 w-14"
        }`}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(240,180,41,0.32),transparent_68%)]" />
        <img
          src="/logo.png"
          alt="Kumar The Star logo"
          className={`relative object-contain mix-blend-screen transition-transform duration-500 group-hover:scale-110 ${
            compact ? "h-9 w-9" : "h-11 w-11"
          }`}
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-display)] text-[1.3rem] font-extrabold tracking-tight text-[#0B1E3D]">
          Kumar<span className="text-[#804501]">.</span>
        </span>
        <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.34em] text-[#B26E02]">
          The Star
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 transition-all duration-500 bg-white"
    >
      {({ open, close }) => (
        <>
          <div className="hairline-gold absolute bottom-0 left-0 right-0" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`flex items-center justify-between transition-all duration-500 ${
                scrolled ? "h-[4.5rem]" : "h-20"
              }`}
            >
              <BrandMark compact={scrolled} />
              <div className="hidden items-center gap-9 lg:flex">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative text-[0.95rem] font-semibold transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#F0B429] after:to-[#804501] after:transition-all after:duration-400 ${
                        active
                          ? "text-[#804501] after:w-full"
                          : "text-[#0B1E3D]/75 after:w-0 hover:text-[#804501] hover:after:w-full"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="hidden lg:block">
                <Link
                  href="/admission"
                  className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1E3D] to-[#112448] px-7 py-3 text-sm font-bold text-[#FDD34F] shadow-[0_8px_24px_rgba(11,30,61,0.28)] ring-1 ring-[#F0B429]/30 transition-all duration-400 hover:shadow-[0_12px_34px_rgba(240,180,41,0.35)] hover:ring-[#F0B429]/70"
                >
                  <span className="relative">Admission</span>
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#F0B429] shadow-[0_0_10px_rgba(240,180,41,0.9)] transition-transform duration-400 group-hover:scale-150" />
                </Link>
              </div>
              <div className="lg:hidden">
                <DisclosureButton className="rounded-xl border border-[#0B1E3D]/10 bg-white/70 p-2.5 text-[#0B1E3D] transition-colors hover:border-[#F0B429]/50 hover:text-[#804501]">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="border-t border-[#F0B429]/20 bg-brand-cream/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(11,30,61,0.14)]">
              <div className="space-y-1 px-5 py-5">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => close()}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-all duration-300 ${
                        active
                          ? "bg-[#0B1E3D] text-[#FDD34F] shadow-[0_8px_22px_rgba(11,30,61,0.25)]"
                          : "text-[#0B1E3D]/80 hover:bg-[#F0EBE0] hover:text-[#804501]"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          active ? "bg-[#F0B429]" : "bg-transparent"
                        }`}
                      />
                    </Link>
                  );
                })}

                <Link
                  href="/admission"
                  onClick={() => close()}
                  className="mt-4 block rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-4 py-3.5 text-center text-base font-black text-[#06142D] shadow-[0_10px_28px_rgba(240,180,41,0.35)]"
                >
                  Admission
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {Dialog,DialogBackdrop,DialogPanel,DialogTitle,Disclosure,DisclosureButton,DisclosurePanel} from "@headlessui/react";
import {ArrowRight,BadgeCheck,Check,ChevronDown,Minus,Package,Plus,Ruler,ShieldCheck,ShoppingBag,Sparkles,Trash2,Truck,Users,X} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "../component/Reveal";
import PageHero from "../component/PageHero";
import ShirtMockup from "./ShirtMockup";
import {ORDER_GREETING,WHATSAPP_NUMBER,faqs,inr,products,sizeChart} from "./products";

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

const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


function TiltShirt() {
  const hero = products[0];
  const [color, setColor] = useState(hero.colors[0]);
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-16deg", "16deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["12deg", "-12deg"]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-[#F0B429]/20 blur-[90px]" />

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative aspect-[4/5] w-full"
        >
          <ShirtMockup
            color={color.hex}
            image={color.image}
            alt={`${hero.name} in ${color.name}`}
            sizes="(max-width: 768px) 90vw, 420px"
            preload
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-6 rounded-2xl bg-white px-5 py-3 text-center shadow-[0_16px_40px_rgba(11,30,61,0.18)] ring-1 ring-[#F0B429]/40 sm:right-4"
      >
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#804501]/70">
          From
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
          {inr(Math.min(...products.map((p) => p.price)))}
        </p>
      </motion.div>

      <div className="relative mt-6 flex items-center justify-center gap-3">
        {hero.colors.map((c) => {
          const active = c.slug === color.slug;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setColor(c)}
              aria-label={`Show ${hero.name} in ${c.name}`}
              aria-pressed={active}
              className={`h-8 w-8 rounded-full ring-offset-2 ring-offset-[#F7F3EA] transition-all duration-300 ${
                active
                  ? "scale-110 ring-2 ring-[#804501]"
                  : "ring-1 ring-[#0B1E3D]/20 hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}


function ProductCard({ product, onAdd }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);

  const add = () => {
    if (!size) return;
    onAdd(product, color, size);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article className="card-light group relative flex flex-col overflow-hidden rounded-3xl">
      {product.badge && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-3.5 py-1.5 text-[0.65rem] font-black uppercase tracking-wider text-[#06142D] shadow-[0_6px_18px_rgba(240,180,41,0.35)]">
          {product.badge}
        </span>
      )}

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-[#F7F3EA] to-[#F0EBE0]">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <ShirtMockup
            color={color.hex}
            image={color.image}
            alt={`${product.name} in ${color.name}`}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-black leading-tight text-[#0B1E3D]">
            {product.name}
          </h3>
          <span className="shrink-0 text-right">
            <span className="font-[family-name:var(--font-display)] text-xl font-black text-[#804501]">
              {inr(product.price)}
            </span>
            {product.mrp && (
              <span className="ml-2 text-sm font-medium text-slate-400 line-through">
                {inr(product.mrp)}
              </span>
            )}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {product.tagline}
        </p>

        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-wider text-[#804501]/70">
          <span>{product.fabric}</span>
          <span className="text-[#F0B429]">·</span>
          <span>{product.fit}</span>
        </p>

        <div className="mt-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">
            Colour — <span className="text-[#0B1E3D]">{color.name}</span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2.5">
            {product.colors.map((c) => {
              const active = c.slug === color.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  aria-pressed={active}
                  className={`h-7 w-7 rounded-full ring-offset-2 ring-offset-white transition-all duration-300 ${
                    active
                      ? "scale-110 ring-2 ring-[#804501]"
                      : "ring-1 ring-[#0B1E3D]/20 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-400">
              Size
            </p>
            <a
              href="#sizes"
              className="text-[0.7rem] font-bold text-[#804501] underline-offset-4 hover:underline"
            >
              Size guide
            </a>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const out = product.soldOut?.includes(s);
              const active = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={out}
                  onClick={() => setSize(s)}
                  aria-pressed={active}
                  title={out ? `${s} is sold out` : undefined}
                  className={`min-w-[3rem] rounded-xl border px-3 py-2 text-sm font-bold transition-all duration-300 ${
                    out
                      ? "cursor-not-allowed border-[#0B1E3D]/8 bg-[#F7F3EA] text-slate-300 line-through"
                      : active
                        ? "border-[#0B1E3D] bg-[#0B1E3D] text-[#FDD34F] shadow-[0_8px_20px_rgba(11,30,61,0.22)]"
                        : "border-[#0B1E3D]/12 bg-white text-[#0B1E3D] hover:border-[#F0B429] hover:text-[#804501]"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={add}
          disabled={!size}
          className={`shine relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-black transition-all duration-400 ${
            !size
              ? "cursor-not-allowed bg-[#F0EBE0] text-slate-400"
              : justAdded
                ? "bg-[#0B1E3D] text-[#FDD34F]"
                : "bg-gradient-to-r from-[#F0B429] to-[#FDD34F] text-[#06142D] shadow-[0_12px_30px_rgba(240,180,41,0.32)] hover:shadow-[0_16px_40px_rgba(240,180,41,0.45)]"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="relative h-4 w-4" />
              <span className="relative">Added to order</span>
            </>
          ) : (
            <>
              <ShoppingBag className="relative h-4 w-4" />
              <span className="relative">
                {size ? "Add to order" : "Select a size"}
              </span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}


const perks = [
  { icon: <Package className="h-4 w-4" />, label: "Fabric", value: "220 GSM cotton" },
  { icon: <Ruler className="h-4 w-4" />, label: "Sizes", value: "XS to XXL" },
  { icon: <Truck className="h-4 w-4" />, label: "Delivery", value: "Campus + doorstep" },
  { icon: <Users className="h-4 w-4" />, label: "Bulk orders", value: "20+ pieces" },
];

const steps = [
  {
    icon: <ShoppingBag />,
    title: "Pick your shirts",
    desc: "Choose a colour and size on any design and add it to your order. Nothing is charged here.",
  },
  {
    icon: <FaWhatsapp />,
    title: "Send it on WhatsApp",
    desc: "One tap opens WhatsApp with your whole order already written out. Add your name and address, hit send.",
  },
  {
    icon: <Truck />,
    title: "Confirm and collect",
    desc: "We confirm stock, share UPI or bank details, then hand it over on campus or ship it to you.",
  },
];

export default function CandyContent() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = (product, color, size) => {
    const key = `${product.id}|${color.slug}|${size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          key,
          name: product.name,
          color: color.name,
          hex: color.hex,
          image: color.image,
          size,
          price: product.price,
          qty: 1,
        },
      ];
    });
  };

  const step = (key, delta) =>
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.key !== key) return [i];
        const qty = i.qty + delta;
        return qty < 1 ? [] : [{ ...i, qty }];
      })
    );

  const removeItem = (key) =>
    setCart((prev) => prev.filter((i) => i.key !== key));

  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0);

  const orderLink = useMemo(() => {
    const lines = cart.map(
      (i, n) =>
        `${n + 1}. ${i.name} — ${i.color} / Size ${i.size} × ${i.qty} = ${inr(
          i.price * i.qty
        )}`
    );
    return waLink(
      [
        ORDER_GREETING,
        "",
        ...lines,
        "",
        `Total: ${inr(total)}`,
        "",
        "Name:",
        "Phone:",
        "Delivery address:",
      ].join("\n")
    );
  }, [cart, total]);

  const bulkLink = waLink(
    "Hi Kumar The Star! I'd like bulk pricing for batch t-shirts.\n\nBatch / college:\nApprox. quantity:\nDesign or print needed:"
  );

  return (
    <div className="overflow-x-clip">
      <PageHero
        badge={{
          icon: <Sparkles className="h-3.5 w-3.5 text-[#B26E02]" />,
          text: "Candy Collection · Official Merch",
        }}
        title="Wear the"
        accent="Star"
        subtitle="Campus t-shirts made for people who actually wear them — heavyweight cotton, honest prices, and an order that takes one message on WhatsApp."
        actions={
          <>
            <a
              href="#shop"
              className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-8 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.32)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.48)]"
            >
              <ShoppingBag className="relative h-4 w-4" />
              <span className="relative">Shop the Collection</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sizes"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#0B1E3D]/10 bg-white px-8 py-4 text-base font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#804501]"
            >
              <Ruler className="h-4 w-4" />
              Size Guide
            </a>
          </>
        }
        media={<TiltShirt />}
      />

      <section className="relative border-y border-[#0B1E3D]/8 bg-section-alt py-10">
        <Reveal
          stagger
          className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8"
        >
          {perks.map((p) => (
            <div key={p.label} className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F0B429]/12 text-[#B26E02] ring-1 ring-[#F0B429]/25">
                {p.icon}
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#804501]/70">
                  {p.label}
                </span>
                <span className="mt-1 font-[family-name:var(--font-display)] text-lg font-black text-[#0B1E3D]">
                  {p.value}
                </span>
              </span>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="shop" className="relative overflow-hidden bg-section py-28">
        <div className="pointer-events-none absolute inset-0 grid-gold opacity-60" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>The Collection</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Pick a shirt, pick a{" "}
              <span className="text-gold-gradient">size</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-500">
              Add as many as you like — your order is put together here and sent
              in one WhatsApp message. Nothing is charged on this page.
            </p>
            <div className="hairline-gold mx-auto mt-6 max-w-xs" />
          </Reveal>

          <Reveal
            stagger
            staggerAmount={0.1}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addItem} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#F0B429]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Three steps, one{" "}
              <span className="text-gold-gradient">message</span>
            </h2>
          </Reveal>

          <Reveal stagger staggerAmount={0.14} className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
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
                <h3 className="relative mt-6 font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                  {s.title}
                </h3>
                <p className="relative mt-3 leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </article>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex items-center justify-center gap-3 text-center text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#B26E02]" />
            <span>
              We never ask for card numbers or UPI PINs over chat. Payment is
              arranged only after our team replies.
            </span>
          </Reveal>
        </div>
      </section>
      <section id="sizes" className="relative overflow-hidden bg-section py-28">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Size Guide</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Get the fit <span className="text-gold-gradient">right</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-500">
              Measurements are of the garment laid flat, in inches. Lay your
              best-fitting shirt on a table and compare — it beats guessing.
            </p>
          </Reveal>

          <Reveal from="scale" className="mt-14">
            <div className="card-light overflow-hidden rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[30rem] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#0B1E3D] text-white">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                        Size
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                        Chest (in)
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                        Length (in)
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                        Shoulder (in)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, i) => (
                      <tr
                        key={row.size}
                        className={`border-t border-[#0B1E3D]/6 transition-colors hover:bg-[#F0B429]/8 ${
                          i % 2 ? "bg-[#FAFAF8]" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 font-[family-name:var(--font-display)] text-lg font-black text-[#804501]">
                          {row.size}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0B1E3D]">
                          {row.chest}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0B1E3D]">
                          {row.length}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0B1E3D]">
                          {row.shoulder}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-6 flex items-start gap-3 text-sm text-slate-500">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B26E02]" />
            <span>
              Between two sizes? Size up for the oversized cut, size down for
              regular fit. Unworn shirts can be exchanged within 7 days.
            </span>
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#0B1E3D] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(240,180,41,0.14),transparent_65%)]" />
        <FloatingOrb className="left-[10%] top-0 h-[380px] w-[380px] bg-[#F0B429]/10 blur-[130px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal from="left">
            <SectionBadge variant="white">Batch &amp; Bulk</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Shirts for the{" "}
              <span className="text-gold-gradient-on-dark">whole batch</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/65">
              Twenty pieces or more gets bulk pricing, free name-and-number
              printing on the back, and a mockup approved by you before anything
              goes to print. Send us the batch size and we&apos;ll quote the same
              day.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Bulk pricing from 20 pieces",
                "Names and roll numbers printed free",
                "Your artwork or ours — mockup before printing",
                "Delivered together, sorted by size",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-white/80">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#FDD34F]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <a
              href={bulkLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shine group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-8 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.5)]"
            >
              <FaWhatsapp className="relative h-5 w-5" />
              <span className="relative">Get a Bulk Quote</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>

          <Reveal from="right" className="relative">
            <div className="relative mx-auto flex h-[380px] max-w-md items-center justify-center">
              {[
                { hex: "#FAFAF8", x: "-52%", r: -12, z: 1 },
                { hex: "#804501", x: "0%", r: 0, z: 3 },
                { hex: "#F0B429", x: "52%", r: 12, z: 2 },
              ].map((s, i) => (
                <motion.div
                  key={s.hex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[320px] w-[260px]"
                  style={{
                    transform: `translateX(${s.x}) rotate(${s.r}deg)`,
                    zIndex: s.z,
                  }}
                >
                  <ShirtMockup color={s.hex} alt="" />
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-section-cream py-28">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <SectionBadge>Before You Order</SectionBadge>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-black tracking-tight text-[#0B1E3D] md:text-5xl">
              Questions, <span className="text-gold-gradient">answered</span>
            </h2>
          </Reveal>

          <Reveal stagger staggerAmount={0.08} className="mt-14 space-y-4">
            {faqs.map((f) => (
              <Disclosure key={f.q}>
                {({ open: isOpen }) => (
                  <div className="card-light overflow-hidden rounded-2xl">
                    <DisclosureButton className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left">
                      <span className="font-bold text-[#0B1E3D]">{f.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#B26E02] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-7 pb-6 leading-relaxed text-slate-500">
                      {f.a}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
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
                  Still deciding on a{" "}
                  <span className="text-gold-gradient-on-dark">size</span>?
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/65">
                  Message us your usual size and we&apos;ll tell you which one to
                  pick. Faster than measuring.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <a
                    href={waLink(
                      "Hi Kumar The Star! I need help picking a t-shirt size."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-9 py-4 text-base font-black text-[#06142D] shadow-[0_16px_40px_rgba(240,180,41,0.35)] transition-all hover:shadow-[0_20px_50px_rgba(240,180,41,0.5)]"
                  >
                    <FaWhatsapp className="relative h-5 w-5" />
                    <span className="relative">Ask on WhatsApp</span>
                  </a>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-[#F0B429]/60 hover:text-[#FDD34F]"
                  >
                    Contact the Institute
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {count > 0 && <div aria-hidden="true" className="h-24" />}
      <motion.div
        initial={false}
        animate={count > 0 ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 ${
          count > 0 ? "" : "pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl bg-[#0B1E3D] px-5 py-4 shadow-[0_20px_50px_rgba(6,20,45,0.45)] ring-1 ring-[#F0B429]/30">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F0B429]/15 text-[#FDD34F]">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#F0B429] px-1 text-[0.65rem] font-black text-[#06142D]">
                {count}
              </span>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45">
                {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-black text-white">
                {inr(total)}
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shine relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-6 py-3 text-sm font-black text-[#06142D] transition-all hover:shadow-[0_12px_30px_rgba(240,180,41,0.4)]"
          >
            <span className="relative">Review order</span>
            <ArrowRight className="relative h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#06142D]/60 backdrop-blur-sm transition duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex justify-end">
          <DialogPanel
            transition
            className="flex h-full w-full max-w-md flex-col bg-[#FAFAF8] shadow-[-20px_0_60px_rgba(6,20,45,0.3)] transition duration-300 ease-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between border-b border-[#0B1E3D]/8 px-6 py-5">
              <DialogTitle className="font-[family-name:var(--font-display)] text-2xl font-black text-[#0B1E3D]">
                Your order
              </DialogTitle>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close order"
                className="rounded-xl border border-[#0B1E3D]/10 bg-white p-2.5 text-[#0B1E3D] transition-colors hover:border-[#F0B429]/50 hover:text-[#804501]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <p className="mt-10 text-center text-slate-500">
                  Your order is empty. Pick a shirt and a size to get started.
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((i) => (
                    <li key={i.key} className="card-light flex gap-4 rounded-2xl p-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F0EBE0]">
                        <ShirtMockup
                          color={i.hex}
                          image={i.image}
                          alt=""
                          sizes="80px"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-bold text-[#0B1E3D]">
                            {i.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(i.key)}
                            aria-label={`Remove ${i.name}, ${i.color}, size ${i.size}`}
                            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {i.color} · Size {i.size}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-1 rounded-xl border border-[#0B1E3D]/10 bg-white p-1">
                            <button
                              type="button"
                              onClick={() => step(i.key, -1)}
                              aria-label="Decrease quantity"
                              className="rounded-lg p-1.5 text-[#0B1E3D] transition-colors hover:bg-[#F0EBE0]"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-sm font-black text-[#0B1E3D]">
                              {i.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => step(i.key, 1)}
                              aria-label="Increase quantity"
                              className="rounded-lg p-1.5 text-[#0B1E3D] transition-colors hover:bg-[#F0EBE0]"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-[family-name:var(--font-display)] font-black text-[#804501]">
                            {inr(i.price * i.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-[#0B1E3D]/8 bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Total
                </span>
                <span className="font-[family-name:var(--font-display)] text-3xl font-black text-[#0B1E3D]">
                  {inr(total)}
                </span>
              </div>

              <a
                href={cart.length ? orderLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={cart.length === 0}
                onClick={(e) => cart.length === 0 && e.preventDefault()}
                className={`shine relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-4 text-base font-black transition-all ${
                  cart.length
                    ? "bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_16px_40px_rgba(37,211,102,0.5)]"
                    : "cursor-not-allowed bg-[#F0EBE0] text-slate-400"
                }`}
              >
                <FaWhatsapp className="relative h-5 w-5" />
                <span className="relative">Send Order on WhatsApp</span>
              </a>

              <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
                Opens WhatsApp with your order written out. Add your name and
                address, then send — our team confirms stock and payment.
              </p>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

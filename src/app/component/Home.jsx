"use client";
import React, { useState, useRef, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitReveal, Reveal } from './Reveal';
import { ArrowRight, ChevronDown, Globe, GraduationCap, Phone, Star, Sparkles, Quote, Trophy, MapPin, Target, ExternalLink } from 'lucide-react';
import { heroSlides, whyUs, rankers, testimonials, faqs, stats, examTicker } from "../../data/data";
import { divisions } from "../../data/divisions";
import { primaryPhone } from "../../data/site";
import ContactForm from './ContactForm';
import DivisionsShowcase from './DivisionsShowcase';
import FeaturedServices from './FeaturedServices';
import Magnetic from './Magnetic';
import RankersShowcase from './RankersShowcase';

gsap.registerPlugin(ScrollTrigger);

const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const CountUp = ({ value, suffix = '', duration = 2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let raf;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setCount(Math.round(value * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value, duration]);
    return <span ref={ref}>{count}{suffix}</span>;
};


const HeroVideo = memo(function HeroVideo() {
    const aRef = useRef(null);
    const bRef = useRef(null);
    const [front, setFront] = useState('a');

    useEffect(() => {
        const a = aRef.current;
        const b = bRef.current;
        if (!a || !b) return;

        [a, b].forEach(v => {
            v.muted = true;
            v.playsInline = true;
            v.volume = 0;
        });

        const safePlay = (v) => { const p = v.play(); if (p) p.catch(() => { }); };
        safePlay(a);

        const CROSSFADE_LEAD = 0.5;

        const onTime = (e) => {
            const cur = e.target;
            const other = cur === a ? b : a;
            if (!cur.duration || !isFinite(cur.duration)) return;
            if (cur.currentTime > cur.duration - CROSSFADE_LEAD && other.paused) {
                other.currentTime = 0;
                safePlay(other);
                setFront(cur === a ? 'b' : 'a');
            }
        };

        const onEnded = (e) => {
            e.target.pause();
            e.target.currentTime = 0;
        };

        const onVisibility = () => {
            if (document.visibilityState !== 'visible') return;
            const active = front === 'a' ? a : b;
            if (active.paused) safePlay(active);
        };

        [a, b].forEach(v => {
            v.addEventListener('timeupdate', onTime);
            v.addEventListener('ended', onEnded);
        });
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            [a, b].forEach(v => {
                v.removeEventListener('timeupdate', onTime);
                v.removeEventListener('ended', onEnded);
            });
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [front]);

    const base = "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-linear";
    const gpu = {
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "opacity",
    };

    return (
        <>
            <video
                ref={aRef}
                className={`${base} ${front === 'a' ? 'opacity-100' : 'opacity-0'}`}
                src="/home-banner.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
                style={gpu}
            />
            <video
                ref={bRef}
                className={`${base} ${front === 'b' ? 'opacity-100' : 'opacity-0'}`}
                src="/home-banner.mp4"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
                style={gpu}
            />
        </>
    );
});

const FloatingOrb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        style={{ willChange: "transform" }}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

const GlowLine = () => (
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] mx-auto my-4 shadow-[0_0_12px_rgba(240,180,41,0.6)]" />
);

const SectionBadge = ({ children, variant = 'gold' }) => {
    const variants = {
        gold: 'bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 text-[#804501] border-[#F0B429]/30',
        navy: 'bg-[#0B1E3D]/8 text-[#0B1E3D] border-[#0B1E3D]/20',
        red: 'bg-[#804501]/10 text-[#804501] border-[#804501]/25',
        white: 'bg-white/15 text-white border-white/25 backdrop-blur-sm',
    };
    return (
        <motion.span
            whileHover={{ scale: 1.06 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${variants[variant]}`}
        >
            {children}
        </motion.span>
    );
};

const Home = () => {
    const [faqOpen, setFaqOpen] = useState(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const heroRef = useRef(null);
    const heroCopyRef = useRef(null);
    const slide = heroSlides[0];

    useEffect(() => {
        let id;
        const start = () => {
            id = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500);
        };
        const stop = () => clearInterval(id);
        const onVis = () => {
            stop();
            if (document.visibilityState === "visible") start();
        };
        start();
        document.addEventListener("visibilitychange", onVis);
        return () => { stop(); document.removeEventListener("visibilitychange", onVis); };
    }, []);

    return (
        <div className="font-body antialiased text-[#1D2433] overflow-x-clip">
            <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden ">
                <div className="absolute inset-0 overflow-hidden">
                    <HeroVideo />
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-black/25" />
                </div>
                <div ref={heroCopyRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
                            <motion.div variants={fadeInUp}>
                                <SectionBadge variant="white">
                                    <Sparkles className="w-3.5 h-3.5 text-[#FDD34F]" />
                                    A Trusted Name in Competitive Exam Coaching
                                </SectionBadge>
                            </motion.div>

                            <div className="relative">
                                <SplitReveal
                                    as="h1"
                                    trigger="mount"
                                    className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black leading-[1.02] tracking-tight text-white"
                                >
                                    {slide.headline}
                                </SplitReveal>

                                <div className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black leading-[1.02] tracking-tight text-gold-gradient-on-dark drop-shadow-[0_0_40px_rgba(253,211,79,0.35)]">
                                    {slide.highlight}
                                </div>

                                <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                                    {slide.sub}
                                </p>
                            </div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <Magnetic strength={0.35}>
                                    <Link
                                        href="/services"
                                        className="group relative overflow-hidden bg-gradient-to-r from-[#F0B429] to-[#FDD34F] text-[#06142D] px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-2 shadow-[0_8px_30px_rgba(240,180,41,0.35)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(240,180,41,0.5)] active:scale-[0.97]"
                                    >
                                        <span className='absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12' />
                                        <span className="relative">Explore Our Services</span>
                                        <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Magnetic>
                                <Magnetic strength={0.35}>
                                    <motion.a
                                        href={`tel:+${primaryPhone.raw}`}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:border-white/50 backdrop-blur-sm bg-white/5 transition-all"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#F0B429]/30 transition">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        {primaryPhone.label}
                                    </motion.a>
                                </Magnetic>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 14, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-[#FDD34F] rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            <section className="py-5 bg-section border-y border-[#F0B429]/25 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0EBE0] via-transparent to-[#F7F3EA] z-10 pointer-events-none" />
                <motion.div
                    animate={{ x: [0, '-50%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    style={{ willChange: "transform" }}
                    className="flex gap-6 whitespace-nowrap"
                >
                    {[...examTicker, ...examTicker].map((exam, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#0B1E3D] rounded-full text-xs font-bold border border-[#F0B429]/30 shadow-[0_2px_10px_rgba(11,30,61,0.06)] tracking-wider"
                        >
                            <Star className="w-2.5 h-2.5 fill-[#F0B429] text-[#F0B429]" />
                            {exam}
                        </span>
                    ))}
                </motion.div>
            </section>

            <section className="py-16 bg-section-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal stagger staggerAmount={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {stats.map((s, i) => (
                            <motion.div key={i} whileHover={{ y: -6 }} className="group relative">
                                <div className="card-light relative p-6 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#F0B429]/8 to-[#804501]/6 opacity-0 group-hover:opacity-100 transition" />
                                    <div className="relative">
                                        <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#F0B429]/20 to-[#804501]/15 flex items-center justify-center text-[#804501]">{s.icon}</div>
                                        <p className="text-4xl md:text-4xl font-black text-[#0B1E3D] tabular-nums"><CountUp value={s.value} suffix={s.suffix} /></p>
                                        <p className="text-slate-500 text-sm mt-1 font-medium">{s.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <FeaturedServices />

            <DivisionsShowcase
                id="what-we-do"
                eyebrow="More Than Coaching"
                heading="One Firm, Many Services"
                accent=""
                intro={`Kumarthestar is a proprietorship firm running ${divisions.length} service lines - coaching and admissions, language training, drama and short films, coffee, tea and cooking classes, corporate services, real estate, staffing and animal welfare.`}
                showFilters={false}
                limit={6}
            />

            <section className="relative py-8 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#F0B429]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#804501]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <Reveal from="left">
                            <SectionBadge variant="red">About Us</SectionBadge>
                            <h2 className="mt-6 text-4xl md:text-5xl font-black leading-[1.05] text-[#0B1E3D] tracking-tight">
                                Built For Every Stage
                                <span className="block bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Of The Exam Journey</span>
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-lg">
                                From kindergarten admissions to professional certifications, we bridge the gap between where a student is today and where their ambition can take them tomorrow.
                            </p>
                            <Reveal stagger staggerAmount={0.12} from="left" className="mt-10 space-y-4">
                                {[
                                    { label: "50+ competitive exams covered end to end", icon: <Target className="w-4 h-4" /> },
                                    { label: "200+ faculty verified for subject expertise", icon: <GraduationCap className="w-4 h-4" /> },
                                    { label: "98% student success rate across cohorts", icon: <Trophy className="w-4 h-4" /> },
                                    { label: "Students learning from 15+ countries", icon: <Globe className="w-4 h-4" /> },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 8 }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default border border-transparent hover:border-[#F0B429]/15"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#804501]/10 to-[#F0B429]/10 flex items-center justify-center text-[#804501] group-hover:from-[#804501] group-hover:to-[#F0B429] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span className="text-slate-700 font-semibold">{item.label}</span>
                                    </motion.div>
                                ))}
                            </Reveal>
                            <Magnetic strength={0.3} className="mt-10">
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(128,69,1,0.25)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 bg-[#804501] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#985801] transition-all"
                                >
                                    Our Story <ExternalLink className="w-4 h-4" />
                                </motion.button>
                            </Magnetic>
                        </Reveal>

                        <div className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-[#F0B429]/15 to-[#804501]/10 rounded-[3rem] blur-2xl" />
                            <Reveal from="scale" delay={0.15}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(11,30,61,0.2)] border border-white"
                                >
                                    <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=700&fit=crop" alt="Students learning" loading="lazy" className="w-full h-[560px] object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/85 via-[#0B1E3D]/20 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-4xl font-black text-white">10+ Years</p>
                                        <p className="text-white/70 text-lg mt-1">Transforming Student Careers</p>
                                        <div className="mt-4 flex gap-3">
                                            {['JEE', 'NEET', 'CA', 'NDA', 'IELTS'].map((tag) => (
                                                <span key={tag} className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold border border-white/20">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Reveal>
                            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#F0B429]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#F0B429] to-[#804501] rounded-xl flex items-center justify-center"><Trophy className="w-6 h-6 text-white" /></div>
                                    <div><p className="font-black text-[#0B1E3D] text-xl">98%</p><p className="text-slate-500 text-xs font-medium">Success Rate</p></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-12 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(240,180,41,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(128,69,1,0.06),transparent_60%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <Reveal stagger staggerAmount={0.15} className="text-center mb-16">
                        <div>
                            <SectionBadge variant="gold">Why Choose Us</SectionBadge>
                        </div>
                        <h2 className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            What Actually{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Moves a Rank</span>
                        </h2>
                        <GlowLine />
                        <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
                            A powerful combination of expert mentors, personalised learning and proven strategies.
                        </p>
                    </Reveal>
                    <Reveal stagger staggerAmount={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyUs.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                className="group relative p-8 rounded-3xl bg-white border border-[#0B1E3D]/6 shadow-[0_4px_24px_rgba(11,30,61,0.06)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.14)] transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none" />
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-black text-xl text-[#0B1E3D] mb-3">{item.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="relative py-12 overflow-hidden bg-section">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal stagger staggerAmount={0.15} className="text-center mb-20">
                        <div>
                            <SectionBadge variant="gold">
                                <Trophy className="w-3.5 h-3.5 text-[#804501]" />
                                Wall of Rankers</SectionBadge>
                        </div>
                        <h2 className="mt-6 font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black leading-tight tracking-tight text-[#0B1E3D]">
                            Meet Our{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Top Rankers</span>
                        </h2>
                        <GlowLine />
                        <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
                            Celebrating exceptional achievements dedication transformed into remarkable success.
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                        {rankers.map((ranker, index) => (
                            <Reveal
                                key={ranker.name}
                                from="up"
                            >
                                <article
                                    className="group relative h-full overflow-hidden rounded-[28px] border border-[#0B1E3D]/8 bg-white p-5 shadow-[0_12px_40px_rgba(11,30,61,0.06)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-3 hover:border-[#F0B429]/30 hover:shadow-[0_25px_60px_rgba(11,30,61,0.13)]"
                                >
                                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100"/>
                                    <div className="absolute left-6 right-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#F0B429] via-[#FDD34F] to-[#F0B429] opacity-70 transition-all duration-500 group-hover:left-4 group-hover:right-4 group-hover:opacity-100"/>
                                    <div className="absolute right-5 top-5 z-10">
                                        <span className="inline-flex items-center rounded-full border border-[#F0B429]/25 bg-gradient-to-r from-[#F0B429] to-[#FDD34F] px-3 py-1.5 text-[11px] font-black tracking-wide text-[#06142D] shadow-[0_6px_18px_rgba(240,180,41,0.25)] transition-transform duration-500 group-hover:scale-105">
                                            {ranker.tag}
                                        </span>
                                    </div>
                                    <div className="relative flex justify-center pt-7">
                                        <div className="absolute top-5 h-28 w-28 rounded-full bg-gradient-to-br from-[#FDD34F] to-[#F0B429] opacity-20 blur-xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-40"/>
                                        <div className="relative rounded-full bg-gradient-to-br from-[#FDD34F] to-[#F0B429] p-[3px] shadow-[0_12px_30px_rgba(240,180,41,0.2)] transition-transform duration-500 group-hover:scale-105">
                                            <div className="rounded-full bg-white p-1">
                                                <img
                                                    src={ranker.img}
                                                    alt={ranker.name}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-24 w-24 rounded-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative mt-6 text-center">
                                        <h3 className="font-[family-name:var(--font-display)] text-lg font-black tracking-tight text-[#0B1E3D] transition-colors duration-300 group-hover:text-[#804501]">
                                            {ranker.name}
                                        </h3>
                                        <p className="mt-1 text-xs font-medium text-slate-400">
                                            {ranker.exam}
                                        </p>
                                        <div className="mt-5 rounded-2xl border border-[#F0B429]/20 bg-gradient-to-br from-[#F0B429]/12 via-[#FDD34F]/8 to-transparent px-4 py-3 transition-all duration-500 group-hover:border-[#F0B429]/40 group-hover:shadow-[0_8px_25px_rgba(240,180,41,0.10)]">
                                            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                                Achievement
                                            </span>
                                            <span className="mt-1 block font-[family-name:var(--font-display)] text-base font-black text-[#804501]"
                                            >
                                                {ranker.score}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}

                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#F7F3EA] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal stagger staggerAmount={0.15} className="text-center mb-16">
                        <div><SectionBadge variant="red">Testimonials</SectionBadge></div>
                        <h2 className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            What Our Students{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Say</span>
                        </h2>
                        <GlowLine />
                    </Reveal>

                    <div className="relative max-w-4xl mx-auto mb-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="relative bg-white rounded-3xl p-10 md:p-14 shadow-[0_20px_80px_rgba(11,30,61,0.12)] border border-[#F0B429]/15 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#F0B429]/10 to-transparent rounded-br-full" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#804501]/8 to-transparent rounded-tl-full" />
                                <Quote className="w-12 h-12 text-[#F0B429]/25 mb-6" />
                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic font-medium">&ldquo;{testimonials[activeTestimonial].text}&rdquo;</p>
                                <div className="mt-8 flex items-center gap-5">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#F0B429] to-[#804501] blur-sm" />
                                        <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name} loading="lazy" className="relative w-16 h-16 rounded-full object-cover border-2 border-white" />
                                    </div>
                                    <div>
                                        <p className="font-black text-[#0B1E3D] text-lg">{testimonials[activeTestimonial].name}</p>
                                        <p className="text-[#804501] text-sm font-semibold">{testimonials[activeTestimonial].course}</p>
                                        <div className="flex gap-1 mt-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F0B429] text-[#F0B429]" />)}</div>
                                    </div>
                                    <div className="ml-auto px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0B1E3D] to-[#1a3a6e] text-[#FDD34F] text-sm font-black">{testimonials[activeTestimonial].achievement}</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button key={i} aria-label={`Testimonial ${i + 1}`} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-10 bg-[#F0B429]' : 'w-2 bg-[#F0B429]/30 hover:bg-[#F0B429]/60'}`} />
                            ))}
                        </div>
                    </div>

                    <Reveal stagger staggerAmount={0.08} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -6 }}
                                onClick={() => setActiveTestimonial(i)}
                                className={`group p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${i === activeTestimonial ? 'bg-[#0B1E3D] border-[#F0B429]/40 shadow-xl' : 'bg-white border-[#0B1E3D]/8 hover:shadow-lg hover:border-[#F0B429]/25'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={t.img} alt={t.name} loading="lazy" className="w-10 h-10 rounded-full object-cover border-2 border-[#F0B429]/40 flex-shrink-0" />
                                    <div>
                                        <p className={`font-bold text-sm ${i === activeTestimonial ? 'text-white' : 'text-[#0B1E3D]'}`}>{t.name}</p>
                                        <p className={`text-xs ${i === activeTestimonial ? 'text-[#FDD34F]' : 'text-[#804501]'}`}>{t.achievement}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mt-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#F0B429] text-[#F0B429]" />)}</div>
                            </motion.div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="py-16 bg-white border-y border-[#0B1E3D]/8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal stagger staggerAmount={0.15}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0B1E3D]/5 text-[#804501] rounded-full text-xs font-bold uppercase tracking-widest mb-5 border border-[#804501]/20">
                            <MapPin className="w-3.5 h-3.5" /> Where We Work
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#0B1E3D] mb-8">
                            Based in Mysuru. Online Across India. Placements Worldwide.
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Mysuru — Head Office', 'Karnataka', 'Online — All India', 'Overseas Placements'].map((city, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.06, y: -3 }}
                                    className="px-6 py-2.5 rounded-2xl bg-[#F7F3EA] border border-[#0B1E3D]/10 text-slate-700 text-sm font-bold hover:bg-[#0B1E3D] hover:text-[#FDD34F] hover:border-[#0B1E3D] transition-all duration-300 cursor-default shadow-sm"
                                >
                                    {city}
                                </motion.span>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="relative py-18 overflow-hidden bg-gradient-to-b from-[#F0EBE0] to-[#FAFAF8]">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#F0B429]/10 blur-[160px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#804501]/8 blur-[160px] pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal stagger staggerAmount={0.15} className="text-center mb-16">
                        <div><SectionBadge variant="gold">FAQ</SectionBadge></div>
                        <h2 className="mt-6 text-4xl md:text-6xl font-black text-[#0B1E3D] tracking-tight leading-tight">
                            Everything You Need
                            <br />
                            <span className="bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#804501] bg-clip-text text-transparent">To Know Before Joining</span>
                        </h2>
                        <GlowLine />
                        <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
                            Find answers about courses, exams, teaching methods, fees and everything related to your preparation journey.
                        </p>
                    </Reveal>

                    <Reveal stagger staggerAmount={0.08} className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`group rounded-3xl border transition-all duration-400 overflow-hidden ${faqOpen === i ? 'bg-white border-[#F0B429]/40 shadow-[0_20px_60px_rgba(11,30,61,0.12)]' : 'bg-white/60 border-[#0B1E3D]/8 hover:bg-white hover:shadow-lg hover:border-[#F0B429]/20'}`}
                            >
                                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} className="w-full flex items-center gap-5 p-6 md:p-7 text-left">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${faqOpen === i ? 'bg-gradient-to-br from-[#F0B429] to-[#804501] text-white shadow-lg' : 'bg-[#0B1E3D]/8 text-[#0B1E3D]'}`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <span className="flex-1 text-[#0B1E3D] font-bold text-base md:text-lg text-left">{faq.question}</span>
                                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${faqOpen === i ? 'bg-[#804501]/10 rotate-180' : 'bg-[#0B1E3D]/5'}`}>
                                        <ChevronDown className="w-4 h-4 text-[#804501]" />
                                    </div>
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: faqOpen === i ? 'auto' : 0, opacity: faqOpen === i ? 1 : 0 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-7 pb-7 ml-0 md:ml-[4.2rem] text-slate-600 leading-relaxed border-t border-[#0B1E3D]/6 pt-5">{faq.answer}</div>
                                </motion.div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className="relative py-18 overflow-hidden bg-section-hero">
                <div className="absolute inset-0 grid-gold" />
                <FloatingOrb className="w-[600px] h-[600px] bg-[#F0B429]/16 blur-[180px] -top-40 -left-40" delay={0} />
                <FloatingOrb className="w-[500px] h-[500px] bg-[#804501]/10 blur-[160px] -bottom-40 -right-40" delay={3} />
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal stagger staggerAmount={0.15} className="text-center mb-14">
                        <div><SectionBadge variant="red">Get Started</SectionBadge></div>
                        <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black tracking-tight text-[#0B1E3D]">
                            Request a Free{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Consultation</span>
                        </h2>
                        <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">Fill in your details and a counsellor will reach out within 24 hours.</p>
                    </Reveal>
                    <ContactForm />
                </div>
            </section>
        </div>
    );
};

export default Home;

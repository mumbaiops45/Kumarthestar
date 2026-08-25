"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ownerPortrait from "../../../public/owner.jpeg";
import {Users, Award, Rocket, Lightbulb, Heart, Star, Leaf, CheckCircle,CalendarCheck, GraduationCap, X, ArrowRight, Sparkles, Trophy,Zap, Target, BookOpen, Globe, ChevronRight, TrendingUp, Clock, Shield
} from "lucide-react";


const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};


const FloatingOrb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.05, 1] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

const GlowLine = () => (
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] mx-auto my-4 shadow-[0_0_12px_rgba(240,180,41,0.6)]" />
);

const SectionBadge = ({ children, variant = "gold" }) => {
    const map = {
        gold: "bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 text-[#804501] border-[#F0B429]/30",
        navy: "bg-[#0B1E3D]/8 text-[#0B1E3D] border-[#0B1E3D]/20",
        red:  "bg-[#804501]/10 text-[#804501] border-[#804501]/25",
        white:"bg-white/15 text-white border-white/25 backdrop-blur-sm",
    };
    return (
        <motion.span whileHover={{ scale: 1.06 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${map[variant]}`}>
            {children}
        </motion.span>
    );
};


const ProgressBar = ({ label, value, color, suffix, delay = 0 }) => {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);
    const isInView = typeof window !== "undefined"
        ? width > 0
        : false;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setWidth(value), delay * 1000);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, delay]);

    return (
        <div ref={ref}>
            <div className="flex justify-between text-xs text-white/55 mb-1.5">
                <span className="font-medium">{label}</span>
                <span className={`font-black ${color}`}>{suffix}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(to right, var(--bar-from), var(--bar-to))` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay }}
                    {...{ style: { background: color.includes('cyan') ? 'linear-gradient(to right,#804501,#F0B429)' : color.includes('fuchsia') ? 'linear-gradient(to right,#F0B429,#804501)' : 'linear-gradient(to right,#0B1E3D,#F0B429)' } }}
                />
            </div>
        </div>
    );
};


const Modal = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#030d1e]/85 backdrop-blur-md"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full max-w-lg rounded-3xl bg-[#06142D] border border-white/12 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                    <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#F0B429]/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-[#804501]/15 rounded-full blur-3xl pointer-events-none" />

                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/12 transition-all"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {!submitted ? (
                        <div className="relative">
                            <div className="mb-5">
                                <SectionBadge variant="white">
                                    <CalendarCheck className="w-3.5 h-3.5 text-[#FDD34F]" />
                                    1-on-1 Guidance Slot
                                </SectionBadge>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Talk to an Academic Counsellor</h3>
                            <p className="text-white/50 text-sm mb-7 leading-relaxed">
                                Our senior academic expert will call you within 15 minutes to map out your exam & career roadmap.
                            </p>

                            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                                {[
                                    { label: "Full Name", type: "text", placeholder: "e.g. Aryan Sharma" },
                                    { label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
                                ].map((field) => (
                                    <div key={field.label} className="space-y-1.5">
                                        <label className="block text-xs font-bold text-white/45 uppercase tracking-widest">{field.label}</label>
                                        <input
                                            required type={field.type} placeholder={field.placeholder}
                                            className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429]/40 transition-all text-sm hover:border-white/20"
                                        />
                                    </div>
                                ))}

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-white/45 uppercase tracking-widest">Target Goal / Exam</label>
                                    <select className="w-full px-5 py-3.5 rounded-2xl bg-[#0B1E3D] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429]/40 transition-all text-sm hover:border-white/20 appearance-none cursor-pointer">
                                        <option>Competitive Exams (JEE / NEET / SAT)</option>
                                        <option>Higher Education Admissions</option>
                                        <option>Career Transition & Upskilling</option>
                                        <option>School Academic Excellence</option>
                                    </select>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(240,180,41,0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="group w-full mt-2 py-4 rounded-2xl font-black text-[#06142D] relative overflow-hidden bg-gradient-to-r from-[#F0B429] via-[#FDD34F] to-[#F0B429] shadow-[0_8px_30px_rgba(240,180,41,0.3)] transition-all"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <Zap className="w-4 h-4" /> Confirm Free Slot Now
                                    </span>
                                </motion.button>
                            </form>
                        </div>
                    ) : (
                        <div className="py-10 text-center relative">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/25 to-emerald-600/15 border border-emerald-500/40 mx-auto flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                            >
                                <CheckCircle className="w-9 h-9 text-emerald-400" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-white mb-2">Slot Reserved!</h3>
                            <p className="text-white/50 text-sm mb-7 leading-relaxed max-w-xs mx-auto">
                                Our lead counsellor will call you shortly. Get ready for your tailored success roadmap!
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSubmitted(false); onClose(); }}
                                className="px-8 py-3 rounded-2xl bg-white/8 hover:bg-white/14 border border-white/12 text-white text-sm font-bold transition-all"
                            >
                                Close Window
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const page = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

    const featuresTab = [
        {
            title: "1-on-1 Mentorship", badge: "Personalized",
            heading: "Dedicated Expert Guidance Every Step",
            desc: "Get paired with top-tier academic mentors who track your daily performance, resolve doubts instantaneously, and craft custom study schedules tailored to your pace.",
            stats: ["Daily Live Doubt Sessions", "Custom Mock Tests", "Progress Analytics Dashboard"],
            bars: [
                { label: "Concept Retention Rate", value: 96, suffix: "96%", color: "text-[#FDD34F]" },
                { label: "Doubt Clearance Speed", value: 90, suffix: "< 10 Mins", color: "text-[#F0B429]" },
                { label: "Percentile Improvement", value: 85, suffix: "+35% Avg", color: "text-[#FDD34F]" },
            ]
        },
        {
            title: "Interactive Live Classes", badge: "Engaging",
            heading: "Immersive Learning with Real-Time Q&A",
            desc: "Experience high-definition live interactive sessions powered by visual simulations, interactive quizzes, and instant doubt resolution by master teachers.",
            stats: ["4K Ultra-HD Streams", "Dual-Teacher Support", "Recorded Class Replays"],
            bars: [
                { label: "Live Session Engagement", value: 94, suffix: "94%", color: "text-[#FDD34F]" },
                { label: "Class Attendance Rate", value: 88, suffix: "88%", color: "text-[#F0B429]" },
                { label: "Student Satisfaction", value: 98, suffix: "98%", color: "text-[#FDD34F]" },
            ]
        },
        {
            title: "Career Roadmap", badge: "Strategic",
            heading: "Clear Pathways to Top Universities & Jobs",
            desc: "From exam preparation strategies to university application counselling, we assist you in securing admissions and lucrative career opportunities.",
            stats: ["University Profile Building", "Resume & SOP Workshops", "Mock Interviews"],
            bars: [
                { label: "Placement Success Rate", value: 92, suffix: "92%", color: "text-[#FDD34F]" },
                { label: "Top-10 Univ. Admissions", value: 78, suffix: "78%", color: "text-[#F0B429]" },
                { label: "Scholarship Secured", value: 65, suffix: "65%", color: "text-[#FDD34F]" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased overflow-x-clip font-body">
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            <section ref={heroRef} className="relative pt-24 pb-28 overflow-hidden bg-section-hero">
                <div className="absolute inset-0 grid-gold" />
                <motion.div style={{ y: orbY1 }} className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full bg-[#F0B429]/12 blur-[140px] pointer-events-none" />
                <motion.div style={{ y: orbY2 }} className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full bg-[#804501]/15 blur-[120px] pointer-events-none" />
                <FloatingOrb className="w-[200px] h-[200px] bg-[#FDD34F]/8 blur-[60px] top-1/3 right-1/4" delay={2} />

                <motion.div style={{ scale: heroScale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7 space-y-8">
                            <motion.div variants={fadeInUp}>
                                <SectionBadge variant="gold">
                                    <Sparkles className="w-3.5 h-3.5 text-[#B26E02]" />
                                    Your Success Is Our Mission
                                </SectionBadge>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl font-black text-[#0B1E3D] leading-[1.0] tracking-tight">
                                Let's Build Your
                                <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(253,211,79,0.3)]">
                                    Success Story
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg text-slate-500 leading-relaxed max-w-xl">
                                Whether you're preparing for competitive entrance exams, building career roadmaps, or seeking 1-on-1 academic mentorship — our expert counsellors guide you toward guaranteed excellence.
                            </motion.p>
                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(240,180,41,0.5)' }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setModalOpen(true)}
                                    className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-r from-[#F0B429] to-[#FDD34F] text-[#06142D] px-8 py-4 rounded-2xl font-black text-base shadow-[0_8px_30px_rgba(240,180,41,0.35)]"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                    <CalendarCheck className="w-4 h-4 relative" />
                                    <span className="relative">Book Free Session</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-[#0B1E3D] border border-[#0B1E3D]/10 hover:border-[#F0B429]/60 bg-white backdrop-blur-sm transition-all"
                                >
                                    <Globe className="w-4 h-4" /> Explore Programs <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="flex items-center gap-5 pt-5 border-t border-[#0B1E3D]/8">
                                <div className="flex -space-x-3">
                                    {[
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
                                    ].map((src, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#F0B429] to-[#804501] blur-sm opacity-0 hover:opacity-80 transition" />
                                            <img src={src} alt="Student" className="relative w-10 h-10 rounded-full border-2 border-[#0B1E3D]/10 object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-[#F0B429]/20 border-2 border-[#0B1E3D]/10 flex items-center justify-center text-xs font-black text-[#B26E02]">
                                        +10k
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-600">Join 10,000+ Successful Students</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Average 98% Score Enhancement</p>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: <GraduationCap className="w-6 h-6" />, number: "10K+", label: "Active Students", color: "from-[#F0B429] to-[#804501]" },
                                { icon: <Trophy className="w-6 h-6" />, number: "98%", label: "Success Rate", color: "from-[#0B1E3D] to-[#1a3a6e]" },
                                { icon: <Star className="w-6 h-6" />, number: "4.9/5", label: "Student Rating", color: "from-[#804501] to-[#F0B429]" },
                                { icon: <Users className="w-6 h-6" />, number: "150+", label: "Expert Mentors", color: "from-[#F0B429] to-[#0B1E3D]" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -6, scale: 1.03 }}
                                    animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                                    transition={{ y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }, hover: { type: "spring" } }}
                                    className="relative p-5 rounded-2xl border border-[#0B1E3D]/8 bg-white shadow-[0_20px_50px_rgba(11,30,61,0.12)] overflow-hidden group"
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#F0B429]/8 to-[#804501]/8" />
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-[#0B1E3D] mb-3 shadow-lg`}>
                                        {s.icon}
                                    </div>
                                    <p className="text-3xl font-black text-[#0B1E3D]">{s.number}</p>
                                    <p className="text-slate-400 text-xs mt-1 font-medium">{s.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden"
                    >
                        {[
                            { number: "10K+", label: "Active Students", icon: <GraduationCap className="w-4 h-4" /> },
                            { number: "98%", label: "Success Rate", icon: <Trophy className="w-4 h-4" /> },
                            { number: "4.9/5", label: "Avg Rating", icon: <Star className="w-4 h-4" /> },
                            { number: "150+", label: "Mentors", icon: <Users className="w-4 h-4" /> },
                        ].map((s, i) => (
                            <div key={i} className="p-4 rounded-2xl border border-[#0B1E3D]/8 bg-white text-center">
                                <div className="text-[#B26E02] flex justify-center mb-1">{s.icon}</div>
                                <p className="text-2xl font-black text-[#0B1E3D]">{s.number}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>
            <section className="relative py-28 overflow-hidden bg-[#FAFAF8] text-black">
               
                <FloatingOrb className="w-[500px] h-[500px] bg-[#F0B429]/8 blur-[160px] -top-20 left-0" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#804501]/10 blur-[130px] bottom-0 right-0" delay={4} />

                <div className="relative max-w-7xl  px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16 ">
                        <motion.div variants={fadeInUp}><SectionBadge variant="gold">Purpose & Direction</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-black tracking-tight">
                            What Powers{' '}
                            <span className="bg-gradient-to-r from-[#FDD34F] to-[#F0B429] bg-clip-text text-transparent">Our Mission</span>
                        </motion.h2>
                        <GlowLine />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <Rocket className="w-7 h-7" />, badge: "MISSION",
                                title: "Empowering Next-Gen Achievers",
                                color: "from-[#804501] to-[#F0B429]",
                                text: "To democratize high-stakes education by pairing ambitious learners with world-class counsellors, personalized learning tech, and tailored success roadmaps."
                            },
                            {
                                icon: <Lightbulb className="w-7 h-7" />, badge: "VISION",
                                title: "Global Ecosystem for Excellence",
                                color: "from-[#F0B429] to-[#0B1E3D]",
                                text: "To build a global network where quality guidance knows no geographic bounds, empowering every student to unlock their highest potential."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="card-light group relative p-10 rounded-3xl transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-[#F0B429]/12 to-transparent skew-x-12 pointer-events-none" />
                                <div className={`absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-3xl group-hover:opacity-35 transition-opacity duration-500`} />
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-black tracking-widest text-[#B26E02] border border-[#F0B429]/30 px-3 py-1 rounded-full bg-[#F0B429]/8">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-[#0B1E3D] mb-4 group-hover:text-[#804501] transition-colors duration-300">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-28 bg-[#FAFAF8] overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#F0B429]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#804501]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}><SectionBadge variant="gold">Our Guiding Principles</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            Values That{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Define Us</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-3 text-slate-500 max-w-xl mx-auto">
                            The principles that shape every interaction, every lesson, and every success story we create together.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Heart className="w-6 h-6" />, title: "Student-Centric Passion",
                                desc: "We prioritize each student's unique learning style, strengths, and aspirations to construct personalized mentorship paths.",
                                color: "from-[#804501] to-[#F0B429]"
                            },
                            {
                                icon: <Users className="w-6 h-6" />, title: "Collaborative Ecosystem",
                                desc: "A thriving community of peer learners, alumni mentors, and master faculty constantly sharing insights and motivation.",
                                color: "from-[#0B1E3D] to-[#1a3a6e]"
                            },
                            {
                                icon: <Leaf className="w-6 h-6" />, title: "Relentless Excellence",
                                desc: "Uncompromising standards in course content, analytical problem-solving, and continuous performance tracking.",
                                color: "from-[#F0B429] to-[#804501]"
                            },
                            {
                                icon: <Shield className="w-6 h-6" />, title: "Transparent Progress",
                                desc: "Parents and students receive honest, data-driven scorecards — not vague assurances — after every test.",
                                color: "from-[#1a3a6e] to-[#804501]"
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />, title: "Result-Oriented Approach",
                                desc: "Every session, every mock test, every feedback loop is laser-focused on moving your rank and score upward.",
                                color: "from-[#804501] to-[#0B1E3D]"
                            },
                            {
                                icon: <Clock className="w-6 h-6" />, title: "Flexible, Hybrid Learning",
                                desc: "Attend live in a classroom, join online, or replay a recorded session — your education adapts to your schedule.",
                                color: "from-[#F0B429] to-[#0B1E3D]"
                            },
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="group relative p-8 rounded-3xl bg-white border border-[#0B1E3D]/6 shadow-[0_4px_24px_rgba(11,30,61,0.06)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.14)] transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none" />
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {v.icon}
                                </div>
                                <h3 className="font-black text-xl text-[#0B1E3D] mb-3">{v.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <section className="relative py-28 bg-section overflow-hidden">
                <FloatingOrb className="w-[500px] h-[500px] bg-[#F0B429]/8 blur-[160px] top-0 right-0" delay={1} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#804501]/10 blur-[130px] bottom-0 left-0" delay={3} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
                        <motion.div variants={fadeInUp}><SectionBadge variant="gold">The LearnHub Advantage</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            Designed for{' '}
                            <span className="bg-gradient-to-r from-[#804501] to-[#F0B429] bg-clip-text text-transparent">Tangible Results</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-3 text-slate-400 max-w-xl mx-auto">
                            Explore how our holistic learning system outperforms traditional tutoring methods.
                        </motion.p>
                    </motion.div>

                    <div className="flex justify-center mb-12">
                        <div className="relative inline-flex p-1.5 rounded-2xl bg-white border border-[#0B1E3D]/8 backdrop-blur-xl gap-1">
                            {featuresTab.map((tab, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative ${activeTab === idx
                                        ? 'bg-gradient-to-r from-[#F0B429] to-[#FDD34F] text-[#06142D] shadow-[0_4px_20px_rgba(240,180,41,0.35)]'
                                        : 'text-slate-400 hover:text-[#0B1E3D]'
                                        }`}
                                >
                                    {activeTab === idx && (
                                        <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F0B429] to-[#FDD34F]" style={{ zIndex: -1 }} />
                                    )}
                                    <span className="relative">{tab.title}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#F0B429]/15 via-[#804501]/10 to-[#F0B429]/15 blur-sm" />
                            <div className="relative rounded-3xl bg-white border border-[#0B1E3D]/8 p-8 md:p-12 backdrop-blur-2xl">
                                <div className="grid md:grid-cols-12 gap-10 items-center">
                                    <div className="md:col-span-7">
                                        <SectionBadge variant="gold">{featuresTab[activeTab].badge}</SectionBadge>
                                        <h3 className="mt-5 text-2xl md:text-4xl font-black text-[#0B1E3D] leading-tight mb-5">
                                            {featuresTab[activeTab].heading}
                                        </h3>
                                        <p className="text-slate-500 text-base leading-relaxed mb-8">
                                            {featuresTab[activeTab].desc}
                                        </p>
                                        <div className="space-y-3">
                                            {featuresTab[activeTab].stats.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-center gap-3 text-slate-600 font-medium text-sm"
                                                >
                                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#F0B429]/20 to-[#804501]/20 flex items-center justify-center flex-shrink-0">
                                                        <CheckCircle className="w-3.5 h-3.5 text-[#B26E02]" />
                                                    </div>
                                                    {item}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:col-span-5">
                                        <div className="relative">
                                            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#F0B429]/20 to-transparent blur-sm" />
                                            <div className="relative rounded-2xl bg-white border border-[#0B1E3D]/8 p-6 shadow-[0_20px_60px_rgba(11,30,61,0.12)]">
                                                <div className="flex items-center gap-3 mb-7">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0B429] to-[#804501] flex items-center justify-center text-[#0B1E3D]">
                                                        <Award className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Benchmark Report</p>
                                                        <p className="text-sm font-black text-[#0B1E3D]">Student Mastery Metrics</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-5">
                                                    {featuresTab[activeTab].bars.map((bar, bi) => (
                                                        <ProgressBar key={`${activeTab}-${bi}`} {...bar} delay={bi * 0.2} />
                                                    ))}
                                                </div>
                                                <div className="mt-6 pt-4 border-t border-[#0B1E3D]/8 flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                    <p className="text-slate-400 text-xs">Live data · Updated 2025 batch</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
            <section className="relative py-28 overflow-hidden bg-section">
                <div className="pointer-events-none absolute inset-0 grid-gold opacity-50" />
                <FloatingOrb className="w-[460px] h-[460px] bg-[#F0B429]/10 blur-[140px] top-10 -left-32" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={stagger}
                        className="grid lg:grid-cols-[auto_1fr] gap-14 items-center"
                    >
                        <motion.div variants={fadeInUp} className="mx-auto lg:mx-0">
                            <div className="relative w-[220px] h-[220px]">
                                <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border-2 border-[#F0B429]/35" />
                                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-[#F0B429] via-[#FDD34F] to-[#804501] opacity-20 blur-xl" />

                                <Image
                                    src={ownerPortrait}
                                    alt="Kumara Swamy N, founder of Kumar The Star"
                                    placeholder="blur"
                                    sizes="220px"
                                    className="relative w-full h-full rounded-[2rem] object-cover ring-1 ring-[#0B1E3D]/10 shadow-[0_24px_60px_rgba(11,30,61,0.18)]"
                                />

                                <span className="absolute -top-4 -left-4 grid place-items-center w-14 h-14 rounded-2xl bg-[#0B1E3D] text-[#FDD34F] shadow-[0_10px_30px_rgba(11,30,61,0.35)] ring-2 ring-[#F0B429]/40">
                                    <Star className="w-6 h-6" />
                                </span>
                            </div>
                        </motion.div>

                        <div>
                            <motion.div variants={fadeInUp}>
                                <SectionBadge variant="gold">From the Founder</SectionBadge>
                            </motion.div>

                            <motion.blockquote
                                variants={fadeInUp}
                                className="mt-7 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold leading-snug text-[#0B1E3D]"
                            >
                                “A student rarely fails for lack of effort. They fail
                                because nobody sat down and showed them{" "}
                                <span className="text-gold-gradient">how to study</span>.
                                That is the gap this institute was built to close.”
                            </motion.blockquote>

                            <motion.div variants={fadeInUp} className="hairline-gold my-7 max-w-[10rem]" />

                            <motion.p variants={fadeInUp} className="text-slate-500 leading-relaxed max-w-2xl">
                                Kumara Swamy N founded Kumar The Star after years spent
                                watching capable students struggle against material that
                                was never written for them. He is also the author of{" "}
                                <em>MBA is Fun Da</em>, published in 2014 — the same
                                instinct in print.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-6">
                                <div>
                                    <p className="font-[family-name:var(--font-display)] text-xl font-black text-[#0B1E3D]">
                                        Kumara Swamy N
                                    </p>
                                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-[#B26E02]">
                                        Founder &amp; Author
                                    </p>
                                </div>

                                <Link
                                    href="/books"
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#0B1E3D]/10 text-sm font-bold text-[#0B1E3D] transition-all hover:border-[#F0B429]/60 hover:text-[#804501]"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Read About the Book
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F0B429]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-section-hero" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                        <FloatingOrb className="w-[500px] h-[500px] bg-[#F0B429]/12 blur-[150px] top-0 left-1/2 -translate-x-1/2" delay={0} />
                        <div className="absolute inset-px rounded-3xl border border-[#F0B429]/35" />

                        <div className="relative p-12 md:p-20 text-center">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#B26E02] bg-[#F0B429]/10 border border-[#F0B429]/30 mb-6">
                                    <Rocket className="w-3.5 h-3.5" /> Join 10,000+ Students Advancing Their Scores
                                </span>

                                <h2 className="text-4xl md:text-6xl font-black text-[#0B1E3D] mb-6 leading-tight tracking-tight">
                                    Ready to Secure Your
                                    <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(253,211,79,0.25)]">
                                        Dream Future?
                                    </span>
                                </h2>

                                <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                    Book your free 1-on-1 counselling session today and get a personalized roadmap built around your goals.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(240,180,41,0.45)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setModalOpen(true)}
                                        className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#F0B429] via-[#FDD34F] to-[#F0B429] text-[#06142D] font-black text-base shadow-[0_12px_40px_rgba(240,180,41,0.35)] transition-all"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                        <span className="relative flex items-center gap-2">
                                            <CalendarCheck className="w-5 h-5" />
                                            Claim Free 1-on-1 Guidance
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-[#0B1E3D] border border-[#0B1E3D]/10 hover:border-[#F0B429]/60 bg-white transition-all"
                                    >
                                        <BookOpen className="w-4 h-4" /> Browse Programs <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default page;
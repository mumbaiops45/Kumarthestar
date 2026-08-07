

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {FaStar,FaClock,FaUserGraduate,FaBookOpen,FaCheckCircle,FaFilter,FaPlay,FaTimes,FaLock,FaChevronDown,FaChevronUp,FaQuoteLeft,FaRocket,FaPhoneAlt} from "react-icons/fa";


const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: i * 0.1 }
    })
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
};


const Starfield = () => {
    const stars = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((s) => (
                <motion.span
                    key={s.id}
                    className="absolute rounded-full bg-violet-200/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
                    animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.3, 1] }}
                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
};


const COURSES_DATA = [
    {
        id: "jee-mastery",
        category: "Engineering & JEE",
        level: "Advanced",
        title: "JEE Advanced 2026 Ultimate Mastery Track",
        subtitle: "Complete Physics, Chemistry & Math problem-solving blueprint with top 100 ranker mentors.",
        rating: 4.9,
        reviewsCount: 1420,
        students: "3,850+",
        duration: "24 Months",
        lessonsCount: 380,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "",
            role: "",
            avatar: ""
        },
        highlights: [
            "1-on-1 Daily Live Doubt Resolution",
            "150+ Simulated Full-Length Mock Exams",
            "Personalized Weak-Area Diagnostic AI"
        ],
        price: 499,
        originalPrice: 899,
        badge: "Bestseller",
        modules: [
            { title: "Module 1: Mechanics & Advanced Kinematics", lessons: 14, duration: "18h" },
            { title: "Module 2: Organic Reaction Mechanisms", lessons: 20, duration: "24h" },
            { title: "Module 3: Integral Calculus & 3D Geometry", lessons: 18, duration: "22h" }
        ]
    },
    {
        id: "neet-pinnacle",
        category: "Medical & NEET",
        level: "All Levels",
        title: "NEET UG 2026 Medical Excellence Program",
        subtitle: "High-yield NCERT line-by-line coverage, 3D anatomical simulations & Biology drills.",
        rating: 4.95,
        reviewsCount: 1890,
        students: "4,200+",
        duration: "18 Months",
        lessonsCount: 420,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "Dr. Ananya Roy",
            role: "AIIMS Gold Medalist & Biology Specialist",
            avatar: "https://images.unsplash.com/photo-1594824813566-78a99479c412?w=100&auto=format&fit=crop&q=80"
        },
        highlights: [
            "NCERT 3D Interactive Visualizer",
            "Daily 30-Min High-Yield Quiz Drills",
            "Medical College Application Counselling"
        ],
        price: 449,
        originalPrice: 799,
        badge: "Top Rated",
        modules: [
            { title: "Module 1: Human Physiology & Bio-System", lessons: 22, duration: "28h" },
            { title: "Module 2: Plant Diversity & Molecular Genetics", lessons: 16, duration: "20h" },
            { title: "Module 3: Inorganic Chemistry Masterclass", lessons: 19, duration: "25h" }
        ]
    },
    {
        id: "cs-ai-foundations",
        category: "Computer Science & AI",
        level: "Intermediate",
        title: "Full-Stack Software Engineering & AI Bootcamp",
        subtitle: "Master React, Node.js, Python, System Design & Large Language Models with industry projects.",
        rating: 4.88,
        reviewsCount: 960,
        students: "2,150+",
        duration: "16 Weeks",
        lessonsCount: 190,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "Alex Rivera",
            role: "Staff Engineer @ Ex-Google",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
        },
        highlights: [
            "Build 6 Production Capstone Projects",
            "1-on-1 Technical Resume & SOP Review",
            "Direct Hiring Partner Referral Access"
        ],
        price: 599,
        originalPrice: 999,
        badge: "Trending",
        modules: [
            { title: "Module 1: Modern JavaScript, React & Tailwind", lessons: 18, duration: "22h" },
            { title: "Module 2: Microservices & Cloud Architecture", lessons: 15, duration: "19h" },
            { title: "Module 3: LLM Integration & Fine-Tuning", lessons: 12, duration: "16h" }
        ]
    },
    {
        id: "sat-abroad",
        category: "Study Abroad & SAT",
        level: "Beginner to Advanced",
        title: "SAT Digital 1500+ Accelerator & Ivy Prep",
        subtitle: "Adaptive test strategies, Math shortcuts, Verbal reasoning & Ivy League essay editing.",
        rating: 4.92,
        reviewsCount: 840,
        students: "1,980+",
        duration: "12 Weeks",
        lessonsCount: 140,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "Sophia Chen",
            role: "Stanford Scholar & Admissions Consultant",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
        },
        highlights: [
            "10 Official Digital SAT Practice Tests",
            "Ivy League Alumni Application Review",
            "Scholarship Strategy Framework"
        ],
        price: 399,
        originalPrice: 699,
        badge: "High Demand",
        modules: [
            { title: "Module 1: SAT Math Advanced Problem Patterns", lessons: 12, duration: "15h" },
            { title: "Module 2: Reading & Writing Adaptive Drills", lessons: 14, duration: "18h" },
            { title: "Module 3: College Application SOP Writing", lessons: 10, duration: "12h" }
        ]
    },
    {
        id: "finance-quant",
        category: "Business & Finance",
        level: "Intermediate",
        title: "Quantitative Finance & Financial Modeling",
        subtitle: "Learn financial valuation, DCF modeling, Python for algorithmic trading & Wall St skills.",
        rating: 4.85,
        reviewsCount: 620,
        students: "1,450+",
        duration: "10 Weeks",
        lessonsCount: 120,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "Marcus Vance",
            role: "Ex-Goldman Sachs Portfolio Analyst",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
        },
        highlights: [
            "Real Financial Statement Valuation Models",
            "Python Backtesting Trading Algorithms",
            "Financial Analyst Certification"
        ],
        price: 479,
        originalPrice: 799,
        badge: "Popular",
        modules: [
            { title: "Module 1: Excel Financial Modeling & DCF", lessons: 12, duration: "16h" },
            { title: "Module 2: Portfolio Theory & Risk Analytics", lessons: 14, duration: "18h" },
            { title: "Module 3: Python Algorithmic Trading", lessons: 10, duration: "14h" }
        ]
    },
    {
        id: "data-science-mastery",
        category: "Computer Science & AI",
        level: "All Levels",
        title: "Data Science & Applied Machine Learning",
        subtitle: "Pandas, NumPy, Scikit-Learn, PyTorch & Real-world predictive analytics pipelines.",
        rating: 4.91,
        reviewsCount: 1110,
        students: "2,900+",
        duration: "20 Weeks",
        lessonsCount: 210,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        instructor: {
            name: "Dr. Elena Rostova",
            role: "Head of AI Research & Ex-Meta",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        },
        highlights: [
            "12 Real Dataset Case Studies",
            "Neural Network Architecture Building",
            "Kaggle Competition Mentorship"
        ],
        price: 529,
        originalPrice: 899,
        badge: "Recommended",
        modules: [
            { title: "Module 1: Exploratory Data Analysis & Viz", lessons: 15, duration: "20h" },
            { title: "Module 2: Supervised & Unsupervised ML", lessons: 18, duration: "24h" },
            { title: "Module 3: PyTorch Deep Learning & Computer Vision", lessons: 16, duration: "22h" }
        ]
    }
];

const CATEGORIES = [
    "All Courses",
    "Engineering & JEE",
    "Medical & NEET",
    "Computer Science & AI",
    "Study Abroad & SAT",
    "Business & Finance"
];


const TESTIMONIALS = [
    {
        name: "Rohan Kapoor",
        role: "JEE Advanced AIR 42",
        score: "99.89 Percentile",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        text: "The 1-on-1 mentorship and instant doubt-clearing sessions transformed my JEE prep completely. The mock tests mirror the exact difficulty of the real exam."
    },
    {
        name: "Priya Sundaram",
        role: "NEET Score 710 / 720",
        score: "Admitted to AIIMS Delhi",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        text: "NCERT 3D visualizers helped me retain organic chemistry and biology diagrams effortlessly. I jumped from 580 to 710 in less than 6 months!"
    },
    {
        name: "Daniel Kovacs",
        role: "SAT Score 1560",
        score: "Stanford University '30",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        text: "Sophia's essay strategy and college application guidance made my Ivy application shine. Received full scholarship offers from 3 top US universities!"
    }
];


const CourseDetailModal = ({ course, onClose, onEnroll }) => {
    const [activeModule, setActiveModule] = useState(0);

    if (!course) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0B0F24] border border-white/15 p-6 md:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <FaTimes />
                    </button>

                    <div className="grid md:grid-cols-12 gap-6 items-start mb-8">
                        <div className="md:col-span-8">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 mb-3">
                                {course.category} • {course.level}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                                {course.title}
                            </h2>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                {course.subtitle}
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                <img
                                    src={course.instructor.avatar}
                                    alt={course.instructor.name}
                                    className="w-10 h-10 rounded-full border border-violet-500/40 object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-white">{course.instructor.name}</p>
                                    <p className="text-xs text-slate-400">{course.instructor.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-4 rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-xl">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-black text-white">${course.price}</span>
                                <span className="text-sm text-slate-500 line-through">${course.originalPrice}</span>
                                <span className="text-xs font-bold text-emerald-400">Save 40%</span>
                            </div>

                            <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                                <FaClock className="text-cyan-400" /> {course.duration} ({course.lessonsCount} lessons)
                            </p>

                            <button
                                onClick={() => {
                                    onClose();
                                    onEnroll(course);
                                }}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:shadow-cyan-500/25 transition-all mb-3"
                            >
                                Enroll Now
                            </button>

                            <div className="space-y-1.5 text-xs text-slate-400">
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-400" /> Full Lifetime Access
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-400" /> Certificate of Completion
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCheckCircle className="text-emerald-400" /> 30-Day Refund Guarantee
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FaBookOpen className="text-violet-400 text-lg" /> Curriculum & Syllabus Breakdown
                        </h3>

                        <div className="space-y-3">
                            {course.modules.map((mod, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setActiveModule(activeModule === idx ? -1 : idx)}
                                        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center">
                                                0{idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{mod.title}</p>
                                                <p className="text-xs text-slate-400">
                                                    {mod.lessons} Lectures • {mod.duration} total
                                                </p>
                                            </div>
                                        </div>
                                        {activeModule === idx ? (
                                            <FaChevronUp className="text-xs text-slate-400" />
                                        ) : (
                                            <FaChevronDown className="text-xs text-slate-400" />
                                        )}
                                    </button>

                                    {activeModule === idx && (
                                        <div className="p-4 bg-black/30 border-t border-white/5 space-y-2 text-xs text-slate-300">
                                            <div className="flex items-center justify-between py-1 border-b border-white/5">
                                                <span className="flex items-center gap-2">
                                                    <FaPlay className="text-[10px] text-cyan-400" /> 1. Core Principles & Problem Modeling
                                                </span>
                                                <span className="text-slate-500">45 mins</span>
                                            </div>
                                            <div className="flex items-center justify-between py-1 border-b border-white/5">
                                                <span className="flex items-center gap-2">
                                                    <FaPlay className="text-[10px] text-cyan-400" /> 2. Deep Dive Practice Problem Set
                                                </span>
                                                <span className="text-slate-500">60 mins</span>
                                            </div>
                                            <div className="flex items-center justify-between py-1">
                                                <span className="flex items-center gap-2">
                                                    <FaLock className="text-[10px] text-slate-500" /> 3. Live Mentored Doubt Clearing Session
                                                </span>
                                                <span className="text-slate-500">Scheduled Live</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};


const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Courses");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourseModal, setSelectedCourseModal] = useState(null);
    const [enrolledNotice, setEnrolledNotice] = useState(null);
    const [openFaq, setOpenFaq] = useState(0);

    const filteredCourses = COURSES_DATA.filter((c) => {
        const matchesCategory =
            selectedCategory === "All Courses" || c.category === selectedCategory;
        const matchesSearch =
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleEnroll = (course) => {
        setEnrolledNotice(`Successfully enrolled in "${course.title}"! Dashboard opening...`);
        setTimeout(() => setEnrolledNotice(null), 4000);
    };

    return (
        <div className="min-h-screen  text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
            <Starfield />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

            <AnimatePresence>
                {enrolledNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-sm font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-3"
                    >
                        <FaCheckCircle className="text-emerald-400 text-lg" />
                        {enrolledNotice}
                    </motion.div>
                )}
            </AnimatePresence>


            <section className="relative pt-20 pb-16 overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[44rem] h-[22rem] bg-gradient-to-r from-violet-600/20 via-fuchsia-600/15 to-cyan-500/20 blur-[130px] pointer-events-none" />

                <div className="px-10 max-w-7xl relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 mb-4">
                            Premium Academic & Career Catalog
                        </motion.span>

                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-tight mb-6 max-w-4xl">
                            Master High-Stakes Exams & <br />
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                                Future-Proof Careers
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-slate-900 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
                            Explore 50+ industry-aligned programs taught by top 1% rankers, Ivy League scholars, and senior staff engineers.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="pt-16">
                <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
                    {CATEGORIES.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${selectedCategory === cat
                                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] scale-105"
                                : "bg-white/[0.04] border border-white/10 text-slate-900 hover:bg-gray-100 hover:text-black"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>


            <section className="py-16">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                        <p className="text-sm font-medium text-slate-400">
                             <span className="text-white font-bold">{filteredCourses.length}</span>Showing programs in{" "}
                            <span className="text-cyan-300 font-bold">{selectedCategory}</span>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <FaFilter /> Sorted by Popularity
                        </div>
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course, i) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="group rounded-3xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F24] via-transparent to-transparent opacity-90" />

                                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-md">
                                                {course.badge}
                                            </span>

                                            <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-1">
                                                <FaStar className="text-amber-400" />
                                                <span>{course.rating}</span>
                                                <span className="text-slate-400">({course.reviewsCount})</span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                                <span className="text-cyan-400 font-semibold">{course.category}</span>
                                                <span>•</span>
                                                <span>{course.duration}</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-black mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                                                {course.title}
                                            </h3>

                                            <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-2">
                                                {course.subtitle}
                                            </p>
                                            <div className="space-y-2 mb-6 text-xs text-slate-600">
                                                {course.highlights.map((h, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-emerald-400 shrink-0" />
                                                        <span className="truncate">{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 border-t border-white/5 mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-2xl font-extrabold text-black">${course.price}</span>
                                                <span className="text-xs text-slate-500 line-through ml-2">${course.originalPrice}</span>
                                            </div>
                                            <span className="text-xs text-slate-700 flex items-center gap-1">
                                                <FaUserGraduate className="text-violet-400" /> {course.students}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setSelectedCourseModal(course)}
                                                className="py-2.5 rounded-xl text-xs font-semibold text-black bg-gray-300 border border-white/10 hover:bg-gray-200 transition-colors"
                                            >
                                                Syllabus & Info
                                            </button>
                                            <button
                                                onClick={() => handleEnroll(course)}
                                                className="py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 shadow-md transition-all"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 rounded-3xl bg-white/[0.02] border border-white/10">
                            <p className="text-xl font-bold text-white mb-2">No courses match your query</p>
                            <p className="text-slate-400 text-sm mb-6">Try searching for a different keyword or category.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory("All Courses");
                                    setSearchQuery("");
                                }}
                                className="px-6 py-2 rounded-full bg-violet-600 text-white text-xs font-bold"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-24 bg-slate-950/60 border-y border-white/5 relative">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-3 block">
                            PROOF OF EXCELLENCE
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                            Loved by Top Rankers Worldwide
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
                            >
                                <FaQuoteLeft className="text-violet-500/20 text-4xl mb-4" />

                                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                                    &ldquo;{t.text}&rdquo;
                                </p>

                                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                                    />
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                                        <p className="text-xs text-cyan-300 font-semibold">{t.role}</p>
                                        <p className="text-[11px] text-slate-400">{t.score}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            <section id="cta-section" className="relative py-28 overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="relative rounded-3xl bg-gradient-to-r from-violet-950/90 via-[#0F132C] to-slate-950 border border-white/15 p-10 md:p-16 backdrop-blur-2xl text-center shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                        <span className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/40 mb-6">
                            <FaRocket /> Limited Time Offer • 40% Off Ends Soon
                        </span>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight relative z-10">
                            Start Your Journey To <br />
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                Academic & Career Greatness
                            </span>
                        </h2>

                        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
                            Join over 10,000+ ambitious students. Unlock 1-on-1 mentorship, live classes, and custom diagnostic reports today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <button
                                onClick={() => {
                                    setEnrolledNotice("Consultation request submitted! A senior counsellor will call you shortly.");
                                    setTimeout(() => setEnrolledNotice(null), 4000);
                                }}
                                className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-white text-base bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FaPhoneAlt className="text-xs" />
                                Book Free 1-on-1 Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {selectedCourseModal && (
                <CourseDetailModal
                    course={selectedCourseModal}
                    onClose={() => setSelectedCourseModal(null)}
                    onEnroll={handleEnroll}
                />
            )}


        </div>
    );
};

export default Page;
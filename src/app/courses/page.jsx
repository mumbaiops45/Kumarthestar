

"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Star, Clock, Users, BookOpen, CheckCircle, Filter, Play, X, Lock,ChevronDown, ChevronUp, Quote, Rocket, Phone, Search, ArrowRight,Sparkles, Trophy, Zap, GraduationCap, Globe, Award, Briefcase, Target} from "lucide-react";


const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};


const FloatingOrb = ({ className, delay = 0 }) => (
    <motion.div
        className={`absolute rounded-full pointer-events-none ${className}`}
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.05, 1] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

const GlowLine = () => (
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#C8A24D] to-[#8C2F39] mx-auto my-4 shadow-[0_0_12px_rgba(200,162,77,0.6)]" />
);

const SectionBadge = ({ children, variant = "gold" }) => {
    const map = {
        gold: "bg-gradient-to-r from-[#C8A24D]/15 to-[#E4C275]/10 text-[#8C2F39] border-[#C8A24D]/30",
        navy: "bg-[#0B1E3D]/8 text-[#0B1E3D] border-[#0B1E3D]/20",
        red:  "bg-[#8C2F39]/10 text-[#8C2F39] border-[#8C2F39]/25",
        white:"bg-white/15 text-white border-white/25 backdrop-blur-sm",
    };
    return (
        <motion.span
            whileHover={{ scale: 1.06 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${map[variant]}`}
        >
            {children}
        </motion.span>
    );
};


const COURSES_DATA = [
    {
        id: "jee-mastery",
        category: "Engineering & JEE",
        level: "Advanced",
        title: "JEE Advanced 2026 Ultimate Mastery Track",
        subtitle: "Complete Physics, Chemistry & Math problem-solving blueprint with top 100 ranker mentors.",
        rating: 4.9, reviewsCount: 1420, students: "3,850+", duration: "24 Months", lessonsCount: 380,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Prof. Arun Sharma", role: "IIT Bombay — 18 Years Teaching", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
        highlights: ["1-on-1 Daily Live Doubt Resolution", "150+ Simulated Full-Length Mock Exams", "Personalized Weak-Area Diagnostic AI"],
        price: 499, originalPrice: 899, badge: "Bestseller", badgeColor: "from-[#8C2F39] to-[#C8A24D]",
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
        rating: 4.95, reviewsCount: 1890, students: "4,200+", duration: "18 Months", lessonsCount: 420,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Dr. Ananya Roy", role: "AIIMS Gold Medalist & Biology Specialist", avatar: "https://images.unsplash.com/photo-1594824813566-78a99479c412?w=100&auto=format&fit=crop&q=80" },
        highlights: ["NCERT 3D Interactive Visualizer", "Daily 30-Min High-Yield Quiz Drills", "Medical College Application Counselling"],
        price: 449, originalPrice: 799, badge: "Top Rated", badgeColor: "from-[#0B1E3D] to-[#1a3a6e]",
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
        rating: 4.88, reviewsCount: 960, students: "2,150+", duration: "16 Weeks", lessonsCount: 190,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Alex Rivera", role: "Staff Engineer @ Ex-Google", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
        highlights: ["Build 6 Production Capstone Projects", "1-on-1 Technical Resume & SOP Review", "Direct Hiring Partner Referral Access"],
        price: 599, originalPrice: 999, badge: "Trending", badgeColor: "from-[#C8A24D] to-[#8C2F39]",
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
        rating: 4.92, reviewsCount: 840, students: "1,980+", duration: "12 Weeks", lessonsCount: 140,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Sophia Chen", role: "Stanford Scholar & Admissions Consultant", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
        highlights: ["10 Official Digital SAT Practice Tests", "Ivy League Alumni Application Review", "Scholarship Strategy Framework"],
        price: 399, originalPrice: 699, badge: "High Demand", badgeColor: "from-[#8C2F39] to-[#0B1E3D]",
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
        rating: 4.85, reviewsCount: 620, students: "1,450+", duration: "10 Weeks", lessonsCount: 120,
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Marcus Vance", role: "Ex-Goldman Sachs Portfolio Analyst", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
        highlights: ["Real Financial Statement Valuation Models", "Python Backtesting Trading Algorithms", "Financial Analyst Certification"],
        price: 479, originalPrice: 799, badge: "Popular", badgeColor: "from-[#0B1E3D] to-[#C8A24D]",
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
        rating: 4.91, reviewsCount: 1110, students: "2,900+", duration: "20 Weeks", lessonsCount: 210,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
        instructor: { name: "Dr. Elena Rostova", role: "Head of AI Research & Ex-Meta", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
        highlights: ["12 Real Dataset Case Studies", "Neural Network Architecture Building", "Kaggle Competition Mentorship"],
        price: 529, originalPrice: 899, badge: "Recommended", badgeColor: "from-[#C8A24D] to-[#0B1E3D]",
        modules: [
            { title: "Module 1: Exploratory Data Analysis & Viz", lessons: 15, duration: "20h" },
            { title: "Module 2: Supervised & Unsupervised ML", lessons: 18, duration: "24h" },
            { title: "Module 3: PyTorch Deep Learning & Computer Vision", lessons: 16, duration: "22h" }
        ]
    }
];

const CATEGORIES = [
    { label: "All Courses", icon: <Globe className="w-3.5 h-3.5" /> },
    { label: "Engineering & JEE", icon: <Target className="w-3.5 h-3.5" /> },
    { label: "Medical & NEET", icon: <Award className="w-3.5 h-3.5" /> },
    { label: "Computer Science & AI", icon: <Zap className="w-3.5 h-3.5" /> },
    { label: "Study Abroad & SAT", icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { label: "Business & Finance", icon: <Briefcase className="w-3.5 h-3.5" /> },
];

const TESTIMONIALS = [
    {
        name: "Rohan Kapoor", role: "JEE Advanced AIR 42", score: "99.89 Percentile",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
        text: "The 1-on-1 mentorship and instant doubt-clearing sessions transformed my JEE prep completely. The mock tests mirror the exact difficulty of the real exam."
    },
    {
        name: "Priya Sundaram", role: "NEET Score 710 / 720", score: "Admitted to AIIMS Delhi",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        text: "NCERT 3D visualizers helped me retain organic chemistry and biology diagrams effortlessly. I jumped from 580 to 710 in less than 6 months!"
    },
    {
        name: "Daniel Kovacs", role: "SAT Score 1560", score: "Stanford University '30",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        text: "Sophia's essay strategy and college application guidance made my Ivy application shine. Received full scholarship offers from 3 top US universities!"
    }
];


const CourseDetailModal = ({ course, onClose, onEnroll }) => {
    const [activeModule, setActiveModule] = useState(0);
    if (!course) return null;

    const discount = Math.round((1 - course.price / course.originalPrice) * 100);

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-[#030d1e]/85 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 30 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#06142D] border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-y-auto"
                >
                    <div className="relative h-52 w-full overflow-hidden rounded-t-3xl">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06142D] via-[#06142D]/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${course.badgeColor} shadow-lg`}>
                                {course.badge}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-7 md:p-10">
                        <div className="grid md:grid-cols-12 gap-8 items-start mb-8">
                            <div className="md:col-span-8">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#E4C275] mb-3 block">{course.category} · {course.level}</span>
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{course.title}</h2>
                                <p className="text-white/55 text-sm leading-relaxed mb-5">{course.subtitle}</p>
                                <div className="flex items-center gap-4 mb-5 text-sm">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#C8A24D] text-[#C8A24D]" />
                                        ))}
                                        <span className="ml-1 font-black text-white">{course.rating}</span>
                                        <span className="text-white/35 ml-1">({course.reviewsCount.toLocaleString()} reviews)</span>
                                    </div>
                                    <span className="text-white/25">·</span>
                                    <span className="text-white/50 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students} students</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/8">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] blur-sm opacity-70" />
                                        <img src={course.instructor.avatar} alt={course.instructor.name} className="relative w-12 h-12 rounded-full object-cover border-2 border-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-white">{course.instructor.name}</p>
                                        <p className="text-xs text-[#E4C275]">{course.instructor.role}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-4">
                                <div className="relative">
                                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#C8A24D]/25 to-[#8C2F39]/10 blur-sm" />
                                    <div className="relative rounded-2xl bg-white/[0.05] border border-white/12 p-6 backdrop-blur-xl">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-4xl font-black text-white">${course.price}</span>
                                            <span className="text-sm text-white/35 line-through">${course.originalPrice}</span>
                                        </div>
                                        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/25 mb-4">
                                            Save {discount}%
                                        </span>
                                        <p className="text-xs text-white/40 flex items-center gap-1 mb-5">
                                            <Clock className="w-3.5 h-3.5 text-[#E4C275]" /> {course.duration} · {course.lessonsCount} lessons
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(200,162,77,0.4)' }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => { onClose(); onEnroll(course); }}
                                            className="group w-full py-3 rounded-xl bg-gradient-to-r from-[#C8A24D] to-[#E4C275] text-[#06142D] font-black text-sm relative overflow-hidden mb-4 shadow-[0_8px_30px_rgba(200,162,77,0.25)]"
                                        >
                                            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                            <span className="relative flex items-center justify-center gap-2">
                                                <Zap className="w-4 h-4" /> Enroll Now
                                            </span>
                                        </motion.button>
                                        <div className="space-y-2 text-xs text-white/45">
                                            {["Full Lifetime Access", "Certificate of Completion", "30-Day Refund Guarantee"].map((item) => (
                                                <div key={item} className="flex items-center gap-2">
                                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-white/8 pt-8">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#E4C275]" /> Curriculum & Syllabus Breakdown
                            </h3>
                            <div className="space-y-3">
                                {course.modules.map((mod, idx) => (
                                    <div key={idx} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${activeModule === idx ? 'bg-white/[0.06] border-[#C8A24D]/30' : 'bg-white/[0.02] border-white/8 hover:border-white/15'}`}>
                                        <button
                                            onClick={() => setActiveModule(activeModule === idx ? -1 : idx)}
                                            className="w-full p-5 flex items-center justify-between text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-all duration-300 ${activeModule === idx ? 'bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] text-white shadow-lg' : 'bg-white/8 text-white/50'}`}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{mod.title}</p>
                                                    <p className="text-xs text-white/35 mt-0.5">{mod.lessons} lectures · {mod.duration} total</p>
                                                </div>
                                            </div>
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${activeModule === idx ? 'bg-[#C8A24D]/15 rotate-180' : 'bg-white/5'}`}>
                                                <ChevronDown className="w-4 h-4 text-[#E4C275]" />
                                            </div>
                                        </button>
                                        <motion.div
                                            initial={false}
                                            animate={{ height: activeModule === idx ? 'auto' : 0, opacity: activeModule === idx ? 1 : 0 }}
                                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 border-t border-white/6 space-y-2 pt-4">
                                                {[
                                                    { label: "Core Principles & Problem Modeling", time: "45 mins", unlocked: true },
                                                    { label: "Deep Dive Practice Problem Set", time: "60 mins", unlocked: true },
                                                    { label: "Live Mentored Doubt Clearing Session", time: "Scheduled Live", unlocked: false },
                                                ].map((lesson, li) => (
                                                    <div key={li} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 text-xs">
                                                        <span className="flex items-center gap-2 text-white/60">
                                                            {lesson.unlocked
                                                                ? <Play className="w-3 h-3 text-[#E4C275]" />
                                                                : <Lock className="w-3 h-3 text-white/25" />
                                                            }
                                                            {li + 1}. {lesson.label}
                                                        </span>
                                                        <span className="text-white/30">{lesson.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};


const page = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Courses");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourseModal, setSelectedCourseModal] = useState(null);
    const [enrolledNotice, setEnrolledNotice] = useState(null);

    const filteredCourses = useMemo(() => COURSES_DATA.filter((c) => {
        const matchCat = selectedCategory === "All Courses" || c.category === selectedCategory;
        const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
            || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            || c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    }), [selectedCategory, searchQuery]);

    const handleEnroll = (course) => {
        setEnrolledNotice(`Successfully enrolled in "${course.title}"! Dashboard opening...`);
        setTimeout(() => setEnrolledNotice(null), 4500);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased overflow-x-hidden font-body">
            <AnimatePresence>
                {enrolledNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0B1E3D] border border-[#C8A24D]/40 text-white text-sm font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl max-w-sm"
                    >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-sm leading-snug">{enrolledNotice}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-[#06142D] via-[#0B1E3D] to-[#06142D]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
                <FloatingOrb className="w-[700px] h-[700px] bg-[#C8A24D]/10 blur-[180px] -top-40 left-1/2 -translate-x-1/2" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#8C2F39]/12 blur-[120px] bottom-0 right-0" delay={3} />

                <div className="relative max-w-7xl  px-4 sm:px-6 lg:px-8 pt-8">
                    <motion.div initial="hidden" animate="visible" variants={stagger} className=" max-w-4xl ">
                        {/* <motion.div variants={fadeInUp}>
                            <SectionBadge variant="white">
                                <Sparkles className="w-3.5 h-3.5 text-[#E4C275]" />
                                Premium Academic & Career Catalog
                            </SectionBadge>
                        </motion.div> */}

                        <motion.h1 variants={fadeInUp} className="mt-6 text-5xl sm:text-7xl px-10 font-black text-white leading-[1.0] tracking-tight">
                            Master High-Stakes Exams
                            <span className="block bg-gradient-to-r from-[#E4C275] via-[#f5d98a] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(228,194,117,0.3)]">
                                & Future-Proof Careers
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="mt-6 px-10 text-lg text-white/55 max-w-2xl leading-relaxed">
                            Explore 50+ industry-aligned programs taught by top 1% rankers, Ivy League scholars, and senior staff engineers.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap px-10 gap-6">
                            {[
                                { label: "50+ Programs", icon: <BookOpen className="w-4 h-4" /> },
                                { label: "200+ Faculty", icon: <GraduationCap className="w-4 h-4" /> },
                                { label: "10K+ Students", icon: <Users className="w-4 h-4" /> },
                                { label: "98% Success Rate", icon: <Trophy className="w-4 h-4" /> },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/50 text-sm font-medium">
                                    <span className="text-[#E4C275]">{s.icon}</span>
                                    {s.label}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#0B1E3D]/8 shadow-[0_4px_30px_rgba(11,30,61,0.06)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 flex-nowrap">
                            {CATEGORIES.map((cat) => (
                                <motion.button
                                    key={cat.label}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedCategory(cat.label)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${selectedCategory === cat.label
                                        ? 'bg-[#0B1E3D] text-[#E4C275] shadow-[0_6px_20px_rgba(11,30,61,0.25)]'
                                        : 'bg-[#F7F3EA] text-slate-600 hover:bg-[#0B1E3D]/5 border border-[#0B1E3D]/8'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                            <Filter className="w-3.5 h-3.5" />
                            <span>{filteredCourses.length} programs</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-[#F7F3EA] to-[#FAFAF8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#0B1E3D]/8">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Showing <span className="text-[#0B1E3D] font-black text-base">{filteredCourses.length}</span> programs in{" "}
                                <span className="text-[#8C2F39] font-bold">{selectedCategory}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Star className="w-3.5 h-3.5 fill-[#C8A24D] text-[#C8A24D]" />
                            Sorted by Top Rated
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {filteredCourses.length > 0 ? (
                            <motion.div
                                key={selectedCategory + searchQuery}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
                            >
                                {filteredCourses.map((course, i) => (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.08 }}
                                        whileHover={{ y: -10 }}
                                        className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(11,30,61,0.08)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.18)] transition-all duration-500 border border-[#0B1E3D]/5 flex flex-col"
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/70 via-transparent to-transparent" />
                                            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${course.badgeColor} shadow-lg`}>
                                                {course.badge}
                                            </span>
                                            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-xs font-bold text-white">
                                                <Star className="w-3 h-3 fill-[#C8A24D] text-[#C8A24D]" />
                                                {course.rating}
                                                <span className="text-white/40">({course.reviewsCount})</span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold tracking-wide">
                                                {course.duration}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <p className="text-[#8C2F39] text-xs font-bold uppercase tracking-widest mb-2">{course.category}</p>
                                            <h3 className="text-[#0B1E3D] font-black text-lg leading-snug mb-2 group-hover:text-[#8C2F39] transition-colors duration-300">
                                                {course.title}
                                            </h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-2">{course.subtitle}</p>
                                            <div className="flex items-center gap-2 mb-5">
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] blur-sm opacity-0 group-hover:opacity-70 transition" />
                                                    <img src={course.instructor.avatar} alt={course.instructor.name} className="relative w-7 h-7 rounded-full object-cover border border-[#C8A24D]/40" />
                                                </div>
                                                <p className="text-slate-600 text-xs font-semibold truncate">{course.instructor.name}</p>
                                            </div>
                                            <div className="space-y-2 mb-6">
                                                {course.highlights.map((h, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                        <span className="truncate">{h}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-auto pt-5 border-t border-[#0B1E3D]/6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <span className="text-2xl font-black text-[#0B1E3D]">${course.price}</span>
                                                        <span className="text-xs text-slate-400 line-through ml-2">${course.originalPrice}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5 text-[#8C2F39]" /> {course.students}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => setSelectedCourseModal(course)}
                                                        className="py-2.5 rounded-xl text-xs font-bold text-[#0B1E3D] bg-[#F7F3EA] border border-[#0B1E3D]/12 hover:bg-[#0B1E3D] hover:text-[#E4C275] hover:border-[#0B1E3D] transition-all duration-300"
                                                    >
                                                        Syllabus & Info
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.03, boxShadow: '0 8px_24px_rgba(200,162,77,0.35)' }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => handleEnroll(course)}
                                                        className="group/btn relative overflow-hidden py-2.5 rounded-xl text-xs font-black text-[#06142D] bg-gradient-to-r from-[#C8A24D] to-[#E4C275] shadow-[0_4px_16px_rgba(200,162,77,0.25)] transition-all"
                                                    >
                                                        <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-400 skew-x-12" />
                                                        <span className="relative">Enroll Now</span>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-24 rounded-3xl bg-white border border-[#0B1E3D]/8 shadow-sm"
                            >
                                <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-[#F7F3EA] flex items-center justify-center">
                                    <Search className="w-8 h-8 text-[#C8A24D]" />
                                </div>
                                <p className="text-2xl font-black text-[#0B1E3D] mb-2">No courses match your query</p>
                                <p className="text-slate-400 text-sm mb-8">Try a different keyword or browse all categories.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => { setSelectedCategory("All Courses"); setSearchQuery(""); }}
                                    className="px-8 py-3 rounded-2xl bg-[#0B1E3D] text-[#E4C275] text-sm font-black shadow-lg hover:shadow-xl transition-all"
                                >
                                    Reset All Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#040e22] via-[#06142D] to-[#040e22]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <FloatingOrb className="w-[500px] h-[500px] bg-[#C8A24D]/8 blur-[160px] top-0 left-0" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#8C2F39]/10 blur-[130px] bottom-0 right-0" delay={4} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}>
                            <SectionBadge variant="white">
                                <Trophy className="w-3.5 h-3.5 text-[#E4C275]" />
                                Proof of Excellence
                            </SectionBadge>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-4xl md:text-5xl font-black text-white tracking-tight">
                            Loved by{' '}
                            <span className="bg-gradient-to-r from-[#E4C275] to-[#C8A24D] bg-clip-text text-transparent">Top Rankers Worldwide</span>
                        </motion.h2>
                        <GlowLine />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-7">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:border-[#E4C275]/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C8A24D] to-[#8C2F39] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Quote className="w-10 h-10 text-[#C8A24D]/20 mb-5" />
                                <p className="text-white/60 text-sm leading-relaxed mb-8 italic">"{t.text}"</p>

                                <div className="flex items-center gap-4 pt-5 border-t border-white/8">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E4C275] to-[#C8A24D] blur-sm opacity-50 group-hover:opacity-100 transition" />
                                        <img src={t.image} alt={t.name} className="relative w-12 h-12 rounded-full object-cover border-2 border-[#E4C275]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white">{t.name}</h4>
                                        <p className="text-xs text-[#E4C275] font-semibold">{t.role}</p>
                                        <p className="text-xs text-white/35 mt-0.5">{t.score}</p>
                                    </div>
                                    <div className="ml-auto flex gap-0.5">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#C8A24D] text-[#C8A24D]" />)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#C8A24D]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#06142D] via-[#0B1E3D] to-[#06142D]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                        <FloatingOrb className="w-[500px] h-[500px] bg-[#C8A24D]/12 blur-[150px] top-0 left-1/2 -translate-x-1/2" delay={0} />
                        <div className="absolute inset-px rounded-3xl border border-white/10" />

                        <div className="relative p-12 md:p-20 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#E4C275] bg-[#C8A24D]/10 border border-[#C8A24D]/30 mb-6">
                                    <Rocket className="w-3.5 h-3.5" />
                                    Limited Time Offer · 40% Off Ends Soon
                                </span>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                                    Start Your Journey To
                                    <span className="block bg-gradient-to-r from-[#E4C275] via-[#f5d98a] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(228,194,117,0.25)]">
                                        Academic & Career Greatness
                                    </span>
                                </h2>

                                <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                    Join over 10,000+ ambitious students. Unlock 1-on-1 mentorship, live classes, and custom diagnostic reports today.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(200,162,77,0.45)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setEnrolledNotice("Consultation request submitted! A senior counsellor will call you shortly.");
                                            setTimeout(() => setEnrolledNotice(null), 4500);
                                        }}
                                        className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#C8A24D] via-[#E4C275] to-[#C8A24D] text-[#06142D] font-black text-base shadow-[0_12px_40px_rgba(200,162,77,0.35)] transition-all"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                        <span className="relative flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            Book Free 1-on-1 Consultation
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setSelectedCategory("All Courses")}
                                        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:border-white/40 bg-white/5 transition-all"
                                    >
                                        Browse All Courses <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
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

export default page;
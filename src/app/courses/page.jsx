"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, BookOpen, CheckCircle, Filter, Quote, Rocket, Phone, Search, ArrowRight, Trophy, Zap, GraduationCap, Globe, Award, Briefcase, Target } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
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
    <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[#F0B429] to-[#804501] mx-auto my-4 shadow-[0_0_12px_rgba(240,180,41,0.6)]" />
);

const SectionBadge = ({ children, variant = "gold" }) => {
    const map = {
        gold: "bg-gradient-to-r from-[#F0B429]/15 to-[#FDD34F]/10 text-[#804501] border-[#F0B429]/30",
        navy: "bg-[#0B1E3D]/8 text-[#0B1E3D] border-[#0B1E3D]/20",
        red: "bg-[#804501]/10 text-[#804501] border-[#804501]/25",
        white: "bg-white/15 text-white border-white/25 backdrop-blur-sm",
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
        price: 499, originalPrice: 899, badge: "Bestseller", badgeColor: "from-[#804501] to-[#F0B429]",
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
        instructor: { name: "Dr. Ananya Roy", role: "AIIMS Gold Medalist & Biology Specialist", avatar: "https://instagram.fbom33-1.fna.fbcdn.net/v/t51.82787-15/779158660_18476032135119166_8938442415517528101_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=1&ig_cache_key=Mzk2OTI4MjgxMzQ1ODAwNTE4OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjMxNi5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=bi68Z_426CwQ7kNvwGtTBzg&_nc_oc=Adq3-IYmO3DfL06pIhRyVmSYLq52P8h5VukSt3YRGmznw0BL2u1A-aLuu99oaGEWgTTtzAuswRym4dXhmnE0ykc_&_nc_zt=23&_nc_ht=instagram.fbom33-1.fna&_nc_gid=ZV00Xjp7NqKxLNu9LCHcYQ&_nc_ss=7b289&oh=00_AQHGFH6Zp2n50LbGAQ1Le1HfXp0ZivVL6hl6t6M_98qi9w&oe=6A9608A7" },
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
        price: 599, originalPrice: 999, badge: "Trending", badgeColor: "from-[#F0B429] to-[#804501]",
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
        price: 399, originalPrice: 699, badge: "High Demand", badgeColor: "from-[#804501] to-[#0B1E3D]",
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
        price: 479, originalPrice: 799, badge: "Popular", badgeColor: "from-[#0B1E3D] to-[#F0B429]",
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
        price: 529, originalPrice: 899, badge: "Recommended", badgeColor: "from-[#F0B429] to-[#0B1E3D]",
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

const page = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Courses");
    const [searchQuery, setSearchQuery] = useState("");
    const [enrolledNotice, setEnrolledNotice] = useState(null);

    const filteredCourses = useMemo(() => COURSES_DATA.filter((c) => {
        const matchCat = selectedCategory === "All Courses" || c.category === selectedCategory;
        const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase())
            || c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            || c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    }), [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased overflow-x-clip font-body">
            <AnimatePresence>
                {enrolledNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0B1E3D] border border-[#F0B429]/40 text-white text-sm font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl max-w-sm"
                    >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-sm leading-snug">{enrolledNotice}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <section className="relative pt-20 pb-24 overflow-hidden bg-section-hero">
                <div className="absolute inset-0 grid-gold" />
                <FloatingOrb className="w-[700px] h-[700px] bg-[#F0B429]/10 blur-[180px] -top-40 left-1/2 -translate-x-1/2" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#804501]/12 blur-[120px] bottom-0 right-0" delay={3} />
                <div className="relative max-w-7xl sm:px-4 lg:px-8 pt-8">
                    <motion.div initial="hidden" animate="visible" variants={stagger} className=" max-w-4xl ">
                        <motion.h1 variants={fadeInUp} className="mt-6 text-5xl sm:text-5xl md:text-6xl px-4 sm:px-4 md:px-2 lg:px-5 font-black text-[#0B1E3D] leading-[1.0] tracking-tight">
                            Master High-Stakes Exams
                            <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(253,211,79,0.3)]">
                                & Future Proof Careers
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="mt-6 px-4 sm:px-4 md:px-8 lg:px-5 text-lg text-slate-500 max-w-2xl leading-relaxed">
                            Explore 50+ industry-aligned programs taught by top 1% rankers, Ivy League scholars, and senior staff engineers.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap px-4 sm:px-4 md:px-8 lg:px-5 gap-6">
                            {[
                                { label: "50+ Programs", icon: <BookOpen className="w-4 h-4" /> },
                                { label: "200+ Faculty", icon: <GraduationCap className="w-4 h-4" /> },
                                { label: "10K+ Students", icon: <Users className="w-4 h-4" /> },
                                { label: "98% Success Rate", icon: <Trophy className="w-4 h-4" /> },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                    <span className="text-[#B26E02]">{s.icon}</span>
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
                                        ? 'bg-[#0B1E3D] text-[#FDD34F] shadow-[0_6px_20px_rgba(11,30,61,0.25)]'
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
                                <span className="text-[#804501] font-bold">{selectedCategory}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Star className="w-3.5 h-3.5 fill-[#F0B429] text-[#F0B429]" />
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
                                                <Star className="w-3 h-3 fill-[#F0B429] text-[#F0B429]" />
                                                {course.rating}
                                                <span className="text-white/40">({course.reviewsCount})</span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold tracking-wide">
                                                {course.duration}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <p className="text-[#804501] text-xs font-bold uppercase tracking-widest mb-2">{course.category}</p>
                                            <h3 className="text-[#0B1E3D] font-black text-lg leading-snug mb-2 group-hover:text-[#804501] transition-colors duration-300">
                                                {course.title}
                                            </h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-2">{course.subtitle}</p>
                                            <div className="flex items-center gap-2 mb-5">
                                                <div className="relative">
                                                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#F0B429] to-[#804501] blur-sm opacity-0 group-hover:opacity-70 transition" />
                                                    <img src={course.instructor.avatar} alt={course.instructor.name} className="relative w-7 h-7 rounded-full object-cover border border-[#F0B429]/40" />
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
                                                        <span className="text-2xl font-black text-[#0B1E3D]">₹{course.price}</span>
                                                        <span className="text-xs text-slate-400 line-through ml-2">₹{course.originalPrice}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-500 flex items-center gap-1">
                                                        <Users className="w-3.5 h-3.5 text-[#804501]" />{course.students}
                                                    </span>
                                                </div>
                                                <div className="w-full">
                                                    <Link
                                                        href="/contact"
                                                        className="group/btn relative overflow-hidden inline-flex items-center justify-center w-full py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-black text-[#06142D] bg-gradient-to-r from-[#F0B429] to-[#FDD34F] shadow-[0_4px_16px_rgba(240,180,41,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(240,180,41,0.35)] active:scale-[0.97]"
                                                    >
                                                        <span className="absolute inset-0 bg-white/25 translate-x-[-120%] group-hover/btn:translate-x-[120%] transition-transform duration-500 shew-x-12 " />
                                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                                            <span>Enroll Now</span>
                                                            <span className="text-base sm:text-lg transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                                                        </span>
                                                    </Link>

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
                                    <Search className="w-8 h-8 text-[#F0B429]" />
                                </div>
                                <p className="text-2xl font-black text-[#0B1E3D] mb-2">No courses match your query</p>
                                <p className="text-slate-400 text-sm mb-8">Try a different keyword or browse all categories.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => { setSelectedCategory("All Courses"); setSearchQuery(""); }}
                                    className="px-8 py-3 rounded-2xl bg-[#0B1E3D] text-[#FDD34F] text-sm font-black shadow-lg hover:shadow-xl transition-all"
                                >
                                    Reset All Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
            <section className="relative py-18 overflow-hidden bg-[#FAFAF8] text-black">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <FloatingOrb className="w-[500px] h-[500px] bg-[#F0B429]/8 blur-[160px] top-0 left-0" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#804501]/10 blur-[130px] bottom-0 right-0" delay={4} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-6">
                        <motion.div variants={fadeInUp}>
                            <SectionBadge variant="gold">
                                <Trophy className="w-3.5 h-3.5 text-[#FDD34F]" />
                                Proof of Excellence
                            </SectionBadge>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-4xl md:text-5xl font-black text-black tracking-tight">
                            Loved by{' '}
                            <span className="bg-gradient-to-r from-[#FDD34F] to-[#F0B429] bg-clip-text text-transparent">Top Rankers Worldwide</span>
                        </motion.h2>
                        <GlowLine />
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-7">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="card-light group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F0B429] to-[#804501] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Quote className="w-10 h-10 text-[#FDD34F] mb-5" />
                                <p className="text-slate-800 text-sm leading-relaxed mb-8 italic">"{t.text}"</p>

                                <div className="flex items-center gap-4 pt-5 border-t border-white/8">
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#FDD34F] to-[#F0B429] blur-sm opacity-50 group-hover:opacity-100 transition" />
                                        <img src={t.image} alt={t.name} className="relative w-12 h-12 rounded-full object-cover border-2 border-[#FDD34F]" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-black">{t.name}</h4>
                                        <p className="text-xs text-[#FDD34F] font-semibold">{t.role}</p>
                                        <p className="text-xs text-white/35 mt-0.5">{t.score}</p>
                                    </div>
                                    <div className="ml-auto flex gap-0.5">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#F0B429] text-[#F0B429]" />)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <section className="relative py-18 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#F0B429]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-section-hero" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
                        <FloatingOrb className="w-[500px] h-[500px] bg-[#F0B429]/12 blur-[150px] top-0 left-1/2 -translate-x-1/2" delay={0} />
                        <div className="absolute inset-px rounded-3xl border border-[#F0B429]/35" />
                        <div className="relative p-12 md:p-20 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#B26E02] bg-[#F0B429]/10 border border-[#F0B429]/30 mb-6">
                                    <Rocket className="w-3.5 h-3.5" />
                                    Limited Time Offer · 40% Off Ends Soon
                                </span>
                                <h2 className="text-4xl md:text-3xl font-black text-[#0B1E3D] mb-6 leading-tight tracking-tight">
                                    Start Your Journey To
                                    <span className="block bg-gradient-to-r from-[#804501] via-[#F0B429] to-[#B26E02] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(253,211,79,0.25)]">
                                        Academic & Career Greatness
                                    </span>
                                </h2>
                                <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                    Join over 10,000+ ambitious students. Unlock 1-on-1 mentorship, live classes, and custom diagnostic reports today.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(240,180,41,0.45)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setEnrolledNotice("Consultation request submitted! A senior counsellor will call you shortly.");
                                            setTimeout(() => setEnrolledNotice(null), 4500);
                                        }}
                                        className="group relative overflow-hidden flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#F0B429] via-[#FDD34F] to-[#F0B429] text-[#06142D] font-black text-base shadow-[0_12px_40px_rgba(240,180,41,0.35)] transition-all"
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
                                        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-[#0B1E3D] border border-[#0B1E3D]/10 hover:border-[#F0B429]/60 bg-white transition-all"
                                    >
                                        Browse All Courses <ArrowRight className="w-4 h-4" />
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
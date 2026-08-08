"use client";

import React, { useState, useRef, useMemo } from "react";
import {motion, AnimatePresence, useScroll, useTransform,useMotionValue, useSpring} from "framer-motion";
import {GraduationCap, ChalkboardTeacher, Award, BookOpen, Star, ArrowRight,Search, X, CheckCircle, ExternalLink, CalendarCheck, Phone,Sparkles, Trophy, Users, Zap, Globe, Target, Linkedin, Twitter,Mail, Filter, TrendingUp, Briefcase} from "lucide-react";


const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
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
        <motion.span whileHover={{ scale: 1.06 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm ${map[variant]}`}>
            {children}
        </motion.span>
    );
};


const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`[perspective:1000px] ${className}`}
        >
            {children}
        </motion.div>
    );
};

const FACULTY_MEMBERS = [
    {
        id: "sarah-johnson",
        name: "Dr. Sarah Johnson",
        designation: "Professor of Computer Science & AI",
        department: "AI & Computer Science",
        expertise: "Deep Learning & NLP",
        experience: 14, rating: 4.95, reviews: 342,
        students: "2,800+", courses: 8, papers: 54,
        badgeColor: "from-[#C8A24D] to-[#8C2F39]",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
        bio: "Ex-Google Senior AI Researcher with expertise in Transformer architectures & Large Language Models. Author of 50+ papers in NeurIPS & ICML.",
        achievements: [
            "NeurIPS Best Paper Award Finalist 2023",
            "Ex-Google Brain AI Research Fellow",
            "Mentored 45+ Students into Top AI PhD Programs"
        ],
        coursesList: ["Full-Stack Software & AI Bootcamp", "PyTorch Neural Networks Masterclass"]
    },
    {
        id: "vikram-sharma",
        name: "Dr. Vikramaditya Sharma",
        designation: "Head of Advanced Physics",
        department: "Physics & JEE",
        expertise: "Quantum Mechanics & JEE",
        experience: 18, rating: 4.98, reviews: 580,
        students: "4,500+", courses: 10, papers: 42,
        badgeColor: "from-[#0B1E3D] to-[#8C2F39]",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        bio: "IIT Bombay Gold Medalist with 18+ years of experience training Top 100 JEE Rankers. Specializes in intuitive visual problem-solving techniques.",
        achievements: [
            "Produced AIR 1, AIR 4, & AIR 12 in JEE Advanced",
            "Author of 'Conceptual Physics Problem Blueprint'",
            "Ex-Senior Faculty at Premier National Institutes"
        ],
        coursesList: ["JEE Advanced 2026 Ultimate Physics", "Mechanics & Electro-Dynamics Mastery"]
    },
    {
        id: "ananya-roy",
        name: "Dr. Ananya Roy",
        designation: "Professor of Human Biology & Anatomy",
        department: "Medical & Biology",
        expertise: "Medical Science & NEET UG",
        experience: 12, rating: 4.92, reviews: 410,
        students: "3,900+", courses: 7, papers: 38,
        badgeColor: "from-[#8C2F39] to-[#C8A24D]",
        image: "https://www.hindalco.com/Upload/Images/masthead/Ananya_Birla-inside.webp",
        bio: "AIIMS Delhi Gold Medalist and practicing Senior Physician. Pioneered 3D anatomical memory visualizations for medical entrance excellence.",
        achievements: [
            "AIIMS Delhi Gold Medalist 2012",
            "Over 92% Student Score Retention Average",
            "Featured Speaker at Global Health Summit"
        ],
        coursesList: ["NEET UG Medical Excellence Program", "NCERT 3D Biology Masterclass"]
    },
    {
        id: "sophia-chen",
        name: "Prof. Sophia Chen",
        designation: "Director of Admissions & SAT Prep",
        department: "Business & SAT",
        expertise: "SAT Digital & Ivy Admissions",
        experience: 10, rating: 4.91, reviews: 310,
        students: "2,200+", courses: 6, papers: 20,
        badgeColor: "from-[#C8A24D] to-[#0B1E3D]",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
        bio: "Stanford Alumna & former Ivy League Admissions Officer. Guided 800+ international students into Harvard, Stanford, MIT, and Oxford.",
        achievements: [
            "Former Assistant Director of Admissions @ Ivy League",
            "98% Acceptance Rate for Top 20 Global Universities",
            "Helped Secure Over $15M+ in Merit Scholarships"
        ],
        coursesList: ["SAT Digital 1500+ Accelerator", "Ivy League College Application SOP Strategy"]
    },
    {
        id: "marcus-vance",
        name: "Marcus Vance",
        designation: "Professor of Quantitative Finance",
        department: "Business & SAT",
        expertise: "Valuation & Algo Trading",
        experience: 15, rating: 4.87, reviews: 290,
        students: "1,850+", courses: 5, papers: 18,
        badgeColor: "from-[#0B1E3D] to-[#C8A24D]",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        bio: "Ex-Goldman Sachs Senior Portfolio Manager. Teaches Python quantitative backtesting, DCF valuation modeling, and Wall Street analytics.",
        achievements: [
            "Managed $400M+ Quant Portfolio at Goldman Sachs",
            "Chartered Financial Analyst (CFA®) Charterholder",
            "Corporate Financial Advisor to Fortune 500 Companies"
        ],
        coursesList: ["Quantitative Finance & Financial Modeling", "Python for Algorithmic Trading"]
    },
    {
        id: "michael-chen",
        name: "Prof. Michael Chen",
        designation: "Chair of Mathematics & Applied Statistics",
        department: "Mathematics",
        expertise: "Calculus & Data Science",
        experience: 16, rating: 4.89, reviews: 450,
        students: "3,400+", courses: 9, papers: 47,
        badgeColor: "from-[#8C2F39] to-[#0B1E3D]",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        bio: "MIT Applied Math PhD specializing in statistical inference and machine learning algorithms. Renowned for clarifying complex mathematical concepts.",
        achievements: [
            "MIT Applied Mathematics PhD",
            "Ex-Principal Scientist @ IBM Research",
            "Recipient of National Teaching Excellence Award"
        ],
        coursesList: ["Advanced Integral Calculus & Linear Algebra", "Applied Statistics for Data Science"]
    }
];

const DEPARTMENTS = [
    { label: "All Departments", icon: <Globe className="w-3.5 h-3.5" /> },
    { label: "AI & Computer Science", icon: <Zap className="w-3.5 h-3.5" /> },
    { label: "Physics & JEE", icon: <Target className="w-3.5 h-3.5" /> },
    { label: "Medical & Biology", icon: <Award className="w-3.5 h-3.5" /> },
    { label: "Business & SAT", icon: <Briefcase className="w-3.5 h-3.5" /> },
    { label: "Mathematics", icon: <TrendingUp className="w-3.5 h-3.5" /> },
];


const FacultyModal = ({ faculty, onClose, onBookSession }) => {
    if (!faculty) return null;
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
                    <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
                        <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover object-top" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06142D] via-[#06142D]/40 to-transparent" />
                        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${faculty.badgeColor} shadow-lg`}>
                            {faculty.expertise}
                        </span>
                        <button onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-7 md:p-10">
                        <div className="grid md:grid-cols-12 gap-8 items-start mb-8">
                            <div className="md:col-span-4">
                                <div className="relative mb-5">
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] blur-md opacity-40" />
                                    <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-white/12">
                                        <img src={faculty.image} alt={faculty.name} className="w-full h-full object-cover object-top" />
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-bold text-[#E4C275] bg-[#0B1E3D]/80 border border-[#C8A24D]/30">
                                                {faculty.experience}+ Yrs Exp.
                                            </span>
                                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-xs font-bold text-white">
                                                <Star className="w-3 h-3 fill-[#C8A24D] text-[#C8A24D]" />
                                                {faculty.rating}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    {[
                                        { val: faculty.students, label: "Students", color: "text-[#E4C275]" },
                                        { val: faculty.papers, label: "Papers", color: "text-[#C8A24D]" },
                                        { val: faculty.courses, label: "Courses", color: "text-[#E4C275]" },
                                    ].map((s, i) => (
                                        <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/8">
                                            <p className={`text-lg font-black ${s.color}`}>{s.val}</p>
                                            <p className="text-[10px] text-white/35 mt-0.5">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-8">
                                <span className="text-xs font-black uppercase tracking-widest text-[#E4C275] mb-2 block">{faculty.department}</span>
                                <h2 className="text-3xl font-black text-white mb-1 leading-tight">{faculty.name}</h2>
                                <p className="text-sm font-bold text-[#C8A24D] mb-5">{faculty.designation}</p>
                                <p className="text-white/55 text-sm leading-relaxed mb-6">{faculty.bio}</p>
                                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-white/[0.04] border border-white/8">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C8A24D] text-[#C8A24D]" />)}
                                    </div>
                                    <span className="font-black text-white">{faculty.rating}</span>
                                    <span className="text-white/30 text-sm">({faculty.reviews.toLocaleString()} reviews)</span>
                                    <span className="ml-auto text-white/30 text-xs flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" /> {faculty.students} students
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#E4C275]" /> Career Milestones & Recognition
                                </h4>
                                <div className="space-y-2 mb-7">
                                    {faculty.achievements.map((ach, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-xs text-white/60">
                                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#C8A24D]/20 to-[#8C2F39]/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle className="w-3 h-3 text-[#E4C275]" />
                                            </div>
                                            {ach}
                                        </div>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,162,77,0.4)' }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => { onClose(); onBookSession(faculty); }}
                                    className="group w-full py-4 rounded-2xl font-black text-[#06142D] relative overflow-hidden bg-gradient-to-r from-[#C8A24D] via-[#E4C275] to-[#C8A24D] shadow-[0_8px_30px_rgba(200,162,77,0.25)] transition-all"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        <CalendarCheck className="w-4 h-4" /> Book 1-on-1 Mentorship Session
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                        <div className="border-t border-white/8 pt-7">
                            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-[#E4C275]" /> Programs & Courses Taught
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {faculty.coursesList.map((cName, idx) => (
                                    <motion.div key={idx} whileHover={{ x: 4 }}
                                        className="group/c flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-[#C8A24D]/30 transition-all text-sm cursor-pointer">
                                        <span className="text-white/70 font-semibold group-hover/c:text-white transition-colors">{cName}</span>
                                        <ExternalLink className="w-3.5 h-3.5 text-white/25 group-hover/c:text-[#E4C275] transition-colors flex-shrink-0" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};


const FacultyPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFacultyModal, setSelectedFacultyModal] = useState(null);
    const [toastNotice, setToastNotice] = useState(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

    const filteredFaculty = useMemo(() => FACULTY_MEMBERS.filter((f) => {
        const matchDept = selectedDepartment === "All Departments" || f.department === selectedDepartment;
        const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
            || f.expertise.toLowerCase().includes(searchQuery.toLowerCase())
            || f.bio.toLowerCase().includes(searchQuery.toLowerCase());
        return matchDept && matchSearch;
    }), [selectedDepartment, searchQuery]);

    const handleBookSession = (faculty) => {
        setToastNotice(`Mentorship slot requested with ${faculty.name}! Counsellor callback initiated.`);
        setTimeout(() => setToastNotice(null), 4500);
    };

    return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1D2433] antialiased overflow-x-hidden font-body">
            <AnimatePresence>
                {toastNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#0B1E3D] border border-[#C8A24D]/40 text-white text-sm font-semibold shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl max-w-sm"
                    >
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-sm leading-snug">{toastNotice}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            <section ref={heroRef} className="relative pt-24 pb-28 overflow-hidden bg-gradient-to-b from-[#06142D] via-[#0B1E3D] to-[#06142D]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
                <motion.div style={{ y: orbY1 }} className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full bg-[#C8A24D]/12 blur-[140px] pointer-events-none" />
                <motion.div style={{ y: orbY2 }} className="absolute bottom-10 right-10 w-[28rem] h-[28rem] rounded-full bg-[#8C2F39]/15 blur-[120px] pointer-events-none" />
                <FloatingOrb className="w-[200px] h-[200px] bg-[#E4C275]/8 blur-[60px] top-1/3 right-1/4" delay={2} />

                <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-4xl ">
                        

                        <motion.h1 variants={fadeInUp} className="mt-6 text-5xl sm:text-7xl font-black text-white leading-[1.0] tracking-tight">
                            Meet Our World-Class
                            <span className="block bg-gradient-to-r from-[#E4C275] via-[#f5d98a] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(228,194,117,0.3)]">
                                Distinguished Faculty
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="mt-6 text-lg text-white/55 max-w-2xl px-10 leading-relaxed">
                            Learn directly from IIT gold medalists, Ivy League scholars, AI research leaders, and Wall Street quantitative analysts dedicated to your success.
                        </motion.p>

                       
                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap px-10 gap-6">
                            {[
                                { label: "50+ Expert Faculty", icon: <GraduationCap className="w-4 h-4" /> },
                                { label: "12,000+ Mentored", icon: <Users className="w-4 h-4" /> },
                                { label: "150+ Research Papers", icon: <BookOpen className="w-4 h-4" /> },
                                { label: "4.95/5 Rating", icon: <Trophy className="w-4 h-4" /> },
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
            <section className="relative bg-gradient-to-b from-[#040e22] to-[#06142D] py-14 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { icon: <GraduationCap className="w-6 h-6" />, number: "50+", label: "Master Faculty Mentors", color: "from-[#C8A24D] to-[#8C2F39]" },
                            { icon: <Users className="w-6 h-6" />, number: "12,000+", label: "Students Mentored", color: "from-[#0B1E3D] to-[#1a3a6e]" },
                            { icon: <BookOpen className="w-6 h-6" />, number: "150+", label: "Published Research Papers", color: "from-[#8C2F39] to-[#C8A24D]" },
                            { icon: <Star className="w-6 h-6" />, number: "4.95/5", label: "Average Student Rating", color: "from-[#C8A24D] to-[#0B1E3D]" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[#C8A24D]/25 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {s.icon}
                                </div>
                                <p className="text-3xl font-black text-white">{s.number}</p>
                                <p className="text-white/40 text-xs mt-1 font-medium">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#0B1E3D]/8 shadow-[0_4px_30px_rgba(11,30,61,0.06)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 flex-nowrap">
                            {DEPARTMENTS.map((dept) => (
                                <motion.button
                                    key={dept.label}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedDepartment(dept.label)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${selectedDepartment === dept.label
                                        ? 'bg-[#0B1E3D] text-[#E4C275] shadow-[0_6px_20px_rgba(11,30,61,0.25)]'
                                        : 'bg-[#F7F3EA] text-slate-600 hover:bg-[#0B1E3D]/5 border border-[#0B1E3D]/8'
                                        }`}
                                >
                                    {dept.icon}
                                    {dept.label}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                            <Filter className="w-3.5 h-3.5" />
                            <span>{filteredFaculty.length} mentors</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-[#F7F3EA] to-[#FAFAF8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#0B1E3D]/8">
                        <div>
                            <p className="text-slate-500 text-sm">
                                Showing <span className="text-[#0B1E3D] font-black text-base">{filteredFaculty.length}</span> mentors in{" "}
                                <span className="text-[#8C2F39] font-bold">{selectedDepartment}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                            <Star className="w-3.5 h-3.5 fill-[#C8A24D] text-[#C8A24D]" />
                            Sorted by Highest Rated
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {filteredFaculty.length > 0 ? (
                            <motion.div
                                key={selectedDepartment + searchQuery}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
                            >
                                {filteredFaculty.map((faculty, i) => (
                                    <TiltCard key={faculty.id}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.08 }}
                                            className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(11,30,61,0.08)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.18)] transition-all duration-500 border border-[#0B1E3D]/5 flex flex-col"
                                        >
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={faculty.image}
                                                    alt={faculty.name}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/70 via-transparent to-transparent" />
                                                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${faculty.badgeColor} shadow-lg`}>
                                                    {faculty.expertise}
                                                </span>
                                                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-xs font-bold text-white">
                                                    <Star className="w-3 h-3 fill-[#C8A24D] text-[#C8A24D]" />
                                                    {faculty.rating}
                                                    <span className="text-white/40">({faculty.reviews})</span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold tracking-wide">
                                                    {faculty.experience}+ Yrs Exp.
                                                </div>
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <p className="text-[#8C2F39] text-xs font-bold uppercase tracking-widest mb-1">{faculty.department}</p>
                                                <h3 className="text-[#0B1E3D] font-black text-lg leading-snug mb-1 group-hover:text-[#8C2F39] transition-colors duration-300">
                                                    {faculty.name}
                                                </h3>
                                                <p className="text-[#C8A24D] text-xs font-bold mb-3">{faculty.designation}</p>
                                                <p className="text-slate-500 text-xs leading-relaxed mb-5 line-clamp-2">{faculty.bio}</p>
                                                <div className="flex items-center gap-5 py-4 border-y border-[#0B1E3D]/5 text-xs text-slate-500 mb-5">
                                                    <div className="flex items-center gap-1.5">
                                                        <GraduationCap className="w-3.5 h-3.5 text-[#8C2F39]" />
                                                        {faculty.students} Students
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <BookOpen className="w-3.5 h-3.5 text-[#C8A24D]" />
                                                        {faculty.papers} Papers
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Award className="w-3.5 h-3.5 text-[#8C2F39]" />
                                                        {faculty.courses} Courses
                                                    </div>
                                                </div>

                                                <div className="mt-auto grid grid-cols-2 gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => setSelectedFacultyModal(faculty)}
                                                        className="py-2.5 rounded-xl text-xs font-bold text-[#0B1E3D] bg-[#F7F3EA] border border-[#0B1E3D]/12 hover:bg-[#0B1E3D] hover:text-[#E4C275] hover:border-[#0B1E3D] transition-all duration-300"
                                                    >
                                                        View Profile
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        onClick={() => handleBookSession(faculty)}
                                                        className="group/btn relative overflow-hidden py-2.5 rounded-xl text-xs font-black text-[#06142D] bg-gradient-to-r from-[#C8A24D] to-[#E4C275] shadow-[0_4px_16px_rgba(200,162,77,0.25)] transition-all"
                                                    >
                                                        <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-400 skew-x-12" />
                                                        <span className="relative">Book Session</span>
                                                    </motion.button>
                                                </div>
                                            </div>

                                            <div className={`h-1 bg-gradient-to-r ${faculty.badgeColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        </motion.div>
                                    </TiltCard>
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
                                <p className="text-2xl font-black text-[#0B1E3D] mb-2">No faculty members found</p>
                                <p className="text-slate-400 text-sm mb-8">Try a different department or clear your search query.</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => { setSelectedDepartment("All Departments"); setSearchQuery(""); }}
                                    className="px-8 py-3 rounded-2xl bg-[#0B1E3D] text-[#E4C275] text-sm font-black shadow-lg"
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#E4C275] bg-[#C8A24D]/10 border border-[#C8A24D]/30 mb-6">
                                    <Sparkles className="w-3.5 h-3.5" /> Get Matched with Your Ideal Mentor Today
                                </span>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                                    Ready to Learn from
                                    <span className="block bg-gradient-to-r from-[#E4C275] via-[#f5d98a] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(228,194,117,0.25)]">
                                        World-Class Educators?
                                    </span>
                                </h2>

                                <p className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                                    Get matched with a dedicated academic mentor in your field. Experience 1-on-1 guidance that guarantees measurable growth.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(200,162,77,0.45)' }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setToastNotice("Mentorship consultation requested! Our lead academic counsellor will call you shortly.");
                                            setTimeout(() => setToastNotice(null), 4500);
                                        }}
                                        className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#C8A24D] via-[#E4C275] to-[#C8A24D] text-[#06142D] font-black text-base shadow-[0_12px_40px_rgba(200,162,77,0.35)] transition-all"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                        <span className="relative flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            Book Free Mentorship Session
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setSelectedDepartment("All Departments")}
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:border-white/40 bg-white/5 transition-all"
                                    >
                                        Browse All Faculty <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            {selectedFacultyModal && (
                <FacultyModal
                    faculty={selectedFacultyModal}
                    onClose={() => setSelectedFacultyModal(null)}
                    onBookSession={handleBookSession}
                />
            )}
        </div>
    );
};

export default FacultyPage;
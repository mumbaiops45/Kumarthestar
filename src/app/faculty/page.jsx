"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
    FaGraduationCap, FaChalkboardTeacher, FaAward, FaBook, FaLinkedinIn, FaTwitter, FaEnvelope, FaStar, FaArrowRight, FaSearch,
    FaTimes, FaCheckCircle, FaExternalLinkAlt, FaCalendarCheck, FaPhoneAlt
} from "react-icons/fa";


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


const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`perspective-1000 ${className}`}
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
        experience: 14,
        rating: 4.95,
        reviews: 342,
        students: "2,800+",
        courses: 8,
        papers: 54,
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
        expertise: "Quantum Mechanics & JEE Prep",
        experience: 18,
        rating: 4.98,
        reviews: 580,
        students: "4,500+",
        courses: 10,
        papers: 42,
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
        experience: 12,
        rating: 4.92,
        reviews: 410,
        students: "3,900+",
        courses: 7,
        papers: 38,
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
        experience: 10,
        rating: 4.91,
        reviews: 310,
        students: "2,200+",
        courses: 6,
        papers: 20,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80",
        bio: "Stanford Alumna & former Ivy League Admissions Officer. Guided over 800+ international students into Harvard, Stanford, MIT, and Oxford.",
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
        experience: 15,
        rating: 4.87,
        reviews: 290,
        students: "1,850+",
        courses: 5,
        papers: 18,
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
        experience: 16,
        rating: 4.89,
        reviews: 450,
        students: "3,400+",
        courses: 9,
        papers: 47,
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
    "All Departments",
    "AI & Computer Science",
    "Physics & JEE",
    "Medical & Biology",
    "Business & SAT",
    "Mathematics"
];


const FacultyModal = ({ faculty, onClose, onBookSession }) => {
    if (!faculty) return null;

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

                    <div className="grid md:grid-cols-12 gap-8 items-start mb-8">
                        <div className="md:col-span-4 relative">
                            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
                                <img
                                    src={faculty.image}
                                    alt={faculty.name}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F24] via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/30">
                                        {faculty.experience}+ Years Exp.
                                    </span>
                                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-black/60 px-2.5 py-1 rounded-full">
                                        <FaStar /> {faculty.rating}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3 mt-4">
                                <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                                    <FaLinkedinIn />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                                    <FaTwitter />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:bg-white/10 transition-colors">
                                    <FaEnvelope />
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-8">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold text-violet-300 bg-violet-950/60 border border-violet-500/30 mb-3">
                                {faculty.department}
                            </span>
                            <h2 className="text-3xl font-extrabold text-white mb-1">{faculty.name}</h2>
                            <p className="text-sm font-semibold text-cyan-400 mb-4">{faculty.designation}</p>

                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {faculty.bio}
                            </p>

                            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-center">
                                <div>
                                    <div className="text-xl font-bold text-white">{faculty.students}</div>
                                    <div className="text-[11px] text-slate-400">Students Taught</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-cyan-300">{faculty.papers}</div>
                                    <div className="text-[11px] text-slate-400">Research Papers</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-fuchsia-300">{faculty.courses}</div>
                                    <div className="text-[11px] text-slate-400">Active Courses</div>
                                </div>
                            </div>

                            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                <FaAward className="text-amber-400" /> Career Milestones & Recognition
                            </h4>
                            <div className="space-y-2 mb-6">
                                {faculty.achievements.map((ach, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                                        <FaCheckCircle className="text-emerald-400 shrink-0" />
                                        <span>{ach}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    onClose();
                                    onBookSession(faculty);
                                }}
                                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                <FaCalendarCheck /> Book 1-on-1 Mentorship Session
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <FaChalkboardTeacher className="text-cyan-400" /> Programs & Courses Taught
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {faculty.coursesList.map((cName, idx) => (
                                <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-slate-200">
                                    <span className="font-semibold">{cName}</span>
                                    <FaExternalLinkAlt className="text-slate-500 text-[10px]" />
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
    const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFacultyModal, setSelectedFacultyModal] = useState(null);
    const [toastNotice, setToastNotice] = useState(null);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

    const filteredFaculty = FACULTY_MEMBERS.filter((f) => {
        const matchesDept =
            selectedDepartment === "All Departments" || f.department === selectedDepartment;
        const matchesQuery =
            f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.bio.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDept && matchesQuery;
    });

    const handleBookSession = (faculty) => {
        setToastNotice(`Mentorship slot requested with ${faculty.name}! Counsellor callback initiated.`);
        setTimeout(() => setToastNotice(null), 4000);
    };

    return (
        <div className="min-h-screen  text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
            <Starfield />

            <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />

            <AnimatePresence>
                {toastNotice && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-sm font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-3"
                    >
                        <FaCheckCircle className="text-emerald-400 text-lg" />
                        {toastNotice}
                    </motion.div>
                )}
            </AnimatePresence>


            <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">
                <motion.div style={{ y: orbY1 }} className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-violet-700/20 to-fuchsia-600/20 blur-[130px] pointer-events-none" />
                <motion.div style={{ y: orbY2 }} className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-cyan-600/15 to-violet-800/15 blur-[120px] pointer-events-none" />

                <div className=" mx-auto px-10 max-w-7xl relative z-10 ">
                    <motion.div initial="hidden" animate="visible" variants={stagger}>
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 backdrop-blur-xl text-slate-900 mb-6">
                            <span>35 Top Faculty Mentors</span> Available Today
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight mb-6 max-w-4xl">
                            Meet Our World-Class <br />
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                                Distinguished Faculty
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-slate-900 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-normal">
                            Learn directly from IIT gold medalists, Ivy League scholars, AI research leaders, and Wall Street quantitative analysts dedicated to your success.
                        </motion.p>
                    </motion.div>


                </div>
            </section>

            <section className="py-12 bg-slate-950/60 border-y border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { icon: FaChalkboardTeacher, number: "50+", label: "Master Faculty Mentors" },
                            { icon: FaGraduationCap, number: "12,000+", label: "Students Mentored" },
                            { icon: FaBook, number: "150+", label: "Published Research Papers" },
                            { icon: FaAward, number: "4.95 / 5", label: "Average Student Rating" }
                        ].map((stat, i) => (
                            <div key={i} className="p-4">
                                <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-cyan-300 text-xl mx-auto mb-3">
                                    <stat.icon />
                                </div>
                                <div className="text-3xl font-extrabold text-white tracking-tight">{stat.number}</div>
                                <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="faculty-grid" className="py-24">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="mb-16">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-tight text-black">
                                Meet Our
                                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
                                    {" "}
                                    {selectedDepartment}
                                </span>
                                <br />
                                Faculty Members
                            </h2>

                            <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                                Learn from experienced educators, researchers, and industry experts
                                dedicated to academic excellence and student success.
                            </p>
                        </div>
                        <div className="mt-12 max-w-6xl mx-auto">
                            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 md:p-6 shadow-[0_20px_80px_rgba(0,0,0,.25)]">
                                <div className="flex flex-wrap justify-center gap-3">
                                    {DEPARTMENTS.map((dept) => (
                                        <button
                                            key={dept}
                                            onClick={() => setSelectedDepartment(dept)}
                                            className={`group relative overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${selectedDepartment === dept
                                                    ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                                                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-slate-400 hover:-translate-y-1"
                                                }`}
                                        >
                                            {selectedDepartment === dept && (
                                                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                            )}

                                            <span className="relative z-10">{dept}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {filteredFaculty.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredFaculty.map((faculty, index) => (
                                <TiltCard key={faculty.id} className="w-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group rounded-3xl bg-white/[0.03] border border-white/10 hover:border-violet-500/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative h-64 w-full overflow-hidden">
                                                <img
                                                    src={faculty.image}
                                                    alt={faculty.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#090C1E] via-transparent to-transparent opacity-90" />

                                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-md">
                                                    {faculty.expertise}
                                                </span>

                                                <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/70 border border-white/20 backdrop-blur-md flex items-center gap-1">
                                                    <FaStar className="text-amber-400" />
                                                    <span>{faculty.rating}</span>
                                                    <span className="text-slate-400">({faculty.reviews})</span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-black mb-1 group-hover:text-cyan-300 transition-colors">
                                                    {faculty.name}
                                                </h3>
                                                <p className="text-xs text-slate-800 font-medium mb-4">{faculty.designation}</p>

                                                <p className="text-slate-800 text-xs leading-relaxed mb-6 line-clamp-2">
                                                    {faculty.bio}
                                                </p>

                                                <div className="flex items-center gap-6 py-3 border-y border-white/5 text-xs text-slate-800">
                                                    <div className="flex items-center gap-1.5">
                                                        <FaGraduationCap className="text-cyan-400" />
                                                        <span>{faculty.students} Students</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <FaBook className="text-violet-400" />
                                                        <span>{faculty.papers} Papers</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 rounded-3xl bg-white/[0.02] border border-white/10">
                            <p className="text-xl font-bold text-white mb-2">No faculty members found</p>
                            <p className="text-slate-400 text-sm mb-6">Try selecting another department or clearing your search term.</p>
                            <button
                                onClick={() => {
                                    setSelectedDepartment("All Departments");
                                    setSearchQuery("");
                                }}
                                className="px-6 py-2 rounded-full bg-violet-600 text-white text-xs font-bold"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {selectedFacultyModal && (
                <FacultyModal
                    faculty={selectedFacultyModal}
                    onClose={() => setSelectedFacultyModal(null)}
                    onBookSession={handleBookSession}
                />
            )}


            <section className="py-28 relative overflow-hidden  border-t border-white/5">
                <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
                    <div className="relative rounded-3xl bg-gradient-to-r from-violet-950/90 via-[#0F132C] to-slate-950 border border-white/15 p-10 md:p-16 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-violet-600/30 via-fuchsia-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight relative z-10">
                            Ready to Learn from <br />
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                                World-Class Educators?
                            </span>
                        </h2>

                        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
                            Get matched with a dedicated academic mentor in your field. Experience 1-on-1 guidance that guarantees your growth.
                        </p>

                        <button
                            onClick={() => {
                                setToastNotice("Mentorship consultation requested! Our lead academic counsellor will call you shortly.");
                                setTimeout(() => setToastNotice(null), 4000);
                            }}
                            className="px-10 py-4 rounded-full font-bold text-white text-base bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:scale-[1.03] transition-all duration-300 inline-flex items-center gap-2 relative z-10"
                        >
                            <FaPhoneAlt className="text-xs" />
                            Book Free Mentorship Session
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Page;
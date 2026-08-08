"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {ArrowRight, Award, Briefcase, ChevronDown, ChevronUp, Globe, GraduationCap,Languages, Phone, School, Star, Users, Video, CheckCircle2, Sparkles, Quote,Search, Trophy, MapPin, Clock3, ShieldCheck, HeartHandshake, BookOpenCheck,Medal, Mic2, Zap, Target, ExternalLink} from 'lucide-react';


const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};


const heroSlides = [
    {
        img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=886&auto=format&fit=crop",
        headline: "Where Ambition",
        highlight: "Earns Its Rank",
        sub: "Structured coaching for NTSE, JEE, NEET, Olympiads and 50+ competitive exams — built on weekly mock tests, honest scorecards and mentors who've cleared the exam themselves."
    },
    {
        img: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=870&auto=format&fit=crop",
        headline: "Expert Faculty,",
        highlight: "Proven Results",
        sub: "200+ verified faculty members. 98% success rate. A decade of transforming student careers across 15+ countries."
    },
    {
        img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60",
        headline: "Learn Anywhere,",
        highlight: "Excel Everywhere",
        sub: "Hybrid by design — attend live, join online, or replay recordings. Your education, your schedule."
    },
];


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


const SectionBadge = ({ children, variant = 'gold' }) => {
    const variants = {
        gold: 'bg-gradient-to-r from-[#C8A24D]/15 to-[#E4C275]/10 text-[#8C2F39] border-[#C8A24D]/30',
        navy: 'bg-[#0B1E3D]/8 text-[#0B1E3D] border-[#0B1E3D]/20',
        red: 'bg-[#8C2F39]/10 text-[#8C2F39] border-[#8C2F39]/25',
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
    const [activeTab, setActiveTab] = useState('schooleducation');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState('');
    const [faqOpen, setFaqOpen] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4500);
        return () => clearInterval(t);
    }, []);

    const courses = [
        'JEE Main / Advanced', 'NEET UG / PG', 'NTSE', 'Olympiads',
        'CA Foundation', 'CS Executive', 'CMA', 'ACCA',
        'Spoken English', 'IELTS / TOEFL', 'German Language',
        'French Language', 'NDA', 'CLAT', 'MBA Entrance'
    ];

    const filteredCourses = useMemo(
        () => courses.filter(c => c.toLowerCase().includes(courseSearch.toLowerCase())),
        [courseSearch]
    );

    const stats = [
        { icon: <Users className="w-5 h-5" />, label: 'Students Mentored', value: 50000, suffix: '+' },
        { icon: <GraduationCap className="w-5 h-5" />, label: 'Expert Faculty', value: 200, suffix: '+' },
        { icon: <Trophy className="w-5 h-5" />, label: 'Success Rate', value: 98, suffix: '%' },
        { icon: <Globe className="w-5 h-5" />, label: 'Countries Reached', value: 15, suffix: '+' },
    ];

    const services = [
        { icon: <School />, title: 'Schools & Kindergarten', desc: 'Verified profiles, admission timelines, fee structures and honest parent reviews for K-12 schools.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop', accent: '#8C2F39' },
        { icon: <School />, title: 'Primary & Secondary Schools', desc: 'Discover top-rated K-12 schools with verified profiles, admission schedules, academic programmes.', tab: 'schooleducation', img: 'https://plus.unsplash.com/premium_photo-1690479510844-6385aa431b76?w=600&auto=format&fit=crop&q=60', accent: '#C8A24D' },
        { icon: <GraduationCap />, title: 'Grades 1–12 Coaching', desc: 'Foundation to board-exam coaching with stream selection support for Science, Commerce and Arts.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop', accent: '#0B1E3D' },
        { icon: <Briefcase />, title: 'CA / CS / CMA / ACCA', desc: 'Structured coaching for finance and accountancy certifications, taught by practicing professionals.', tab: 'professionalcertifications', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop', accent: '#8C2F39' },
        { icon: <BookOpenCheck />, title: 'Medical Entrance (NEET)', desc: 'NEET UG/PG batches with weekly full-length tests benchmarked against national percentile data.', tab: 'medicalcourses', img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=250&fit=crop', accent: '#C8A24D' },
        { icon: <Languages />, title: 'Spoken English & IELTS', desc: 'English proficiency and test-prep training built for students heading overseas.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop', accent: '#0B1E3D' },
        { icon: <Globe />, title: 'Foreign Languages', desc: 'German, French and Japanese instruction, from conversational to postgraduate proficiency.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop', accent: '#8C2F39' },
        { icon: <Video />, title: 'Online Hourly Classes', desc: 'Pay-per-hour tutoring with flexible scheduling — book a single doubt-clearing session or a full term.', tab: 'placementsupport', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop', accent: '#C8A24D' },
        { icon: <HeartHandshake />, title: 'Overseas Education Counselling', desc: 'End-to-end guidance on university shortlisting, visa documentation and scholarship applications.', tab: 'overseaseducation', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop', accent: '#0B1E3D' },
    ];

    const serviceTabs = [
        { key: 'schooleducation', label: 'School Education', icon: <School className="w-4 h-4" /> },
        { key: 'medicalcourses', label: 'Medical', icon: <BookOpenCheck className="w-4 h-4" /> },
        { key: 'professionalcertifications', label: 'Professional', icon: <Award className="w-4 h-4" /> },
        { key: 'overseaseducation', label: 'Overseas', icon: <Globe className="w-4 h-4" /> },
        { key: 'languagecourses', label: 'Languages', icon: <Languages className="w-4 h-4" /> },
        { key: 'placementsupport', label: 'Placement', icon: <Briefcase className="w-4 h-4" /> },
    ];

    const visibleServices = services.filter(s => s.tab === activeTab);

    const whyUs = [
        { icon: <Users />, title: "Faculty Who've Been There", desc: "Every mentor has cleared the exam they teach, or trained rank holders who have.", color: 'from-[#8C2F39] to-[#C8A24D]' },
        { icon: <Clock3 />, title: 'Weekly Mock Tests', desc: 'Full-length, negatively-marked mocks with All-India percentile comparison, every single week.', color: 'from-[#0B1E3D] to-[#1a3a6e]' },
        { icon: <Video />, title: 'Hybrid by Design', desc: 'Attend live in a classroom, join online, or replay a recorded session — your call, every day.', color: 'from-[#C8A24D] to-[#8C2F39]' },
        { icon: <ShieldCheck />, title: 'Transparent Progress Reports', desc: "Parents get a real scorecard after every test, not a vague 'doing well' update.", color: 'from-[#1a3a6e] to-[#8C2F39]' },
        { icon: <HeartHandshake />, title: 'Admission & Placement Desk', desc: 'From counselling on college choices to interview prep, we stay involved past the result day.', color: 'from-[#8C2F39] to-[#0B1E3D]' },
        { icon: <Mic2 />, title: 'Doubt-Solving on Demand', desc: 'A dedicated helpdesk that answers subject doubts within the same day, not the same week.', color: 'from-[#C8A24D] to-[#0B1E3D]' },
    ];

    const rankers = [
        { name: 'Priya Sharma', exam: 'JEE Advanced 2025', tag: 'AIR 412', score: '98.9 %ile', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
        { name: 'Rahul Verma', exam: 'NEET UG 2025', tag: 'AIR 876', score: '99.1 %ile', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
        { name: 'Ananya Reddy', exam: 'CA Foundation', tag: 'AIR 9', score: 'All India', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
        { name: 'Aditya Kulkarni', exam: 'NTSE Stage II', tag: 'State Topper', score: '100% Score', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
    ];

    const testimonials = [
        { name: 'Priya Sharma', course: 'JEE Advanced 2025', text: 'The coaching was exceptional. I improved from 60% to 95% in six months of structured mock tests. The faculty\'s dedication is unmatched.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', achievement: 'AIR 412' },
        { name: 'Rahul Verma', course: 'NEET UG', text: 'I got a rank under 1000 in NEET. The faculty and mock-test analysis were genuinely world-class. Every session pushed me to my limits.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', achievement: 'AIR 876' },
        { name: 'Ananya Reddy', course: 'CA Foundation', text: 'Cleared CA Foundation on the first attempt — the study material and weekend doubt sessions made all the difference. Truly premium education.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', achievement: 'All India Rank 9' },
        { name: 'Fatima Sheikh', course: 'IELTS & Overseas Counselling', text: 'From IELTS prep to my visa file, the counselling desk stayed with me till my offer letter arrived. Simply outstanding!', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face', achievement: 'IELTS 8.5 Band' },
    ];

    const faqs = [
        { question: 'What exams do you coach for?', answer: 'We cover 50+ exams including NTSE, JEE, NEET, Olympiads, CA, CS, CMA, NDA and CLAT. Check the Services section above for the full list, or ask our counsellors for anything not listed.' },
        { question: 'Do you offer online classes?', answer: 'Yes — every batch runs in a hybrid format. You can attend live in person, join the same class online, or catch up later with a recorded session.' },
        { question: 'How do I enroll in a course?', answer: 'Fill in the enquiry form below with your exam of interest. A counsellor calls you within 24 hours to plan your batch, schedule and fee structure.' },
        { question: 'What is the success rate of your students?', answer: 'Across our exam categories, students report a 98% success rate, with a meaningful share ranking in the national top 1000 each year.' },
        { question: 'Do you provide study materials and mock tests?', answer: 'Yes — comprehensive study material, weekly full-length mock tests with All-India percentile ranking, and previous years\' question papers are included in every course.' },
        { question: 'Can I switch batches or exams after enrolling?', answer: 'Yes, within the first two weeks of a term you can switch batch timing or, in consultation with a counsellor, move between related exam tracks at no extra cost.' },
        { question: 'Do you help with admissions after the results?', answer: 'Our admission desk assists with college shortlisting, document verification and interview preparation once your results are out — this is included, not a separate service.' },
    ];

    const examTicker = ['NTSE', 'NSO', 'IMO', 'NSE', 'NSTSE', 'IEO', 'NCO', 'GK10', 'POLYCET', 'NDA', 'OLYMPIADS', 'ITI', 'AISSEE', 'JEE', 'NEET', 'KVPY', 'INO', 'SAT', 'ASSET', 'JNUST', 'NBO', 'IAS/KAS', 'IMOTC', 'IOITC', 'IPMAT', 'GMAT', 'GRE', 'AIMS', 'JIPMER', 'FMGE', 'SLAT', 'CA', 'CS', 'BBA', 'MBA', 'CLAT', 'NLSAT'];

    return (
        <div className="font-body antialiased text-[#1D2433] overflow-x-hidden">
            <section className="relative min-h-screen flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, ease: 'easeInOut' }}
                    >
                        <img src={heroSlides[currentSlide].img} alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#030d1e]/95 via-[#030d1e]/70 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030d1e]/90 via-transparent to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <FloatingOrb className="w-[600px] h-[600px] bg-[#C8A24D]/12 blur-[130px] top-[-100px] left-[-100px]" delay={0} />
                <FloatingOrb className="w-[400px] h-[400px] bg-[#8C2F39]/15 blur-[100px] bottom-0 right-[10%]" delay={3} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
                            <motion.div variants={fadeInUp}>
                                <SectionBadge variant="white">
                                    <Sparkles className="w-3.5 h-3.5 text-[#E4C275]" />
                                    A Trusted Name in Competitive Exam Coaching
                                </SectionBadge>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h1 className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight text-white">
                                        {heroSlides[currentSlide].headline}
                                        <br />
                                        <span className="bg-gradient-to-r from-[#E4C275] via-[#f7e0a0] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(228,194,117,0.4)]">
                                            {heroSlides[currentSlide].highlight}
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                                        {heroSlides[currentSlide].sub}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(200,162,77,0.5)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group relative overflow-hidden bg-gradient-to-r from-[#C8A24D] to-[#E4C275] text-[#06142D] px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-2 shadow-[0_8px_30px_rgba(200,162,77,0.35)]"
                                >
                                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                    Explore Courses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white border border-white/20 hover:border-white/50 backdrop-blur-sm bg-white/5 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-[#C8A24D]/30 transition">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    Free Counselling
                                </motion.button>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-2">
                                {heroSlides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-10 bg-[#E4C275]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#C8A24D]/30 to-[#8C2F39]/20 rounded-3xl blur-2xl" />
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/[0.06] shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">Live Metrics</p>
                                            <p className="text-white text-xl font-bold mt-0.5">Result Dashboard</p>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] flex items-center justify-center shadow-lg"
                                        >
                                            <Medal className="w-7 h-7 text-white" />
                                        </motion.div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.map((s, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ scale: 1.03, y: -2 }}
                                                className="group relative p-4 rounded-2xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.09] transition-all overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A24D]/5 to-[#8C2F39]/5 opacity-0 group-hover:opacity-100 transition" />
                                                <div className="relative">
                                                    <div className="text-[#E4C275] mb-2">{s.icon}</div>
                                                    <p className="text-3xl font-black text-white tabular-nums">
                                                        <CountUp value={s.value} suffix={s.suffix} />
                                                    </p>
                                                    <p className="text-white/45 text-xs mt-1 font-medium">{s.label}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <p className="text-white/40 text-xs">Updated in real-time · 2025 batch data</p>
                                    </div>
                                </div>
                            </div>
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
                            className="w-1.5 h-1.5 bg-[#E4C275] rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            <section className="py-5 bg-[#06142D] border-y border-[#C8A24D]/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#06142D] via-transparent to-[#06142D] z-10 pointer-events-none" />
                <motion.div
                    animate={{ x: [0, '-50%'] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    className="flex gap-6 whitespace-nowrap"
                >
                    {[...examTicker, ...examTicker].map((exam, i) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#0B1E3D] to-[#112448] text-[#E4C275] rounded-full text-xs font-bold border border-[#C8A24D]/25 shadow-[0_0_12px_rgba(200,162,77,0.1)] tracking-wider"
                        >
                            <Star className="w-2.5 h-2.5 fill-current opacity-60" />
                            {exam}
                        </span>
                    ))}
                </motion.div>
            </section>

            <section className="py-14 bg-gradient-to-r from-[#0B1E3D] via-[#112448] to-[#0B1E3D] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true }}
                        variants={stagger}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeInUp} whileHover={{ y: -6 }} className="group relative">
                                <div className="relative p-6 rounded-2xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.08] transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#C8A24D]/5 to-[#8C2F39]/5 opacity-0 group-hover:opacity-100 transition" />
                                    <div className="relative">
                                        <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#C8A24D]/20 to-[#8C2F39]/20 flex items-center justify-center text-[#E4C275]">{s.icon}</div>
                                        <p className="text-4xl md:text-5xl font-black text-[#E4C275] tabular-nums"><CountUp value={s.value} suffix={s.suffix} /></p>
                                        <p className="text-white/50 text-sm mt-1 font-medium">{s.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#C8A24D]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#8C2F39]/6 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                        variants={stagger}
                        className="grid lg:grid-cols-2 gap-20 items-center"
                    >
                        <motion.div variants={fadeInLeft}>
                            <SectionBadge variant="red">About Us</SectionBadge>
                            <h2 className="mt-6 text-5xl md:text-6xl font-black leading-[1.05] text-[#0B1E3D] tracking-tight">
                                Built For Every Stage
                                <span className="block bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] bg-clip-text text-transparent">Of The Exam Journey</span>
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-slate-500 max-w-lg">
                                From kindergarten admissions to professional certifications, we bridge the gap between where a student is today and where their ambition can take them tomorrow.
                            </p>
                            <div className="mt-10 space-y-4">
                                {[
                                    { label: "50+ competitive exams covered end to end", icon: <Target className="w-4 h-4" /> },
                                    { label: "200+ faculty verified for subject expertise", icon: <GraduationCap className="w-4 h-4" /> },
                                    { label: "98% student success rate across cohorts", icon: <Trophy className="w-4 h-4" /> },
                                    { label: "Students learning from 15+ countries", icon: <Globe className="w-4 h-4" /> },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.12 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 8 }}
                                        className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default border border-transparent hover:border-[#C8A24D]/15"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8C2F39]/10 to-[#C8A24D]/10 flex items-center justify-center text-[#8C2F39] group-hover:from-[#8C2F39] group-hover:to-[#C8A24D] group-hover:text-white transition-all duration-300 flex-shrink-0 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <span className="text-slate-700 font-semibold">{item.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(140,47,57,0.25)' }}
                                whileTap={{ scale: 0.97 }}
                                className="mt-10 inline-flex items-center gap-2 bg-[#8C2F39] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#a33545] transition-all"
                            >
                                Our Story <ExternalLink className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        <motion.div variants={fadeInRight} className="relative">
                            <div className="absolute -inset-6 bg-gradient-to-r from-[#C8A24D]/15 to-[#8C2F39]/10 rounded-[3rem] blur-2xl" />
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(11,30,61,0.2)] border border-white"
                            >
                                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=700&fit=crop" alt="Students learning" className="w-full h-[560px] object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/85 via-[#0B1E3D]/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-5xl font-black text-white">10+ Years</p>
                                    <p className="text-white/70 text-lg mt-1">Transforming Student Careers</p>
                                    <div className="mt-4 flex gap-3">
                                        {['JEE', 'NEET', 'CA', 'NDA', 'IELTS'].map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold border border-white/20">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#C8A24D]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] rounded-xl flex items-center justify-center"><Trophy className="w-6 h-6 text-white" /></div>
                                    <div><p className="font-black text-[#0B1E3D] text-xl">98%</p><p className="text-slate-500 text-xs font-medium">Success Rate</p></div>
                                </div>
                            </motion.div>
                            <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#C8A24D]/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#0B1E3D] to-[#1a3a6e] rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-[#E4C275]" /></div>
                                    <div><p className="font-black text-[#0B1E3D] text-xl">50K+</p><p className="text-slate-500 text-xs font-medium">Students Mentored</p></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <section className="py-24 bg-gradient-to-b from-[#F0EBE0] to-[#F7F3EA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}><SectionBadge variant="navy">Our Services</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            A Complete Education{' '}
                            <span className="bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] bg-clip-text text-transparent">Ecosystem</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
                            Every exam, every stage — expertly designed programs that move students from preparation to podium.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-wrap justify-center gap-3 mb-12">
                        {serviceTabs.map((tab) => (
                            <motion.button
                                key={tab.key}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(tab.key)}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === tab.key
                                    ? 'bg-[#0B1E3D] text-[#E4C275] shadow-[0_8px_24px_rgba(11,30,61,0.3)]'
                                    : 'bg-white/80 text-slate-600 hover:bg-white hover:shadow-lg border border-[#0B1E3D]/8'
                                    }`}
                            >
                                {tab.icon}{tab.label}
                            </motion.button>
                        ))}
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {(visibleServices.length ? visibleServices : services).map((service, i) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -12 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(11,30,61,0.08)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.18)] transition-all duration-500 border border-[#0B1E3D]/5 cursor-pointer"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)` }}>
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-black text-[#0B1E3D] text-lg mb-2 group-hover:text-[#8C2F39] transition-colors">{service.title}</h4>
                                        <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                                        <div className="mt-5 flex items-center gap-1 text-[#C8A24D] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            Learn more <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-[#FAFAF8]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,77,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(140,47,57,0.06),transparent_60%)]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}><SectionBadge variant="gold">Why Choose Us</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            What Actually{' '}
                            <span className="bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] bg-clip-text text-transparent">Moves a Rank</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
                            A powerful combination of expert mentors, personalised learning and proven strategies.
                        </motion.p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyUs.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
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
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#040e22] via-[#06142D] to-[#040e22] text-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <FloatingOrb className="w-[600px] h-[600px] bg-[#C8A24D]/8 blur-[160px] top-0 left-0" delay={0} />
                <FloatingOrb className="w-[500px] h-[500px] bg-[#8C2F39]/10 blur-[140px] bottom-0 right-0" delay={4} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-20">
                        <motion.div variants={fadeInUp}><SectionBadge variant="white"><Trophy className="w-3.5 h-3.5 text-[#E4C275]" />Wall of Rankers</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-5xl md:text-7xl font-black leading-tight tracking-tight">
                            Meet Our{' '}
                            <span className="bg-gradient-to-r from-[#E4C275] via-[#f5d98a] to-[#C8A24D] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(228,194,117,0.3)]">Top Rankers</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-4 max-w-2xl mx-auto text-white/50 text-lg">
                            Celebrating exceptional achievements — dedication transformed into remarkable success.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rankers.map((r, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -14, scale: 1.03 }}
                                transition={{ duration: 0.4 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-[#E4C275]/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(228,194,117,0.1)] transition-all duration-500"
                            >
                                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                                <div className="absolute top-5 right-5">
                                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#E4C275] to-[#C8A24D] text-[#06142D] text-xs font-black shadow-lg">{r.tag}</span>
                                </div>
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E4C275] to-[#C8A24D] blur-sm opacity-60 group-hover:opacity-100 transition" />
                                        <img src={r.img} alt={r.name} className="relative w-24 h-24 rounded-full object-cover border-2 border-[#E4C275] shadow-[0_0_30px_rgba(228,194,117,0.4)]" />
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-lg font-black tracking-wide">{r.name}</h3>
                                    <p className="text-white/45 text-sm mt-1">{r.exam}</p>
                                    <div className="mt-4 py-2 px-4 rounded-2xl bg-gradient-to-r from-[#C8A24D]/15 to-[#E4C275]/10 border border-[#C8A24D]/20">
                                        <p className="text-[#E4C275] text-sm font-bold">{r.score}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(228,194,117,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#E4C275] to-[#C8A24D] text-[#06142D] font-black text-base shadow-[0_20px_40px_rgba(200,162,77,0.3)] transition-all"
                        >
                            View All Rankers <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>


            <section className="py-24 bg-[#F7F3EA] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}><SectionBadge variant="red">Testimonials</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-5 text-4xl md:text-5xl font-black text-[#0B1E3D] tracking-tight">
                            What Our Students{' '}
                            <span className="bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] bg-clip-text text-transparent">Say</span>
                        </motion.h2>
                        <GlowLine />
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto mb-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="relative bg-white rounded-3xl p-10 md:p-14 shadow-[0_20px_80px_rgba(11,30,61,0.12)] border border-[#C8A24D]/15 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#C8A24D]/10 to-transparent rounded-br-full" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#8C2F39]/8 to-transparent rounded-tl-full" />
                                <Quote className="w-12 h-12 text-[#C8A24D]/25 mb-6" />
                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed italic font-medium">"{testimonials[activeTestimonial].text}"</p>
                                <div className="mt-8 flex items-center gap-5">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] blur-sm" />
                                        <img src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].name} className="relative w-16 h-16 rounded-full object-cover border-2 border-white" />
                                    </div>
                                    <div>
                                        <p className="font-black text-[#0B1E3D] text-lg">{testimonials[activeTestimonial].name}</p>
                                        <p className="text-[#8C2F39] text-sm font-semibold">{testimonials[activeTestimonial].course}</p>
                                        <div className="flex gap-1 mt-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C8A24D] text-[#C8A24D]" />)}</div>
                                    </div>
                                    <div className="ml-auto px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0B1E3D] to-[#1a3a6e] text-[#E4C275] text-sm font-black">{testimonials[activeTestimonial].achievement}</div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center gap-2 mt-6">
                            {testimonials.map((_, i) => (
                                <button key={i} onClick={() => setActiveTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-10 bg-[#C8A24D]' : 'w-2 bg-[#C8A24D]/30 hover:bg-[#C8A24D]/60'}`} />
                            ))}
                        </div>
                    </div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -6 }}
                                onClick={() => setActiveTestimonial(i)}
                                className={`group p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${i === activeTestimonial ? 'bg-[#0B1E3D] border-[#C8A24D]/40 shadow-xl' : 'bg-white border-[#0B1E3D]/8 hover:shadow-lg hover:border-[#C8A24D]/25'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#C8A24D]/40 flex-shrink-0" />
                                    <div>
                                        <p className={`font-bold text-sm ${i === activeTestimonial ? 'text-white' : 'text-[#0B1E3D]'}`}>{t.name}</p>
                                        <p className={`text-xs ${i === activeTestimonial ? 'text-[#E4C275]' : 'text-[#8C2F39]'}`}>{t.achievement}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mt-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-[#C8A24D] text-[#C8A24D]" />)}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-16 bg-white border-y border-[#0B1E3D]/8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0B1E3D]/5 text-[#8C2F39] rounded-full text-xs font-bold uppercase tracking-widest mb-5 border border-[#8C2F39]/20">
                            <MapPin className="w-3.5 h-3.5" /> Learning Centres
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-black text-[#0B1E3D] mb-8">
                            Classrooms Across Maharashtra, Plus Fully Online
                        </motion.h2>
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
                            {['Thane', 'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Online — Nationwide'].map((city, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.06, y: -3 }}
                                    className="px-6 py-2.5 rounded-2xl bg-[#F7F3EA] border border-[#0B1E3D]/10 text-slate-700 text-sm font-bold hover:bg-[#0B1E3D] hover:text-[#E4C275] hover:border-[#0B1E3D] transition-all duration-300 cursor-default shadow-sm"
                                >
                                    {city}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#F0EBE0] to-[#FAFAF8]">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#C8A24D]/10 blur-[160px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#8C2F39]/8 blur-[160px] pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.div variants={fadeInUp}><SectionBadge variant="gold">FAQ</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-4xl md:text-6xl font-black text-[#0B1E3D] tracking-tight leading-tight">
                            Everything You Need
                            <br />
                            <span className="bg-gradient-to-r from-[#8C2F39] via-[#C8A24D] to-[#8C2F39] bg-clip-text text-transparent">To Know Before Joining</span>
                        </motion.h2>
                        <GlowLine />
                        <motion.p variants={fadeInUp} className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg">
                            Find answers about courses, exams, teaching methods, fees and everything related to your preparation journey.
                        </motion.p>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className={`group rounded-3xl border transition-all duration-400 overflow-hidden ${faqOpen === i ? 'bg-white border-[#C8A24D]/40 shadow-[0_20px_60px_rgba(11,30,61,0.12)]' : 'bg-white/60 border-[#0B1E3D]/8 hover:bg-white hover:shadow-lg hover:border-[#C8A24D]/20'}`}
                            >
                                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center gap-5 p-6 md:p-7 text-left">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${faqOpen === i ? 'bg-gradient-to-br from-[#C8A24D] to-[#8C2F39] text-white shadow-lg' : 'bg-[#0B1E3D]/8 text-[#0B1E3D]'}`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <span className="flex-1 text-[#0B1E3D] font-bold text-base md:text-lg text-left">{faq.question}</span>
                                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${faqOpen === i ? 'bg-[#8C2F39]/10 rotate-180' : 'bg-[#0B1E3D]/5'}`}>
                                        <ChevronDown className="w-4 h-4 text-[#8C2F39]" />
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
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="relative py-28 overflow-hidden bg-gradient-to-br from-[#06142D] via-[#0B1E3D] to-[#06142D] text-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,162,77,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(200,162,77,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
                <FloatingOrb className="w-[600px] h-[600px] bg-[#C8A24D]/10 blur-[180px] -top-40 -left-40" delay={0} />
                <FloatingOrb className="w-[500px] h-[500px] bg-[#8C2F39]/10 blur-[160px] -bottom-40 -right-40" delay={3} />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
                        <motion.div variants={fadeInUp}><SectionBadge variant="white">Get Started</SectionBadge></motion.div>
                        <motion.h2 variants={fadeInUp} className="mt-6 text-4xl md:text-5xl font-black tracking-tight">
                            Request a Free
                            <span className="block bg-gradient-to-r from-[#E4C275] to-[#C8A24D] bg-clip-text text-transparent">Consultation</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="mt-4 text-white/50 text-lg max-w-xl mx-auto">Fill in your details and a counsellor will reach out within 24 hours.</motion.p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
                        <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#C8A24D]/30 via-[#8C2F39]/20 to-[#C8A24D]/30 blur-sm" />
                        <div className="relative bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Full Name *</label>
                                    <input type="text" placeholder="Enter your full name" className="w-full bg-white/6 border border-white/12 rounded-2xl px-5 py-3.5 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#C8A24D]/60 focus:border-[#C8A24D]/50 transition-all hover:border-white/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Email Address *</label>
                                    <input type="email" placeholder="you@example.com" className="w-full bg-white/6 border border-white/12 rounded-2xl px-5 py-3.5 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#C8A24D]/60 focus:border-[#C8A24D]/50 transition-all hover:border-white/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Phone Number *</label>
                                    <input type="tel" placeholder="+91 98765 43210" className="w-full bg-white/6 border border-white/12 rounded-2xl px-5 py-3.5 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#C8A24D]/60 focus:border-[#C8A24D]/50 transition-all hover:border-white/20" />
                                </div>
                                <div className="space-y-2 relative">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Exam / Course Interest</label>
                                    <div onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)} className="w-full bg-white/6 border border-white/12 rounded-2xl px-5 py-3.5 text-white flex items-center justify-between cursor-pointer hover:border-white/20 transition-all">
                                        <span className={selectedCourse ? 'text-white' : 'text-white/25'}>{selectedCourse || 'Select a course'}</span>
                                        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isCourseDropdownOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {isCourseDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute z-20 w-full mt-2 bg-[#0F2340] border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-h-60 overflow-hidden"
                                            >
                                                <div className="p-3 sticky top-0 bg-[#0F2340] border-b border-white/8">
                                                    <div className="flex items-center gap-2 bg-white/8 rounded-xl px-3 py-2 border border-white/10">
                                                        <Search className="w-4 h-4 text-white/30" />
                                                        <input type="text" value={courseSearch} onChange={e => setCourseSearch(e.target.value)} placeholder="Search courses..." className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-white/25" />
                                                    </div>
                                                </div>
                                                <div className="p-2 max-h-44 overflow-y-auto">
                                                    {filteredCourses.length ? filteredCourses.map(course => (
                                                        <div key={course} onClick={() => { setSelectedCourse(course); setIsCourseDropdownOpen(false); setCourseSearch(''); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition text-sm text-white/80 hover:text-white">
                                                            <GraduationCap className="w-4 h-4 text-[#E4C275]" />{course}
                                                        </div>
                                                    )) : (
                                                        <p className="px-4 py-4 text-sm text-white/30 text-center">No matching course found.</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest">Message</label>
                                    <textarea rows={4} placeholder="Tell us about your goals, the exam you're targeting, and your current preparation level..." className="w-full bg-white/6 border border-white/12 rounded-2xl px-5 py-3.5 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-[#C8A24D]/60 focus:border-[#C8A24D]/50 transition-all hover:border-white/20 resize-none" />
                                </div>
                                <div className="md:col-span-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(200,162,77,0.4)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group w-full relative overflow-hidden bg-gradient-to-r from-[#C8A24D] via-[#E4C275] to-[#C8A24D] text-[#06142D] font-black py-4 rounded-2xl text-base flex items-center justify-center gap-3 shadow-[0_12px_40px_rgba(200,162,77,0.3)] transition-all"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                        <span className="relative flex items-center gap-2">
                                            <Zap className="w-5 h-5" />
                                            Send Enquiry — Get a Call in 24 Hours
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                    <p className="text-center text-white/25 text-xs mt-3 font-medium">No spam. No hard-sell. Just an honest conversation about your goals.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;

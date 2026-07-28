"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Award, Briefcase, ChevronDown, ChevronUp, Globe, GraduationCap, Languages, Phone, School, Star, Users, Video, CheckCircle2, Sparkles, Quote, Search, Trophy, MapPin, Clock3, ShieldCheck, HeartHandshake, BookOpenCheck, Medal, Mic2 } from 'lucide-react';


const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const heroImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZSUyMHN0dWRlbnRzfGVufDB8fDB8fHww",
]


const CountUp = ({ value, suffix = '', duration = 1.6 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let raf;
        const start = performance.now();
        const from = 0;
        const tick = (now) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(from + (value - from) * eased));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value, duration]);

    return <span ref={ref} className="font-mono-stat">{count}{suffix}</span>;
};


const Home = () => {
    const [activeTab, setActiveTab] = useState('schooleducation');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState('');
    const [faqOpen, setFaqOpen] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
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
        { icon: <Users className="w-6 h-6" />, label: 'Students Mentored', value: 50000, suffix: '+' },
        { icon: <GraduationCap className="w-6 h-6" />, label: 'Expert Faculty', value: 200, suffix: '+' },
        { icon: <Trophy className="w-6 h-6" />, label: 'Success Rate', value: 98, suffix: '%' },
        { icon: <Globe className="w-6 h-6" />, label: 'Countries Reached', value: 15, suffix: '+' },
    ];

    const services = [
        { icon: <School />, title: 'Schools & Kindergarten', desc: 'Verified profiles, admission timelines, fee structures and honest parent reviews for K-12 schools.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop' },
        {
            icon: <School />,
            title: 'Primary & Secondary Schools',
            desc: 'Discover top-rated K-12 schools with verified profiles, admission schedules, academic programmes',
            tab: 'schooleducation',
            img: 'https://plus.unsplash.com/premium_photo-1690479510844-6385aa431b76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpbWFyeSUyMHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D'
        },
        { icon: <GraduationCap />, title: 'Grades 1–12 Coaching', desc: 'Foundation to board-exam coaching with stream selection support for Science, Commerce and Arts.', tab: 'schooleducation', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop' },
        { icon: <Briefcase />, title: 'CA / CS / CMA / ACCA', desc: 'Structured coaching for finance and accountancy certifications, taught by practicing professionals.', tab: 'professionalcertifications', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop' },
        { icon: <BookOpenCheck />, title: 'Medical Entrance (NEET)', desc: 'NEET UG/PG batches with weekly full-length tests benchmarked against national percentile data.', tab: 'medicalcourses', img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=400&h=250&fit=crop' },
        { icon: <Languages />, title: 'Spoken English & IELTS', desc: 'English proficiency and test-prep training built for students heading overseas.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=250&fit=crop' },
        { icon: <Globe />, title: 'Foreign Languages', desc: 'German, French and Japanese instruction, from conversational to postgraduate proficiency.', tab: 'languagecourses', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop' },
        { icon: <Video />, title: 'Online Hourly Classes', desc: 'Pay-per-hour tutoring with flexible scheduling — book a single doubt-clearing session or a full term.', tab: 'placementsupport', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop' },
        { icon: <HeartHandshake />, title: 'Overseas Education Counselling', desc: 'End-to-end guidance on university shortlisting, visa documentation and scholarship applications.', tab: 'overseaseducation', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop' },
    ];

    const serviceTabs = [
        { key: 'schooleducation', label: 'School Education' },
        { key: 'medicalcourses', label: 'Medical Courses' },
        { key: 'professionalcertifications', label: 'Professional Certifications' },
        { key: 'overseaseducation', label: 'Overseas Education' },
        { key: 'languagecourses', label: 'Language Courses' },
        { key: 'placementsupport', label: 'Placement Support' },
    ];

    const visibleServices = services.filter(s => s.tab === activeTab);

    const whyUs = [
        { icon: <Users />, title: "Faculty Who've Been There", desc: 'Every mentor has cleared the exam they teach, or trained rank holders who have.' },
        { icon: <Clock3 />, title: 'Weekly Mock Tests', desc: 'Full-length, negatively-marked mocks with All-India percentile comparison, every single week.' },
        { icon: <Video />, title: 'Hybrid by Design', desc: 'Attend live in a classroom, join online, or replay a recorded session — your call, every day.' },
        { icon: <ShieldCheck />, title: 'Transparent Progress Reports', desc: 'Parents get a real scorecard after every test, not a vague "doing well" update.' },
        { icon: <HeartHandshake />, title: 'Admission & Placement Desk', desc: 'From counselling on college choices to interview prep, we stay involved past the result day.' },
        { icon: <Mic2 />, title: 'Doubt-Solving on Demand', desc: 'A dedicated helpdesk that answers subject doubts within the same day, not the same week.' },
    ];

    const rankers = [
        { name: 'Priya Sharma', exam: 'JEE Advanced 2025', tag: 'AIR 412', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
        { name: 'Rahul Verma', exam: 'NEET UG 2025', tag: 'AIR 876', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        { name: 'Ananya Reddy', exam: 'CA Foundation', tag: 'All-India Rank 9', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
        { name: 'Aditya Kulkarni', exam: 'NTSE Stage II', tag: 'State Topper', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
    ];

    const testimonials = [
        { name: 'Priya Sharma', course: 'JEE Advanced 2025', text: 'The coaching was exceptional. I improved from 60% to 95% in six months of structured mock tests.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
        { name: 'Rahul Verma', course: 'NEET UG', text: 'I got a rank under 1000 in NEET. The faculty and mock-test analysis were genuinely world-class.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        { name: 'Ananya Reddy', course: 'CA Foundation', text: 'Cleared CA Foundation on the first attempt — the study material and weekend doubt sessions made the difference.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
        { name: 'Fatima Sheikh', course: 'IELTS & Overseas Counselling', text: 'From my IELTS prep to my visa file, the counselling desk stayed with me till my offer letter arrived.', rating: 5, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
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

    return (
        <>
            <div className=" font-body antialiased  text-[#1D2433]">
                <section className='relative overflow-hidden min-h-screen flex items-center '>
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={heroImages[currentImage]}
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2 }}
                            className='absolute inset-0 w-full h-full object-cover'
                        />
                    </AnimatePresence>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 80, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-[#C8A24D]/20 blur-[140px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -80, 0],
                            y: [0, -40, 0],
                        }}
                        transition={{
                            duration: 24,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8C2F39]/20 blur-[170px]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,.45)_100%)]" />


                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
                        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-[#C8A24D]/40">
                                    <Sparkles className="w-4 h-4 text-[#C8A24D]" />
                                    A Trusted Name in Competitive Exam Coaching
                                </motion.span>
                                <h1 className="font-display text-4xl md:text-6xl lg:text-6xl font-semibold leading-[1.05]">
                                    Where Ambition <br />
                                    <span className="bg-gradient-to-r from-[#E4C275] via-[#C8A24D] to-[#E4C275] bg-clip-text text-transparent ">
                                        Earns Its Rank
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-900 max-w-lg">
                                    Structured coaching for NTSE, JEE, NEET, Olympiads and 50+ competitive exams — built on weekly mock tests, honest scorecards and mentors who've cleared the exam themselves.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#C8A24D] text-[#0B1E3D] px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-[#C8A24D]/30 transition-all duration-300 flex items-center gap-2">
                                        Explore Courses <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#C8A24D] text-[#0B1E3D] px-8 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-[#C8A24D]/30 transition-all duration-300 flex items-center gap-2">
                                        <Phone className="w-5 h-5" /> Book Free Counselling
                                    </motion.button>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="relative hidden md:block">
                                <motion.div
                                    whileHover={{ rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative bg-[#FBF8F1] text-[#1D2433] rounded-2xl p-8 border-2 border-[#C8A24D]/60 shadow-2xl"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 8, 0, -8, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-[#8C2F39] text-[#F7F3EA] flex items-center justify-center border-4 border-[#FBF8F1] shadow-lg"
                                    >
                                        <Medal className="w-7 h-7" />
                                    </motion.div>
                                    <div className="flex items-center justify-between border-b border-dashed border-[#C8A24D]/50 pb-3 mb-4">
                                        <span className="font-display text-lg font-semibold text-[#0B1E3D]">Result Card</span>
                                        <span className="text-xs uppercase tracking-wider text-[#8C2F39] font-semibold">Live Metrics</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.map((stat, i) => (
                                            <motion.div key={i} whileHover={{ y: -3 }} className="bg-[#F7F3EA] rounded-xl p-4 text-center border border-[#0B1E3D]/5">
                                                <div className="text-[#8C2F39] flex justify-center mb-1">{stat.icon}</div>
                                                <p className="text-2xl font-bold text-[#0B1E3D]"><CountUp value={stat.value} suffix={stat.suffix} /></p>
                                                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>



                <section className="py-6 bg-[#FBF8F1] border-y border-[#0B1E3D]/10 overflow-hidden">
                    <motion.div animate={{ x: [0, -1920] }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }} className="flex gap-8 whitespace-nowrap">
                        {[...Array(2)].map((_, idx) => (
                            <div key={idx} className="flex gap-8">
                                {['NTSE', 'NSO', 'IMO', 'NSE', 'NSTSE', 'IEO', 'NCO', 'GK10', 'POLYCET', 'NDA', 'OLYMPIADS', 'ITI', 'AISSEE', 'JEE', 'NEET', 'KVPY', 'INO', 'SAT', 'ASSET', 'JNUST', 'NBO', 'IAS/KAS', 'IMOTC', 'IOITC', 'IPMAT', 'GMAT', 'GRE', 'AIMS', 'JIPMER', 'FMGE', 'SLAT', 'CA', 'CS', 'BBA', 'MBA', 'CLAT', 'NLSAT'].map((exam, i) => (
                                    <span key={i} className="inline-block px-4 py-1.5 bg-[#0B1E3D] text-[#E4C275] rounded-full text-sm font-semibold border border-[#C8A24D]/40 shadow-sm">
                                        {exam}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </section>


                <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#FBF8F1] via-white to-[#F7EFE2]">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-[#8C2F39]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C8A24D]/10 rounded-full blur-3xl" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={staggerContainer}
                            className="grid lg:grid-cols-2 gap-16 items-center"
                        >
                            <motion.div variants={fadeInUp}>
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center px-5 py-2 rounded-full bg-[#8C2F39]/10 text-[#8C2F39] text-sm font-semibold border border-[#8C2F39]/20 shadow-sm">
                                    About Us
                                </motion.span>
                                <h2 className="mt-5 font-display text-4xl md:text-5xl leading-tight font-bold text-[#0B1E3D]">
                                    Built For Every Stage
                                    <span className="block text-[#8C2F39]">
                                        Of The Exam Journey
                                    </span>
                                </h2>
                                <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                                    From kindergarten admissions to professional certifications,
                                    we bridge the gap between where a student is today and where
                                    their ambition can take them tomorrow.
                                </p>
                                <div className="mt-8 space-y-5">
                                    {[
                                        "50+ competitive exams covered end to end",
                                        "200+ faculty verified for subject expertise",
                                        "98% student success rate across cohorts",
                                        "Students learning from 15+ countries",
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{
                                                opacity: 0,
                                                x: -30
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                x: 0
                                            }}
                                            transition={{
                                                delay: index * 0.15
                                            }}
                                            whileHover={{
                                                x: 12
                                            }}
                                            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white hover:shadow-lg transition-all">
                                            <div className="w-10 h-10 rounded-full bg-[#8C2F39]/10 flex items-center justify-center group-hover:bg-[#8C2F39] transition">
                                                <CheckCircle2 className="w-5 h-5 text-[#8C2F39] group-hover:text-white" />
                                            </div>
                                            <span className="text-slate-700 font-medium">
                                                {item}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                className="relative"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.03
                                    }}
                                    transition={{
                                        duration: 0.5
                                    }}
                                    className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/60">
                                    <img
                                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=700&fit=crop"
                                        alt="Students learning"
                                        className="w-full h-[520px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/80 via-transparent" />
                                    <div className="absolute bottom-8 left-8 text-white">
                                        <p className="text-3xl font-bold">
                                            10+ Years
                                        </p>
                                        <p className="text-white/80">
                                            Transforming Student Careers
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 bg-[#0B1E3D] text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, i) => (
                                <motion.div key={i} variants={fadeInUp}>
                                    <p className="text-4xl md:text-5xl font-bold text-[#E4C275]"><CountUp value={stat.value} suffix={stat.suffix} /></p>
                                    <p className="text-slate-300 mt-2 text-sm md:text-base">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 bg-[#F7F3EA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
                            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-[#0B1E3D]/5 text-[#8C2F39] rounded-full text-sm font-semibold mb-3 border border-[#8C2F39]/20">Our Services</motion.span>
                            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-semibold text-[#0B1E3D]">A Complete Education Ecosystem</motion.h2>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-wrap justify-center gap-3 mb-10">
                            {serviceTabs.map((tab) => (
                                <motion.button
                                    key={tab.key}
                                    variants={fadeInUp}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition ${activeTab === tab.key ? 'bg-[#0B1E3D] text-[#E4C275] shadow-lg' : 'bg-[#FBF8F1] text-slate-600 hover:bg-[#0B1E3D]/5 border border-[#0B1E3D]/10'}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    {tab.label}
                                </motion.button>
                            ))}
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0 }}
                                variants={staggerContainer}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {(visibleServices.length ? visibleServices : services).map((service, i) => (
                                    <motion.div
                                        key={service.title}
                                        variants={fadeInUp}
                                        whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(11,30,61,0.15)' }}
                                        className="bg-[#FBF8F1] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#0B1E3D]/5 group"
                                    >
                                        <div className="h-48 overflow-hidden">
                                            <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <div className="w-12 h-12 bg-[#0B1E3D]/5 rounded-xl flex items-center justify-center text-[#8C2F39] group-hover:bg-[#0B1E3D] group-hover:text-[#E4C275] transition mb-4">
                                                {service.icon}
                                            </div>
                                            <h4 className="font-display font-semibold text-[#0B1E3D] text-lg">{service.title}</h4>
                                            <p className="text-slate-500 text-sm mt-1">{service.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#FBF8F1] via-white to-[#F6EFE3]">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#8C2F39]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C8A24D]/10 rounded-full blur-3xl" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="text-center mb-16"
                        >
                            <motion.span
                                variants={fadeInUp}
                                whileHover={{
                                    scale: 1.08
                                }}
                                className="inline-flex px-5 py-2 rounded-full bg-[#8C2F39]/10 text-[#8C2F39] text-sm font-semibold border border-[#8C2F39]/20">
                                Why Choose Us
                            </motion.span>
                            <motion.h2
                                variants={fadeInUp}
                                className="mt-5 font-display text-4xl md:text-5xl font-bold text-[#0B1E3D]"
                            >
                                   What Actually&nbsp;
                                <span className=" bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] bg-clip-text text-transparent">
                                    Moves a Rank
                                </span>
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-5 max-w-2xl mx-auto text-slate-600 text-lg"
                            >
                                A powerful combination of expert mentors,
                                personalised learning and proven strategies
                                that help students achieve their goals.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.2
                            }}
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {whyUs.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.03
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    className="group relative p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#8C2F39]/5 to-[#C8A24D]/10 opacity-0 group-hover:opacity-100 transition"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            whileHover={{
                                                rotate: 10,
                                                scale: 1.15
                                            }}
                                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8C2F39] to-[#C8A24D] text-white flex items-center justify-center mb-6 shadow-lg">
                                            {item.icon}
                                        </motion.div>
                                        <h4 className="font-display font-bold text-xl text-[#0B1E3D]">
                                            {item.title}
                                        </h4>
                                        <p className="mt-3 text-slate-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                        <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#8C2F39] to-[#C8A24D] rounded-full group-hover:w-full transition-all duration-500"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>



                <section className="relative overflow-hidden py-24 bg-gradient-to-b from-[#06142D] via-[#0B1E3D] to-[#06142D] text-white">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                x: [0, 40, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 12,
                                ease: "easeInOut",
                            }}
                            className="absolute top-10 left-10 w-80 h-80 rounded-full bg-[#C8A24D]/10 blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                x: [0, -50, 0],
                                y: [0, 40, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 15,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[150px]"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="text-center mb-20"
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 rounded-full border border-[#C8A24D]/40 bg-[#C8A24D]/10 px-5 py-2 text-sm font-semibold text-[#E4C275]"
                            >
                                🏆 Wall of Rankers
                            </motion.span>
                            <motion.h2
                                variants={fadeInUp}
                                className="mt-6 text-4xl md:text-6xl font-bold leading-tight"
                            >
                                Meet Our
                                <span className="block text-[#E4C275]">
                                    Top Rankers
                                </span>
                            </motion.h2>
                            <motion.p
                                variants={fadeInUp}
                                className="mt-6 max-w-2xl mx-auto text-slate-300 text-lg leading-8"
                            >
                                Celebrating the exceptional achievements of students who
                                transformed dedication into remarkable success.
                            </motion.p>

                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >

                            {rankers.map((r, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.04,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                    }}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-7 shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
                                >
                                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                                        <div className="absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[150%] transition-all duration-1000" />
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl border border-[#C8A24D]/20 group-hover:border-[#E4C275]/60 transition-all duration-500" />
                                    <div className="absolute top-5 right-5">
                                        <span className="rounded-full bg-gradient-to-r from-[#E4C275] to-[#C8A24D] px-3 py-1 text-xs font-bold text-[#06142D] shadow-lg">
                                            {r.tag}
                                        </span>
                                    </div>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.08,
                                            rotate: 3,
                                        }}
                                        className="relative z-10 flex justify-center"
                                    >
                                        <img
                                            src={r.img}
                                            alt={r.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-[#E4C275] shadow-[0_0_35px_rgba(228,194,117,0.45)]"
                                        />
                                    </motion.div>
                                    <div className="relative z-10 mt-6 text-center">
                                        <h3 className="text-xl font-bold tracking-wide">
                                            {r.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-400">
                                            {r.exam}
                                        </p>
                                        <div className="mt-5 flex justify-center">
                                            <span className="rounded-full border border-[#C8A24D]/40 bg-[#C8A24D]/10 px-4 py-2 text-sm font-semibold text-[#E4C275]">
                                                ⭐ {r.tag}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.3,
                            }}
                            viewport={{ once: true }}
                            className="mt-20 text-center"
                        >
                            <button className="rounded-full bg-gradient-to-r from-[#E4C275] to-[#C8A24D] px-8 py-4 text-[#06142D] font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(228,194,117,0.45)]">
                                View More Results →
                            </button>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 bg-[#F7F3EA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
                            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-[#0B1E3D]/5 text-[#8C2F39] rounded-full text-sm font-semibold mb-3 border border-[#8C2F39]/20">Testimonials</motion.span>
                            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-semibold text-[#0B1E3D]">What Our Students Say</motion.h2>
                        </motion.div>
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {testimonials.map((t, i) => (
                                <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }} className="bg-[#FBF8F1] p-6 rounded-3xl relative hover:shadow-xl transition duration-300 border border-[#0B1E3D]/5">
                                    <Quote className="w-8 h-8 text-[#C8A24D]/40 absolute top-4 right-4" />
                                    <div className="flex items-center gap-3 mb-4">
                                        <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C8A24D]/50" />
                                        <div>
                                            <p className="font-bold text-[#0B1E3D] text-sm">{t.name}</p>
                                            <p className="text-xs text-[#8C2F39]">{t.course}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm italic">"{t.text}"</p>
                                    <div className="flex mt-4 text-[#C8A24D]">
                                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>


                <section className="py-16 bg-[#FBF8F1] border-y border-[#0B1E3D]/10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1 bg-[#0B1E3D]/5 text-[#8C2F39] rounded-full text-sm font-semibold mb-4 border border-[#8C2F39]/20">
                                <MapPin className="w-4 h-4" /> Learning Centres
                            </motion.span>
                            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-semibold text-[#0B1E3D] mb-6">Classrooms Across Maharashtra, Plus Fully Online</motion.h2>
                            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3">
                                {['Thane', 'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Online — Nationwide'].map((city, i) => (
                                    <span key={i} className="px-5 py-2 rounded-full bg-[#F7F3EA] border border-[#0B1E3D]/10 text-slate-700 text-sm font-medium">{city}</span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                <section className="py-20 bg-[#F7F3EA]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
                            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-[#0B1E3D]/5 text-[#8C2F39] rounded-full text-sm font-semibold mb-3 border border-[#8C2F39]/20">FAQ</motion.span>
                            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-semibold text-[#0B1E3D]">Frequently Asked Questions</motion.h2>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div key={index} variants={fadeInUp} className="border border-[#0B1E3D]/10 rounded-xl overflow-hidden bg-[#FBF8F1]">
                                    <button
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#0B1E3D]/5 transition text-left"
                                        onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                                    >
                                        <span className="font-semibold text-[#0B1E3D]">{faq.question}</span>
                                        {faqOpen === index ? <ChevronUp className="w-5 h-5 text-[#8C2F39]" /> : <ChevronDown className="w-5 h-5 text-[#8C2F39]" />}
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: faqOpen === index ? 'auto' : 0, opacity: faqOpen === index ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 py-4 text-slate-600 bg-[#F7F3EA]">{faq.answer}</div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>


                <section className="py-20 bg-gradient-to-br from-[#0B1E3D] via-[#16294D] to-[#0B1E3D] text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-12">
                            <motion.span variants={fadeInUp} className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-3 border border-[#C8A24D]/40">Get Started</motion.span>
                            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-semibold">Request a Free Consultation</motion.h2>
                            <motion.p variants={fadeInUp} className="text-slate-300 mt-2">Fill in your details and a counsellor will reach out within 24 hours.</motion.p>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-[#C8A24D]/30 shadow-2xl">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name *</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8A24D] transition" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email Address *</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8A24D] transition" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number *</label>
                                    <input type="tel" className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8A24D] transition" placeholder="+91 98765 43210" />
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Exam / Course Interest</label>
                                    <div
                                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white flex items-center justify-between cursor-pointer"
                                        onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                                    >
                                        <span className={selectedCourse ? '' : 'text-slate-400'}>{selectedCourse || 'Select a course'}</span>
                                        <ChevronDown className={`w-4 h-4 transition ${isCourseDropdownOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {isCourseDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 bg-[#FBF8F1] text-[#1D2433] rounded-xl shadow-xl border border-[#0B1E3D]/10 max-h-56 overflow-y-auto"
                                            >
                                                <div className="p-2 sticky top-0 bg-[#FBF8F1]">
                                                    <div className="flex items-center bg-white rounded-lg px-3 py-1 border border-[#0B1E3D]/10">
                                                        <Search className="w-4 h-4 text-slate-400" />
                                                        <input
                                                            type="text"
                                                            value={courseSearch}
                                                            placeholder="Search courses..."
                                                            className="bg-transparent border-none outline-none w-full py-2 px-2 text-sm"
                                                            onChange={(e) => setCourseSearch(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    {filteredCourses.length ? filteredCourses.map((course) => (
                                                        <div
                                                            key={course}
                                                            className="px-4 py-2 hover:bg-[#0B1E3D]/5 rounded-lg cursor-pointer transition flex items-center gap-2"
                                                            onClick={() => {
                                                                setSelectedCourse(course);
                                                                setIsCourseDropdownOpen(false);
                                                                setCourseSearch('');
                                                            }}
                                                        >
                                                            <GraduationCap className="w-4 h-4 text-[#8C2F39]" />
                                                            {course}
                                                        </div>
                                                    )) : (
                                                        <p className="px-4 py-3 text-sm text-slate-400">No matching course — try a different search.</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                                    <textarea rows={3} className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8A24D] transition" placeholder="Tell us about your goals..."></textarea>
                                </div>
                                <div className="md:col-span-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-[#C8A24D] hover:bg-[#E4C275] text-[#0B1E3D] font-bold py-4 rounded-xl transition duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        Send Enquiry <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


            </div>
        </>
    );
};

export default Home;
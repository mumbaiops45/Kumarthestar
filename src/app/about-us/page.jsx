"use client";

import React, { useState, useRef } from "react";
import {motion,useScroll,useTransform,useMotionValue,useSpring,AnimatePresence
} from "framer-motion";
import {FaUsers,FaChalkboardTeacher,FaAward,FaRocket,FaLightbulb,FaHeart,FaStar,FaSeedling,FaCheckCircle,FaCalendarCheck,FaUserGraduate,FaTimes} from "react-icons/fa";


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
  const stars = Array.from({ length: 42 }, (_, i) => ({
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
          className="absolute rounded-full bg-violet-200/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-lg rounded-3xl bg-[#0F132C] border border-white/15 p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaTimes />
          </button>

          {!submitted ? (
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-3">
                <FaCalendarCheck className="text-cyan-400" />
                1-on-1 Guidance Slot
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Talk to an Academic Counsellor</h3>
              <p className="text-slate-300 text-sm mb-6">
                Fill in your details below. Our senior academic expert will call you within 15 minutes to guide your exam & career roadmap.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Target Goal / Exam
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#090C1E] border border-white/10 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm">
                    <option>Competitive Exams (JEE / NEET / SAT)</option>
                    <option>Higher Education Admissions</option>
                    <option>Career Transition & Upskilling</option>
                    <option>School Academic Excellence</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all"
                >
                  Confirm Free Slot Now
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-3xl mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Slot Reserved Successfully!</h3>
              <p className="text-slate-300 text-sm mb-6">
                Our lead counsellor will call you shortly. Get ready for your tailored success roadmap!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const featuresTab = [
    {
      title: "1-on-1 Mentorship",
      badge: "Personalized",
      heading: "Dedicated Expert Guidance Every Step",
      desc: "Get paired with top-tier academic mentors who track your daily performance, resolve doubts instantaneously, and craft custom study schedules tailored to your pace.",
      stats: ["Daily Live Doubt Sessions", "Custom Mock Tests", "Progress Analytics Dashboard"]
    },
    {
      title: "Interactive Live Classes",
      badge: "Engaging",
      heading: "Immersive Learning with Real-Time Q&A",
      desc: "Experience high-definition live interactive sessions powered by visual simulations, interactive quizzes, and instant doubt resolution by master teachers.",
      stats: ["4K Ultra-HD Streams", "Dual-Teacher Support", "Recorded Class Replays"]
    },
    {
      title: "Career Roadmap",
      badge: "Strategic",
      heading: "Clear Pathways to Top Universities & Jobs",
      desc: "From exam preparation strategies to university application counselling, we assist you in securing admissions and lucrative career opportunities.",
      stats: ["University Profile Building", "Resume & SOP Workshops", "Mock Interviews"]
    }
  ];

  return (
    <div className="min-h-screen  text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-0" />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section ref={heroRef} className="relative pt-40 pb-28 md:pt-18 md:pb-36 overflow-hidden">
        <Starfield />
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-violet-700/20 to-fuchsia-600/20 blur-[130px] pointer-events-none"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-cyan-600/15 to-violet-800/15 blur-[120px] pointer-events-none"
        />

        <motion.div style={{ scale: heroScale }} className="container mx-auto px-10 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7">
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black leading-[1.08] mb-6">
                Let&apos;s Build Your <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                  Success Story
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-800 leading-relaxed mb-10 max-w-2xl font-normal">
                Whether you&apos;re preparing for competitive entrance exams, building career roadmaps, or seeking 1-on-1 academic mentorship, our expert counsellors guide you toward guaranteed excellence.
              </motion.p>
              <motion.div variants={fadeUp} className="flex items-center gap-5 pt-4 border-t border-white/10 max-w-lg">
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Student Avatar"
                      className="w-10 h-10 rounded-full border-2 border-[#030712] object-cover"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-violet-600/30 border-2 border-[#030712] backdrop-blur-md flex items-center justify-center text-xs font-bold text-violet-200">
                    +10k
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-400">Join 10,000+ Successful Students</p>
                  <p className="text-xs text-slate-400">Average 98% Score Enhancement</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl"
          >
            {[
              { number: "10K+", label: "Active Students Enrolled", icon: FaUserGraduate },
              { number: "98%", label: "Exam Success Rate", icon: FaAward },
              { number: "4.9 / 5", label: "Average Student Rating", icon: FaStar },
              { number: "150+", label: "Certified Top Mentors", icon: FaChalkboardTeacher }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-cyan-300 text-xl">
                  <stat.icon />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">{stat.number}</div>
                  <div className="text-xs text-slate-800 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

     
      <section className="relative py-28 overflow-hidden bg-slate-950/60 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3 block">
              PURPOSE & DIRECTION
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              What Powers Our Mission
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FaRocket,
                badge: "MISSION",
                title: "Empowering Next-Gen Achievers",
                grad: "from-violet-600 via-fuchsia-600 to-indigo-600",
                shadow: "shadow-violet-600/20",
                text: "To democratize high-stakes education by pairing ambitious learners with world-class counsellors, personalized learning tech, and tailored success roadmaps."
              },
              {
                icon: FaLightbulb,
                badge: "VISION",
                title: "Global Ecosystem for Excellence",
                grad: "from-fuchsia-600 via-pink-600 to-cyan-500",
                shadow: "shadow-fuchsia-600/20",
                text: "To build a global network where quality guidance knows no geographic bounds, empowering every student to unlock their highest potential."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl bg-white/[0.03] border border-white/10 p-10 backdrop-blur-xl hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br ${item.grad} opacity-25 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.grad} flex items-center justify-center text-white text-2xl shadow-xl ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-slate-400 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-base">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-28">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-3 block">
              OUR GUIDING PRINCIPLES
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold text-black tracking-tight">
              Values That Define Us
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaHeart,
                title: "Student-Centric Passion",
                desc: "We prioritize each student’s unique learning style, strengths, and aspirations to construct personalized mentorship paths.",
                color: "text-rose-400",
                bg: "from-rose-500/20 to-violet-500/10"
              },
              {
                icon: FaUsers,
                title: "Collaborative Ecosystem",
                desc: "A thriving community of peer learners, alumni mentors, and master faculty constantly sharing insights and motivation.",
                color: "text-cyan-400",
                bg: "from-cyan-500/20 to-blue-500/10"
              },
              {
                icon: FaSeedling,
                title: "Relentless Excellence",
                desc: "Uncompromising standards in course content, analytical problem-solving, and continuous performance tracking.",
                color: "text-emerald-400",
                bg: "from-emerald-500/20 to-teal-500/10"
              }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.bg} border border-white/10 flex items-center justify-center ${v.color} text-2xl mb-6`}>
                    <v.icon />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{v.title}</h3>
                  <p className="text-slate-800 text-sm leading-relaxed mb-6">{v.desc}</p>
                </div>
            
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="why-us" className="relative py-28 bg-slate-950/80 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-3 block">
              THE LEARNHUB ADVANTAGE
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Designed for Tangible Results
            </h2>
            <p className="text-slate-400 text-base">
              Explore how our holistic learning system outperforms traditional tutoring methods.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              {featuresTab.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 md:p-12 backdrop-blur-2xl max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <span className="inline-block text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full mb-4">
                  {featuresTab[activeTab].badge}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {featuresTab[activeTab].heading}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed mb-8">
                  {featuresTab[activeTab].desc}
                </p>

                <div className="space-y-3">
                  {featuresTab[activeTab].stats.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-200 font-medium text-sm">
                      <FaCheckCircle className="text-cyan-400 text-base shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl bg-gradient-to-br from-violet-950/80 to-slate-900 border border-white/10 p-6 relative overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-400/30 flex items-center justify-center text-cyan-300">
                      <FaAward />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">BENCHMARK REPORT</p>
                      <p className="text-sm font-bold text-white">Student Mastery Metric</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Concept Retention Rate</span>
                        <span className="font-bold text-cyan-300">96%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 w-[96%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Doubt Clearance Speed</span>
                        <span className="font-bold text-fuchsia-300">&lt; 10 Mins</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-400 w-[90%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Percentile Improvement</span>
                        <span className="font-bold text-amber-300">+35% Avg</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 w-[85%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="relative py-28 overflow-hidden">
        <Starfield />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="relative rounded-3xl bg-gradient-to-r from-violet-950/90 via-[#0F132C] to-slate-950 border border-white/15 p-10 md:p-16 backdrop-blur-2xl text-center shadow-[0_20px_70px_rgba(0,0,0,0.7)] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight relative z-10">
              Ready to Secure Your <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Dream Future?
              </span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
              Join over 10,000+ students already advancing their scores and careers. Book your free 1-on-1 counseling session today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-full font-bold text-white text-base bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] hover:scale-[1.03] transition-all duration-300"
              >
                Claim Free 1-on-1 Guidance
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;

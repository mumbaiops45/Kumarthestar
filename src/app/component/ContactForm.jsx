"use client"
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, GraduationCap, Search, Zap } from 'lucide-react';
import axios from 'axios';

const courses = [
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "UPSC",
    "MHT-CET",
    "CAT",
    "GATE",
    "SSC",
    "Banking",
]

const ContactForm = () => {
    const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
    const [courseSearch, setCourseSearch] = useState("");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const filteredCourses = useMemo(() => {
        return courses.filter((course) =>
            course.toLowerCase().includes(courseSearch.toLowerCase()));
    }, [courseSearch]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post( "https://formsubmit.co/ajax/mumbaiops45@gmail.com",
            formData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
        } catch (error) {
            console.error("Form submission failed:", error.response?.data || error.message);
        }
    }
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className='relative'
            >
                <div className='absolute -inset-px rounded-3xl bg-gradient-to-r from-[#F0B429]/40 via-[#804501]/25 to-[#F0B429]/40 blur-sm' />

                <div className='relative bg-white rounded-3xl border border-[#F0B429]/20 p-8 md:p-12 shadow-[0_30px_80px_rgba(11,30,61,0.14)]'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='space-y-2'>
                                <label htmlFor="fullName" className="block text-xs font-bold text-[#B26E02] uppercase tracking-widest">
                                    Full Name *
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429] focus:bg-white transition-all hover:border-[#F0B429]/50"
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='block text-xs font-bold text-[#B26E02]'>Email Address *</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429] focus:bg-white transition-all hover:border-[#F0B429]/50"
                                />
                            </div>
                            <div className='space-y-2'>
                                <label htmlFor='phone' className='block text-xs font-bold text-[#B26E02] uppercase tracking-widest'>Phone Number *</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429] focus:bg-white transition-all hover:border-[#F0B429]/50"
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <label htmlFor='course' className='block text-xs font-bold text-[#B26E02] uppercase tracking-widest'>Exam / Course Interest</label>

                                <button type='button' id='course'
                                    onClick={() =>
                                        setIsCourseDropdownOpen((prev) => !prev)
                                    }
                                    className='w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] flex items-center justify-between cursor-pointer hover:border-[#F0B429]/50 transition-all text-left'>
                                    <span className={formData.course ? "text-[#0B1E3D]" : "text-slate-400"}>
                                        {formData.course || "Select a course"}
                                    </span>

                                    <ChevronDown className={`w-4 h-4 text-[#804501] transition-transform ${isCourseDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {isCourseDropdownOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -8,
                                                scale: 0.97,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -8,
                                                scale: 0.97,
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className='absolute z-20 w-full mt-2 bg-white border border-[#F0B429]/30 rounded-2xl shadow-[0_20px_60px_rgba(11,30,61,0.18)] overflow-hidden'
                                        >
                                            <div className='p-3 sticky top-0 bg-white border-b border-[#0B1E3D]/8'>
                                                <div className='flex items-center gap-2 bg-[#FAFAF8] rounded-xl px-3 py-2 border border-[#0B1E3D]/10'>
                                                    <Search className='w-4 h-4 text-[#b26E02]' />

                                                    <input
                                                        type="text"
                                                        value={courseSearch}
                                                        onChange={(e) =>
                                                            setCourseSearch(e.target.value)
                                                        }
                                                        placeholder="Search courses..."
                                                        className="bg-transparent border-none outline-none w-full text-sm text-[#0B1E3D] placeholder-slate-400"
                                                    />
                                                </div>
                                            </div>

                                            <div className='p-2 max-h-44 overflow-y-auto'>
                                                {filteredCourses.length > 0 ? (
                                                    filteredCourses.map((course) => (
                                                        <button
                                                            type="button"
                                                            key={course}
                                                            onClick={() => {
                                                                setFormData((prev) => ({...prev,course: course}));
                                                                setIsCourseDropdownOpen(false);
                                                                setCourseSearch("");
                                                            }}
                                                            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[#F7F3EA] cursor-pointer transition text-sm text-slate-600 hover:text-[#804501] text-left"
                                                        >
                                                            <GraduationCap className="w-4 h-4 text-[#F0B429]" />
                                                            {course}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <p className="px-4 py-4 text-sm text-slate-400 text-center">
                                                        No matching course found.
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className='md:col-span-2 space-y-2'>
                                <label htmlFor='message' className='block text-xs font-bold text-[#B26E02] uppercase tracking-widest'>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your goals, the exam you're targeting, and your current preparation level..."
                                    className="w-full bg-[#FAFAF8] border border-[#0B1E3D]/12 rounded-2xl px-5 py-3.5 text-[#0B1E3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F0B429]/50 focus:border-[#F0B429] focus:bg-white transition-all hover:border-[#F0B429]/50 resize-none"
                                />
                            </div>
                            <div className='md:col-span-2'>
                                <motion.button
                                    type='submit'
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: "0 20px 60px rgba(240,180,41,0.4)",
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className='group w-full relative overflow-hidden bg-gradient-to-r  from-[#F0B429] via-[#FDD34F] to-[#F0B429] text-[#06142D] font-black py-4 rounded-2xl text-base flex items-center justify-center gap-3 shadow-[0_12px_40px_rgba(240,180,41,0.3)] transition-all'
                                >
                                    <span className='absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12' />
                                    <span className="relative flex items-center gap-2">
                                        <Zap className='w-5 h-5' />
                                        Send Enquiry - Get a Call in 24 Hours
                                        <ArrowRight className='w-5 g-5 group-hover:translate-x-1 transition-transform' />
                                    </span>
                                </motion.button>
                                <p className='text-center text-slate-400 text-xs mt-3 font-medium'>No spam. No hard-sell. Just an honest conversation your goals.</p>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default ContactForm

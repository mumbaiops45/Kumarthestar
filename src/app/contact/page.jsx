'use client';

import { motion} from 'framer-motion';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';
import PageHero from '../component/PageHero';


export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const { fullName, email, phone, course } = formData;

    if (!fullName) {
      newErrors.fullName = "Please enter your full name.";
    } else if (fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!course) {
      newErrors.course = "Please select your course interest.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      setIsSubmitting(true);


      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        description: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -200, 100, 0],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#F0B429]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 200, 0],
            y: [0, 150, -100, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-[#804501]/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 100, -150, 0],
            y: [0, -100, 150, 0],
            rotate: [0, 180, 360, 0]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#F0B429]/10 rounded-full blur-3xl"
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FDD34F]/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`
            }}
          />
        ))}
      </div>

      <PageHero
        badge={{
          icon: <GiStarsStack className="text-base text-[#B26E02]" />,
          text: "Expert Career Guidance",
        }}
        title="Let's Build Your"
        accent="Success Story"
        subtitle="Whether you're preparing for your first competitive exam, exploring career opportunities, or seeking expert academic guidance, our counsellors are here to help you choose the right path with confidence."
        stats={[
          { value: "50K+", label: "Students Guided" },
          { value: "98%", label: "Success Rate" },
          { value: "4.9", label: "Rating" },
        ]}
      />

      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-[#F8F7F3] via-white to-[#F3EEE3] py-20 sm:py-24 lg:py-28"
      >

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#F0B429]/10 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-[#804501]/10 blur-[130px]"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-[12%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#F0B429]"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute right-[15%] top-[30%] h-1 w-1 rounded-full bg-[#804501]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mb-14 max-w-3xl text-center lg:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F0B429]/25 bg-[#F0B429]/10 px-4 py-2"
            >
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#F0B429]"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">
                Let's Connect
              </span>
            </motion.div>

            <h2 className="text-4xl font-black tracking-tight text-[#0B1E3D] sm:text-5xl lg:text-6xl">
              Start Your{" "}
              <span className="bg-gradient-to-r from-[#A47C2B] via-[#F0B429] to-[#9B762E] bg-clip-text text-transparent">
                Journey With Us
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Have questions about courses, admissions or your career path?
              Our academic experts are here to help you make the right decision.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex h-full flex-col"
            >
              
              <div className="card-light relative overflow-hidden rounded-[30px] p-7 sm:p-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#F0B429]/20 blur-[90px]"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#804501]/20 blur-[90px]"
                />

                <div className="absolute left-8 right-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0B429] to-transparent" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0B429]">
                      Get In Touch
                    </span>
                    <h3 className="mt-3 text-3xl font-black leading-tight text-[#0B1E3D] sm:text-4xl">
                      We're Here To
                      <span className="block text-[#B26E02]">Help You.</span>
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Speak with our academic advisors and get personalised
                      guidance based on your goals, interests and aspirations.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.a
                      href="tel:+919999999999"
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-4 rounded-2xl border border-[#0B1E3D]/8 bg-white p-4 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0B429]/10 text-[#F0B429] transition-all duration-300 group-hover:bg-[#F0B429]/20">
                        <FaPhone className="text-xl" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Call Us
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0B1E3D]">
                          +91 99999 99999
                        </p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="mailto:hello@example.com"
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-4 rounded-2xl border border-[#0B1E3D]/8 bg-white p-4 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0B429]/10 text-[#F0B429] transition-all duration-300 group-hover:bg-[#F0B429]/20">
                        <FaEnvelope className="text-xl" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Email Us
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0B1E3D]">
                          hello@example.com
                        </p>
                      </div>
                    </motion.a>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-4 rounded-2xl border border-[#0B1E3D]/8 bg-white p-4 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0B429]/10 text-[#F0B429] transition-all duration-300 group-hover:bg-[#F0B429]/20">
                        <FaMapMarkerAlt className="text-xl" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Visit Us
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#0B1E3D]">
                          Your Office Address
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#F0B429]/15 bg-[#F0B429]/[0.06] p-4">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0B429]/10">
                      <motion.span
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 rounded-full bg-[#F0B429]"
                      />
                      <span className="relative h-2 w-2 rounded-full bg-[#FDD34F]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#B26E02]">
                        Quick Response
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        Our team usually responds within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ y: -3 }}
                className="group relative mt-8 min-h-[300px] flex-1 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]"
              >
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps?q=India&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[20%] transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06142D]/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-white/40 bg-white/90 p-3 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0B429]/15 text-[#B26E02]">
                      <FaMapMarkerAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Our Location
                      </p>
                      <p className="text-xs font-bold text-[#0B1E3D]">
                        Your Office Address
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[#F0B429]"
                  >
                    <MdArrowForward />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute -inset-1 rounded-[34px] bg-gradient-to-r from-[#F0B429]/20 via-transparent to-[#804501]/15 blur-2xl"
              />

              <div className="relative h-full overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.12)] sm:p-8 lg:p-10">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#F0B429]/20 blur-[90px]"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#804501]/10 blur-[90px]"
                />

                <div className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#F0B429] to-transparent opacity-80" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F0B429]/25 bg-[#F0B429]/10 px-3.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F0B429]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B26E02]">
                        Free Consultation
                      </span>
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-4xl">
                      Request{" "}
                      <span className="bg-gradient-to-r from-[#A47C2B] via-[#F0B429] to-[#9B762E] bg-clip-text text-transparent">
                        Free Counselling
                      </span>
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                      Fill in your details and our academic advisor will contact
                      you within 24 hours.
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1, duration: 0.45 }}
                      className="group/field"
                    >
                      <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-[#0B1E3D]">
                        Full Name
                        <span className="ml-1 text-[#F0B429]">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[#F0B429]/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within/field:opacity-100" />
                        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#F0B429]">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
                          </svg>
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className={`relative w-full rounded-2xl border bg-slate-50/80 py-4 pl-12 pr-5 text-sm font-medium text-[#0B1E3D] placeholder:text-slate-400 outline-none transition-all duration-300 hover:bg-white focus:bg-white ${errors.fullName
                              ? "border-red-400 focus:border-red-400 focus:shadow-[0_8px_30px_rgba(239,68,68,0.10)]"
                              : "border-slate-200 hover:border-slate-300 focus:border-[#F0B429] focus:shadow-[0_8px_30px_rgba(240,180,41,0.10)]"
                            }`}
                        />
                      </div>
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs font-medium text-red-500"
                        >
                          {errors.fullName}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.16, duration: 0.45 }}
                      className="group/field"
                    >
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#0B1E3D]">
                        Email Address
                        <span className="ml-1 text-[#F0B429]">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[#F0B429]/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within/field:opacity-100" />
                        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#F0B429]">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                          </svg>
                        </div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`relative w-full rounded-2xl border bg-slate-50/80 py-4 pl-12 pr-5 text-sm font-medium text-[#0B1E3D] placeholder:text-slate-400 outline-none transition-all duration-300 hover:bg-white focus:bg-white ${errors.email
                              ? "border-red-400 focus:border-red-400 focus:shadow-[0_8px_30px_rgba(239,68,68,0.10)]"
                              : "border-slate-200 hover:border-slate-300 focus:border-[#F0B429] focus:shadow-[0_8px_30px_rgba(240,180,41,0.10)]"
                            }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs font-medium text-red-500"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.22, duration: 0.45 }}
                      className="group/field"
                    >
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#0B1E3D]">
                        Phone Number
                        <span className="ml-1 text-[#F0B429]">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[#F0B429]/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within/field:opacity-100" />
                        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#F0B429]">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          inputMode="numeric"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={`relative w-full rounded-2xl border bg-slate-50/80 py-4 pl-12 pr-5 text-sm font-medium text-[#0B1E3D] placeholder:text-slate-400 outline-none transition-all duration-300 hover:bg-white focus:bg-white ${errors.phone
                              ? "border-red-400 focus:border-red-400 focus:shadow-[0_8px_30px_rgba(239,68,68,0.10)]"
                              : "border-slate-200 hover:border-slate-300 focus:border-[#F0B429] focus:shadow-[0_8px_30px_rgba(240,180,41,0.10)]"
                            }`}
                        />
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs font-medium text-red-500"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.28, duration: 0.45 }}
                      className="group/field"
                    >
                      <label htmlFor="course" className="mb-2 block text-sm font-semibold text-[#0B1E3D]">
                        Course Interest
                        <span className="ml-1 text-[#F0B429]">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[#F0B429]/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within/field:opacity-100" />
                        <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/field:text-[#F0B429]">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                            <path d="M6 12v5c3 2 9 2 12 0v-5" />
                            <path d="M22 10v6" />
                          </svg>
                        </div>
                        <select
                          id="course"
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          required
                          className={`relative w-full cursor-pointer appearance-none rounded-2xl border bg-slate-50/80 py-4 pl-12 pr-12 text-sm font-medium text-[#0B1E3D] outline-none transition-all duration-300 hover:bg-white focus:bg-white ${errors.course
                              ? "border-red-400 focus:border-red-400"
                              : "border-slate-200 hover:border-slate-300 focus:border-[#F0B429] focus:shadow-[0_8px_30px_rgba(240,180,41,0.10)]"
                            }`}
                        >
                          <option value="">Select your course interest</option>
                          <option value="competitive">Competitive Exam</option>
                          <option value="career">Career Guidance</option>
                          <option value="academic">Academic Support</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#F0B429]">
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                      {errors.course && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 text-xs font-medium text-red-500"
                        >
                          {errors.course}
                        </motion.p>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.34, duration: 0.45 }}
                      className="group/field"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="description" className="text-sm font-semibold text-[#0B1E3D]">
                          Tell Us About Your Goals
                        </label>
                        <span className="text-[11px] font-medium text-slate-400">
                          Optional
                        </span>
                      </div>
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-[#F0B429]/20 opacity-0 blur-md transition-opacity duration-300 group-focus-within/field:opacity-100" />
                        <div className="pointer-events-none absolute left-4 top-5 z-10 text-slate-400 transition-colors group-focus-within/field:text-[#F0B429]">
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
                          </svg>
                        </div>
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          placeholder="Tell us about your academic goals, career plans or any questions..."
                          value={formData.description}
                          onChange={handleChange}
                          className="relative w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 pl-12 text-sm font-medium leading-6 text-[#0B1E3D] placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-slate-300 hover:bg-white focus:border-[#F0B429] focus:bg-white focus:shadow-[0_8px_30px_rgba(240,180,41,0.10)]"
                        />
                      </div>
                    </motion.div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{
                        scale: 1.015,
                        y: -2,
                        boxShadow: "0 20px 50px rgba(240,180,41,0.30)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group/button relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#B88D36] via-[#FDD34F] to-[#B88D36] px-6 py-4 font-bold text-[#06142D] shadow-[0_12px_35px_rgba(240,180,41,0.20)] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <motion.span
                        animate={{
                          x: ["-120%", "120%"],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatDelay: 2.5,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      />
                      <span className="absolute inset-x-0 top-0 h-px bg-white/60" />
                      <span className="relative flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-5 w-5 rounded-full border-2 border-[#06142D]/30 border-t-[#06142D]"
                            />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Book Free Consultation</span>
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <MdArrowForward className="text-xl" />
                            </motion.span>
                          </>
                        )}
                      </span>
                    </motion.button>
                    <div className="flex items-center justify-center gap-2 pt-1 text-center">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-[#F0B429]">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span className="text-[11px] font-medium text-slate-400">
                        Your information is secure and will never be shared.
                      </span>
                    </div>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 22,
                        }}
                        className="relative mt-5 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.1,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                          >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="m5 12 4 4L19 6" />
                            </svg>
                          </motion.div>
                          <div>
                            <p className="text-sm font-bold text-emerald-800">
                              Request submitted successfully!
                            </p>
                            <p className="mt-0.5 text-xs text-emerald-600">
                              Our academic advisor will contact you within 24 hours.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
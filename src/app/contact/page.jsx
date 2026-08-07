'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';

const contactInfo = [
  {
    icon: <FaPhone className="text-2xl" />,
    title: "Phone",
    description: "+91 98765 43210\nMon-Fri 9AM - 6PM",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-400/30",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaEnvelope className="text-2xl" />,
    title: "Email",
    description: "info@smarat.com\nsupport@smarat.com",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-400/30",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: "Location",
    description: "Mumbai, India\nRemote Consultation Available",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-400/30",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaClock className="text-2xl" />,
    title: "Working Hours",
    description: "Monday - Saturday\n9:00 AM - 8:00 PM",
    bgGradient: "from-orange-500/10 to-yellow-500/10",
    borderColor: "border-orange-400/30",
    gradient: "from-orange-500 to-yellow-500"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, type: "spring", stiffness: 300 }
  }
};

export default function page() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', course: '', description: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main >
      <div className="absolute inset-0 overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden ">
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
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-3xl"
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
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
      <section className='relative min-h-screen flex items-center  sm:px-5 md:px-8 lg:px-10'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className='relative max-w-6xl  z-10'
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
          >
            <GiStarsStack className="text-yellow-400 animate-pulse" />
            <span className="text-sm text-white/80"> Trusted by 10,000+ Students</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='text-5xl md:text-6xl lg:text-6xl font-bold leading-tight'
          >
            <span className='text-white'>Let's Build Your</span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400'
            >
              Success Story
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className='mt-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto'
          >
            Whether you're preparing for your first competitive exam, exploring career opportunities,
            or seeking expert academic guidance, our counsellors are here to help you choose the right
            path with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className='mt-1 flex flex-col sm:flex-row gap-4 justify-center'
          >
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className=' grid grid-cols-3 gap-8 max-w-3xl mx-auto'
          >
            {[
              { number: "10K+", label: "Students Guided" },
              { number: "98%", label: "Success Rate" },
              { number: "4.9", label: "Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
                  <p className="text-sm text-gray-50 mt-1">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section ref={sectionRef} className='relative py-10 px-5'>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid lg:grid-cols-2 gap-12"
        >

          {/* LEFT CONTACT CARDS */}
          <motion.div
            variants={staggerContainer}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  scale: 1.02
                }}
                transition={{
                  type: "spring",
                  stiffness: 200
                }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] cursor-pointer">

                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/40 to-transparent"
                  initial={{
                    x: "-100%"
                  }}
                  whileHover={{
                    x: "100%"
                  }}
                  transition={{
                    duration: 0.8
                  }}
                />
                <div className="relative z-10 flex gap-5 items-start">
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{
                      duration: .5
                    }}
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-2xl text-white shadow-lg`}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 leading-7 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{
                      x: 6
                    }}
                    className="text-indigo-500">
                    <MdArrowForward className="text-xl" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity
              }}
              className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity
              }}
              className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-900">
                Request Free Counselling
              </h3>
              <p className="mt-3 mb-8 text-slate-500">
                Fill your details and our academic advisor will contact you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {["fullName", "email", "phone"].map(
                  (field, index) => (
                    <motion.input
                      key={field}
                      initial={{
                        opacity: 0,
                        x: -30
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: index * .1
                      }}
                      whileFocus={{
                        scale: 1.02
                      }}
                      type={
                        field === "email"
                          ? "email"
                          :
                          field === "phone"
                            ? "tel"
                            :
                            "text"
                      }
                      name={field}
                      placeholder={
                        field === "fullName"
                          ?
                          "Full Name"
                          :
                          field === "email"
                            ?
                            "Email Address"
                            :
                            "Phone Number"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
                  ))}
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                  <option value="">
                    Select Course Interest
                  </option>
                  <option value="competitive">
                    Competitive Exam
                  </option>
                  <option value="career">
                    Career Guidance
                  </option>
                  <option value="academic">
                    Academic Support
                  </option>
                  <option value="other">
                    Other
                  </option>
                </select>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Tell us about your goals and requirements..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 resize-none outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.03
                  }}
                  whileTap={{
                    scale: .97
                  }}
                  className="relative overflow-hidden w-full rounded-xl py-4 font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl">
                  {isSubmitting
                    ?
                    "Submitting..."
                    :
                    (
                      <span className="flex justify-center items-center gap-2">
                        Book Free Consultation
                        <MdArrowForward />
                      </span>
                    )
                  }
                </motion.button>
                {isSubmitted &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    className="rounded-xl bg-green-50 border border-green-200 p-4 text-green-700">
                    ✅ Thank you! We'll contact you within 24 hours.
                  </motion.div>
                }
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
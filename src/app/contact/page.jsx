'use client';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { GiStarsStack } from 'react-icons/gi';
import PageHero from '../component/PageHero';
import ContactForm from '../component/ContactForm';
import { contact, founder, whatsappLink } from '../../data/site';
import { divisions } from '../../data/divisions';

const particles = [
  { left: '8%', top: '15%', size: 3, delay: 0, duration: 8 },
  { left: '18%', top: '42%', size: 4, delay: 1, duration: 10 },
  { left: '27%', top: '72%', size: 2, delay: 2, duration: 7 },
  { left: '39%', top: '22%', size: 3, delay: 3, duration: 9 },
  { left: '48%', top: '65%', size: 4, delay: 1.5, duration: 11 },
  { left: '58%', top: '35%', size: 2, delay: 4, duration: 8 },
  { left: '67%', top: '78%', size: 3, delay: 2.5, duration: 10 },
  { left: '76%', top: '18%', size: 4, delay: 0.5, duration: 9 },
  { left: '84%', top: '50%', size: 2, delay: 3.5, duration: 7 },
  { left: '92%', top: '30%', size: 3, delay: 2, duration: 11 },
  { left: '13%', top: '88%', size: 3, delay: 4, duration: 8 },
  { left: '34%', top: '90%', size: 2, delay: 1, duration: 9 },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 180, -80, 0],
            y: [0, -120, 80, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#F0B429]/15 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 150, 0],
            y: [0, 100, -80, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#804501]/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, -100, 0],
            y: [0, -80, 100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0B429]/5 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,180,41,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(240,180,41,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-[#FDD34F]/30"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -70, 0],
              x: [0, 30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <PageHero
        badge={{
          icon: <GiStarsStack className="text-base text-[#B26E02]" />,
          text: 'One Firm, One Number',
        }}
        title="Tell Us What"
        accent="You Need."
        subtitle="A tuition batch, an admission, a job, a property, a security team, a cooking class or a bulk order of coffee — whichever service you came for, the enquiry reaches the same desk and gets an answer."
        stats={[
          { value: `${divisions.length}`, label: 'Service lines' },
          { value: '2', label: 'Direct numbers' },
          { value: '24h', label: 'Response time' },
        ]}
      />
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-[#F8F7F3] via-white to-[#F3EEE3] py-14 sm:py-16 lg:py-20"
      >
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#F0B429]/10 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-[#804501]/10 blur-[120px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F0B429]/25 bg-[#F0B429]/10 px-4 py-2">
              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#F0B429]"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">
                Let&apos;s Connect
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#0B1E3D] sm:text-4xl lg:text-5xl">
              Start Your{' '}
              <span className="bg-gradient-to-r from-[#A47C2B] via-[#F0B429] to-[#9B762E] bg-clip-text text-transparent">
                Journey With Us
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              Coaching, admissions, languages, drama, coffee and tea, cooking
              classes, corporate gifting, staffing, hiring or property &mdash;
              send the enquiry here and we will get back to you within 24 hours.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 xl:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid h-full min-h-0 grid-rows-[auto_minmax(220px,1fr)] gap-5 md:grid-rows-[auto_minmax(0,1fr)]">
              <div className="card-light relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_15px_50px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-6 lg:p-7">
                <div className="absolute left-8 right-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F0B429] to-transparent" />
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[#F0B429]/20 blur-[80px]"
                />
                <div className="relative z-10">
                  <div className="mb-5 sm:mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B26E02]">
                      Get In Touch
                    </span>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-[#0B1E3D] sm:text-3xl">
                      Talk To The
                      <span className="block text-[#B26E02]">
                        Proprietor.
                      </span>
                    </h3>
                    <p className="mt-3 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                      Coaching, admissions, languages, catering, staffing, real
                      estate or gifting &mdash; both numbers below reach us
                      directly during working hours.
                    </p>
                  </div>
                  <div className="mb-3 rounded-xl border border-[#F0B429]/25 bg-[#F0B429]/[0.07] p-3">
                    <p className="text-sm font-black text-[#0B1E3D]">
                      {founder.name}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold text-[#B26E02]">
                      {founder.qualification} &middot; {founder.role}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {contact.phones.map((phone, i) => (
                      <motion.a
                        key={phone.raw}
                        href={'tel:+' + phone.raw}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0B429]/10 text-[#F0B429]">
                          <FaPhone className="text-sm" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                            {i === 0 ? 'Primary Line' : 'Alternate Line'}
                          </p>
                          <p className="mt-0.5 truncate text-xs font-semibold text-[#0B1E3D] sm:text-sm">
                            {phone.label}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                    <motion.a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/[0.06]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#25D366]">
                        <FaWhatsapp className="text-sm" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                          WhatsApp
                        </p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#0B1E3D] sm:text-sm">
                          Message us instantly
                        </p>
                      </div>
                    </motion.a>
                    <motion.a
                      href={'mailto:' + contact.email}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0B429]/10 text-[#F0B429]">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                          Email Us
                        </p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#0B1E3D] sm:text-sm">
                          {contact.email}
                        </p>
                      </div>
                    </motion.a>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#F0B429]/40 hover:bg-[#FAFAF8]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0B429]/10 text-[#F0B429]">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                          Based In
                        </p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-[#0B1E3D] sm:text-sm">
                          {contact.address.full}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#F0B429]/15 bg-[#F0B429]/[0.06] p-3">
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0B429]/10">
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
                      <span className="relative h-1.5 w-1.5 rounded-full bg-[#FDD34F]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-[#B26E02]">
                        Quick Response
                      </p>
                      <p className="mt-0.5 text-[9px] leading-4 text-slate-400 sm:text-[10px]">
                        Our team usually responds within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                }}
                whileHover={{ y: -3 }}
                className="group relative min-h-[240px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.10)] sm:rounded-[28px] md:min-h-0"
              >
                <iframe
                  title={`Our location — ${contact.address.full}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    contact.address.full
                  )}&output=embed`}
                  className="absolute inset-0 h-full w-full grayscale-[20%] transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06142D]/35 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-xl border border-white/50 bg-white/90 p-2.5 shadow-xl backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:p-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0B429]/15 text-[#B26E02]">
                      <FaMapMarkerAlt className="text-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                        Our Location
                      </p>
                      <p className="truncate text-[10px] font-bold text-[#0B1E3D] sm:text-xs">
                        {contact.address.full}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="shrink-0 text-[#F0B429]"
                  >
                    <MdArrowForward className="text-lg" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-full min-h-0"
            >
              <motion.div
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute -inset-1 rounded-[30px] bg-gradient-to-r from-[#F0B429]/20 via-transparent to-[#804501]/15 blur-2xl"
              />
              <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.10)] sm:rounded-[28px] sm:p-6 lg:p-8">
                <div className="absolute left-8 right-8 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#F0B429] to-transparent opacity-80" />
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-[#F0B429]/20 blur-[80px]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.08, 0.2, 0.08],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-[#804501]/10 blur-[80px]"
                />
                <div className="relative z-10 flex h-full min-h-0 flex-col">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-5 sm:mb-6"
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F0B429]/25 bg-[#F0B429]/10 px-3 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F0B429]" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#B26E02]">No Obligation</span>
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-[#0B1E3D] sm:text-3xl lg:text-4xl">
                      Send an{' '}
                      <span className="bg-gradient-to-r from-[#A47C2B] via-[#F0B429] to-[#9B762E] bg-clip-text text-transparent">
                        Enquiry
                      </span>
                    </h3>
                    <p className="mt-2 max-w-lg text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                      Pick the service from the dropdown, leave your number, and
                      we will call you back within 24 hours.
                    </p>
                  </motion.div>
                  <div className="min-h-0 flex-1">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

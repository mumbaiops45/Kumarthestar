"use client"
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {FaImages,FaCalendarAlt,FaMapMarkerAlt,FaUsers,FaHeart,FaComment,FaEye,FaArrowRight,FaFilter,FaTimes,FaChevronLeft,FaChevronRight,FaExpand,FaDownload,FaStar} from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }
  })
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const cardHover = {
  whileHover: { y: -8, scale: 1.02, transition: { duration: 0.35, ease: 'easeOut' } },
  whileTap: { scale: 0.98 }
};

const Starfield = ({ tint = 'bg-white' }) => {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className={`absolute rounded-full ${tint}`}
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.9, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

const GalleryLightbox = ({ image, onClose, onPrev, onNext }) => {
  if (!image) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#06142D]/96 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-[#FDD34F] transition-colors z-10"
      >
        <FaTimes className="text-3xl" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#FDD34F] transition-colors z-10"
      >
        <FaChevronLeft className="text-4xl" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#FDD34F] transition-colors z-10"
      >
        <FaChevronRight className="text-4xl" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[#0B1E3D] rounded-3xl overflow-hidden border border-[#F0B429]/25 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          <div className="aspect-video bg-gradient-to-br from-[#0B1E3D] to-[#112448] flex items-center justify-center">
            <div className="text-8xl text-[#F0B429]/35">
              <FaImages />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#06142D] via-[#06142D]/80 to-transparent p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
                <p className="text-white/65 text-sm mt-1">{image.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-[#FDD34F]/80">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />
                    {image.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {image.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers />
                    {image.views} views
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/8 border border-[#F0B429]/25 hover:bg-[#F0B429]/25 rounded-full transition-colors text-[#FDD34F]">
                  <FaDownload />
                </button>
                <button className="p-2 bg-white/8 border border-[#F0B429]/25 hover:bg-[#F0B429]/25 rounded-full transition-colors text-[#FDD34F]">
                  <FaExpand />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const page = () => {
  const heroRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const categories = ['All', 'Events', 'Campus', 'Students', 'Faculty', 'Achievements'];

  const galleryImages = [
    {
      id: 1,
      title: 'Annual Tech Conference 2024',
      description: 'Students presenting their innovative projects at the annual tech conference.',
      category: 'Events',
      date: 'December 15, 2024',
      location: 'Main Auditorium',
      views: 1243,
      likes: 89,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: 'Campus Aerial View',
      description: 'Beautiful sunrise captured from the campus drone.',
      category: 'Campus',
      date: 'December 10, 2024',
      location: 'University Campus',
      views: 876,
      likes: 56,
      comments: 12,
      featured: false
    },
    {
      id: 3,
      title: 'Graduation Ceremony 2024',
      description: 'Celebrating the achievements of our graduating class.',
      category: 'Events',
      date: 'December 5, 2024',
      location: 'Convention Center',
      views: 2341,
      likes: 156,
      comments: 45,
      featured: true
    },
    {
      id: 4,
      title: 'Student Innovation Lab',
      description: 'Students working on cutting-edge research projects.',
      category: 'Students',
      date: 'November 28, 2024',
      location: 'Innovation Lab',
      views: 654,
      likes: 43,
      comments: 8,
      featured: false
    },
    {
      id: 5,
      title: 'Faculty Excellence Award',
      description: 'Recognizing outstanding contributions to education.',
      category: 'Faculty',
      date: 'November 20, 2024',
      location: 'Award Ceremony Hall',
      views: 987,
      likes: 67,
      comments: 15,
      featured: false
    },
    {
      id: 6,
      title: 'Hackathon 2024 Winners',
      description: 'Team celebrating their victory at the national hackathon.',
      category: 'Achievements',
      date: 'November 15, 2024',
      location: 'Tech Arena',
      views: 1543,
      likes: 98,
      comments: 31,
      featured: true
    },
    {
      id: 7,
      title: 'Library Study Session',
      description: 'Students preparing for final exams in the modern library.',
      category: 'Campus',
      date: 'November 10, 2024',
      location: 'Central Library',
      views: 543,
      likes: 34,
      comments: 6,
      featured: false
    },
    {
      id: 8,
      title: 'International Exchange Program',
      description: 'Students from different countries sharing cultural experiences.',
      category: 'Students',
      date: 'November 5, 2024',
      location: 'International Center',
      views: 765,
      likes: 52,
      comments: 18,
      featured: false
    },
    {
      id: 9,
      title: 'Research Symposium',
      description: 'PhD students presenting their research findings.',
      category: 'Events',
      date: 'October 30, 2024',
      location: 'Research Hall',
      views: 876,
      likes: 61,
      comments: 14,
      featured: false
    },
    {
      id: 10,
      title: 'Sports Day Celebration',
      description: 'Annual sports day with students participating in various events.',
      category: 'Events',
      date: 'October 25, 2024',
      location: 'Sports Complex',
      views: 1234,
      likes: 87,
      comments: 29,
      featured: false
    },
    {
      id: 11,
      title: 'Art Exhibition 2024',
      description: 'Showcasing student artwork and creative projects.',
      category: 'Students',
      date: 'October 20, 2024',
      location: 'Art Gallery',
      views: 654,
      likes: 45,
      comments: 11,
      featured: false
    },
    {
      id: 12,
      title: 'Distinguished Alumni Award',
      description: 'Honoring alumni who have made significant contributions.',
      category: 'Achievements',
      date: 'October 15, 2024',
      location: 'Alumni Hall',
      views: 987,
      likes: 73,
      comments: 22,
      featured: true
    }
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex + 1 < filteredImages.length ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : filteredImages.length - 1;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-slate overflow-x-clip">
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center pt-32 pb-24 bg-section-hero"
      >
        <Starfield tint="bg-[#F0B429]" />
        <motion.div style={{ y: orbY1 }} className="absolute top-10 -left-24 w-[26rem] h-[26rem] rounded-full bg-[#F0B429]/20 blur-[110px]" />
        <motion.div style={{ y: orbY2 }} className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#804501]/15 blur-[120px]" />
        <motion.div
          style={{ opacity: heroFade }}
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container mx-auto px-6 md:px-10 relative z-10 max-w-5xl"
        >
          <motion.h1 variants={fadeUp} className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight text-[#0B1E3D]">
            Capturing
            <br />
            <span className="text-gold-gradient">
              Our Moments
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed max-w-2xl">
            Explore the vibrant life of our community through our photo gallery.
            Every picture tells a story of learning, growth, and achievement.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8">
            {[
              { label: 'Total Photos', value: '500+' },
              { label: 'Events Covered', value: '120+' },
              { label: 'Happy Memories', value: '10K+' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-[#804501]">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    variants={fadeUp}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-[#0B1E3D] text-[#FDD34F] shadow-[0_8px_24px_rgba(11,30,61,0.3)]'
                        : 'bg-white text-slate-600 border border-[#0B1E3D]/8 hover:border-[#F0B429]/40 hover:shadow-lg'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#804501]">
                <FaFilter />
                <span>{filteredImages.length} items</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeUp}
                custom={index}
                {...cardHover}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#0B1E3D]/5 shadow-[0_4px_24px_rgba(11,30,61,0.08)] hover:shadow-[0_24px_60px_rgba(11,30,61,0.18)] hover:border-[#F0B429]/30 transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative aspect-[4/3] bg-[#F0EBE0]">
                  <div className="w-full h-full bg-gradient-to-br from-[#F0EBE0] via-[#F7F3EA] to-[#E8DFC9] flex items-center justify-center">
                    <FaImages className="text-6xl text-[#F0B429]/45" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06142D]/90 via-[#0B1E3D]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-lg font-bold mb-1">{image.title}</h3>
                      <p className="text-white/65 text-sm line-clamp-2">{image.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-[#FDD34F]">
                        <span className="flex items-center gap-1">
                          <FaEye />
                          {image.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaHeart />
                          {image.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment />
                          {image.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0B1E3D] text-xs font-bold rounded-full border border-[#F0B429]/30">
                    {image.category}
                  </div>
                  {image.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-[#FDD34F] to-[#F0B429] text-[#06142D] text-xs font-black rounded-full flex items-center gap-1 shadow-lg">
                      <FaStar className="text-[#06142D]" />
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-14 h-14 rounded-full bg-[#F0B429]/30 backdrop-blur-md border border-[#FDD34F]/50 flex items-center justify-center">
                      <FaExpand className="text-white text-xl" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-[#0B1E3D] line-clamp-1 group-hover:text-[#804501] transition-colors">{image.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{image.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#B26E02]">
                      <FaCalendarAlt />
                      <span>{image.date.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="shine relative overflow-hidden px-10 py-4 rounded-2xl bg-white border border-[#F0B429]/30 hover:border-[#F0B429] hover:shadow-[0_18px_40px_rgba(240,180,41,0.25)] transition-all text-[#0B1E3D] font-bold flex items-center gap-2 mx-auto"
            >
              Load More Photos
              <FaArrowRight className="text-sm text-[#804501]" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      <section className="relative overflow-hidden py-24 bg-section-hero">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="container mx-auto px-6 text-center max-w-3xl"
        >
          <motion.h2 variants={fadeUp} className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black mb-6 text-[#0B1E3D]">
            Share Your
            <br />
            <span className="text-gold-gradient">Memories</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-10">
            Have photos from campus events? Share them with our community.
          </motion.p>
          <motion.button
            variants={fadeUp}
            {...cardHover}
            className="shine relative overflow-hidden px-12 py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-[#FDD34F] to-[#F0B429] text-[#06142D] shadow-[0_20px_50px_rgba(240,180,41,0.35)] transition-shadow"
          >
            Submit Your Photos
          </motion.button>
        </motion.div>
      </section>
      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox
            image={selectedImage}
            onClose={closeLightbox}
            onPrev={() => navigateImage('prev')}
            onNext={() => navigateImage('next')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default page;
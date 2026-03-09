import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { RevealOnScroll, AnimatedBorder } from '../utils/animations';

const yuccaEase = [0.22, 1, 0.36, 1];

const valueItemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: yuccaEase,
    },
  }),
};

const infoBlocks = [
  {
    label: 'Mission',
    text: 'To excel in customer fulfillment by providing innovative, quality and safe products. We are FDA certified and committed to the highest standards of quality, service, and integrity in everything we do.',
  },
  {
    label: 'Vision',
    text: 'To be the leading packaging solutions provider in Southeast Asia, building long-term relationships with our clients while delivering world-class products and services that drive growth and excellence.',
  },
];

const values = [
  { label: 'Innovation & Creativity', desc: 'Continuously developing new packaging solutions that push industry boundaries.' },
  { label: 'Quality First', desc: 'Uncompromising standards from raw materials to every finished product.' },
  { label: 'Customer Satisfaction', desc: 'Building lasting partnerships through exceptional service and on-time delivery.' },
  { label: 'Integrity & Trust', desc: 'Operating with full transparency and honesty in every business interaction.' },
  { label: 'Faith-Driven Excellence', desc: 'Grounded in values that inspire us to go above and beyond every day.' },
  { label: 'Continuous Improvement', desc: 'Investing in people, processes, and technology to consistently stay ahead.' },
  { label: 'Environmental Responsibility', desc: 'Committed to sustainable packaging and eco-conscious manufacturing.' },
  { label: 'Team Collaboration', desc: 'Achieving greatness together through shared purpose and mutual respect.' },
];

export default function AboutPage() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1]);

  return (
    <div>
      {/* ── Page Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Assets/insideGoldenStars.jpg"
            alt="Goldenstars facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-700/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-800/90 via-transparent to-forest-800/30" />
        </div>
        <div className="relative z-10 container-custom pb-12">
          <motion.span
            className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: yuccaEase }}
          >
            About Us
          </motion.span>
          <motion.h1
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
          >
            Why Do We <span className="text-golden-500">Exist</span>?
          </motion.h1>
        </div>
      </section>

      {/* ── About Content ── */}
      <section ref={sectionRef} className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <RevealOnScroll>
                <p className="text-bark-400 text-lg leading-relaxed">
                  GOLDENSTARS PACKAGING RESOURCES CO., INC. started with a faith-filled
                  vision for growth and business expansion. Over a decade of excellence in
                  the packaging industry, we have become a trusted name in delivering
                  world-class packaging solutions.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="mt-4 text-bark-400/70 text-base leading-relaxed">
                  We aim to build long-term relationships with our clients while providing
                  their product needs and services. From food-grade packaging to custom
                  solutions, we deliver excellence at every step of the manufacturing process.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <div className="mt-8">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-3 text-golden-600 font-semibold text-sm uppercase tracking-wider group"
                  >
                    <span>Explore Our Process</span>
                    <div className="arrow-icon border-golden-500/30 text-golden-600 group-hover:bg-golden-500 group-hover:text-forest-700 group-hover:border-golden-500 w-10 h-10">
                      <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-400" />
                    </div>
                  </Link>
                </div>
              </RevealOnScroll>
            </div>

            <RevealOnScroll delay={0.3} direction="right" className="relative">
              <div className="relative aspect-[4/5] rounded-none overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: imgY }}>
                  <motion.img
                    src="/Assets/insideGoldenStars.jpg"
                    alt="Inside Goldenstars Packaging facility"
                    className="w-full h-[120%] object-cover"
                    style={{ scale: imgScale }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-800/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-none p-4 border border-white/10">
                      <span className="block text-3xl font-display font-bold text-golden-500">10+</span>
                      <span className="block text-xs text-white/60 uppercase tracking-wider mt-1">Years</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-none p-4 border border-white/10">
                      <span className="block text-3xl font-display font-bold text-golden-500">500+</span>
                      <span className="block text-xs text-white/60 uppercase tracking-wider mt-1">Clients</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container-custom">
          <RevealOnScroll>
            <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-8">
              What Drives Us
            </span>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {infoBlocks.map((block, index) => (
              <RevealOnScroll key={block.label} delay={index * 0.15}>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-golden-500" />
                    <h3 className="font-display font-bold text-2xl text-forest-700">
                      {block.label}
                    </h3>
                  </div>
                  <p className="text-bark-400 text-base leading-relaxed pl-5">
                    {block.text}
                  </p>
                  <AnimatedBorder className="mt-8" delay={0.3 + index * 0.15} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-0 lg:gap-16 items-start">

            {/* Left: Sticky Image Panel */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 mb-12 lg:mb-0">
              <RevealOnScroll direction="left">
                <div className="relative overflow-hidden">
                  {/* Gold top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-golden-500 via-golden-400 to-golden-600 z-10" />

                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src="/Assets/quality.jpg"
                      alt="Goldenstars Quality Standards"
                      className="w-full h-full object-cover scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-800/95 via-forest-800/40 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      <span className="inline-flex items-center gap-2 text-golden-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                        <span className="w-5 h-px bg-golden-400 inline-block" />
                        Our Foundation
                      </span>
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                        What We<br />
                        <span className="text-golden-400">Truly</span> Value
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
                        Eight principles that shape every decision, every product, and every relationship we build.
                      </p>

                      {/* Stats row */}
                      <div className="flex gap-5 pt-6 border-t border-white/10">
                        <div>
                          <span className="block font-display font-bold text-3xl text-golden-400">8</span>
                          <span className="block text-white/40 text-xs uppercase tracking-wider mt-0.5">Core Values</span>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                          <span className="block font-display font-bold text-3xl text-golden-400">10+</span>
                          <span className="block text-white/40 text-xs uppercase tracking-wider mt-0.5">Years Strong</span>
                        </div>
                        <div className="w-px bg-white/10" />
                        <div>
                          <span className="block font-display font-bold text-3xl text-golden-400">FDA</span>
                          <span className="block text-white/40 text-xs uppercase tracking-wider mt-0.5">Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Values List */}
            <div className="lg:col-span-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={valueItemVariants}
                  className="group relative border-b border-gray-100 last:border-0 cursor-default
                             hover:bg-forest-700 transition-colors duration-400"
                >
                  {/* Left gold accent bar */}
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-golden-500
                                   scale-y-0 group-hover:scale-y-100
                                   transition-transform duration-400 origin-bottom" />

                  <div className="flex items-start justify-between gap-6 py-5 px-5 pl-7 lg:pl-8
                                  md:py-6 transition-all duration-400">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-base text-forest-700
                                     group-hover:text-white transition-colors duration-400 leading-snug">
                        {value.label}
                      </h4>

                      {/*
                        Mobile (< md): always visible, animates in with the parent motion.div
                        Desktop (md+): hidden by default, revealed on hover
                      */}
                      <p className="text-bark-400/70 text-sm leading-relaxed mt-2
                                    md:mt-0 md:max-h-0 md:overflow-hidden md:opacity-0
                                    md:group-hover:mt-2 md:group-hover:max-h-20 md:group-hover:opacity-100
                                    group-hover:text-white/60
                                    transition-all duration-500 ease-out">
                        {value.desc}
                      </p>
                    </div>

                    {/* Index number */}
                    <span className="text-forest-700/15 font-display font-bold text-2xl shrink-0 mt-0.5
                                     group-hover:text-golden-500/60 transition-colors duration-400 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Assets/GoldenStarsGate.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-700/85" />
        </div>
        <div className="relative z-10 container-custom text-center">
          <motion.h2
            className="font-display font-bold text-3xl md:text-5xl text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: yuccaEase }}
          >
            Partner with <span className="text-golden-500">Goldenstars</span>
          </motion.h2>
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: yuccaEase }}
          >
            <Link to="/contact" className="btn-primary group">
              <span className="btn-fill" />
              <span className="relative z-10">Get in Touch</span>
              <span className="relative z-10">
                <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link to="/services" className="btn-outline group">
              <span className="btn-fill" />
              <span className="relative z-10">Our Services</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

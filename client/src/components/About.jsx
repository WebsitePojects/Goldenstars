import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll, AnimatedText, AnimatedBorder, ClipRevealCard, ParallaxImage } from '../utils/animations';

const yuccaEase = [0.22, 1, 0.36, 1];

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
  { label: 'Innovation & Creativity',       desc: 'Continuously developing new packaging solutions that push industry boundaries.' },
  { label: 'Quality First',                  desc: 'Uncompromising standards from raw materials to every finished product.' },
  { label: 'Customer Satisfaction',          desc: 'Building lasting partnerships through exceptional service and on-time delivery.' },
  { label: 'Integrity & Trust',              desc: 'Operating with full transparency and honesty in every business interaction.' },
  { label: 'Faith-Driven Excellence',        desc: 'Grounded in values that inspire us to go above and beyond every day.' },
  { label: 'Continuous Improvement',         desc: 'Investing in people, processes, and technology to consistently stay ahead.' },
  { label: 'Environmental Responsibility',   desc: 'Committed to sustainable packaging and eco-conscious manufacturing.' },
  { label: 'Team Collaboration',             desc: 'Achieving greatness together through shared purpose and mutual respect.' },
];

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white overflow-hidden"
    >
      {/* ── Hero-style about header with parallax image ── */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text content */}
            <div>
              <RevealOnScroll>
                <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                  About Us
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-forest-700 leading-tight">
                  Why Do We{' '}
                  <span className="relative inline-block">
                    <span className="text-gradient">Exist</span>
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-golden-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8, ease: yuccaEase }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </span>
                  ?
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="mt-6 text-bark-400 text-lg leading-relaxed">
                  GOLDENSTARS PACKAGING RESOURCES CO., INC. started with a faith-filled
                  vision for growth and business expansion. Over a decade of excellence in
                  the packaging industry, we have become a trusted name in delivering
                  world-class packaging solutions.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <p className="mt-4 text-bark-400/70 text-base leading-relaxed">
                  We aim to build long-term relationships with our clients while providing
                  their product needs and services. From food-grade packaging to custom
                  solutions, we deliver excellence at every step of the manufacturing process.
                </p>
              </RevealOnScroll>

              {/* Yucca-style down arrow scroll cue */}
              <RevealOnScroll delay={0.4}>
                <div className="mt-8">
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-3 text-golden-600 font-semibold text-sm uppercase tracking-wider group"
                  >
                    <span>Explore Our Process</span>
                    <div className="arrow-icon border-golden-500/30 text-golden-600 group-hover:bg-golden-500 group-hover:text-forest-700 group-hover:border-golden-500 w-10 h-10">
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Yucca-style parallax image with clipPath reveal */}
            <ClipRevealCard className="relative" delay={0.3}>
              <div className="relative aspect-[4/5] rounded-none overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y: imgY }}>
                  <motion.img
                    src="/Assets/insideGoldenStars.jpg"
                    alt="Inside Goldenstars Packaging facility"
                    className="w-full h-[120%] object-cover"
                    style={{ scale: imgScale }}
                  />
                </motion.div>
                {/* Transparent gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-800/40 via-transparent to-transparent" />

                {/* Floating stats overlay — Yucca-style */}
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
            </ClipRevealCard>
          </div>
        </div>
      </div>

      {/* ── Yucca-style Mission/Vision Info Section ── */}
      <div className="py-20 md:py-28 bg-gray-50">
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
                  {/* Dot accent — Yucca style */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-golden-500" />
                    <h3 className="font-display font-bold text-2xl text-forest-700">
                      {block.label}
                    </h3>
                  </div>
                  <p className="text-bark-400 text-base leading-relaxed pl-5">
                    {block.text}
                  </p>
                  {/* Yucca-style border bottom */}
                  <AnimatedBorder className="mt-8" delay={0.3 + index * 0.15} />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* ── Yucca-style Values List ── */}
      <div className="py-20 md:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <RevealOnScroll>
                <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                  Our Foundation
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-forest-700">
                  We <span className="text-gradient">Value</span>
                </h2>
              </RevealOnScroll>
            </div>

            {/* Yucca-style value rows — hover reveals description + golden left accent */}
            <div>
              {values.map((value, index) => (
                <RevealOnScroll key={value.label} delay={index * 0.05}>
                  <div className="group relative flex items-start justify-between gap-6 py-5 border-b border-gray-100 hover:border-golden-500/20 transition-all duration-500 cursor-default pl-0 hover:pl-5">
                    {/* Golden left border that scales in on hover */}
                    <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-golden-500 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

                    <div className="flex-1 min-w-0">
                      <span className="block font-display font-bold text-base md:text-lg text-forest-700/50 group-hover:text-forest-700 transition-colors duration-400 leading-snug">
                        {value.label}
                      </span>
                      {/* Description slides down on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-[max-height] duration-500 ease-out">
                        <p className="text-bark-400 text-sm leading-relaxed pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {value.desc}
                        </p>
                      </div>
                    </div>

                    {/* Large number — faint normally, golden accent on hover */}
                    <span className="shrink-0 text-3xl md:text-4xl font-display font-bold text-gray-100 group-hover:text-golden-500/25 transition-colors duration-500 leading-none mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row — Yucca-style dark band ── */}
      <div className="bg-forest-700 py-16 md:py-20">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {[
              { value: '10+', label: 'Years of Excellence' },
              { value: '500+', label: 'Satisfied Clients' },
              { value: '1000+', label: 'Products Delivered' },
              { value: '100%', label: 'Quality Commitment' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: yuccaEase } },
                }}
              >
                <span className="block text-4xl md:text-5xl font-display font-bold text-golden-500">
                  {stat.value}
                </span>
                <span className="block mt-2 text-xs md:text-sm text-white/40 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

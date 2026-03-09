import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import Marquee from '../components/Marquee';

const yuccaEase = [0.22, 1, 0.36, 1];
const landingPic = '/Assets/landingPic.png';

/* ── Solution cards ─────────────────────────────────────── */
const solutions = [
  {
    title: 'Our Story',
    extra: 'Est. 2017 · Philippines',
    text: 'Born from a faith-filled vision for growth, Goldenstars Packaging Resources Co., Inc. (GPRCI) was established in 2017 to serve the products and packaging needs of industries across the Philippines. Inspired by its mother company Silver Star Resources Co., Inc., we are driven by purpose — providing better and healthier lives through excellent products and services.',
    link: 'about',
  },
  {
    title: 'World-Class Certifications',
    extra: 'FSSC 22000 · ISO 22000 · HACCP',
    text: 'We are proud to be FSSC 22000 Version 6.0 certified — a globally recognized food safety management certification. Our framework integrates ISO 22000, HACCP, and Good Hygiene Practices (GHP), ensuring our packaging solutions are safe, compliant, and trusted by industry leaders worldwide.',
    link: 'services',
  },
  {
    title: 'Industries We Serve',
    extra: 'Food · Agriculture · Retail',
    text: 'From food service and food processing to agriculture and industrial packaging, GPRCI delivers tailored packaging solutions built to meet international standards. With 130 dedicated employees and FDA certification, we bring precision, quality, and care to every product we deliver.',
    link: 'services',
  },
];

/* ── Stats strip ─────────────────────────────────────────── */
const highlights = [
  { stat: '2017', label: 'Year Established' },
  { stat: '130+', label: 'Dedicated Employees' },
  { stat: 'FSSC', label: '22000 v6.0 Certified' },
  { stat: 'FDA', label: 'Licensed Facility' },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSolution, setActiveSolution] = useState(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen bg-sand-100 overflow-hidden">

        {/* Background image — right side with parallax scale */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-full lg:w-[60%] h-full"
            style={{ scale: imgScale }}
          >
            <img
              src={landingPic}
              alt="Goldenstars Packaging"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sand-100 via-sand-100/70 to-transparent lg:via-sand-100/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-100/90 via-transparent to-sand-100/20" />
          </motion.div>
        </div>

        {/* Hero content — flex column, pushes heading up, cards at bottom */}
        <div className="relative z-10 container-custom h-full flex flex-col justify-center pt-16 sm:pt-20 pb-[8.5rem] sm:pb-44 lg:pb-48">
          <motion.div style={{ y: textY }} className="max-w-[90%] sm:max-w-2xl lg:max-w-3xl">
            <div className="overflow-hidden">
              <motion.h1
                className="font-display text-[2.1rem] leading-[1.08] xs:text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-7xl tracking-tight text-forest-700"
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: isLoaded ? 0 : '100%', opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: yuccaEase }}
              >
                <em className="not-italic font-bold">Packaging to{' '}</em>
                <em className="italic font-bold">Perform.</em>{' '}
                <em className="not-italic font-bold">Trusted by{' '}</em>
                <em className="italic text-golden-600 font-bold">Industry Leaders.</em>
              </motion.h1>
            </div>
          </motion.div>
        </div>

        {/* ── Frosted-glass solution cards — sit at bottom of hero ── */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.7, ease: yuccaEase }}
        >
          <div className="container-custom pb-3 sm:pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {solutions.map((solution, index) => {
                const isActive = activeSolution === index;
                return (
                  <motion.div
                    key={solution.title}
                    className="relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer h-12 sm:h-36 lg:h-40"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%) brightness(0.95)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                      background: isActive
                        ? 'linear-gradient(160deg, rgba(255,252,240,0.92) 0%, rgba(245,242,228,0.96) 100%)'
                        : 'linear-gradient(160deg, rgba(200,200,210,0.18) 0%, rgba(230,228,235,0.32) 60%, rgba(210,208,218,0.22) 100%)',
                      border: isActive
                        ? '1px solid rgba(255,255,255,0.7)'
                        : '1px solid rgba(255,255,255,0.35)',
                      boxShadow: isActive
                        ? '0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.6)'
                        : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)',
                      transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                    }}
                    onHoverStart={() => setActiveSolution(index)}
                    onHoverEnd={() => setActiveSolution(null)}
                    onTouchStart={() => setActiveSolution(activeSolution === index ? null : index)}
                    onClick={() => scrollToSection(solution.link)}
                  >
                    {/* Idle: title — centered on mobile (h-12 compact), bottom on desktop */}
                    <motion.div
                      className="absolute inset-0 sm:inset-auto sm:bottom-0 sm:left-0 sm:right-0 flex items-center sm:block px-4 sm:px-5 sm:py-4"
                      animate={{ opacity: isActive ? 0 : 1, y: isActive ? 4 : 0 }}
                      transition={{ duration: 0.3, ease: yuccaEase }}
                    >
                      <h3 className="font-body text-[13px] sm:text-[14px] font-medium text-forest-700 tracking-wide">
                        {solution.title}
                      </h3>
                      <motion.div
                        className="hidden sm:block h-px bg-golden-500 mt-1.5 origin-left"
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        initial={{ scaleX: 0 }}
                        transition={{ duration: 0.45, ease: yuccaEase }}
                      />
                    </motion.div>

                    {/* Hover/tap: content clips up — desktop only animation, mobile shows on tap */}
                    <motion.div
                      className="absolute inset-0 flex-col justify-between px-4 sm:px-5 py-4 sm:py-5 hidden sm:flex"
                      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                      animate={{
                        clipPath: isActive
                          ? 'inset(0% 0% 0% 0%)'
                          : 'inset(100% 0% 0% 0%)',
                      }}
                      transition={{ duration: 0.55, ease: yuccaEase }}
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-golden-600">
                        {solution.extra}
                      </p>

                      <div>
                        <h3 className="font-display font-semibold text-[13px] text-forest-800 leading-snug mb-1.5">
                          {solution.title}
                        </h3>
                        <p className="text-[11px] text-bark-500 leading-relaxed line-clamp-3">
                          {solution.text}
                        </p>
                      </div>

                      <div className="border-t border-black/10 pt-2 flex items-center gap-2">
                        <span className="text-[11px] font-medium text-forest-700">Tell me more</span>
                        <motion.svg
                          animate={{ x: isActive ? [0, 4, 0] : 0 }}
                          transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                          className="w-3 h-3 text-forest-700"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          MARQUEE
      ════════════════════════════════════════════════════════ */}
      <Marquee />

      {/* ════════════════════════════════════════════════════════
          STATS STRIP
      ════════════════════════════════════════════════════════ */}
      <section id="stats" className="bg-forest-700 py-16 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: yuccaEase }}
              >
                <span className="block text-4xl md:text-5xl font-display font-bold text-golden-500">
                  {item.stat}
                </span>
                <span className="block mt-2 text-white/40 text-xs uppercase tracking-[0.2em]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ABOUT TEASER
      ════════════════════════════════════════════════════════ */}
      <section id="about" className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: yuccaEase }}
              >
                About Us
              </motion.span>
              <motion.h2
                className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-forest-700 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
              >
                A Decade of{' '}
                <span className="text-golden-500">Packaging Excellence</span>
              </motion.h2>
              <motion.p
                className="mt-6 text-bark-400 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: yuccaEase }}
              >
                GOLDENSTARS PACKAGING RESOURCES CO., INC. started with a faith-filled
                vision for growth and business expansion. Over a decade of excellence in
                the packaging industry, we have become a trusted name in delivering
                world-class packaging solutions.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: yuccaEase }}
              >
                <Link to="/about" className="btn-primary group">
                  <span className="btn-fill" />
                  <span className="relative z-10">Learn More</span>
                  <span className="relative z-10">
                    <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="relative aspect-[4/5] overflow-hidden"
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: yuccaEase }}
            >
              <img
                src="/Assets/insideGoldenStars.jpg"
                alt="Inside Goldenstars Packaging facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-800/40 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES PREVIEW
      ════════════════════════════════════════════════════════ */}
      <section id="services" className="bg-forest-700 section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
            >
              Our <span className="text-golden-500">Process Flow</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Food Categories', img: '/Assets/food1.jpg', desc: 'Processing food grade ingredients from virtually every product category.' },
              { title: 'Quality Assurance', img: '/Assets/quality1.jpg', desc: 'FDA certified with the highest standards of quality, service, and integrity.' },
              { title: 'Packaging', img: '/Assets/packaging1.jpg', desc: 'Retail-size pouches, multi-wall bags, boxes, and laminated wrappers.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: yuccaEase }}
              >
                <Link to="/services" className="block h-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-700/80 via-forest-700/20 to-transparent" />
                  <div className="absolute inset-0 bg-golden-500/0 group-hover:bg-golden-500/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-golden-500 transition-colors duration-400">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-white/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="btn-outline group">
              <span className="btn-fill" />
              <span className="relative z-10">View All Services</span>
              <span className="relative z-10">
                <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════ */}
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
            Ready to <span className="text-golden-500">Elevate</span> Your Packaging?
          </motion.h2>
          <motion.p
            className="mt-4 text-white/40 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Tell us about your project and we'll create the perfect packaging solution.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: yuccaEase }}
          >
            <Link to="/contact" className="btn-primary group">
              <span className="btn-fill" />
              <span className="relative z-10">Get a Quote</span>
              <span className="relative z-10">
                <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


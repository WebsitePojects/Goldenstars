import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AnimatedText, AnimatedBorder } from '../utils/animations';

const yuccaEase = [0.22, 1, 0.36, 1];

const heroSlides = [
  {
    title: 'Quality Products with the Best Manufacturing Prices',
    subtitle: 'Innovation. Craftsmanship. Performance.',
    cta: 'Explore Our Services',
    image: '/Assets/insideGoldenStars.jpg',
  },
  {
    title: 'Innovation. Craftsmanship. Performance.',
    subtitle: 'Building long-term relationships through excellence.',
    cta: 'Discover More',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    title: 'Customer Satisfaction First',
    subtitle: 'FDA certified quality products you can trust.',
    cta: 'Contact Us Today',
    image: '/Assets/coffeePic.jpg',
  },
];

const solutions = [
  {
    title: 'Food Service',
    extra: 'Retail & Commercial',
    text: 'Your food service packaging is an extension of your brand experience. Have functional and on-brand items like cups, tubs, bowls, and more readily available for takeout, catering, and deli food. Choose standard containers, customised or designed from scratch.',
    link: '#services',
  },
  {
    title: 'Food Processing',
    extra: 'Industrial Packaging',
    text: 'Industrial-grade packaging solutions for food processing facilities. Durable, FDA-certified materials built for high-volume production lines. Laminated films, multi-layer pouches, and bulk bags tailored to your process.',
    link: '#services',
  },
  {
    title: 'Agriculture',
    extra: 'Export & Storage',
    text: 'Durable multi-wall bags and export-ready packaging for agricultural products, designed to meet international standards. Protect your harvest from field to market with moisture-resistant, stackable solutions.',
    link: '#services',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSolution, setActiveSolution] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Parallax Background with Yucca-style scale ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].image}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: yuccaEase }}
          >
            <motion.div className="absolute inset-0 -inset-y-[10%]" style={{ y: bgY }}>
              <motion.img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="h-full w-full object-cover"
                style={{ scale: bgScale }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays — Yucca-style solid color + transparency */}
        <div className="absolute inset-0 bg-forest-800/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-800/60 via-transparent to-forest-800/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-800/50 via-transparent to-transparent" />

        {/* Yucca-style diagonal golden line accents */}
        <motion.div
          className="absolute top-0 right-[20%] w-px h-[60vh] bg-gradient-to-b from-golden-500/20 via-golden-500/5 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: yuccaEase }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          className="absolute top-[15%] right-[40%] w-px h-[35vh] bg-gradient-to-b from-golden-500/10 via-golden-500/5 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: yuccaEase }}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="container-custom relative z-10 flex-1 flex flex-col justify-center pt-32 pb-8">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-text-${currentSlide}`}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Overline */}
              <motion.span
                className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: yuccaEase }}
              >
                Goldenstars Packaging
              </motion.span>

              {/* Title — Yucca-style line reveal */}
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.8, ease: yuccaEase }}
                >
                  {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                    <span key={i}>
                      {['Quality', 'Innovation.', 'Customer', 'Best'].includes(word) ? (
                        <span className="text-golden-500">{word} </span>
                      ) : (
                        <span>{word} </span>
                      )}
                    </span>
                  ))}
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                className="mt-6 text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: yuccaEase }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons — Yucca-style with fill + hover */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ delay: 0.8, duration: 0.8, ease: yuccaEase }}
          >
            <a
              href="#services"
              className="btn-primary group"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
            >
              <span className="btn-fill" />
              <span className="relative z-10">Our Services</span>
              <span className="relative z-10">
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="#about"
              className="btn-outline group"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              <span className="btn-fill" />
              <span className="relative z-10">Learn More</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Hoverable Solution Cards ── */}
      <div className="relative z-10 mt-auto">
        <div className="container-custom pb-8">
          {/* Slide indicators */}
          <div className="flex items-center gap-3 mb-6">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="group relative"
                aria-label={`Slide ${i + 1}`}
              >
                <div
                  className={`h-[2px] rounded-full transition-all duration-700 ${
                    i === currentSlide
                      ? 'w-16 bg-golden-500'
                      : 'w-8 bg-black/40 group-hover:bg-black/70'
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-xs text-black/40 font-mono tracking-wider">
              {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Solution Cards — frosted glass, no asset images, hover reveals content */}
          <div className="grid grid-cols-3 gap-2">
            {solutions.map((solution, index) => {
              const isActive = activeSolution === index;
              return (
                <motion.div
                  key={solution.title}
                  className="relative overflow-hidden rounded-2xl cursor-pointer h-44"
                  style={{
                    backdropFilter: 'blur(18px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(140%)',
                    background: isActive
                      ? 'rgba(255, 252, 240, 0.97)'
                      : 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'background 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }}
                  onHoverStart={() => setActiveSolution(index)}
                  onHoverEnd={() => setActiveSolution(null)}
                  onClick={() => scrollToSection(solution.link.replace('#', ''))}
                >
                  {/* ── IDLE: title sits at bottom-left, fades out on hover ── */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 px-5 py-5"
                    animate={{ opacity: isActive ? 0 : 1, y: isActive ? 6 : 0 }}
                    transition={{ duration: 0.3, ease: yuccaEase }}
                  >
                    <h3 className="font-body text-[15px] font-normal text-white/90 tracking-wide">
                      {solution.title}
                    </h3>
                    {/* golden underline scaleX-reveals — matches border-reveal pattern */}
                    <motion.div
                      className="h-px bg-golden-500/70 mt-2 origin-left"
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      initial={{ scaleX: 0 }}
                      transition={{ duration: 0.45, ease: yuccaEase }}
                    />
                  </motion.div>

                  {/* ── HOVER: content panel clips up from bottom ── */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-between px-5 py-5"
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                    animate={{
                      clipPath: isActive
                        ? 'inset(0% 0% 0% 0%)'
                        : 'inset(100% 0% 0% 0%)',
                    }}
                    transition={{ duration: 0.55, ease: yuccaEase }}
                  >
                    {/* top: category label */}
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-golden-600">
                      {solution.extra}
                    </p>

                    {/* mid: title + description */}
                    <div>
                      <h3 className="font-display font-semibold text-[15px] text-forest-800 leading-snug mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-[12px] text-bark-500 leading-relaxed line-clamp-3">
                        {solution.text}
                      </p>
                    </div>

                    {/* bottom: tell me more */}
                    <div className="border-t border-black/10 pt-3 flex items-center gap-2">
                      <span className="text-[12px] font-medium text-forest-700">
                        Tell me more
                      </span>
                      <motion.svg
                        animate={{ x: isActive ? [0, 4, 0] : 0 }}
                        transition={{
                          duration: 1.4,
                          repeat: isActive ? Infinity : 0,
                          ease: 'easeInOut',
                        }}
                        className="w-3.5 h-3.5 text-forest-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-golden-500 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToSection('about')}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-current"
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
}

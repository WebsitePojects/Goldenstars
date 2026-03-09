import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const yuccaEase = [0.22, 1, 0.36, 1];

const slides = [
  {
    id: 1,
    image: '/Assets/GoldenStarsGate.jpg',
    category: 'Our Facility',
    title: 'State-of-the-Art\nManufacturing',
    caption:
      'Our FDA-certified facility equipped with modern machinery and dedicated quality control.',
  },
  {
    id: 2,
    image: '/Assets/insideGoldenStars.jpg',
    category: 'Operations',
    title: 'Precision at\nEvery Step',
    caption:
      'From raw material sourcing to final packaging — every process carefully monitored.',
  },
  {
    id: 3,
    image: '/Assets/coffeePic.jpg',
    category: 'Products',
    title: 'Packaging That\nProtects & Performs',
    caption:
      'Custom solutions for food service, agriculture, and specialty product lines.',
  },
];

/* Slide animation: incoming slides in from the right (or left on back),
   existing slide clips out to the opposite side */
const slideVariants = {
  enter: (d) => ({
    clipPath: d > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
  }),
  center: {
    clipPath: 'inset(0 0% 0 0%)',
    transition: { duration: 0.85, ease: yuccaEase },
  },
  exit: (d) => ({
    clipPath: d > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
    transition: { duration: 0.85, ease: yuccaEase },
  }),
};

export default function Showcase() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((p) => (p + dir + slides.length) % slides.length);
  };

  const resetTimer = (dir) => {
    clearInterval(timerRef.current);
    go(dir);
    timerRef.current = setInterval(() => go(1), 5500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="relative h-[65vh] md:h-[75vh] overflow-hidden bg-forest-700 select-none">
      {/* ── Slides ── */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          {/* Gradient layers — vertical + horizontal, Yucca-style */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-700/85 via-forest-700/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-700/55 to-transparent" />

          {/* Slide text content */}
          <div className="absolute inset-0 flex flex-col justify-end px-8 pb-24 md:px-16 md:pb-28">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            >
              {slides[current].category}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65, ease: yuccaEase }}
              className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] whitespace-pre-line max-w-3xl"
            >
              {slides[current].title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.5 }}
              className="mt-5 text-white/45 text-base md:text-lg leading-relaxed max-w-lg"
            >
              {slides[current].caption}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Progress bar per slide ── */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-0 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => resetTimer(i > current ? 1 : -1)}
            className="relative flex-1 h-[3px] bg-white/10 overflow-hidden group"
          >
            {i === current && (
              <motion.span
                className="absolute inset-y-0 left-0 bg-golden-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5.5, ease: 'linear' }}
                key={current}
              />
            )}
            {i < current && (
              <span className="absolute inset-0 bg-golden-500/40" />
            )}
          </button>
        ))}
      </div>

      {/* ── Controls: counter + arrows ── */}
      <div className="absolute bottom-8 right-8 md:right-14 flex items-center gap-4 z-20">
        {/* Counter */}
        <span className="text-white/30 text-xs font-mono tracking-widest">
          <span className="text-white/70">{String(current + 1).padStart(2, '0')}</span>
          {' / '}
          {String(slides.length).padStart(2, '0')}
        </span>

        {/* Prev */}
        <button
          onClick={() => resetTimer(-1)}
          aria-label="Previous slide"
          className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={() => resetTimer(1)}
          aria-label="Next slide"
          className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

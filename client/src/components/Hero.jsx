import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';

const heroSlides = [
  {
    title: 'Quality Products with the Best Manufacturing Prices',
    subtitle: 'Innovation. Craftsmanship. Performance.',
    cta: 'Explore Our Services',
    image: '../../Public/Assets/insideGoldenStars.jpg',
  },
  {
    title: 'Innovation. Craftsmanship. Performance.',
    subtitle: 'Building long-term relationships through excellence.',
    cta: 'Discover More',
    image: '../../Public/Assets/GoldenStarsGate.jpg',
  },
  {
    title: 'Customer Satisfaction First',
    subtitle: 'FDA certified quality products you can trust.',
    cta: 'Contact Us Today',
    image: '../../Public/Assets/coffeePic.jpg',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-forest-800/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-800/80 via-forest-800/55 to-forest-800/30" />

        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' stroke='%23FED702' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated golden orbs */}
        <motion.div
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-golden-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Diagonal golden line accents */}
        <motion.div
          className="absolute top-0 right-[20%] w-px h-[60vh] bg-gradient-to-b from-golden-500/30 via-golden-500/5 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          className="absolute top-[15%] right-[35%] w-px h-[40vh] bg-gradient-to-b from-golden-500/20 via-golden-500/5 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-golden-500/20 bg-golden-500/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-golden-500 animate-pulse" />
              <span className="text-golden-500/80 text-xs uppercase tracking-widest font-medium">
                Packaging Excellence Since 2013
              </span>
            </motion.div>

            <div className="relative min-h-[200px] md:min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentSlide}-${heroSlides[currentSlide].title}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
                    {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                      <span key={i}>
                        {['Quality', 'Innovation.', 'Customer', 'Best'].includes(word) ? (
                          <span className="text-golden-500">{word} </span>
                        ) : (
                          <span>{word} </span>
                        )}
                      </span>
                    ))}
                  </h1>
                  <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a href="#services" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Our Services</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#about" className="btn-outline" onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <span>Learn More</span>
              </a>
            </motion.div>

            {/* Slide indicators */}
            <div className="mt-12 flex items-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="group relative"
                  aria-label={`Slide ${i + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    i === currentSlide ? 'w-12 bg-golden-500' : 'w-6 bg-white/20 group-hover:bg-white/40'
                  }`} />
                </button>
              ))}
              <span className="ml-3 text-xs text-white/30 font-mono">
                {String(currentSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right side - Stats card */}
          <motion.div
            className="lg:col-span-5 hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="glass-card p-8 golden-glow">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '10+', label: 'Years Experience' },
                  { number: '500+', label: 'Happy Clients' },
                  { number: '50+', label: 'Product Lines' },
                  { number: '100%', label: 'FDA Certified' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-white/5 hover:bg-golden-500/10 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <span className="text-2xl mb-2 block">{stat.icon}</span>
                    <span className="block text-3xl font-display font-bold text-golden-500">
                      {stat.number}
                    </span>
                    <span className="block text-xs text-white/40 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-golden-500/60 hover:text-golden-500 transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HiArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}

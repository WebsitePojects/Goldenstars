import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';

const logo = '/Assets/logo_3.png';

/* ── Intro Loader ───────────────────────────────────────────── */
function IntroLoader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-forest-700 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="text-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={logo}
            alt="Goldenstars Packaging Resources Co. Inc."
            className="h-16 md:h-20 w-auto object-contain mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="mt-8 w-48 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-golden-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.9, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-white/30 text-xs uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Packaging Excellence
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Main App ───────────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main site content - always mounted so it loads behind the loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Products />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

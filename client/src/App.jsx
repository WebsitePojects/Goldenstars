import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';

const logo = '/Assets/logo_3.png';
const yuccaEase = [0.22, 1, 0.36, 1];

/* ── Yucca-style Intro Loader ─────────────────────────────── */
function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: bar fills, 1: content reveals, 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(onComplete, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-forest-700 flex flex-col items-center justify-center"
      animate={phase === 2 ? { clipPath: 'inset(0% 0% 100% 0%)' } : { clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 0.7, ease: yuccaEase }}
    >
      {/* Logo + text */}
      <motion.img
        src={logo}
        alt="Goldenstars Packaging Resources Co. Inc."
        className="h-14 md:h-18 w-auto object-contain"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: yuccaEase }}
      />

      {/* Yucca-style loading bar */}
      <div className="mt-8 w-40 h-px bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-golden-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.p
        className="mt-5 text-white/20 text-[10px] uppercase tracking-[0.4em] font-semibold"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Packaging Excellence
      </motion.p>
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

      {/* Main site content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </motion.div>
    </>
  );
}

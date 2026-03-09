import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useAnimations';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

const yuccaEase = [0.22, 1, 0.36, 1];
const logoWithName = '/Assets/GPRCI logo with name.png';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Products', to: '/products' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const location = useLocation();
  const isScrolled = scrollY > 50;
  const isHomePage = location.pathname === '/';
  // On homepage before scroll: dark text so it reads on the light sand background
  const useDarkText = isHomePage && !isScrolled;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-forest-800/95 backdrop-blur-xl shadow-2xl shadow-black/20'
            : 'bg-transparent'
        } ${mobileOpen ? 'blur-sm pointer-events-none' : ''}`}
        initial={{ y: -100 }}
        animate={{
          y: scrollDirection === 'down' && scrollY > 400 ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: yuccaEase }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center">
              <img
                src={logoWithName}
                alt="Goldenstars Packaging Resources Co. Inc."
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav — Yucca-style with hover text swap */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    className="relative group block px-5 py-2"
                    end={link.to === '/'}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Yucca-style dual text: normal + hover */}
                        <span className="relative overflow-hidden block h-[1.4em]">
                          <span
                            className={`block text-sm font-medium uppercase tracking-widest transition-all duration-400 group-hover:-translate-y-full ${
                              isActive
                                ? 'text-golden-500'
                                : useDarkText
                                ? 'text-forest-700'
                                : 'text-white/70'
                            }`}
                          >
                            {link.name}
                          </span>
                          <span className="block text-sm font-medium uppercase tracking-widest text-golden-500 transition-all duration-400 group-hover:-translate-y-full">
                            {link.name}
                          </span>
                        </span>

                        {/* Yucca-style bottom border scaleX on hover */}
                        <span
                          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-golden-500 transition-all duration-500 origin-center ${
                            isActive ? 'w-6' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/contact"
                className="hidden lg:inline-flex btn-primary text-xs py-3 px-6 group"
              >
                <span className="btn-fill" />
                <span className="relative z-10">Get a Quote</span>
              </Link>

              <button
                className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center text-golden-500"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Yucca-style bottom border on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-golden-500/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.6, ease: yuccaEase }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.header>

      {/* Mobile Menu — Yucca-style full panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop — covers header too since z-[55] > header z-50 */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-forest-800 border-l border-golden-500/10 z-[60]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: yuccaEase }}
            >
              {/* Close button inside the panel */}
              <button
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-golden-500 transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={22} />
              </button>
              <div className="flex flex-col justify-center h-full px-8 py-16">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className="group relative block py-4"
                        onClick={() => setMobileOpen(false)}
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`text-2xl font-display font-bold transition-colors duration-400 ${
                                isActive
                                  ? 'text-golden-500'
                                  : 'text-white/70 group-hover:text-golden-400'
                              }`}
                            >
                              {link.name}
                            </span>
                            <span className="absolute bottom-0 left-0 right-0 h-px bg-white/5 group-hover:bg-golden-500/30 transition-colors duration-500" />
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-10 pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center group"
                  >
                    <span className="btn-fill" />
                    <span className="relative z-10">Get a Quote</span>
                  </Link>

                  <div className="mt-6 space-y-2 text-sm text-white/40">
                    <p>sales.marketing@goldenstars.com.ph</p>
                    <p>875-5134 / 428-2167</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

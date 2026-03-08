import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useAnimations';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

const logoWithName = '/Assets/GPRCI logo with name.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Products', href: '#products' },
  { name: 'News', href: '#news' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollDirection, scrollY } = useScrollDirection();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-forest-800/95 backdrop-blur-xl shadow-2xl shadow-black/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{
          y: scrollDirection === 'down' && scrollY > 400 ? -100 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="relative z-10 flex items-center"
            >
              <img
                src={logoWithName}
                alt="Goldenstars Packaging Resources Co. Inc."
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-5 py-2 text-sm font-medium uppercase tracking-widest transition-colors duration-300 group ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-golden-500'
                        : 'text-white/70 hover:text-golden-400'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-golden-500 transition-all duration-500 ${
                        activeSection === link.href.replace('#', '')
                          ? 'w-6'
                          : 'w-0 group-hover:w-4'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="hidden lg:inline-flex btn-primary text-xs py-3 px-6"
              >
                <span>Get a Quote</span>
              </a>

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
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-forest-800 border-l border-golden-500/10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col justify-center h-full px-8 py-20">
                <ul className="space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={`block py-3 text-2xl font-display font-semibold transition-colors ${
                          activeSection === link.href.replace('#', '')
                            ? 'text-golden-500'
                            : 'text-white/70 hover:text-golden-400'
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-10 pt-8 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    <span>Get a Quote</span>
                  </a>
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

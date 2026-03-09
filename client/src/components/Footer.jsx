import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowUp } from 'lucide-react';

const yuccaEase = [0.22, 1, 0.36, 1];

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Process', to: '/services' },
    { label: 'Products', to: '/products' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: [
    { label: 'Food Packaging', to: '/services' },
    { label: 'Agricultural Packaging', to: '/services' },
    { label: 'Custom Solutions', to: '/services' },
    { label: 'Quality Assurance', to: '/services' },
  ],
  Support: [
    { label: 'FAQ', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms & Conditions', to: '#' },
  ],
};

const socialLinks = [
  {
    icon: <Facebook className="w-4 h-4" />,
    href: 'https://web.facebook.com/Goldenstars-Packaging-479208999223383/',
    label: 'Facebook',
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    href: 'https://www.instagram.com/goldenstarph/',
    label: 'Instagram',
  },
  {
    icon: <Twitter className="w-4 h-4" />,
    href: 'https://twitter.com/Goldenstar_PH',
    label: 'Twitter',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-forest-700 text-white overflow-hidden">
      {/* Yucca-style thin golden accent line */}
      <div className="h-px bg-golden-500" />

      {/* ── Top area: large brand heading + back-to-top ── */}
      <div className="container-custom pt-16 md:pt-20 pb-12">
        <div className="flex items-start justify-between gap-8">
          <div>
            <Link to="/" className="inline-block group">
              <span className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                <span className="text-golden-500">GOLDEN</span>
                <span className="text-white group-hover:text-golden-500 transition-colors duration-400">STARS</span>
              </span>
            </Link>
            <p className="mt-4 text-white/30 text-sm leading-relaxed max-w-sm">
              Providing innovative, quality, and safe packaging solutions.
              Driven by faith, fueled by excellence.
            </p>
          </div>

          {/* Yucca-style back-to-top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 shrink-0"
            aria-label="Scroll to top"
          >
            <span className="text-white/30 text-xs uppercase tracking-wider hidden sm:block group-hover:text-golden-500 transition-colors duration-300">
              Back to Top
            </span>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-golden-500 group-hover:text-forest-700 group-hover:border-golden-500 transition-all duration-400">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* ── Yucca-style border separator ── */}
      <div className="container-custom">
        <div className="h-px bg-white/10" />
      </div>

      {/* ── Link columns ── */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Social column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
              Connect
            </h4>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:bg-golden-500 hover:text-forest-700 hover:border-golden-500 transition-all duration-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group/link flex items-center gap-1.5 text-white/40 text-sm hover:text-golden-500 transition-colors duration-300"
                    >
                      <span className="w-0 group-hover/link:w-3 h-px bg-golden-500 transition-all duration-400" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar — Yucca-style ── */}
      <div className="container-custom">
        <div className="h-px bg-white/10" />
      </div>
      <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-xs">
          &copy; {new Date().getFullYear()} Goldenstars Packaging Resources Co, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/20 text-xs hover:text-golden-500 transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-white/20 text-xs hover:text-golden-500 transition-colors duration-300">
            Terms
          </a>
        </div>
      </div>

      {/* Large background text — Yucca style */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <span className="block text-[8vw] font-display font-bold text-white/[0.02] leading-none whitespace-nowrap text-center">
          GOLDENSTARS PACKAGING
        </span>
      </div>
    </footer>
  );
}

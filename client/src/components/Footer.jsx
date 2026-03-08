import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, ArrowUp } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'Food Packaging', href: '#services' },
    { label: 'Agricultural Packaging', href: '#services' },
    { label: 'Custom Solutions', href: '#services' },
    { label: 'Quality Assurance', href: '#services' },
  ],
  Support: [
    { label: 'FAQ', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
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
      {/* Top golden accent */}
      <div className="h-1 bg-gradient-to-r from-golden-400 via-golden-500 to-golden-400" />

      {/* Main footer content */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a href="#home" className="inline-block mb-6">
              <span className="text-2xl font-display font-bold tracking-tight">
                <span className="text-golden-500">GOLDEN</span>
                <span className="text-white">STARS</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Providing innovative, quality, and safe packaging solutions.
              Driven by faith, fueled by excellence. Your trusted partner in
              packaging since day one.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-golden-500 hover:text-forest-700 hover:border-golden-500 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={title} className={`lg:col-span-2 ${index === 0 ? 'lg:col-start-6' : ''}`}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/70 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 text-sm hover:text-golden-500 transition-colors duration-300 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-golden-500 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Goldenstars Packaging Resources Co, Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 text-xs hover:text-golden-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs hover:text-golden-500 transition-colors">
              Terms
            </a>

            {/* Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-golden-500 hover:text-forest-700 hover:border-golden-500 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <span className="block text-[10vw] font-display font-bold text-white/[0.015] leading-none whitespace-nowrap text-center">
          GOLDENSTARS PACKAGING
        </span>
      </div>
    </footer>
  );
}

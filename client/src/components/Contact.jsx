import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll, AnimatedBorder } from '../utils/animations';
import axios from 'axios';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from 'react-icons/hi';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const yuccaEase = [0.22, 1, 0.36, 1];

const contactInfo = [
  {
    icon: <HiOutlineLocationMarker className="w-5 h-5" />,
    title: 'Visit Us',
    lines: [
      '1 Don Faustino St., Don Antonio Heights,',
      'Brgy. Holy Spirit, Quezon City',
    ],
  },
  {
    icon: <HiOutlinePhone className="w-5 h-5" />,
    title: 'Call Us',
    lines: ['875-5134 / 428-2167', '430-5177 / 287-2370'],
  },
  {
    icon: <HiOutlineMail className="w-5 h-5" />,
    title: 'Email Us',
    lines: ['sales.marketing@goldenstars.com.ph'],
    link: 'mailto:sales.marketing@goldenstars.com.ph',
  },
];

const socials = [
  {
    icon: <Facebook className="w-4 h-4" />,
    name: 'Facebook',
    href: 'https://web.facebook.com/Goldenstars-Packaging-479208999223383/',
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    name: 'Instagram',
    href: 'https://www.instagram.com/goldenstarph/',
  },
  {
    icon: <Twitter className="w-4 h-4" />,
    name: 'Twitter',
    href: 'https://twitter.com/Goldenstar_PH',
  },
];

/* Yucca-style underline input */
function YuccaInput({ label, ...props }) {
  return (
    <div className="relative group">
      <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-forest-700/40 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-transparent border-0 border-b border-gray-200 py-3 text-forest-700 placeholder:text-bark-300/60 focus:outline-none focus:border-golden-500 transition-colors duration-400 text-base"
      />
      <span className="absolute bottom-0 left-0 w-full h-px bg-golden-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden">
      {/* ── Yucca-style parallax top band (dark) ── */}
      <div className="relative py-20 md:py-28 bg-forest-700 overflow-hidden">
        <motion.div className="absolute inset-0 -inset-y-[15%]" style={{ y: bgY }}>
          <img
            src="/Assets/GoldenStarsGate.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </motion.div>
        <div className="absolute inset-0 bg-forest-700/90" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <div>
              <RevealOnScroll>
                <span className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                  Get In Touch
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Let's{' '}
                  <span className="text-golden-500">Talk</span>
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.2}>
              <p className="text-white/40 text-lg leading-relaxed">
                Be updated and stay connected to us. We'd love to hear about
                your packaging needs and help bring your vision to life.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* ── Main contact section (light) ── */}
      <div className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left: Contact Info — Yucca-style with dot accents */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <RevealOnScroll key={item.title} delay={index * 0.1}>
                    <div className="group flex gap-4">
                      <div className="w-10 h-10 border border-golden-500/20 flex items-center justify-center text-golden-500 shrink-0 group-hover:bg-golden-500 group-hover:text-forest-700 transition-all duration-400">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-forest-700 text-base mb-1">
                          {item.title}
                        </h4>
                        {item.lines.map((line, i) =>
                          item.link ? (
                            <a
                              key={i}
                              href={item.link}
                              className="block text-bark-400 text-sm hover:text-golden-600 transition-colors duration-300"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={i} className="text-bark-400 text-sm leading-relaxed">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                    {index < contactInfo.length - 1 && (
                      <div className="h-px bg-gray-100 mt-8" />
                    )}
                  </RevealOnScroll>
                ))}
              </div>

              {/* Social — Yucca-style border icons */}
              <RevealOnScroll delay={0.4}>
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-bark-300 block mb-4">
                    Follow Us
                  </span>
                  <div className="flex gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-gray-200 flex items-center justify-center text-bark-400 hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-all duration-400"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Embedded Google Map */}
              <RevealOnScroll delay={0.5}>
                <div className="mt-10 relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.5208409966667!2d121.0777387!3d14.6831127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0aa92a13ff7%3A0xac998557a32a304a!2sGOLDENSTARS%20PACKAGING%20RESOURCES%20CO.%2C%20INC!5e0!3m2!1sen!2sph!4v1773017081139!5m2!1sen!2sph"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full"
                    title="Goldenstars Packaging Map"
                  />
                </div>
              </RevealOnScroll>
            </div>

            {/* Right: Contact Form — Yucca-style with underline inputs */}
            <div className="lg:col-span-3">
              <RevealOnScroll delay={0.2}>
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display font-bold text-2xl text-forest-700 mb-2">
                    Send a Message
                  </h3>
                  <p className="text-bark-300 text-sm mb-10">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <YuccaInput
                      label="Name *"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                    <YuccaInput
                      label="Email *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                    />
                  </div>

                  <div className="mt-8">
                    <YuccaInput
                      label="Subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div className="mt-8 relative group">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-forest-700/40 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your packaging needs..."
                      className="w-full bg-transparent border-0 border-b border-gray-200 py-3 text-forest-700 placeholder:text-bark-300/60 focus:outline-none focus:border-golden-500 transition-colors duration-400 text-base resize-none"
                    />
                    <span className="absolute bottom-0 left-0 w-full h-px bg-golden-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                  </div>

                  {/* Status messages */}
                  <AnimatePresence>
                    {status && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: yuccaEase }}
                        className="mt-6"
                      >
                        {status === 'success' && (
                          <p className="text-green-700 text-sm font-medium border border-green-200 bg-green-50/50 px-4 py-3">
                            Your message has been sent! We will be in touch soon.
                          </p>
                        )}
                        {status === 'error' && (
                          <p className="text-red-700 text-sm font-medium border border-red-200 bg-red-50/50 px-4 py-3">
                            Something went wrong. Please try again later.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-10 flex items-center justify-between">
                    <p className="text-bark-300 text-xs">* Required fields</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary group disabled:opacity-50"
                    >
                      <span className="btn-fill" />
                      <span className="relative z-10">
                        {status === 'sending' ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          'Submit Message'
                        )}
                      </span>
                      {status !== 'sending' && (
                        <span className="relative z-10">
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

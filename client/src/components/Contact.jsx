import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../utils/animations';
import axios from 'axios';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
} from 'react-icons/hi';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const contactInfo = [
  {
    icon: <HiOutlineLocationMarker className="w-6 h-6" />,
    title: 'Visit Us',
    lines: [
      '1 Don Faustino St., Don Antonio Heights,',
      'Brgy. Holy Spirit, Quezon City',
    ],
  },
  {
    icon: <HiOutlinePhone className="w-6 h-6" />,
    title: 'Call Us',
    lines: ['875-5134 / 428-2167', '430-5177 / 287-2370'],
  },
  {
    icon: <HiOutlineMail className="w-6 h-6" />,
    title: 'Email Us',
    lines: ['sales.marketing@goldenstars.com.ph'],
    link: 'mailto:sales.marketing@goldenstars.com.ph',
  },
];

const socials = [
  {
    icon: <Facebook className="w-5 h-5" />,
    name: 'Facebook',
    href: 'https://web.facebook.com/Goldenstars-Packaging-479208999223383/',
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    name: 'Instagram',
    href: 'https://www.instagram.com/goldenstarph/',
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    name: 'Twitter',
    href: 'https://twitter.com/Goldenstar_PH',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

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
    <section id="contact" className="relative section-padding bg-white overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-golden-500/30 to-transparent" />

      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-golden-50/50 to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <RevealOnScroll>
            <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Get In Touch
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-forest-700 leading-tight">
              Contact <span className="text-gradient">Us</span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-4 text-bark-400 text-lg">
              Be updated and stay connected to us. We'd love to hear from you.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((item, index) => (
              <RevealOnScroll key={item.title} delay={index * 0.1}>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-golden-500/10 text-golden-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-forest-700 text-lg mb-1">
                      {item.title}
                    </h4>
                    {item.lines.map((line, i) =>
                      item.link ? (
                        <a
                          key={i}
                          href={item.link}
                          className="block text-bark-400 hover:text-golden-600 transition-colors"
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
              </RevealOnScroll>
            ))}

            {/* Social */}
            <RevealOnScroll delay={0.4}>
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-display font-bold text-forest-700 text-lg mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-forest-700 text-white flex items-center justify-center hover:bg-golden-500 hover:text-forest-700 transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Map placeholder */}
            <RevealOnScroll delay={0.5}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-bark-300">
                  <div className="text-center">
                    <HiOutlineLocationMarker className="w-12 h-12 mx-auto mb-3 text-golden-500" />
                    <p className="text-sm font-semibold text-bark-400">
                      Quezon City, Philippines
                    </p>
                    <p className="text-xs text-bark-300 mt-1">Map integration available</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <RevealOnScroll delay={0.2}>
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-100/50"
              >
                <h3 className="font-display font-bold text-2xl text-forest-700 mb-8">
                  Send a Message
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-bark-400">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-700 placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-golden-500/40 focus:border-golden-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-bark-400">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-700 placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-golden-500/40 focus:border-golden-500 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-bark-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-700 placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-golden-500/40 focus:border-golden-500 transition-all"
                  />
                </div>

                <div className="mt-6 space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-bark-400">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your packaging needs..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-700 placeholder:text-bark-300 focus:outline-none focus:ring-2 focus:ring-golden-500/40 focus:border-golden-500 transition-all resize-none"
                  />
                </div>

                {/* Status messages */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      {status === 'success' && (
                        <p className="text-green-600 text-sm font-medium bg-green-50 px-4 py-3 rounded-xl">
                          Your message has been sent! We will be in touch soon.
                        </p>
                      )}
                      {status === 'error' && (
                        <p className="text-red-600 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
                          Something went wrong. Please try again later.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between">
                  <p className="text-bark-300 text-xs">
                    * Required fields
                  </p>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Submit Message</span>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

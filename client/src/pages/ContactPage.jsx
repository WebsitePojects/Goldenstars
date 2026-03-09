import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../utils/animations';
import axios from 'axios';
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiArrowRight,
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

function FormField({ label, required, children }) {
  return (
    <div className="relative group">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-700/50 mb-2">
        {label}
        {required && <span className="text-golden-600 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function FormInput({ label, required, ...props }) {
  return (
    <FormField label={label} required={required}>
      <div className="relative">
        <input
          {...props}
          className="w-full bg-bark-50/60 border border-gray-200 px-4 py-3.5 text-forest-700 text-sm placeholder:text-bark-300/70 focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300"
        />
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-golden-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
      </div>
    </FormField>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <div>
      {/* ── Page Hero Banner ── */}
      <section className="relative h-[52vh] min-h-[420px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Assets/GoldenStarsGate.jpg"
            alt="Contact Goldenstars"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-700/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-800/95 via-forest-700/30 to-transparent" />
        </div>
        <div className="relative z-10 container-custom pb-14">
          <motion.span
            className="inline-flex items-center gap-2 text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: yuccaEase }}
          >
            <span className="w-6 h-px bg-golden-500 inline-block" />
            Get In Touch
          </motion.span>
          <motion.h1
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
          >
            Let's <span className="text-golden-500">Talk</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-white/50 text-base max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Be updated and stay connected to us. We'd love to hear about your
            packaging needs and help bring your vision to life.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-5 min-h-[700px]">

          {/* ── Left Dark Panel: Contact Info ── */}
          <div className="lg:col-span-2 bg-forest-700 relative overflow-hidden">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FED702 0, #FED702 1px, transparent 0, transparent 50%)', backgroundSize: '18px 18px' }}
            />
            {/* Gold accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-golden-500 via-golden-400 to-golden-600" />

            <div className="relative z-10 px-8 md:px-12 py-16 flex flex-col h-full">
              <RevealOnScroll delay={0}>
                <div className="mb-12">
                  <span className="inline-block text-golden-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                    Contact Information
                  </span>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-white leading-snug">
                    We're Here<br />to Help You
                  </h2>
                  <p className="mt-3 text-white/40 text-sm leading-relaxed max-w-xs">
                    Reach out through any channel and our team will respond within one business day.
                  </p>
                </div>
              </RevealOnScroll>

              <div className="space-y-0 flex-1">
                {contactInfo.map((item, index) => (
                  <RevealOnScroll key={item.title} delay={index * 0.12}>
                    <div className="group flex gap-4 py-6 border-b border-white/10 last:border-0">
                      <div className="w-10 h-10 bg-golden-500/10 border border-golden-500/20 flex items-center justify-center text-golden-400 shrink-0 group-hover:bg-golden-500 group-hover:text-forest-700 group-hover:border-golden-500 transition-all duration-400">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white/90 text-sm mb-1 tracking-wide">
                          {item.title}
                        </h4>
                        {item.lines.map((line, i) =>
                          item.link ? (
                            <a
                              key={i}
                              href={item.link}
                              className="block text-white/50 text-sm hover:text-golden-400 transition-colors duration-300 leading-relaxed"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={i} className="text-white/50 text-sm leading-relaxed">
                              {line}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <RevealOnScroll delay={0.45}>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block mb-4">
                    Follow Us
                  </span>
                  <div className="flex gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:bg-golden-500 hover:text-forest-700 hover:border-golden-500 transition-all duration-400"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-3 bg-white px-8 md:px-14 lg:px-16 py-16">
            <RevealOnScroll delay={0.1}>
              <div className="max-w-2xl">
                <span className="inline-block text-golden-600 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                  Send a Message
                </span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-forest-700 mb-2 leading-snug">
                  How Can We Help?
                </h2>
                <p className="text-bark-300 text-sm mb-10 leading-relaxed">
                  Fill out the form below and a member of our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Full Name"
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan dela Cruz"
                    />
                    <FormInput
                      label="Email Address"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Row 2: Company + Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormInput
                      label="Company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                    <FormInput
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+63 912 345 6789"
                    />
                  </div>

                  {/* Row 3: Subject */}
                  <FormInput
                    label="Subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />

                  {/* Row 4: Message */}
                  <FormField label="Message" required>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your packaging needs, quantities, materials, or any specific requirements..."
                        className="w-full bg-bark-50/60 border border-gray-200 px-4 py-3.5 text-forest-700 text-sm placeholder:text-bark-300/70 focus:outline-none focus:border-golden-500 focus:bg-white transition-all duration-300 resize-none"
                      />
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-golden-500 origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
                    </div>
                  </FormField>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status && status !== 'sending' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: yuccaEase }}
                      >
                        {status === 'success' && (
                          <div className="flex items-start gap-3 border border-green-200 bg-green-50 px-5 py-4">
                            <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                              <p className="text-green-800 text-sm font-semibold">Message Sent Successfully</p>
                              <p className="text-green-700 text-xs mt-0.5">Thank you for reaching out. We'll be in touch within one business day.</p>
                            </div>
                          </div>
                        )}
                        {status === 'error' && (
                          <div className="flex items-start gap-3 border border-red-200 bg-red-50 px-5 py-4">
                            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="text-red-800 text-sm font-semibold">Submission Failed</p>
                              <p className="text-red-700 text-xs mt-0.5">Something went wrong. Please try again or contact us directly.</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Row */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-bark-300/70 text-xs">
                      <span className="text-golden-600">*</span> Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary group disabled:opacity-60 disabled:cursor-not-allowed"
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
                          'Submit Inquiry'
                        )}
                      </span>
                      {status !== 'sending' && (
                        <span className="relative z-10">
                          <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ── Full-Width Map Section ── */}
      <section className="w-full">
        {/* Label bar — sits above the map, never overlaps it */}
        <div className="bg-forest-700 px-6 py-3 flex items-center gap-3">
          <HiOutlineLocationMarker className="w-4 h-4 text-golden-400" />
          <span className="text-white text-xs font-semibold uppercase tracking-[0.2em]">Our Location</span>
          <span className="text-white/30 text-xs mx-1">—</span>
          <span className="text-white/60 text-xs">Don Antonio Heights, Quezon City</span>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.5208409966667!2d121.0777387!3d14.6831127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b0aa92a13ff7%3A0xac998557a32a304a!2sGOLDENSTARS%20PACKAGING%20RESOURCES%20CO.%2C%20INC!5e0!3m2!1sen!2sph!4v1773017081139!5m2!1sen!2sph"
          width="100%"
          height="480"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Goldenstars Packaging Location"
        />
      </section>
    </div>
  );
}

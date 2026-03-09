import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll, AnimatedBorder, ClipRevealCard } from '../utils/animations';
import {
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineCog,
  HiOutlineArchive,
  HiOutlineTruck,
} from 'react-icons/hi';
import { Utensils, FlaskConical } from 'lucide-react';

const yuccaEase = [0.22, 1, 0.36, 1];

const processSteps = [
  {
    id: 1,
    title: 'Food Categories',
    icon: <Utensils className="w-5 h-5" />,
    description:
      'We work with and process food grade ingredients from virtually every product category. Our processing expertise, flexible equipment, and industry connections make your best option for food products of all kinds.',
  },
  {
    id: 2,
    title: 'R & D',
    icon: <FlaskConical className="w-5 h-5" />,
    description:
      'We continue to add value for our customers by investing in innovation laboratories. Our experienced personnel can help you create new or improved ingredients, solve production challenges, and get the maximum benefit.',
  },
  {
    id: 3,
    title: 'Quality',
    icon: <HiOutlineClipboardCheck className="w-5 h-5" />,
    description:
      'Quality is our top priority, nothing less. We are FDA certified and we aim to achieve further certification to validate this priority.',
  },
  {
    id: 4,
    title: 'Purchasing',
    icon: <HiOutlineShoppingCart className="w-5 h-5" />,
    description:
      'We can save you money and improve turnaround time by purchasing raw ingredients on your behalf. We hold all suppliers to the highest quality standards.',
  },
  {
    id: 5,
    title: 'Ingredient Storage',
    icon: <HiOutlineBeaker className="w-5 h-5" />,
    description:
      'Store ingredients for on-demand production. We ensure careful segregation of allergens and raw materials with dedicated personnel and docks.',
  },
  {
    id: 6,
    title: 'Processing',
    icon: <HiOutlineCog className="w-5 h-5" />,
    description:
      "A recipe only works if you follow it. We provide a processing profile for every project and give you complete control of the manufacturing steps.",
  },
  {
    id: 7,
    title: 'Packaging',
    icon: <HiOutlineCube className="w-5 h-5" />,
    description:
      'Tell us the packaging you want, or let us procure the best options. Configurations include retail-size pouches, multi-wall bags, boxes, and laminated wrappers.',
  },
  {
    id: 8,
    title: 'Warehousing',
    icon: <HiOutlineArchive className="w-5 h-5" />,
    description:
      'We offer warehousing for inbound raw materials and outbound storage of finished goods. Each position is designated and labeled for tracking.',
  },
  {
    id: 9,
    title: 'Shipping',
    icon: <HiOutlineTruck className="w-5 h-5" />,
    description:
      'Let us handle your logistics. We receive and ship ingredients and packaging, always going the extra mile to protect your product.',
  },
];

export default function Services() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-forest-700"
    >
      {/* ── Yucca-style parallax background image ── */}
      <motion.div className="absolute inset-0 -inset-y-[15%]" style={{ y: bgY }}>
        <img
          src="/Assets/GoldenStarsGate.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest-700/95" />

      <div className="relative z-10 section-padding">
        <div className="container-custom">
          {/* ── Section Header ── */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16">
            <div>
              <RevealOnScroll>
                <span className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                  Our Process
                </span>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  Manufacturing{' '}
                  <span className="text-golden-500">Process Flow</span>
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delay={0.2}>
              <p className="text-white/40 text-lg leading-relaxed">
                From concept to delivery, every step is precision-engineered to
                ensure the highest quality standards for your products.
              </p>
            </RevealOnScroll>
          </div>

          <AnimatedBorder className="bg-white/10 mb-0" />

          {/* ── Yucca-style FAQ/Accordion for process steps ── */}
          <div>
            {processSteps.map((step, index) => (
              <div key={step.id}>
                <div
                  className="group cursor-pointer py-6 md:py-8"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left: number + title */}
                    <div className="flex items-center gap-4 md:gap-6 flex-1">
                      <span className="text-golden-500/40 text-xs font-mono w-6 shrink-0">
                        {String(step.id).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-golden-500 shrink-0">{step.icon}</span>
                        <h3 className={`font-display font-bold text-lg md:text-xl transition-colors duration-400 ${
                          openAccordion === index ? 'text-golden-500' : 'text-white group-hover:text-golden-500'
                        }`}>
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Yucca-style toggle (+/- lines) */}
                    <div className="w-8 h-8 flex items-center justify-center shrink-0 relative">
                      <span className="block w-4 h-[1.5px] bg-white/50 group-hover:bg-golden-500 transition-colors duration-400" />
                      <motion.span
                        className="absolute block w-4 h-[1.5px] bg-white/50 group-hover:bg-golden-500 transition-colors duration-400"
                        animate={{ rotate: openAccordion === index ? 0 : 90 }}
                        transition={{ duration: 0.3, ease: yuccaEase }}
                      />
                    </div>
                  </div>

                  {/* Expandable content */}
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: yuccaEase }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-10 md:pl-[70px] grid md:grid-cols-2 gap-6 items-start">
                          <p className="text-white/50 text-base leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex justify-end">
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 text-golden-500 font-semibold text-sm uppercase tracking-wider group/link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Get Started</span>
                              <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Border line */}
                <div className="h-px bg-white/10" />
              </div>
            ))}
          </div>

          {/* ── Yucca-style CTA band ── */}
          <RevealOnScroll delay={0.2}>
            <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 border border-white/10">
              <div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                  Need a <span className="text-golden-500">Custom Solution</span>?
                </h3>
                <p className="mt-2 text-white/40">
                  Tell us about your project and we'll create the perfect packaging.
                </p>
              </div>
              <a href="#contact" className="btn-primary group shrink-0">
                <span className="btn-fill" />
                <span className="relative z-10">Contact Us</span>
                <span className="relative z-10">
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </RevealOnScroll>

          {/* ── Yucca-style Standards list ── */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-16">
              <span className="inline-block text-golden-500/60 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                Factory & Product Standards
              </span>
              <div className="flex flex-wrap gap-3">
                {['FDA Certified', 'ISO Standards', 'HACCP', 'GMP Compliant', 'Food Safe', 'Export Quality'].map((standard) => (
                  <span
                    key={standard}
                    className="px-4 py-2 border border-white/10 text-white/40 text-xs uppercase tracking-wider hover:border-golden-500/30 hover:text-golden-500 transition-all duration-400"
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

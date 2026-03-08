import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../utils/animations';
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

const processSteps = [
  {
    id: 1,
    title: 'Food Categories',
    icon: <Utensils className="w-5 h-5" />,
    description:
      'We work with and process food grade ingredients from virtually every product category. Our processing expertise, flexible equipment, and industry connections make your best option for food products of all kinds. We stand behind you with the highest levels of quality, service and exactly the amount of support you need.',
    color: 'bg-golden-500',
  },
  {
    id: 2,
    title: 'R & D',
    icon: <FlaskConical className="w-5 h-5" />,
    description:
      'We continue to add value for our customers in this area by investing on innovation laboratories. Our experienced personnel can help you create new or improved ingredients, solve production challenges, and get the maximum benefit from your product.',
    color: 'bg-teal-500',
  },
  {
    id: 3,
    title: 'Quality',
    icon: <HiOutlineClipboardCheck className="w-5 h-5" />,
    description:
      'Quality is our top priority, nothing less. We are FDA certified and we aim to achieve further certification to validate this priority.',
    color: 'bg-golden-600',
  },
  {
    id: 4,
    title: 'Purchasing',
    icon: <HiOutlineShoppingCart className="w-5 h-5" />,
    description:
      'We can save you money and improve turnaround time by purchasing raw ingredients on your behalf. We hold all suppliers to the highest quality standards to ensure you receive the finished product to your exact specifications. From toll processing to partial or full turnkey purchasing, we\'ve got you covered.',
    color: 'bg-bark-400',
  },
  {
    id: 5,
    title: 'Ingredient Storage',
    icon: <HiOutlineBeaker className="w-5 h-5" />,
    description:
      'Store ingredients for on-demand production to improve the efficiency and profitability of your business. We ensure careful segregation of allergens and raw materials. Each location uses dedicated personnel and docks for an added layer of security.',
    color: 'bg-teal-600',
  },
  {
    id: 6,
    title: 'Processing',
    icon: <HiOutlineCog className="w-5 h-5" />,
    description:
      "A recipe only works if you follow it. That's why we provide a processing profile for every project and give you complete control of the manufacturing steps. From our internal new product meeting through delivery of finished goods, we only do what you tell us to do, and never veer from your directives.",
    color: 'bg-golden-500',
  },
  {
    id: 7,
    title: 'Packaging',
    icon: <HiOutlineCube className="w-5 h-5" />,
    description:
      'Tell us the packaging you want, or let us procure the best options for your product. Configurations include retail-size pouches, multi-wall bags, boxes, surface printed wrappers, laminated wrappers, trade or commercial boxes and shipping box. Our efficient solutions can easily integrate with your production line.',
    color: 'bg-bark-500',
  },
  {
    id: 8,
    title: 'Warehousing',
    icon: <HiOutlineArchive className="w-5 h-5" />,
    description:
      'We offer warehousing services not only on inbound shipments of raw materials, but also outbound storage of finished goods at both of our facilities. Each warehouse storage position is designated and labeled for identification and tracking.',
    color: 'bg-teal-500',
  },
  {
    id: 9,
    title: 'Shipping',
    icon: <HiOutlineTruck className="w-5 h-5" />,
    description:
      'Let us worry on your logistics. We can receive and ship ingredients and packaging. We always go the extra mile to protect your product, maintaining rigorous standards of cleanliness to safeguard finished goods.',
    color: 'bg-golden-600',
  },
];

export default function Services() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="services" className="relative section-padding bg-forest-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(254,215,2,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative golden arcs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-golden-500/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-golden-500/5" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
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
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 text-white/50 text-lg leading-relaxed">
              From concept to delivery, every step is precision-engineered to
              ensure the highest quality standards for your products.
            </p>
          </RevealOnScroll>
        </div>

        {/* Process Timeline - Horizontal stepper (desktop) */}
        <RevealOnScroll delay={0.3}>
          <div className="hidden lg:flex items-center justify-between mb-12 px-4">
            {processSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step circle */}
                <button
                  onClick={() => setActiveStep(index)}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 shrink-0 ${
                    index === activeStep
                      ? 'border-golden-500 bg-golden-500 text-forest-700 scale-110'
                      : index < activeStep
                      ? 'border-golden-500/40 bg-golden-500/20 text-golden-500'
                      : 'border-white/20 bg-transparent text-white/40 hover:border-golden-500/40'
                  }`}
                >
                  {step.icon}
                  {/* Label below */}
                  <span
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 ${
                      index === activeStep ? 'text-golden-500' : 'text-white/30'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>

                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-golden-500/50"
                      initial={{ width: '0%' }}
                      animate={{ width: index < activeStep ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Mobile step selector */}
        <div className="lg:hidden mb-8 flex flex-wrap gap-2 justify-center">
          {processSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                index === activeStep
                  ? 'bg-golden-500 text-forest-700'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {step.icon}
              <span className="hidden sm:inline">{step.title}</span>
              <span className="sm:hidden">{step.id}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="mt-16 lg:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Left: visual card */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-bark-600/30 to-forest-600/30 border border-white/10">
                  {/* Step number large */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[12rem] md:text-[16rem] font-display font-bold text-white/[0.03] select-none leading-none">
                      {String(processSteps[activeStep].id).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Center icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`w-24 h-24 rounded-3xl ${processSteps[activeStep].color} flex items-center justify-center text-forest-700 mb-6 shadow-xl`}>
                      <span className="scale-[2.5]">{processSteps[activeStep].icon}</span>
                    </div>
                    <h3 className="text-white font-display font-bold text-2xl">
                      {processSteps[activeStep].title}
                    </h3>
                  </div>
                  {/* Progress indicator */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-2">
                    <span className="text-white/30 text-xs font-mono">
                      {String(activeStep + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-golden-500"
                        initial={{ width: '0%' }}
                        animate={{
                          width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <span className="text-white/30 text-xs font-mono">
                      {String(processSteps.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: text content */}
              <div>
                <span className="inline-block text-golden-500/70 text-xs font-mono uppercase tracking-widest mb-4">
                  Step {String(processSteps[activeStep].id).padStart(2, '0')} / {String(processSteps.length).padStart(2, '0')}
                </span>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
                  {processSteps[activeStep].title}
                </h3>
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {processSteps[activeStep].description}
                </p>

                {/* Navigation buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-golden-500 hover:text-golden-500 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
                    disabled={activeStep === processSteps.length - 1}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-golden-500 hover:text-golden-500 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <a
                    href="#contact"
                    className="ml-auto btn-primary text-sm"
                  >
                    <span>Get Started</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

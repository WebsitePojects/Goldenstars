import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import {
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
  HiOutlineShoppingCart,
  HiOutlineCube,
  HiOutlineCog,
  HiOutlineArchive,
  HiOutlineTruck,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { Utensils, FlaskConical } from 'lucide-react';
import { RevealOnScroll, AnimatedBorder } from '../utils/animations';

const yuccaEase = [0.22, 1, 0.36, 1];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

/* ── Tab data matching the reference home-tabs ── */
const processTabs = [
  {
    id: 'food-categories',
    title: 'Food Categories',
    icon: <Utensils className="w-4 h-4" />,
    description:
      'We work with and process food grade ingredients from virtually every product category. Our processing expertise, flexible equipment, and industry connections make your best option for food products of all kinds. We stand behind you with the highest levels of quality, service and exactly the amount of support you need.',
    images: ['/Assets/food1.jpg', '/Assets/food2.jpg', '/Assets/food3.jpg'],
    bgImage: '/Assets/food1.jpg',
  },
  {
    id: 'rnd',
    title: 'R & D',
    icon: <FlaskConical className="w-4 h-4" />,
    description:
      'We continue to add value for our customers in this area by investing on innovation laboratories. Our experienced personnel can help you create new or improved ingredients, solve production challenges, and get the maximum benefit from your product.',
    images: ['/Assets/rnd.jpg', '/Assets/rnd1.jpg', '/Assets/rnd2.jpg'],
    bgImage: '/Assets/rnd.jpg',
  },
  {
    id: 'quality',
    title: 'Quality',
    icon: <HiOutlineClipboardCheck className="w-4 h-4" />,
    description:
      'Quality is our top priority, nothing less. We are FDA certified and we aim to achieve further certification to validate this priority.',
    images: ['/Assets/quality.jpg', '/Assets/quality1.jpg', '/Assets/quality2.jpg', '/Assets/quality3.jpg'],
    bgImage: '/Assets/quality.jpg',
  },
  {
    id: 'purchasing',
    title: 'Purchasing',
    icon: <HiOutlineShoppingCart className="w-4 h-4" />,
    description:
      "We can save you money and improve turnaround time by purchasing raw ingredients on your behalf. We hold all suppliers to the highest quality standards to ensure you receive the finished product to your exact specifications. From toll processing to partial or full turnkey purchasing, we've got you covered.",
    images: ['/Assets/purchasing1.jpg', '/Assets/purchasing2.jpg', '/Assets/purchasing3.jpg', '/Assets/purchasing4.jpg'],
    bgImage: '/Assets/purchasing1.jpg',
  },
  {
    id: 'ingredient-storage',
    title: 'Ingredient Storage',
    icon: <HiOutlineBeaker className="w-4 h-4" />,
    description:
      'Store ingredients for on-demand production to improve the efficiency and profitability of your business. We ensure careful segregation of allergens and raw materials. Each location uses dedicated personnel and docks for an added layer of security.',
    images: ['/Assets/ingre1.jpg', '/Assets/ingre2.jpg', '/Assets/ingre3.jpg'],
    bgImage: '/Assets/ingre1.jpg',
  },
  {
    id: 'processing',
    title: 'Processing',
    icon: <HiOutlineCog className="w-4 h-4" />,
    description:
      "A recipe only works if you follow it. That's why we provide a processing profile for every project and give you complete control of the manufacturing steps. From our internal new product meeting through delivery of finished goods, we only do what you tell us to do, and never veer from your directives.",
    images: ['/Assets/processing1.jpg', '/Assets/processing2.jpg', '/Assets/processing3.jpg', '/Assets/processing4.jpg', '/Assets/processing5.jpg'],
    bgImage: '/Assets/processing1.jpg',
  },
  {
    id: 'packaging',
    title: 'Packaging',
    icon: <HiOutlineCube className="w-4 h-4" />,
    description:
      'Tell us the packaging you want, or let us procure the best options for your product. Configurations include retail-size pouches, multi-wall bags, boxes, surface printed wrappers, laminated wrappers, trade or commercial boxes and shipping box. Our efficient solutions can easily integrate with your production line.',
    images: ['/Assets/packaging1.jpg', '/Assets/packaging2.jpg', '/Assets/packaging3.jpg'],
    bgImage: '/Assets/packaging1.jpg',
  },
  {
    id: 'warehousing',
    title: 'Warehousing',
    icon: <HiOutlineArchive className="w-4 h-4" />,
    description:
      'We offer warehousing services not only on inbound shipments of raw materials, but also outbound storage of finished goods at both of our facilities. Each warehouse storage position is designated and labeled for identification and tracking.',
    images: ['/Assets/warehousing1.jpg', '/Assets/warehousing2.jpg', '/Assets/warehousing3.jpg'],
    bgImage: '/Assets/warehousing1.jpg',
  },
  {
    id: 'shipping',
    title: 'Shipping',
    icon: <HiOutlineTruck className="w-4 h-4" />,
    description:
      'Let us worry on your logistics. We can receive and ship ingredients and packaging. We always go the extra mile to protect your product, maintaining rigorous standards of cleanliness to safeguard finished goods.',
    images: ['/Assets/shipping1.jpg', '/Assets/shipping2.jpg', '/Assets/shipping3.jpg'],
    bgImage: '/Assets/shipping1.jpg',
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const currentTab = processTabs[activeTab];

  // Reset carousel when tab changes
  useEffect(() => {
    setActiveImage(0);
    setDirection(1);
  }, [activeTab]);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveImage((prev) => (prev + 1) % currentTab.images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeImage, isPaused, currentTab?.images.length]);

  const goNext = () => {
    setDirection(1);
    setActiveImage((prev) => (prev + 1) % currentTab.images.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveImage((prev) => (prev - 1 + currentTab.images.length) % currentTab.images.length);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <div>
      {/* ── Page Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Assets/GoldenStarsGate.jpg"
            alt="Goldenstars facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest-700/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-800/90 via-transparent to-forest-800/30" />
        </div>
        <div className="relative z-10 container-custom pb-12">
          <motion.span
            className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: yuccaEase }}
          >
            Our Process
          </motion.span>
          <motion.h1
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
          >
            Manufacturing <span className="text-golden-500">Process Flow</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-white/40 text-lg max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            From concept to delivery, every step is precision-engineered to ensure
            the highest quality standards for your products.
          </motion.p>
        </div>
      </section>

      {/* ── Home-Tabs Section (from reference) ── */}
      <section ref={sectionRef} className="relative bg-forest-700 overflow-hidden">
        {/* Background parallax image */}
        <motion.div className="absolute inset-0 -inset-y-[15%]" style={{ y: bgY }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentTab.bgImage}
              src={currentTab.bgImage}
              alt=""
              className="w-full h-full object-cover opacity-15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-forest-700/90" />

        <div className="relative z-10 py-16 md:py-24">
          <div className="container-custom">
            {/* ── Tab Navigation — horizontal scrollable bar ── */}
            <div className="mb-12">
              <div className="flex overflow-x-auto gap-1 pb-4 scrollbar-hide border-b border-white/10">
                {processTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(index);
                      setActiveImage(0);
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-400 border-b-2 -mb-[1px] ${
                      activeTab === index
                        ? 'text-golden-500 border-golden-500 bg-white/5'
                        : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span className={activeTab === index ? 'text-golden-500' : 'text-white/30'}>
                      {tab.icon}
                    </span>
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab Content ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: yuccaEase }}
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                  {/* Left: Main image display + gallery */}
                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Main featured image carousel */}
                    <div className="relative aspect-[16/10] overflow-hidden mb-4">
                      <AnimatePresence custom={direction} mode="popLayout">
                        <motion.img
                          key={currentTab.images[activeImage]}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          src={currentTab.images[activeImage]}
                          alt={currentTab.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          transition={{ duration: 0.55, ease: yuccaEase }}
                        />
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-t from-forest-700/30 via-transparent to-transparent pointer-events-none" />

                      {/* Prev arrow */}
                      <button
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white hover:bg-golden-500 hover:text-forest-700 transition-all duration-300"
                      >
                        <HiChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Next arrow */}
                      <button
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white hover:bg-golden-500 hover:text-forest-700 transition-all duration-300"
                      >
                        <HiChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-mono">
                        {String(activeImage + 1).padStart(2, '0')} / {String(currentTab.images.length).padStart(2, '0')}
                      </div>

                      {/* Dot indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {currentTab.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { setDirection(i > activeImage ? 1 : -1); setActiveImage(i); }}
                            className="h-1.5 rounded-full transition-all duration-400 bg-white/50 hover:bg-white"
                            style={{ width: i === activeImage ? '1.5rem' : '0.375rem', opacity: i === activeImage ? 1 : 0.5, background: i === activeImage ? 'var(--color-golden-500, #d4a017)' : undefined }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail gallery */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {currentTab.images.map((img, i) => (
                        <button
                          key={img}
                          onClick={() => { setDirection(i > activeImage ? 1 : -1); setActiveImage(i); }}
                          className={`relative shrink-0 w-20 h-16 overflow-hidden transition-all duration-300 ${
                            activeImage === i
                              ? 'ring-2 ring-golden-500 opacity-100'
                              : 'opacity-50 hover:opacity-80'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${currentTab.title} ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Description & info */}
                  <div className="py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-golden-500/40 text-xs font-mono">
                        {String(activeTab + 1).padStart(2, '0')}
                      </span>
                      <span className="text-golden-500">{currentTab.icon}</span>
                    </div>

                    <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
                      {currentTab.title}
                    </h2>

                    <div className="h-px bg-white/10 mb-6" />

                    <p className="text-white/50 text-base md:text-lg leading-relaxed">
                      {currentTab.description}
                    </p>

                    <div className="mt-8">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 text-golden-500 font-semibold text-sm uppercase tracking-wider group"
                      >
                        <span>Get Started</span>
                        <div className="arrow-icon border-golden-500/30 text-golden-500 group-hover:bg-golden-500 group-hover:text-forest-700 group-hover:border-golden-500 w-10 h-10">
                          <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-400" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Accordion Process Steps ── */}
      <section className="bg-forest-800 section-padding">
        <div className="container-custom">
          <RevealOnScroll>
            <span className="inline-block text-golden-500 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              Step by Step
            </span>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-12">
              Complete <span className="text-golden-500">Process Overview</span>
            </h2>
          </RevealOnScroll>

          <AnimatedBorder className="bg-white/10 mb-0" />

          {processTabs.map((step, index) => (
            <ProcessAccordionItem
              key={step.id}
              step={step}
              index={index}
              isActive={activeTab === index}
              onClick={() => {
                setActiveTab(index);
                setActiveImage(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Standards & CTA ── */}
      <section className="bg-forest-700 section-padding">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 border border-white/10">
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
                Need a <span className="text-golden-500">Custom Solution</span>?
              </h3>
              <p className="mt-2 text-white/40">
                Tell us about your project and we'll create the perfect packaging.
              </p>
            </div>
            <Link to="/contact" className="btn-primary group shrink-0">
              <span className="btn-fill" />
              <span className="relative z-10">Contact Us</span>
              <span className="relative z-10">
                <HiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="mt-16">
            <span className="inline-block text-golden-500/60 text-xs font-semibold uppercase tracking-[0.3em] mb-6">
              Factory & Product Standards
            </span>
            <div className="flex flex-wrap gap-3">
              {['FDA Certified', 'ISO Standards', 'HACCP', 'GMP Compliant', 'Food Safe', 'Export Quality'].map(
                (standard) => (
                  <span
                    key={standard}
                    className="px-4 py-2 border border-white/10 text-white/40 text-xs uppercase tracking-wider hover:border-golden-500/30 hover:text-golden-500 transition-all duration-400"
                  >
                    {standard}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Accordion Item Sub-component ── */
function ProcessAccordionItem({ step, index, isActive, onClick }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="group cursor-pointer py-6 md:py-8"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <span className="text-golden-500/40 text-xs font-mono w-6 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-golden-500 shrink-0">{step.icon}</span>
              <h3
                className={`font-display font-bold text-lg md:text-xl transition-colors duration-400 ${
                  open ? 'text-golden-500' : 'text-white group-hover:text-golden-500'
                }`}
              >
                {step.title}
              </h3>
            </div>
          </div>

          <div className="w-8 h-8 flex items-center justify-center shrink-0 relative">
            <span className="block w-4 h-[1.5px] bg-white/50 group-hover:bg-golden-500 transition-colors duration-400" />
            <motion.span
              className="absolute block w-4 h-[1.5px] bg-white/50 group-hover:bg-golden-500 transition-colors duration-400"
              animate={{ rotate: open ? 0 : 90 }}
              transition={{ duration: 0.3, ease: yuccaEase }}
            />
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: yuccaEase }}
              className="overflow-hidden"
            >
              <div className="pt-4 pl-10 md:pl-[70px] grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <p className="text-white/50 text-base leading-relaxed">
                    {step.description}
                  </p>
                  {/* Thumbnail preview */}
                  <div className="mt-4 flex gap-2">
                    {step.images.slice(0, 3).map((img, i) => (
                      <div key={img} className="w-16 h-12 overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick();
                    }}
                    className="inline-flex items-center gap-2 text-golden-500 font-semibold text-sm uppercase tracking-wider group/link"
                  >
                    <span>View Gallery</span>
                    <HiArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-px bg-white/10" />
    </div>
  );
}

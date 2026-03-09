import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { RevealOnScroll, AnimatedBorder } from '../utils/animations';

const yuccaEase = [0.22, 1, 0.36, 1];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food Service' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'processing', label: 'Processing' },
  { id: 'custom', label: 'Custom' },
];

const products = [
  {
    id: 1,
    title: 'Retail Pouches',
    category: 'food',
    description: 'Premium retail-size pouches for consumer food products with custom printing and branding.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 2,
    title: 'Multi-Wall Bags',
    category: 'agriculture',
    description: 'Durable multi-wall bags for agricultural and industrial packaging needs.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 3,
    title: 'Printed Wrappers',
    category: 'food',
    description: 'Surface printed and laminated wrappers for food-grade applications.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 4,
    title: 'Commercial Boxes',
    category: 'processing',
    description: 'Trade and commercial boxes designed for efficient stacking and shipping.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 5,
    title: 'Custom Packaging',
    category: 'custom',
    description: 'Bespoke packaging solutions tailored to your unique product requirements.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 6,
    title: 'Shipping Solutions',
    category: 'processing',
    description: 'Robust shipping boxes with protective configurations for safe delivery.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 7,
    title: 'Laminated Films',
    category: 'food',
    description: 'High-barrier laminated film packaging for maximum product freshness.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
  {
    id: 8,
    title: 'Export Packaging',
    category: 'agriculture',
    description: 'Agricultural packaging designed to meet international export standards.',
    image: '/Assets/GoldenStarsGate.jpg',
  },
];

/* Yucca-style product card with clipPath reveal & transparent hover */
const ProductCard = forwardRef(function ProductCard({ product, index }, forwardedRef) {
  const internalRef = useRef(null);

  // Merge internal useScroll ref with the ref forwarded by AnimatePresence
  const mergedRef = (node) => {
    internalRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ['start end', 'end start'],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <motion.div
      ref={mergedRef}
      layout
      initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: yuccaEase }}
      className="group relative"
    >
      <a href="#contact" className="block">
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
          {/* Yucca-style dark transparent gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-700/80 via-forest-700/20 to-transparent" />
          {/* Hover overlay – transparent golden tint */}
          <div className="absolute inset-0 bg-golden-500/0 group-hover:bg-golden-500/10 transition-colors duration-500" />

          {/* Category badge - Yucca style */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 border border-white/10">
              {categories.find((c) => c.id === product.category)?.label}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="text-golden-500/50 text-xs font-mono">
              {String(product.id).padStart(2, '0')}
            </span>
            <h3 className="font-display font-bold text-lg text-white mt-1 group-hover:text-golden-500 transition-colors duration-400">
              {product.title}
            </h3>
            {/* Description slides up on hover */}
            <div className="overflow-hidden">
              <motion.p
                className="text-white/50 text-sm leading-relaxed mt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: yuccaEase }}
                viewport={{ once: true }}
              >
                {product.description}
              </motion.p>
            </div>
            {/* Arrow link */}
            <div className="mt-3 flex items-center gap-2 text-golden-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Inquire</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Yucca-style bottom border scaleX */}
        <div className="h-px bg-gray-200 relative overflow-hidden">
          <span className="absolute inset-0 bg-golden-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        </div>
      </a>
    </motion.div>
  );
});

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section ref={sectionRef} id="products" className="relative section-padding bg-white overflow-hidden">
      <div className="container-custom relative z-10">
        {/* ── Yucca-style Header ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-12">
          <div>
            <RevealOnScroll>
              <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                Portfolio
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-forest-700 leading-tight">
                Our <span className="text-golden-500">Products</span>
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.2}>
            <p className="text-bark-400 text-lg leading-relaxed">
              Innovative, quality and safe products. Explore our comprehensive range
              of packaging solutions crafted to exceed expectations.
            </p>
          </RevealOnScroll>
        </div>

        {/* ── Yucca-style Filter tabs with border ── */}
        <RevealOnScroll delay={0.2}>
          <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-gray-200 mb-12">
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-400 ${
                    activeFilter === cat.id
                      ? 'text-forest-700'
                      : 'text-bark-300 hover:text-forest-700'
                  }`}
                >
                  {cat.label}
                  {/* Active indicator line below */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-golden-500"
                    initial={false}
                    animate={{ scaleX: activeFilter === cat.id ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: yuccaEase }}
                  />
                </button>
              ))}
            </div>
            <span className="text-bark-300 text-xs font-mono hidden sm:block">
              {String(filteredProducts.length).padStart(2, '0')} Items
            </span>
          </div>
        </RevealOnScroll>

        {/* ── Yucca-style Products Grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Yucca-style CTA band ── */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-gray-200">
            <p className="text-bark-400 text-base">
              Don't see what you need? We create custom packaging solutions.
            </p>
            <a href="#contact" className="btn-primary group shrink-0">
              <span className="btn-fill" />
              <span className="relative z-10">Request Custom Solution</span>
              <span className="relative z-10">
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { RevealOnScroll } from '../utils/animations';

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
    image: '/Assets/packaging1.jpg',
  },
  {
    id: 2,
    title: 'Multi-Wall Bags',
    category: 'agriculture',
    description: 'Durable multi-wall bags for agricultural and industrial packaging needs.',
    image: '/Assets/packaging2.jpg',
  },
  {
    id: 3,
    title: 'Printed Wrappers',
    category: 'food',
    description: 'Surface printed and laminated wrappers for food-grade applications.',
    image: '/Assets/packaging3.jpg',
  },
  {
    id: 4,
    title: 'Commercial Boxes',
    category: 'processing',
    description: 'Trade and commercial boxes designed for efficient stacking and shipping.',
    image: '/Assets/processing1.jpg',
  },
  {
    id: 5,
    title: 'Custom Packaging',
    category: 'custom',
    description: 'Bespoke packaging solutions tailored to your unique product requirements.',
    image: '/Assets/packs.jpg',
  },
  {
    id: 6,
    title: 'Shipping Solutions',
    category: 'processing',
    description: 'Robust shipping boxes with protective configurations for safe delivery.',
    image: '/Assets/shipping1.jpg',
  },
  {
    id: 7,
    title: 'Laminated Films',
    category: 'food',
    description: 'High-barrier laminated film packaging for maximum product freshness.',
    image: '/Assets/food2.jpg',
  },
  {
    id: 8,
    title: 'Export Packaging',
    category: 'agriculture',
    description: 'Agricultural packaging designed to meet international export standards.',
    image: '/Assets/warehousing1.jpg',
  },
];

const ProductCard = forwardRef(function ProductCard({ product, index }, forwardedRef) {
  const internalRef = useRef(null);

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
      <Link to="/contact" className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-700/80 via-forest-700/20 to-transparent" />
          <div className="absolute inset-0 bg-golden-500/0 group-hover:bg-golden-500/10 transition-colors duration-500" />

          <div className="absolute top-4 left-4">
            <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 border border-white/10">
              {categories.find((c) => c.id === product.category)?.label}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="text-golden-500/50 text-xs font-mono">
              {String(product.id).padStart(2, '0')}
            </span>
            <h3 className="font-display font-bold text-lg text-white mt-1 group-hover:text-golden-500 transition-colors duration-400">
              {product.title}
            </h3>
            <motion.p
              className="text-white/50 text-sm leading-relaxed mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: yuccaEase }}
              viewport={{ once: true }}
            >
              {product.description}
            </motion.p>
            <div className="mt-3 flex items-center gap-2 text-golden-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Inquire</span>
              <HiArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 relative overflow-hidden">
          <span className="absolute inset-0 bg-golden-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        </div>
      </Link>
    </motion.div>
  );
});

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* ── Page Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Assets/packs.jpg"
            alt="Products"
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
            Portfolio
          </motion.span>
          <motion.h1
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: yuccaEase }}
          >
            Our <span className="text-golden-500">Products</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-white/40 text-lg max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Innovative, quality and safe products crafted to exceed expectations.
          </motion.p>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          {/* Filter tabs */}
          <RevealOnScroll>
            <div className="flex items-center justify-between gap-4 py-4 border-t border-b border-gray-200 mb-12">
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-400 ${
                      activeFilter === cat.id
                        ? 'bg-forest-700 text-golden-500'
                        : 'text-bark-400 hover:text-forest-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span className="hidden md:block text-bark-300 text-xs">
                {filteredProducts.length} products
              </span>
            </div>
          </RevealOnScroll>

          {/* Grid */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

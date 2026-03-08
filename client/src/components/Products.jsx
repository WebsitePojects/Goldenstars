import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../utils/animations';

const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'food', label: 'Food Service' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'processing', label: 'Food Processing' },
  { id: 'custom', label: 'Custom Solutions' },
];

const products = [
  {
    id: 1,
    title: 'Retail Pouches',
    category: 'food',
    description: 'Premium retail-size pouches for consumer food products with custom printing.',
    gradient: 'from-golden-400 to-golden-600',
  },
  {
    id: 2,
    title: 'Multi-Wall Bags',
    category: 'agriculture',
    description: 'Durable multi-wall bags for agricultural and industrial packaging needs.',
    gradient: 'from-bark-400 to-bark-600',
  },
  {
    id: 3,
    title: 'Printed Wrappers',
    category: 'food',
    description: 'Surface printed and laminated wrappers for food-grade applications.',
    gradient: 'from-teal-400 to-teal-600',
  },
  {
    id: 4,
    title: 'Commercial Boxes',
    category: 'processing',
    description: 'Trade and commercial boxes designed for efficient stacking and shipping.',
    gradient: 'from-golden-500 to-bark-500',
  },
  {
    id: 5,
    title: 'Custom Packaging',
    category: 'custom',
    description: 'Bespoke packaging solutions tailored to your unique product requirements.',
    gradient: 'from-forest-500 to-teal-600',
  },
  {
    id: 6,
    title: 'Shipping Solutions',
    category: 'processing',
    description: 'Robust shipping boxes with protective configurations for safe delivery.',
    gradient: 'from-bark-500 to-forest-600',
  },
  {
    id: 7,
    title: 'Laminated Films',
    category: 'food',
    description: 'High-barrier laminated film packaging for maximum product freshness.',
    gradient: 'from-teal-500 to-golden-500',
  },
  {
    id: 8,
    title: 'Export Packaging',
    category: 'agriculture',
    description: 'Agricultural packaging designed to meet international export standards.',
    gradient: 'from-golden-600 to-forest-600',
  },
];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="products" className="relative section-padding bg-gray-50 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-golden-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                Portfolio
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-forest-700 leading-tight">
                Our <span className="text-gradient">Products</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-4 text-bark-400 text-lg">
                Innovative, quality and safe products. Explore our comprehensive range
                of packaging solutions crafted to exceed expectations.
              </p>
            </RevealOnScroll>
          </div>

          {/* Filter pills */}
          <RevealOnScroll delay={0.3}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat.id
                      ? 'bg-golden-500 text-forest-700 shadow-md shadow-golden-500/30'
                      : 'bg-white text-bark-400 hover:bg-golden-50 hover:text-golden-700 border border-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-all duration-700`}
                  />

                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Category badge */}
                    <div className="self-start">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {categories.find((c) => c.id === product.category)?.label}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div>
                      <motion.div
                        animate={{
                          y: hoveredProduct === product.id ? -8 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white font-display font-bold text-xl mb-2">
                          {product.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </motion.div>

                      {/* Explore link - appears on hover */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-white text-sm font-semibold"
                        >
                          <span>Inquire Now</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Row */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-16 text-center">
            <p className="text-bark-400 mb-6">
              Don't see what you need? We create custom packaging solutions for any requirement.
            </p>
            <a href="#contact" className="btn-primary inline-block">
              Request Custom Solution
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

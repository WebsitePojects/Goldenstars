import { motion } from 'framer-motion';
import { RevealOnScroll } from '../utils/animations';
import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineHeart } from 'react-icons/hi';

const aboutCards = [
  {
    icon: <HiOutlineLightBulb className="w-8 h-8" />,
    title: 'Who We Are',
    text: 'GOLDENSTARS PACKAGING RESOURCES CO., INC. started with a faith-filled vision for growth and business expansion. Over a decade of excellence in the packaging industry, we have become a trusted name in delivering world-class packaging solutions.',
    link: '#',
    delay: 0,
  },
  {
    icon: <HiOutlineShieldCheck className="w-8 h-8" />,
    title: 'What We Do',
    text: 'We aim to build long-term relationships with our clients while providing their product needs and services. From food-grade packaging to custom solutions, we deliver excellence at every step of the manufacturing process.',
    link: '#',
    delay: 0.15,
  },
  {
    icon: <HiOutlineHeart className="w-8 h-8" />,
    title: 'Why Choose Us',
    text: 'Our MISSION is to excel in customer fulfillment by providing innovative, quality and safe products. We are FDA certified and committed to the highest standards of quality, service, and integrity.',
    link: '#',
    delay: 0.3,
  },
];

export default function About() {
  return (
    <section id="about" className="relative section-padding bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-golden-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <RevealOnScroll>
            <span className="inline-block text-golden-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">
              About Us
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-forest-700 leading-tight">
              Why Do We{' '}
              <span className="relative">
                <span className="text-gradient">Exist</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-golden-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
              ?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="mt-6 text-bark-400 text-lg leading-relaxed">
              Driven by faith, fueled by innovation. Goldenstars Packaging has been
              transforming the packaging industry with quality, integrity, and unmatched service.
            </p>
          </RevealOnScroll>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {aboutCards.map((card, index) => (
            <RevealOnScroll key={card.title} delay={card.delay}>
              <motion.div
                className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 card-hover h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-golden-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-golden-500/10 text-golden-600 flex items-center justify-center mb-6 group-hover:bg-golden-500 group-hover:text-forest-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {card.icon}
                  </div>

                  {/* Number */}
                  <span className="absolute top-8 right-8 text-7xl font-display font-bold text-gray-50 group-hover:text-golden-100/50 transition-colors duration-500 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-display font-bold text-xl text-forest-700 mb-4">
                    {card.title}
                  </h3>

                  <p className="text-bark-400 leading-relaxed text-sm">
                    {card.text}
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a
                      href={card.link}
                      className="inline-flex items-center gap-2 text-golden-600 font-semibold text-sm uppercase tracking-wider group/link"
                    >
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 p-8 md:p-12 rounded-3xl bg-forest-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            { value: '10+', label: 'Years of Excellence' },
            { value: '500+', label: 'Satisfied Clients' },
            { value: '1000+', label: 'Products Delivered' },
            { value: '100%', label: 'Quality Commitment' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <span className="block text-4xl md:text-5xl font-display font-bold text-golden-500">
                {stat.value}
              </span>
              <span className="block mt-2 text-xs md:text-sm text-white/50 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

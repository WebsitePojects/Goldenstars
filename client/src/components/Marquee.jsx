import { motion } from 'framer-motion';

const marqueeItems = [
  'Innovation',
  'Quality Packaging',
  'FDA Certified',
  'Custom Solutions',
  'Craftsmanship',
  'Performance',
  'Global Standards',
  'R&D Excellence',
];

export default function Marquee() {
  return (
    <section className="relative py-6 bg-golden-500 overflow-hidden">
      <div className="flex">
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-8 animate-marquee"
            style={{ animationDuration: '35s' }}
          >
            {marqueeItems.map((item, i) => (
              <div key={`${copy}-${i}`} className="flex items-center gap-8 shrink-0">
                <span className="text-forest-700 font-display font-bold text-lg md:text-xl uppercase tracking-wider whitespace-nowrap">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-forest-700/30 shrink-0" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Second row - reverse direction */}
      <div className="flex mt-3">
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-8 animate-marquee-reverse"
            style={{ animationDuration: '30s' }}
          >
            {[...marqueeItems].reverse().map((item, i) => (
              <div key={`${copy}-${i}`} className="flex items-center gap-8 shrink-0">
                <span className="text-forest-700/60 font-body font-light text-sm md:text-base uppercase tracking-[0.2em] whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rotate-45 bg-forest-700/20 shrink-0" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

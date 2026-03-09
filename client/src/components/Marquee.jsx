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
    <section className="relative py-5 bg-forest-700 border-y border-white/10 overflow-hidden">
      <div className="flex">
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-10 animate-marquee"
            style={{ animationDuration: '35s' }}
          >
            {marqueeItems.map((item, i) => (
              <div key={`${copy}-${i}`} className="flex items-center gap-10 shrink-0">
                <span className="text-white/60 font-display font-bold text-sm md:text-base uppercase tracking-[0.2em] whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 bg-golden-500 shrink-0" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Second row — reverse direction, lighter weight */}
      <div className="flex mt-3">
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className="flex shrink-0 items-center gap-10 animate-marquee-reverse"
            style={{ animationDuration: '30s' }}
          >
            {[...marqueeItems].reverse().map((item, i) => (
              <div key={`${copy}-${i}`} className="flex items-center gap-10 shrink-0">
                <span className="text-white/20 font-body font-light text-xs md:text-sm uppercase tracking-[0.25em] whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1 h-1 bg-golden-500/30 shrink-0" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

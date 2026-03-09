import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ── Yucca-style ease curve ── */
const yuccaEase = [0.22, 1, 0.36, 1];

/* ── Base animation variants ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: yuccaEase },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: yuccaEase },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: yuccaEase },
  },
};

/* ── Yucca-style ClipPath Reveal (inset bottom-up) ── */
export const clipRevealUp = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: yuccaEase },
  },
};

export const clipRevealDown = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1, ease: yuccaEase },
  },
};

/* ── Yucca-style text line reveal (yPercent 100→0) ── */
export const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

/* ── Yucca-style border scaleX ── */
export const borderReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

/* ── Yucca-style image scale on scroll (1.4 → 1) ── */
export const imageScaleReveal = {
  hidden: { scale: 1.4, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: yuccaEase },
  },
};

export const letterReveal = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.8,
      ease: yuccaEase,
    },
  }),
};

export const curtainReveal = {
  hidden: { scaleY: 1 },
  visible: {
    scaleY: 0,
    transition: { duration: 0.8, ease: yuccaEase },
  },
};

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

/**
 * Yucca-style animated text — words slide up from clipped overflow
 */
export function AnimatedText({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', rotate: 2 },
              visible: {
                y: 0,
                rotate: 0,
                transition: {
                  delay: delay + i * 0.04,
                  duration: 0.7,
                  ease: yuccaEase,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Yucca-style RevealOnScroll with clipPath option
 */
export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  clip = false,
}) {
  const variants = {
    up: fadeUp,
    down: fadeDown,
    left: slideInLeft,
    right: slideInRight,
    scale: scaleIn,
    fade: fadeIn,
    clipUp: clipRevealUp,
    clipDown: clipRevealDown,
  };

  const variant = clip ? (direction === 'down' ? 'clipDown' : 'clipUp') : direction;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants[variant]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Yucca-style Parallax Image — scales from 1.3→1 on scroll
 */
export function ParallaxImage({ src, alt, className = '', speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.05, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y, scale }}
      />
    </div>
  );
}

/**
 * Yucca-style ClipPath card reveal
 */
export function ClipRevealCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, ease: yuccaEase, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Yucca-style border line that scales from left on scroll
 */
export function AnimatedBorder({ className = '', delay = 0 }) {
  return (
    <motion.div
      className={`h-px bg-golden-500/30 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: yuccaEase, delay }}
      style={{ transformOrigin: 'left' }}
    />
  );
}

/**
 * Yucca-style arrow icon
 */
export function ArrowIcon({ className = '' }) {
  return (
    <div className={`arrow-icon ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13.6923 17.6155L12.9845 16.8963L17.073 12.8078H5V11.8078H17.073L12.9845 7.71925L13.6923 7L19 12.3078L13.6923 17.6155Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

/**
 * Yucca-style section with parallax background
 */
export function ParallaxSection({ children, bgImage, className = '', overlay = true }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.05, 1]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {bgImage && (
        <motion.div className="absolute inset-0 -inset-y-[20%]" style={{ y }}>
          <motion.img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ scale }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-forest-800/70" />
          )}
        </motion.div>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

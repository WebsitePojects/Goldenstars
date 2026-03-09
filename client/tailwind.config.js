/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        golden: {
          50: '#FFFEF0',
          100: '#FFFBD6',
          200: '#FFF5A8',
          300: '#FFED6F',
          400: '#FFE234',
          500: '#FED702',
          600: '#E5B800',
          700: '#B88E00',
          800: '#8A6B00',
          900: '#6B5200',
        },
        bark: {
          50: '#F9F6F3',
          100: '#F0E8DF',
          200: '#E0CFC0',
          300: '#CCB19A',
          400: '#B89374',
          500: '#443522',
          600: '#3A2D1D',
          700: '#2E2317',
          800: '#231A11',
          900: '#17100A',
        },
        forest: {
          50: '#F4F5F3',
          100: '#E5E8E3',
          200: '#C9D1C5',
          300: '#A8B5A2',
          400: '#7A8E72',
          500: '#232520',
          600: '#1D1F1A',
          700: '#171915',
          800: '#11120F',
          900: '#0B0C0A',
        },
        teal: {
          50: '#F0FAFB',
          100: '#D1F0F4',
          200: '#A4E1E9',
          300: '#6CCDD9',
          400: '#3EB8C8',
          500: '#2CAAB6',
          600: '#238A94',
          700: '#1B6A72',
          800: '#134B50',
          900: '#0B2D30',
        },
        // Yucca-inspired sage/olive accent
        sage: {
          400: '#707767',
          500: '#5A6150',
        },
        // Warm beige/sand palette (Yucca landing)
        sand: {
          50: '#FDFAF6',
          100: '#F8F3EC',
          200: '#F0E8DB',
          300: '#E5D9C8',
          400: '#D4C4AA',
          500: '#BFA98A',
          600: '#A38E6F',
          700: '#7D6C52',
          800: '#584C39',
          900: '#372F23',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        // Yucca-style clipPath reveal
        'clip-reveal-up': 'clipRevealUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'clip-reveal-down': 'clipRevealDown 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'border-scale': 'borderScale 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(254, 215, 2, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(254, 215, 2, 0.6)' },
        },
        // Yucca-style clipPath reveals
        clipRevealUp: {
          '0%': { clipPath: 'inset(100% 0% 0% 0%)' },
          '100%': { clipPath: 'inset(0% 0% 0% 0%)' },
        },
        clipRevealDown: {
          '0%': { clipPath: 'inset(0% 0% 100% 0%)' },
          '100%': { clipPath: 'inset(0% 0% 0% 0%)' },
        },
        borderScale: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'golden-gradient': 'linear-gradient(135deg, #FED702 0%, #E5B800 50%, #B88E00 100%)',
        'dark-gradient': 'linear-gradient(180deg, #232520 0%, #171915 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(23,25,21,0.7) 0%, rgba(23,25,21,0.4) 40%, rgba(23,25,21,0.8) 100%)',
      },
    },
  },
  plugins: [],
};

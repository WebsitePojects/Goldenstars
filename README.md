# Goldenstars Packaging Website

A modern, award-winning website for Goldenstars Packaging Resources Co., Inc. Built with React, Tailwind CSS, Express, Node.js, and MongoDB.

## Project Structure

```
GoldenStarsPackaging/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Marquee.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Animation utilities
│   │   ├── App.jsx         # Main app with intro loader
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles & Tailwind
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   │   ├── Contact.js
│   │   └── Product.js
│   ├── routes/             # API routes
│   │   ├── contact.js
│   │   └── products.js
│   ├── index.js            # Server entry
│   ├── .env.example
│   └── package.json
└── README.md
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Animations**: Framer Motion (scroll reveals, page transitions, parallax)
- **Icons**: React Icons, Lucide React
- **Fonts**: Inter (body) + Playfair Display (headings)

## Color Palette

| Color   | Hex       | Usage                    |
|---------|-----------|--------------------------|
| Golden  | `#FED702` | Primary / CTA / Accents  |
| Bark    | `#443522` | Text / Secondary         |
| Forest  | `#232520` | Dark backgrounds         |
| Teal    | `#2CAAB6` | Accent / Highlights      |

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (optional for frontend-only)

### Frontend

```bash
cd client
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with HMR.

### Backend

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and SMTP settings
npm install
npm run dev
```

The API server starts at `http://localhost:5000`.

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start server (serves built frontend)
cd ../server
NODE_ENV=production npm start
```

## Vercel Deployment

- Set the Vercel project Root Directory to `client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- SPA refresh fallback is configured in `client/vercel.json`, so routes like `/about`, `/services`, `/products`, and `/contact` load correctly on refresh

## API Endpoints

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | /api/health       | Health check               |
| POST   | /api/contact      | Submit contact form        |
| GET    | /api/contact      | List contacts (admin)      |
| GET    | /api/products     | List products              |
| GET    | /api/products/:id | Get single product         |
| POST   | /api/products     | Create product (admin)     |
| PUT    | /api/products/:id | Update product (admin)     |
| DELETE | /api/products/:id | Delete product (admin)     |

## Design Features

- **Intro Loader**: Animated brand reveal with progress bar
- **Scroll-aware Navbar**: Auto-hides on scroll down, reappears on scroll up
- **Hero Section**: Auto-rotating slides with glass-card stats panel
- **Marquee Banner**: Dual-direction scrolling keyword banner
- **About Section**: Animated cards with hover effects and stats row
- **Services Section**: Interactive 9-step manufacturing process flow with stepper
- **Products Grid**: Filterable product cards with hover animations
- **Contact Form**: Full-featured form with validation and API integration
- **Footer**: Multi-column links, social icons, scroll-to-top button

## License

© 2026 Goldenstars Packaging Resources Co, Inc. All rights reserved.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;
const MAX_PORT_RETRIES = 10;

/* ── Middleware ────────────────────────────────────────────── */
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ── API Routes ───────────────────────────────────────────── */
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Serve React in production ────────────────────────────── */
if (process.env.NODE_ENV === 'production') {
  const clientBuild = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientBuild));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

/* ── MongoDB Connection & Server Start ───────────────────── */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/goldenstars';

function startServer({ withoutMongo = false, retries = 0, port = Number(PORT) || 5000 } = {}) {
  const server = app
    .listen(port, () => {
      const mongoNote = withoutMongo ? ' (without MongoDB)' : '';
      console.log(`✓ Server running on http://localhost:${port}${mongoNote}`);
    })
    .on('error', (err) => {
      if (
        err.code === 'EADDRINUSE' &&
        process.env.NODE_ENV !== 'production' &&
        retries < MAX_PORT_RETRIES
      ) {
        const nextPort = port + 1;
        console.warn(`⚠ Port ${port} is in use, retrying on ${nextPort}...`);
        startServer({ withoutMongo, retries: retries + 1, port: nextPort });
        return;
      }

      if (err.code === 'EADDRINUSE') {
        console.error(`✗ Port ${port} is already in use. Set a different PORT in your .env file.`);
      } else {
        console.error('✗ Server startup error:', err.message);
      }

      process.exit(1);
    });

  return server;
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB');
    startServer();
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    // Start server anyway so frontend can work without DB
    startServer({ withoutMongo: true });
  });

module.exports = app;

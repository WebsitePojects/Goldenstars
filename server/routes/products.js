const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products — List all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// GET /api/products/:id — Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// POST /api/products — Create a product (admin)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Create product error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// PUT /api/products/:id — Update a product (admin)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// DELETE /api/products/:id — Delete a product (admin)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }
    res.json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

module.exports = router;

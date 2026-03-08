const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact — Submit a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    // Save to database
    const contact = await Contact.create({ name, email, subject, message });

    // Optionally send email notification (configure SMTP in .env)
    // await sendNotificationEmail(contact);

    res.status(201).json({
      success: true,
      message: 'Your message has been sent! We will be in touch soon.',
      data: { id: contact._id },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// GET /api/contact — List all contact submissions (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30 }));

const Contact = mongoose.model('Contact', new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  message: { type: String, required: true, trim: true, maxlength: 3000 },
  createdAt: { type: Date, default: Date.now }
}));

app.get('/api/health', (_req, res) => res.json({ success: true, message: 'Portfolio API is running' }));

app.get('/api-docs', (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio API Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 850px;
            margin: 40px auto;
            padding: 20px;
            background: #0b1020;
            color: #f1f5f9;
            line-height: 1.6;
          }
          h1, h2 { color: #7dd3fc; }
          .endpoint {
            background: #172033;
            padding: 16px;
            margin: 16px 0;
            border-radius: 8px;
          }
          code { color: #86efac; overflow-wrap: anywhere; }
        </style>
      </head>
      <body>
        <h1>Portfolio API Documentation</h1>
        <p>Backend API for the personal portfolio website.</p>

        <div class="endpoint">
          <h2>1. Health Check</h2>
          <p><code>GET /api/health</code></p>
          <p>Checks whether the API is running.</p>
        </div>

        <div class="endpoint">
          <h2>2. Submit Contact Message</h2>
          <p><code>POST /api/contact</code></p>
          <p>Content-Type: <code>application/json</code></p>
          <p>Required fields: name, email, message.</p>
          <p>Example request body:</p>
          <pre><code>{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Hello from the portfolio"
}</code></pre>
          <p>Success response: HTTP 201 with a confirmation message and saved record ID.</p>
        </div>
      </body>
    </html>
  `);
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    const contact = await Contact.create({ name, email, message });
    return res.status(201).json({ success: true, message: 'Message saved successfully.', id: contact._id });
  } catch (error) {
    console.error('Contact submission error:', error.message);
    return res.status(500).json({ success: false, message: 'Unable to save message. Check MongoDB connection.' });
  }
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cognevance_portfolio')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Portfolio API running on port ${port}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    console.error('Set MONGODB_URI in backend/.env and start again.');
    process.exit(1);
  });

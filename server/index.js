import path from 'path';
import { fileURLToPath } from 'url';

// Allow HTTPS to Resend (and proxy) when network uses self-signed certs
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '1') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const envPath = path.resolve(projectRoot, '.env');
const envPathCwd = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });
dotenv.config({ path: envPathCwd });

const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === 'production';
// Production (e.g. Render): allow frontend from any origin; local: only Vite
const ALLOWED_ORIGIN = IS_PROD ? (process.env.FRONTEND_URL || '*') : 'http://localhost:5173';

const app = express();

// Production: serve React build from dist (Render single service)
if (IS_PROD) {
  const distPath = path.join(projectRoot, 'dist');
  app.use(express.static(distPath));
}

// CORS: Vite local / Render frontend
app.use((req, res, next) => {
  const origin = ALLOWED_ORIGIN === '*' ? req.headers.origin || '*' : ALLOWED_ORIGIN;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(express.json());
// If JSON parse fails, body-parser calls next(err); return JSON instead of default
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    console.error('MAIL ERROR: Invalid JSON body', err.message);
    return res.status(400).json({ success: false, error: 'Invalid JSON in request body' });
  }
  next(err);
});

const RESEND_API_URL = 'https://api.resend.com/emails';

function getResendConfig() {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  // Resend free tier: use onboarding@resend.dev until you verify a domain
  let from = (process.env.FROM_EMAIL || 'Weeding card <onboarding@resend.dev>').trim();
  if (!from.includes('@')) from = 'Weeding card <onboarding@resend.dev>';
  const toRaw = (process.env.RECIPIENT_EMAILS || 'mohitporwal596@gmail.com').trim();
  const to = toRaw.split(',').map((e) => e.trim()).filter(Boolean);
  if (!apiKey || to.length === 0) return null;
  return { apiKey, from, to };
}

function getNodemailerConfig() {
  const user = (process.env.EMAIL_USER || '').trim();
  const pass = (process.env.EMAIL_PASS || '').trim();
  if (!user || !pass) return null;
  return { user, pass };
}

function getEmailConfig() {
  if (getResendConfig()) return { type: 'resend', ...getResendConfig() };
  if (getNodemailerConfig()) return { type: 'smtp', ...getNodemailerConfig() };
  return null;
}

function validateBody(body) {
  if (!body || typeof body !== 'object') return { valid: false, errors: ['Invalid request'] };
  const { name, phone, service, message } = body;
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('Name is required');
  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) errors.push('Phone is required');
  if (!service || typeof service !== 'string' || service.trim().length === 0) errors.push('Service is required');
  if (!message || typeof message !== 'string') errors.push('Message is required');
  else if (message.trim().length < 3 || message.length > 5000) errors.push('Message length invalid');
  return { valid: errors.length === 0, errors };
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

app.post('/api/send-inquiry', async (req, res, next) => {
  const send500 = (msg) => {
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: msg || 'Internal server error' });
    }
  };
  const send503 = (msg) => {
    if (!res.headersSent) {
      res.status(503).json({ success: false, error: msg });
    }
  };
  try {
    const config = getEmailConfig();
    console.log('POST /api/send-inquiry received', config ? `email=${config.type}` : 'email=not configured');

    // Ensure request body is parsed (Express sets req.body via express.json())
    let body = req.body;
    if (body === undefined || body === null) {
      console.error('MAIL ERROR: request body missing or invalid (ensure Content-Type: application/json)');
      return res.status(400).json({ success: false, error: 'Invalid request body' });
    }
    if (typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Request body must be JSON object' });
    }

    const validation = validateBody(body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.errors[0] });
    }

    if (!config) {
      console.error('MAIL ERROR: Email not configured. Set RESEND_API_KEY + RECIPIENT_EMAILS or EMAIL_USER + EMAIL_PASS in .env');
      return send503('Email not configured. Add RESEND_API_KEY and RECIPIENT_EMAILS, or EMAIL_USER and EMAIL_PASS to .env');
    }

    const { name, phone, service, message } = body;
    const trimmed = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      message: String(message).trim(),
    };

    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata',
    });

    const html = `
      <h2>New Customer Inquiry - Printing Service</h2>
      <p><strong>Name:</strong> ${escapeHtml(trimmed.name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(trimmed.phone)}</p>
      <p><strong>Service Selected:</strong> ${escapeHtml(trimmed.service)}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(trimmed.message)}</pre>
      <p><strong>Submitted at:</strong> ${dateTime}</p>
    `;
    const subject = 'New Customer Inquiry - Printing Service';
    const toAddress = config.type === 'resend' ? config.to[0] : (process.env.RECIPIENT_EMAILS || 'mohitporwal596@gmail.com').trim().split(',')[0].trim();

    if (config.type === 'resend') {
      const resendRes = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
          'User-Agent': 'PrintStudio/1.0',
        },
        body: JSON.stringify({
          from: config.from,
          to: config.to,
          subject,
          html,
        }),
      });

      const data = await resendRes.json().catch(() => ({}));
      if (!resendRes.ok) {
        const errMsg = data.message || data.error || data.statusText || `Resend API ${resendRes.status}`;
        console.error('MAIL ERROR: Resend API', resendRes.status, data);
        return send500(errMsg);
      }
      console.log('Email sent via Resend to', config.to.join(', '));
      return res.json({ success: true });
    }

    // Nodemailer (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: process.env.NODE_TLS_REJECT_UNAUTHORIZED === '1' },
    });

    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('MAIL ERROR: SMTP verify failed', verifyErr);
      return send500('SMTP login failed. Check EMAIL_USER and EMAIL_PASS (use App Password for Gmail).');
    }

    await transporter.sendMail({
      from: process.env.FROM_EMAIL || config.user,
      to: toAddress,
      subject,
      html,
    });
    console.log('Email sent via SMTP to', toAddress);
    return res.json({ success: true });
  } catch (err) {
    console.error('MAIL ERROR:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: (err && err.message) ? err.message : 'Internal server error' });
    } else {
      next(err);
    }
  }
});

// Ensure 500 responses are always JSON (never empty {})
app.use((err, req, res, next) => {
  console.error('MAIL ERROR:', err);
  if (!res.headersSent) {
    const msg = (err && err.message) ? err.message : 'Internal server error';
    res.status(500).json({ success: false, error: msg });
  }
});

app.get('/api/health', (req, res) => {
  const config = getEmailConfig();
  res.json({
    ok: true,
    emailConfigured: !!config,
    hasResendKey: !!(process.env.RESEND_API_KEY || '').trim(),
    hasRecipient: !!((process.env.RECIPIENT_EMAILS || '').trim()),
  });
});

// Production: SPA fallback (API routes are above, so /api/* already handled)
if (IS_PROD) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(projectRoot, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  const config = getEmailConfig();
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(config ? `Email: configured (${config.type})` : 'Email: NOT configured – add RESEND_API_KEY + RECIPIENT_EMAILS or EMAIL_USER + EMAIL_PASS to .env');
});

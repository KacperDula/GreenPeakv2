import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './db.js';

// Import routes
import postsRouter from './routes/posts.js';
import adminRouter from './routes/admin.js';
import inquiryRouter from './routes/inquiry.js';
import uploadRouter from './routes/upload.js';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Initialize database
initDatabase();

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: IS_PRODUCTION ? undefined : false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS - restrict to frontend URL
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: false,
  })
);

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'), {
  maxAge: '7d',
  etag: true,
}));

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/inquiry', inquiryRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// In production, serve the built React app
if (IS_PRODUCTION) {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  
  app.use(express.static(clientBuildPath, {
    maxAge: '1d',
    etag: true,
  }));

  // Handle client-side routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  if (err.message === 'File too large') {
    res.status(413).json({ error: 'File size exceeds 10MB limit' });
    return;
  }

  if (err.message?.includes('Invalid file type')) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 GreenPeak Solutions Server

Environment: ${process.env.NODE_ENV || 'development'}
Port: ${PORT}
API: http://localhost:${PORT}/api
${IS_PRODUCTION ? `Serving frontend from: /client/dist` : `Frontend: ${FRONTEND_URL}`}

Admin credentials:
  Username: ${process.env.ADMIN_USERNAME || 'admin'}
  Password: ${process.env.ADMIN_PASSWORD || 'greenpeak2024'}

SMTP configured: ${process.env.SMTP_HOST ? '✅ Yes' : '⚠️  No (graceful fallback enabled)'}
  `);
});

export default app;

# GreenPeak Solutions

A production-ready small business website built with React, Express, TypeScript, and SQLite.

## Features

- **Modern Stack**: React 18 + Vite, Express 4, TypeScript, Tailwind CSS
- **Blog System**: Full CRUD with Markdown support, categories, and search
- **Contact Forms**: Validated inquiry forms with email notifications
- **Admin Dashboard**: Secure content management with JWT authentication
- **SEO Optimized**: Per-page meta tags, Open Graph, JSON-LD structured data
- **Accessible**: WCAG AA compliant with keyboard navigation
- **Responsive**: Mobile-first design with green & white branding

## Setup

### 1. Install Dependencies

```bash
npm install
cd client && npm install && cd ..
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

- **ADMIN_USERNAME** / **ADMIN_PASSWORD**: Admin login credentials (default: admin / greenpeak2024)
- **JWT_SECRET**: Secure random string for JWT signing
- **SMTP_***: Email server configuration (optional - graceful fallback if missing)
- **SITE_URL**: Production domain (e.g., https://greenpeak.example)
- **FRONTEND_URL**: Frontend origin for CORS (development: http://localhost:5173)

### 3. Initialize Database

```bash
npm run db:init
```

This creates the SQLite database and seeds it with 3 sample blog posts.

## Development

Run both server and client in development mode:

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

### Run Separately

```bash
npm run server  # Express API only
npm run client  # Vite dev server only
```

## Production Build

Build the frontend and start the production server:

```bash
npm run build
npm start
```

The Express server will serve the built React app from `/dist` and handle API routes.

## Admin Access

1. Navigate to `/admin`
2. Login with credentials from `.env`:
   - Username: `admin` (default)
   - Password: `greenpeak2024` (default)
3. Create, edit, and publish blog posts
4. Upload featured images

**⚠️ Change default credentials in production!**

## File Uploads

- Uploaded files are stored in `/uploads/YYYY/MM/`
- Supported formats: images (jpg, png, gif, webp) and PDFs
- Max file size: 10MB
- Configure via `multer` in `server/routes/upload.ts`

## Email Configuration

The contact form sends email notifications via SMTP. If SMTP is not configured:

- Form submissions still work
- Data is validated and logged
- User sees a friendly message: "Having trouble sending? Please email us at info@greenpeak.example"

### SMTP Setup Examples

**Gmail:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## Accessibility

- **WCAG AA compliant**: 4.5:1 color contrast ratios
- **Keyboard navigation**: Full keyboard accessibility with visible focus states
- **Screen readers**: Semantic HTML, ARIA labels, and landmarks
- **Skip link**: Jump to main content for keyboard users

### Testing Accessibility

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Test a page
axe http://localhost:5173
```

## Performance Testing

Run Lighthouse audits:

```bash
# Install Lighthouse
npm install -g lighthouse

# Test performance
lighthouse http://localhost:3000 --view
```

**Target Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- SEO: ≥ 95

## Project Structure

```
greenpeak/
├── server/              # Express backend
│   ├── server.ts       # Main server & middleware
│   ├── db.ts           # Database initialization
│   ├── schema.sql      # SQLite schema
│   ├── auth.ts         # JWT authentication
│   ├── routes/         # API endpoints
│   ├── middleware/     # Validation & rate limiting
│   └── utils/          # Email & slug helpers
├── client/             # React frontend
│   ├── src/
│   │   ├── pages/      # Route pages
│   │   ├── components/ # Reusable UI components
│   │   ├── layouts/    # Layout wrappers
│   │   └── lib/        # API client & SEO utils
│   ├── public/         # Static assets
│   └── vite.config.ts
├── .env.example        # Environment template
└── package.json
```

## API Endpoints

### Public

- `GET /api/posts` - List posts (supports ?limit, ?offset, ?search, ?category)
- `GET /api/posts/:slug` - Single post by slug
- `GET /api/posts/related/:slug` - Related posts by category
- `POST /api/inquiry` - Submit contact form

### Admin (Requires JWT)

- `POST /api/admin/login` - Get JWT token
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/upload` - Upload image

## Security

- **Helmet**: Security headers enabled
- **CORS**: Restricted to FRONTEND_URL origin
- **Rate Limiting**: 10 requests per 10 minutes on forms and admin endpoints
- **Input Validation**: Zod schemas on all inputs
- **Password Hashing**: bcrypt for admin credentials
- **JWT Authentication**: Stateless admin sessions
- **File Upload Sanitization**: Filename sanitization and type validation

## Branding

**Colors:**
- Deep Green: `#0F7B3E` (primary)
- Fresh Green: `#16A34A` (accents)
- White: `#FFFFFF` (backgrounds)
- Charcoal: `#1F2937` (text)

**Fonts:**
- Headings: Poppins (Google Fonts)
- Body: Inter (Google Fonts)

## License

Private - All Rights Reserved

## Support

For questions or issues, contact: info@greenpeak.example

# Trevor's Portfolio Website

A production-ready personal portfolio website built with Next.js 15, featuring a public site and WordPress-like admin backend with custom authentication.

## Features

- 🎨 Dark/light theme with "storm" and "summer field" aesthetics
- 📝 Blog with markdown support, tags, and search
- 💼 Portfolio showcase with categories and filters
- 📧 Contact form with email delivery via Resend
- 🔐 Secure custom authentication (Iron Session + Argon2)
- 🛡️ CSRF protection and rate limiting
- 📱 Fully responsive and accessible
- 🚀 SEO optimized with sitemap, RSS feed, and structured data
- 💾 PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **Auth**: Iron Session + Argon2
- **Email**: Resend
- **Deployment**: Vercel
- **Rate Limiting**: Upstash Redis (optional, falls back to in-memory)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Resend API key for email

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd trevor-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/trevor_website"
RESEND_API_KEY="re_..."
CONTACT_TO_EMAIL="your-email@example.com"
CONTACT_FROM_EMAIL="noreply@yourdomain.com"
SESSION_SECRET="generate-with: openssl rand -base64 32"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Trevor's Portfolio"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed with initial data
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Credentials

After seeding, use these credentials to log in:

- **Email**: `admin@trevor.dev`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change the password immediately after first login!

## Database Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Create a migration (for schema changes)
npm run prisma:migrate

# Push schema to database (development)
npm run prisma:push

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run seed
```

## Deployment to Vercel

### 1. Set up PostgreSQL

Use a managed PostgreSQL service:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)

### 2. Deploy to Vercel

1. Push your code to GitHub

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. Configure Environment Variables in Vercel:
   ```
   DATABASE_URL=your-postgres-connection-string
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=your-email@example.com
   CONTACT_FROM_EMAIL=noreply@yourdomain.com
   SESSION_SECRET=generate-a-secure-random-string
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=Your Site Name
   ```

4. (Optional) Add Upstash Redis for production rate limiting:
   - Create account at [upstash.com](https://upstash.com)
   - Create a Redis database
   - Add environment variables:
     ```
     UPSTASH_REDIS_REST_URL=https://...
     UPSTASH_REDIS_REST_TOKEN=...
     ```

5. Deploy!

### 3. Set up Database

After first deployment, run database migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npm run prisma:push
npm run seed
```

Or connect directly to your production database and run the same commands.

## Project Structure

```
trevor-website/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js app router
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   ├── blog/         # Blog pages
│   │   ├── portfolio/    # Portfolio pages
│   │   ├── contact/      # Contact page
│   │   ├── login/        # Login page
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   │   ├── auth.ts      # Authentication helpers
│   │   ├── session.ts   # Session management
│   │   ├── csrf.ts      # CSRF protection
│   │   ├── ratelimit.ts # Rate limiting
│   │   └── utils.ts     # General utilities
│   └── middleware.ts    # Next.js middleware
├── public/              # Static assets
└── ...config files
```

## Admin Dashboard

Access at `/admin` after logging in.

Features:
- 📊 Dashboard with site statistics
- 📝 Blog post management (create, edit, delete)
- 💼 Portfolio management
- 📁 Media library
- 👥 User management
- ⚙️ Site settings

## Security Features

- ✅ Argon2 password hashing
- ✅ Encrypted session cookies (Iron Session)
- ✅ CSRF protection
- ✅ Rate limiting (login, contact form, API)
- ✅ Input validation and sanitization
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection (sanitized markdown)
- ✅ Honeypot anti-spam

## API Routes

### Public
- `POST /api/contact` - Contact form submission

### Admin (requires authentication)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- Blog management endpoints
- Portfolio management endpoints
- User management endpoints

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
// Dark theme: "Beauty of a storm"
storm: { ... }
lightning: { ... }

// Light theme: "Summer field"
field: { ... }
meadow: { ... }
```

### Site Content

1. **Landing page**: Edit `src/app/page.tsx`
2. **Footer links**: Edit `src/components/public/Footer.tsx`
3. **Site metadata**: Edit `src/app/layout.tsx`

## License

MIT

## Support

For issues or questions, please open a GitHub issue.

# Quick Start Guide

Get your Trevor Portfolio website running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Resend API key (sign up at resend.com - free tier available)

## Setup Steps

### 1. Install Dependencies

```bash
cd trevor-website
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your details:

```env
# Required: Your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/trevor_website"

# Required: Resend API key for contact form
RESEND_API_KEY="re_your_api_key_here"
CONTACT_TO_EMAIL="your-email@example.com"
CONTACT_FROM_EMAIL="noreply@yourdomain.com"

# Required: Generate a secure random string
SESSION_SECRET="run: openssl rand -base64 32"

# Required: Your site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Trevor's Portfolio"
```

### 3. Set up Database

```bash
# Push schema to database
npm run prisma:push

# Seed with sample data and admin user
npm run seed
```

**Default Admin Credentials:**
- Email: `admin@trevor.dev`
- Password: `admin123`

⚠️ Change these immediately after first login!

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## What You Get

✅ **Public Site**
- Landing page with hero, featured work, latest blog posts
- Blog with search, tags, pagination, and markdown support
- Portfolio with category filters
- Contact form with email delivery
- Dark/light theme toggle
- Full mobile responsiveness
- SEO optimization (sitemap, robots.txt, RSS feed)

✅ **Admin Dashboard** (at /admin)
- WordPress-like interface
- Blog post management
- Portfolio management
- Media library (placeholder)
- User management (placeholder)
- Settings (placeholder)

✅ **Security**
- Argon2 password hashing
- Iron Session encrypted cookies
- CSRF protection
- Rate limiting (5 requests/minute)
- Input validation
- SQL injection protection (Prisma)
- XSS protection (sanitized markdown)

## Next Steps

1. **Change Admin Password**
   - Log in at `/login`
   - Navigate to Users section
   - Update password

2. **Customize Content**
   - Edit landing page: `src/app/page.tsx`
   - Update footer links: `src/components/public/Footer.tsx`
   - Modify theme colors: `tailwind.config.ts`

3. **Add Your Content**
   - Create blog posts in `/admin/posts`
   - Add portfolio items in `/admin/portfolio`
   - Customize about section on home page

4. **Deploy to Vercel**
   - See README.md for full deployment instructions
   - Set environment variables in Vercel dashboard
   - Connect your PostgreSQL database
   - Optional: Add Upstash Redis for production rate limiting

## File Structure Overview

```
src/
├── app/
│   ├── page.tsx           # Landing page
│   ├── blog/              # Blog pages
│   ├── portfolio/         # Portfolio pages
│   ├── contact/           # Contact form
│   ├── login/             # Admin login
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/
│   ├── public/            # Public site components
│   ├── admin/             # Admin components
│   └── ThemeProvider.tsx  # Theme management
├── lib/
│   ├── auth.ts            # Authentication
│   ├── session.ts         # Session management
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Utilities
└── middleware.ts          # Route protection
```

## Common Tasks

### Add a Blog Post
1. Go to `/admin/posts`
2. Click "New Post"
3. Fill in title, content (markdown supported), tags
4. Set status to Published
5. Save

### Add Portfolio Item
1. Go to `/admin/portfolio`
2. Click "New Project"
3. Add title, description, tech stack
4. Mark as featured (optional)
5. Save

### View Site Analytics
- Dashboard at `/admin` shows:
  - Total posts, published/draft count
  - Portfolio items
  - Recent activity

## Troubleshooting

**Can't connect to database?**
- Check your DATABASE_URL in `.env`
- Ensure PostgreSQL is running
- Run `npm run prisma:push` again

**Login not working?**
- Check SESSION_SECRET is set in `.env`
- Clear browser cookies
- Check that admin user exists: `npm run prisma:studio`

**Contact form not sending emails?**
- Verify RESEND_API_KEY is correct
- Check CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are set
- Ensure "from" email is verified in Resend dashboard

**Rate limit errors?**
- Wait 1 minute between attempts
- For production, add Upstash Redis credentials

## Support

- Full documentation: See README.md
- Prisma studio (database GUI): `npm run prisma:studio`
- Check logs in terminal for errors

Enjoy building your portfolio! 🚀

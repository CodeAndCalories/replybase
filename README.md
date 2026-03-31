# ReplyBase

AI-powered review reply management for Google Business.

## What it does

ReplyBase monitors your Google Business Profile for new reviews and generates professional AI replies instantly. Approve with one click or enable auto-send for fully hands-free review management.

**$175/mo per business · 14-day free trial · No credit card required**

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Payments**: Stripe
- **AI**: OpenAI GPT-4o
- **Auth**: Supabase Auth + Google OAuth

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
replybase/
├── app/
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles + design tokens
│   ├── signup/page.tsx   # Signup page
│   ├── login/page.tsx    # Login page
│   └── dashboard/page.tsx # Main dashboard (placeholder)
├── components/
│   ├── Navbar.tsx        # Navigation
│   └── Footer.tsx        # Footer
└── public/
```

## Running the Database Migration

1. Go to your [Supabase project dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy the contents of `supabase/migrations/001_initial.sql`
5. Paste into the editor and click **Run**

This creates the `businesses`, `reviews`, and `subscriptions` tables with RLS policies so users can only access their own data.

> **Supabase Auth setup**: In your Supabase project, go to **Authentication → URL Configuration** and set:
> - Site URL: `https://your-vercel-domain.vercel.app`
> - Redirect URLs: `https://your-vercel-domain.vercel.app/**`

## Roadmap

- [ ] Supabase auth integration
- [ ] Google Business Profile OAuth + API
- [ ] AI reply generation pipeline
- [ ] Dashboard: review queue + approval UI
- [ ] Stripe billing + subscription management
- [ ] Email notifications
- [ ] Auto-send mode
- [ ] Multi-location support
- [ ] Brand voice training

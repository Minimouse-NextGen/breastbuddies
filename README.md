# BreastBuddies

BreastBuddies is a React + Vite website for lactation support services,
consultation booking, and booking administration.

## Local Development

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` and fill in the EmailJS and Supabase values.

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Admin Panel

The admin panel lives at:

```text
/admin/login
```

It uses Supabase Auth, Row Level Security, and the `admin_profiles` table to
control access. See [ADMIN_SETUP.md](ADMIN_SETUP.md) for the full setup steps.

## Supabase

The database schema and RLS policies are in:

```text
supabase/bookings.sql
```

Run that SQL in the Supabase SQL editor before testing bookings or admin access.

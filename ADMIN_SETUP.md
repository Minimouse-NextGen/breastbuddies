# BreastBuddies Admin Panel Setup

The admin panel is available at `/admin/login` and uses Supabase Auth plus the
`admin_profiles` table to decide who can access bookings.

## 1. Configure Environment Variables

Create a local `.env` file from `.env.example` and set:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

Never commit `.env`. It is already ignored by Git.

## 2. Run the Supabase Schema

Open the Supabase SQL editor for the project and first check whether the
required tables already exist:

```sql
select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('bookings', 'admin_profiles')
order by table_name;
```

Then run:

```sql
-- Copy and run the full contents of:
-- supabase/bookings.sql
```

This creates:

- `bookings`
- `admin_profiles`
- booking overlap protection
- Row Level Security policies
- `get_unavailable_booking_slots`
- `is_admin`

## 3. Create Admin Auth Users

In Supabase, go to Authentication > Users and create users for each allowed
admin email:

- `divya.us@gmail.com`
- `support@minimousenextgen.com`

Set a secure password for each user. These credentials are used on
`/admin/login`.

## 4. Add Admin Profiles

After creating each Auth user, confirm the user exists and copy the `id`.
This query must be run in the Supabase SQL editor:

```sql
select id, email
from auth.users
where lower(email) in ('divya.us@gmail.com', 'support@minimousenextgen.com');
```

Then insert the admin profiles:

```sql
insert into public.admin_profiles (user_id, email, role)
values
  ('DIVYA_AUTH_USER_UUID', 'divya.us@gmail.com', 'admin'),
  ('SUPPORT_AUTH_USER_UUID', 'support@minimousenextgen.com', 'admin')
on conflict (user_id) do update
set email = excluded.email,
    role = excluded.role;
```

Confirm the profiles were created:

```sql
select user_id, email, role
from public.admin_profiles
order by email;
```

The frontend has a light email allowlist in `src/services/adminAccess.js`, but
real admin authorization is enforced through `public.is_admin()` and RLS. Add
any future admin email in both `src/services/adminAccess.js` and the
`admin_profiles_allowed_email_check` constraint in `supabase/bookings.sql`.

## 5. Test the Admin Panel

Run the app locally:

```bash
npm run dev
```

Then test:

- Website booking form creates a booking.
- `/admin/login` accepts only allowed admin emails.
- `/admin` lists bookings after login.
- Status updates work.
- Admin notes save correctly.

## Deployment Notes

Set the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values in the
hosting provider environment variables. After deployment, test
`/admin/login` on the live domain with an allowed admin account.

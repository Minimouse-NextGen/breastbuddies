# PROJECT_CONTEXT

## 1. Project Overview

BreastBuddies is a single-page React marketing and booking website for lactation consultation services, plus a protected admin panel for managing bookings and calendar availability.

The public site is section-based and uses route aliases like `/about-divya` and `/book-consultation` to navigate users to specific sections of the same landing page. The main business workflow is:

- A visitor submits a consultation request.
- The request is stored in Supabase.
- Optional notification email is sent through EmailJS.
- An admin logs in through Supabase Auth.
- The admin reviews bookings, updates statuses, adds internal notes, and blocks calendar slots.

## 2. Tech Stack

- Frontend: React 19, React DOM 19
- Bundler: Vite 8
- Routing: `react-router-dom` 7 with `BrowserRouter`
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`, plus custom global CSS in `src/index.css`
- Database and auth: Supabase
- Email notifications: EmailJS
- Hosting support: Vercel rewrite config and Vercel Analytics / Speed Insights
- Linting: ESLint 10 with React Hooks and React Refresh rules

## 3. Folder Structure

```text
breastbuddies/
+-- public/                 Static images, favicon, robots.txt, sitemap.xml
+-- src/
|   +-- assets/             Bundled image assets imported into components
|   +-- components/         Public UI sections and shared visual primitives
|   +-- content/            Static content/config arrays
|   +-- pages/              Route-level admin pages
|   +-- services/           Supabase and business-data service helpers
|   +-- utils/              Section routing and scroll helpers
|   +-- App.jsx             Route definitions and auth gate
|   +-- main.jsx            App bootstrap
|   `-- index.css           Global styles and design tokens
+-- supabase/
|   `-- bookings.sql        Database schema, functions, triggers, and RLS
+-- ADMIN_SETUP.md          Admin setup guide
+-- README.md               Project intro and local setup
+-- index.html              SEO metadata and schema markup
+-- package.json            Scripts and dependencies
+-- vercel.json             SPA rewrite rule
`-- vite.config.js          Vite config
```

Notes:

- `dist/` is build output.
- `node_modules/` is dependency installation output.
- `src/App.css` appears to be leftover Vite starter CSS and is not imported.
- `src/components/Gallery.jsx` exists, but the active app currently renders a gallery placeholder instead of this component.

## 4. Routing Structure

Public routes all render the same `WebsitePage` layout and then scroll to a section:

- `/` and `/home` -> top/hero
- `/about` and `/about-divya` -> `#about`
- `/services` -> `#services`
- `/gallery` -> gallery placeholder
- `/book-consultation` -> `#booking`

Admin routes:

- `/admin/login` -> admin login page
- `/admin` -> protected admin dashboard
- `*` -> redirect to `/`

Routing details:

- Route-to-section mapping lives in `src/utils/sectionRoutes.js`.
- `App.jsx` listens to `location.pathname` and scrolls the target section into view with `requestAnimationFrame`.
- `vercel.json` rewrites all requests to `index.html` so SPA routes work in production.

## 5. Components

Public-site components:

- `Header`: top navigation with desktop and mobile menus
- `Hero`: landing hero with CTA and WhatsApp CTA
- `TrustHighlights`: credential/value cards below hero
- `AboutDivya`: profile, qualifications, and associations
- `Services`: three service cards
- `FAQ`: accordion plus FAQ schema markup
- `Testimonials`: testimonial cards
- `HowItWorks`: step-by-step consultation process
- `BookingForm`: main booking workflow and slot picker
- `Footer`: quick links, contact info, brand footer
- `FloatingWhatsApp`: persistent WhatsApp button

Admin pages:

- `AdminLogin`: email/password sign-in UI with allowlist pre-check
- `AdminDashboard`: booking management and availability blocking UI

Support/visual components:

- `Graphics`: logo, wordmark, tagline, icons, SVG illustrations
- `WhatsAppCallout`: reusable hover/focus tooltip bubble
- `Gallery`: present in codebase but not mounted in the live page flow

## 6. Reusable Components

The main reusable UI primitives are:

- `Graphics.jsx`
  - `LogoMark`
  - `BrandWordmark`
  - `BrandTagline`
  - `SmallIcon`
  - illustration helpers
- `WhatsAppCallout.jsx`
  - reused in hero and floating WhatsApp entry points

There is no formal design-system folder, but reusable patterns also exist through shared CSS classes:

- `.bb-button*` button variants
- `.heading-h1`, `.heading-h2`, `.heading-h3`
- `.section-frame`, `.wide-section-frame`

## 7. State Management

State management is entirely local React state. There is no Redux, Zustand, Context-based global store, or server-state library.

Patterns in use:

- `App.jsx`
  - tracks auth session
  - tracks admin verification/loading state
- `BookingForm.jsx`
  - tracks form fields, validation errors, date picker state, slot availability, and submission state
- `AdminDashboard.jsx`
  - tracks bookings, blocked slots, filters, selected booking modal state, notes, blocking form, active view, and sidebar/profile menu state

Data fetching is done with `useEffect` plus service-layer functions from `src/services`.

## 8. Database Structure (Supabase)

Defined in `supabase/bookings.sql`.

### Tables

`public.bookings`

- `id uuid primary key`
- `full_name text`
- `mobile_number text`
- `email_address text`
- `baby_info text`
- `primary_concern text`
- `consultation_mode text`
- `preferred_date date`
- `preferred_time_slot text`
- `consultation_duration text`
- `start_time time`
- `end_time time`
- `status text default 'pending'`
- `admin_notes text default ''`
- `created_at timestamptz default now()`
- `updated_at timestamptz default now()`

Constraints:

- status limited to `pending | confirmed | completed | cancelled`
- duration limited to `30 minutes | 1 hour`
- exclusion constraint prevents overlapping active bookings for `pending` and `confirmed`

Indexes:

- `bookings_preferred_date_idx`
- `bookings_status_idx`

`public.blocked_slots`

- `id uuid primary key`
- `block_date date`
- `start_time time`
- `end_time time`
- `is_full_day boolean default false`
- `reason text default ''`
- `blocked_by text default ''`
- `created_at timestamptz default now()`

Constraints:

- `end_time > start_time`
- exclusion constraint prevents overlapping blocked ranges

Index:

- `blocked_slots_block_date_idx`

`public.admin_profiles`

- `user_id uuid primary key references auth.users(id)`
- `email text`
- `role text default 'admin'`
- `created_at timestamptz default now()`

Constraints:

- email restricted to the two allowed admin emails in SQL
- role restricted to `admin`

### Functions and Triggers

- `public.sync_admin_profile_from_auth_user()`
  - auto-syncs eligible auth users into `admin_profiles`
- `public.set_updated_at()`
  - updates `bookings.updated_at` on update
- `public.is_admin()`
  - returns whether current authenticated user is an allowed admin
- `public.prevent_booking_if_blocked_slot_conflict()`
  - blocks booking inserts/updates that overlap blocked slots
- `public.get_unavailable_booking_slots(selected_date date)`
  - returns merged unavailable ranges from bookings and blocked slots

### Row Level Security

RLS is enabled on:

- `bookings`
- `blocked_slots`
- `admin_profiles`

Policies:

- public/anon/authenticated users can insert bookings only with `status = 'pending'`
- admins can read/update bookings
- admins can read `admin_profiles`
- admins can read/create/delete blocked slots

## 9. Authentication Flow

Auth is only used for the admin area.

Flow:

1. `App.jsx` reads the current Supabase session on load.
2. `App.jsx` subscribes to `supabase.auth.onAuthStateChange`.
3. When a session exists, `verifyAdminAccess()` calls Supabase RPC `is_admin()`.
4. If verification fails, the user is signed out.
5. `/admin` only renders `AdminDashboard` when both session and admin verification succeed.
6. `/admin/login` performs an email allowlist check before `signInWithPassword`.
7. After login, admin access is verified again through the RPC.
8. Admin sign-out calls `supabase.auth.signOut()` and redirects to `/`.

Important detail:

- Frontend email allowlisting in `src/services/adminAccess.js` is only a convenience filter.
- Real authorization is enforced by Supabase RLS and `public.is_admin()`.

## 10. Booking Flow

Public booking flow in `BookingForm.jsx`:

1. User fills personal and consultation details.
2. Form validates name, phone, email, concern, mode, date, duration, and slot.
3. For online consultations:
   - available slots are derived from a fixed daily schedule
   - unavailable slots are fetched from Supabase for the selected date
   - overlapping slots are disabled in the UI
4. On submit, the form re-fetches availability to reduce stale-slot conflicts.
5. `createBooking()` inserts the booking into `public.bookings`.
6. If EmailJS env vars are configured, EmailJS sends a notification email.
7. Success message tells the user they will be contacted on WhatsApp or email.

Special case:

- In-person hospital consults do not use slot selection in the same way.
- They store placeholder times and a display value of `To be confirmed`.

## 11. Admin Panel Architecture

The admin panel is a client-side protected page with two practical views inside one component:

- dashboard/bookings view
- manage-availability view

Core characteristics:

- `AdminDashboard.jsx` is a large single-file page component containing:
  - data loading
  - dashboard metrics
  - filters/search
  - booking status updates
  - notes editing modal
  - availability calendar
  - blocked-slot form
  - blocked-slot list
  - mobile sidebar and profile menu

Implemented admin capabilities:

- list all bookings
- filter by date
- filter by status
- search by name/mobile/email
- view booking detail modal
- edit internal admin notes
- change booking status using constrained transitions
- view availability by month/day
- add blocked date/time ranges
- remove blocked slots

Partially implemented or placeholder admin IA:

- sidebar includes `Clients`, `Consultants`, `Services`, `Messages`, and `Settings`
- these do not have separate implementations and currently map back to dashboard or no distinct content

## 12. Calendar & Slot Blocking Logic

Public booking availability:

- Booking window is hardcoded from `09:00 AM` to `09:00 PM`.
- Slots are generated in 30-minute increments.
- Duration can be `30 minutes` or `1 hour`.
- A slot is selectable only if:
  - it ends within the booking window
  - it does not overlap an unavailable booking or blocked slot
  - it is not inside the currently selected time range

Unavailable-slot data source:

- `get_unavailable_booking_slots(selected_date)` merges:
  - active bookings with status `pending` or `confirmed`
  - all blocked slots for that date

Admin blocking logic:

- Admin can block a full day or a partial time range.
- Client-side checks prevent invalid end-before-start values.
- Client-side checks also prevent overlaps with already loaded blocked slots.
- Database exclusion constraints enforce the same rule server-side.
- A booking insert/update trigger also rejects conflicts against blocked slots.

Status display in admin calendar:

- no blocked slots -> available
- any full-day block -> fully blocked
- otherwise -> partially blocked

## 13. WhatsApp Integration

WhatsApp is implemented as direct deep links, not via an API.

Used in:

- `Hero`
- `FloatingWhatsApp`
- `Footer`

Behavior:

- links open `https://wa.me/917338890927` with a prefilled consultation message
- booking success copy indicates follow-up may happen over WhatsApp
- static content reinforces WhatsApp-first communication and response expectations

There is no webhook, CRM sync, or inbound WhatsApp automation in this repo.

## 14. Email Integration

Email is handled by EmailJS in the frontend.

Details:

- package: `@emailjs/browser`
- env vars:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`
- trigger point: after successful booking creation
- payload includes the booking details and a composed plain-text message body

Behavioral note:

- Email sending is optional at runtime.
- If EmailJS is not configured, booking creation still proceeds.

## 15. SEO Implementation

SEO is primarily implemented in `index.html` plus supporting static files.

Included:

- title tag
- meta description
- meta keywords
- canonical URL
- Open Graph tags
- Twitter card tags
- JSON-LD for `LocalBusiness` / `MedicalBusiness`
- `robots.txt`
- `sitemap.xml`
- FAQ schema injected by `FAQ.jsx`

SEO limitations in current implementation:

- metadata is static for the whole SPA
- route-specific titles/descriptions are not dynamically updated
- `og-image.jpg` is referenced but not present in the visible repo file list
- `/gallery` is not listed in `sitemap.xml`

## 16. Environment Variables

Documented env vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Usage:

- Supabase vars are required for bookings and admin auth.
- EmailJS vars are optional for notification email sending.

Security note:

- This is a Vite app, so any `VITE_` variable is exposed to the client bundle.
- Secrets should not be stored as frontend-only environment variables unless intended for public use.

## 17. API/Service Layer

There is no separate backend app in this repository. The service layer is frontend-to-Supabase.

Files:

- `src/services/supabaseClient.js`
  - normalizes env vars
  - creates Supabase client
  - exposes configuration error state
- `src/services/bookingsService.js`
  - `createBooking`
  - `getUnavailableBookingSlots`
  - `getAdminBookings`
  - `updateBookingStatus`
  - `updateBookingNotes`
  - `getAdminBlockedSlots`
  - `createBlockedSlot`
  - `removeBlockedSlot`
- `src/services/adminAccess.js`
  - allowed admin email list
  - `verifyAdminAccess`

External services used directly:

- Supabase database/Auth/RPC
- EmailJS email send API
- Vercel Analytics
- Vercel Speed Insights

## 18. Assets & Static Files

`public/` contains:

- brand logos and favicons
- admin page imagery
- WhatsApp SVG icon
- profile/hero/gallery images
- `robots.txt`
- `sitemap.xml`

`src/assets/` contains bundled service illustrations and starter SVGs.

Observations:

- public assets are referenced by absolute paths like `/favicon.png`
- imported assets are used mainly inside service/gallery cards
- `launch-reference.png` and large `launch-*` CSS styles suggest a past or experimental landing/reference page not wired into current routes

## 19. Current Features

- Responsive marketing website
- Section-based SPA navigation
- Public consultation request form
- Client-side validation for booking inputs
- Dynamic slot availability for online consultations
- Supabase booking persistence
- Admin login with Supabase Auth
- Admin authorization with RLS-backed verification
- Booking list with search and filters
- Booking status updates
- Internal admin notes
- Admin calendar for blocked dates/times
- Full-day and partial-day blocking
- WhatsApp contact entry points
- Optional EmailJS notification email
- SEO metadata and schema markup
- Vercel Analytics and Speed Insights

## 20. Known Limitations

- `Gallery.jsx` is not currently used; `/gallery` shows a placeholder instead.
- Admin dashboard is a very large single component, which will be harder to maintain over time.
- Several admin sidebar items are present visually but do not have real feature implementations.
- SEO metadata is static across routes.
- WhatsApp integration is only a deep link, not an automated integration.
- Email sending happens client-side through EmailJS rather than a server-side workflow.
- Allowed admin emails are duplicated in frontend JS and Supabase SQL, increasing maintenance risk.
- No dedicated error boundary or centralized logging is present.
- No test suite is present.
- Booking hours and slot intervals are hardcoded in the frontend/admin code.
- In-person consult scheduling uses placeholder stored times rather than a separate appointment model.
- `src/App.css` appears unused.
- `src/index.css` contains substantial unused/legacy launch-page styling.

## 21. Dependencies

Runtime dependencies:

- `react`
- `react-dom`
- `react-router-dom`
- `tailwindcss`
- `@tailwindcss/vite`
- `@supabase/supabase-js`
- `@emailjs/browser`
- `@vercel/analytics`
- `@vercel/speed-insights`
- `tslib`

Dev dependencies:

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `@types/react`
- `@types/react-dom`

## 22. Future Improvements

- Split `AdminDashboard.jsx` into smaller feature modules and shared hooks.
- Replace static gallery placeholder with a real gallery or remove the route.
- Add automated tests for booking validation, slot conflict logic, and auth-gated admin access.
- Move notification workflows to a server-side or edge-function layer.
- Centralize admin allowlist configuration so frontend and SQL do not drift.
- Add dynamic per-route SEO metadata and route-specific canonical tags.
- Introduce a real admin information architecture for clients, messages, settings, and consultants.
- Add pagination or virtualization for large booking volumes.
- Add booking reschedule/cancel actions for admins.
- Add audit history for status and notes changes.
- Add timezone-awareness and configurable working hours.
- Add stronger accessibility review for dialogs, date pickers, and navigation interactions.
- Remove unused assets, starter files, and legacy launch styles.

## Appendix: Key Files

- App entry: `src/main.jsx`
- Routes and auth gate: `src/App.jsx`
- Public booking logic: `src/components/BookingForm.jsx`
- Admin login: `src/pages/AdminLogin.jsx`
- Admin dashboard: `src/pages/AdminDashboard.jsx`
- Supabase client: `src/services/supabaseClient.js`
- Booking/admin service layer: `src/services/bookingsService.js`
- Admin access helper: `src/services/adminAccess.js`
- Supabase schema and RLS: `supabase/bookings.sql`
- SEO shell: `index.html`

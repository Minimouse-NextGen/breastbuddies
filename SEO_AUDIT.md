# BreastBuddies Website Audit

Audit date: 2026-09-05
Scope: repository-first technical SEO, performance, structured data, accessibility, GEO/AEO, conversion, and lightweight security audit.
Production check: homepage content is publicly visible in search crawl output. Live robots/sitemap fetching was not completed by the browser tool, so robots and sitemap findings are based on repository files.

## 1. Executive Summary

BreastBuddies is a React 19 + Vite 8 single-page application using `react-router-dom` 7 and `react-helmet-async`. Public pages are rendered client-side. Core section routes (`/services`, `/about-divya`, `/book-consultation`, `/gallery`) all render the same long homepage and scroll to sections. Additional SEO landing pages exist for Chennai, low milk supply, tongue tie, online consultation, NRI/international consultation, and seven Chennai neighborhoods.

Scores:

| Area | Score |
|---|---:|
| Technical SEO | 62/100 |
| On-Page SEO | 66/100 |
| Local SEO | 58/100 |
| Structured Data | 38/100 |
| Content / E-E-A-T | 49/100 |
| GEO / AEO Readiness | 57/100 |
| Performance | 61/100 |
| Accessibility | 70/100 |
| Security / Code Quality | 64/100 |
| Conversion Architecture | 42/100 |
| Overall Discoverability Score | 57/100 |

Most important confirmed issues:

- The main consultation form does not persist or send requests; it logs personal data to the browser console instead. See `src/components/BookingForm.jsx:66-84`.
- Several SEO pages claim "IBCLC" while the main practitioner profile states "Certified Advanced Lactation Professional" and other qualifications, not IBCLC. This needs business confirmation before being used in titles, copy, or schema. See `src/pages/seo/LactationConsultantChennai.jsx:7-10`, `src/pages/seo/LactationConsultantChennai.jsx:50-52`, and `src/components/AboutDivya.jsx:87-114`.
- `index.html` references `https://www.breastbuddies.co.in/og-image.jpg`, but `public/og-image.jpg` is absent. See `index.html:18-20`.
- Route-specific metadata is inserted after client-side rendering. Crawlers that do not execute JS, and social preview crawlers, may see only the static `index.html` metadata. See `src/App.jsx:75-85` and route definitions at `src/App.jsx:242-269`.
- Standalone SEO pages have inconsistent layout: some include the shared header/footer shell and some do not, reducing internal linking and conversion consistency. Compare `src/pages/seo/SeoPageParts.jsx:7-17` with `src/pages/seo/LactationConsultantChennai.jsx:31` and `src/pages/seo/TongueTieAssessmentChennai.jsx:27`.
- Neighborhood pages are templated and risk being perceived as doorway/thin local pages unless service availability, visit model, and area-specific value are confirmed. See `src/pages/seo/NeighborhoodPage.jsx:49-108` and `src/content/neighborhoods.js:7-50`.

## 2. Critical Issues - P0

### P0.1 Consultation form does not submit the lead

Issue: Main conversion form creates an object, logs it, shows success, and clears the form, but does not call Supabase, EmailJS, or any backend.

Affected file: `src/components/BookingForm.jsx:66-84`

Affected URL: `/`, `/services`, `/about-divya`, `/book-consultation`, `/gallery`, plus NRI/international SEO pages that embed `BookingForm`.

Current implementation: `handleSubmit()` validates fields, builds `consultationRequest`, runs `console.log("Consultation request ready for submission", consultationRequest)`, then sets `isSubmitted` to true.

Why it matters: This is a production conversion failure and can cause lost medical-service inquiries. It also creates misleading UX because users see "Request Received!" even though no request is stored.

Recommended fix: Wire the current form to `createBooking()` or a server-side/edge function; show success only after confirmed persistence or notification; add error and retry states.

Risk level: Critical

### P0.2 Personal/health-related form data is logged in the browser console

Issue: User-submitted name, phone, email, baby age/pregnancy week, and health concern are logged client-side.

Affected file: `src/components/BookingForm.jsx:71-81`

Affected URL: all pages containing `BookingForm`.

Current implementation: `consultationRequest` is logged in full.

Why it matters: This is sensitive personal and health-context data. Browser extensions, shared devices, screenshots, or remote debugging can expose it.

Recommended fix: Remove production logging of form payloads. Use privacy-safe telemetry with no PII if conversion measurement is needed.

Risk level: Critical

### P0.3 Possible unsupported medical credential claims

Issue: SEO pages repeatedly claim "IBCLC" certification, but the main profile only confirms "Advanced Certified Lactation Professional (ACLP)" and related training/roles.

Affected files: `src/pages/seo/LactationConsultantChennai.jsx:7-10`, `src/pages/seo/LactationConsultantChennai.jsx:50-52`, `src/pages/seo/LactationConsultantChennai.jsx:88-96`, `src/pages/seo/OnlineLactationConsultation.jsx:7-10`, `src/pages/seo/NeighborhoodPage.jsx:14-16`, `src/components/AboutDivya.jsx:87-114`

Affected URL: all SEO landing pages using IBCLC copy.

Current implementation: Page titles, descriptions, H1s, and body copy use "IBCLC" language.

Why it matters: Health-related YMYL content must accurately represent qualifications. Unsupported credentials can damage trust, rankings, and compliance.

Recommended fix: Confirm credential status with the business. If not currently IBCLC certified, replace all IBCLC claims with confirmed credentials only. Mark schema `Person` credentials from confirmed facts only.

Risk level: Critical

## 3. High Priority - P1

### P1.1 CSR-only rendering limits metadata reliability

Issue: Route-specific titles, descriptions, and canonicals are injected by React Helmet after JS execution.

Affected file: `src/App.jsx:75-85`; routes at `src/App.jsx:242-269`; `index.html:1-75`

Affected URL: all routes.

Current implementation: Vite serves a single `index.html`; `vercel.json` rewrites every path to it.

Why it matters: Google can often render CSR, but social crawlers, link unfurlers, some SEO tools, and some AI/search crawlers may only see initial HTML. Route-specific metadata and schema are less reliable than pre-rendered HTML.

Recommended fix: Add prerender/static generation for public routes, or migrate public marketing pages to SSR/SSG while keeping admin as CSR.

Risk level: High

### P1.2 Missing static `<title>` in `index.html`

Issue: `index.html` contains meta and OG tags but no static `<title>`.

Affected file: `index.html:3-70`

Affected URL: initial HTML for all routes.

Current implementation: Title is set only by Helmet after React loads.

Why it matters: Non-JS agents may see no title. This weakens social previews, browser previews, and fallback SEO.

Recommended fix: Add a conservative homepage title in `index.html`, then let Helmet override route titles after hydration.

Risk level: High

### P1.3 Broken social image URL

Issue: `og-image.jpg` is referenced but missing from `public/`.

Affected file: `index.html:18-20`, `index.html:35-37`

Affected URL: social previews for all routes without page-specific image overrides.

Current implementation: OG/Twitter image points to `https://www.breastbuddies.co.in/og-image.jpg`; `Test-Path public\og-image.jpg` returned `False`.

Why it matters: Social previews may show no image or a broken image. AI/search citation cards may lose visual context.

Recommended fix: Create/confirm a social preview asset using existing brand assets, or change the URL to an existing public image such as a properly sized WebP/JPG. Do not alter the official logo asset.

Risk level: High

### P1.4 Schema is too thin and partly ambiguous

Issue: Global JSON-LD uses `["@type": ["LocalBusiness", "MedicalBusiness"]]` with no `@id`, logo, image, address/service area detail, sameAs, contactPoint, founder URL, or page/entity relationships.

Affected file: `index.html:40-70`

Affected URL: `/` initial HTML and inherited base HTML.

Current implementation: Basic LocalBusiness/MedicalBusiness object with phone, description, areaServed, serviceType, and founder name/jobTitle.

Why it matters: Entity disambiguation is weak, and the business/practitioner/services/pages graph is not connected. MedicalBusiness may be acceptable only if services and practitioner status are confirmed.

Recommended fix: Build a connected graph using confirmed facts only:

- `Organization` or `LocalBusiness` with `@id: https://www.breastbuddies.co.in/#organization`
- Healthcare service entity only if business type is confirmed: `MedicalBusiness` or a more conservative `ProfessionalService`
- `Person` for Divya Umashankar with confirmed credentials
- `WebSite`, `WebPage`, `AboutPage`, `ContactPage`, `Service`, `FAQPage`, and `BreadcrumbList` on relevant pages

Risk level: High

### P1.5 Page-specific OG/Twitter metadata incomplete

Issue: SEO pages set OG title/description/url/type inconsistently and generally omit `og:image`, `twitter:*`, and `og:site_name`.

Affected files: `src/pages/seo/LactationConsultantChennai.jsx:16-28`, `src/pages/seo/TongueTieAssessmentChennai.jsx:16-24`, `src/pages/seo/OnlineLactationConsultation.jsx:16-28`, `src/pages/seo/LowMilkSupplyHelpChennai.jsx:46-49`

Affected URL: all standalone SEO pages.

Current implementation: Some pages omit `og:type`; some omit `og:url`; all rely on global image fallback that points to a missing file.

Why it matters: Shared URLs may generate generic or broken previews.

Recommended fix: Centralize a metadata component that emits title, description, canonical, OG, Twitter, and optional image for every indexable route.

Risk level: High

### P1.6 Sitemap is manual and can drift from routes

Issue: `public/sitemap.xml` is manually maintained. Routes are generated in `src/App.jsx` and `src/content/neighborhoods.js`.

Affected files: `public/sitemap.xml:3-20`, `src/App.jsx:242-269`, `src/content/neighborhoods.js:7-50`

Affected URL: sitemap.

Current implementation: Current sitemap includes primary indexable routes and generated neighborhood routes, but aliases `/home` and `/about` are routed and intentionally omitted.

Why it matters: Manual route/sitemap drift is likely as more content is added.

Recommended fix: Generate sitemap from the canonical route registry and explicitly mark non-canonical aliases for redirect/noindex handling.

Risk level: High

### P1.7 Placeholder testimonials appear in live SEO content

Issue: One service page contains `[Client Name]` placeholders and an instruction to replace them.

Affected file: `src/pages/seo/LactationConsultantChennai.jsx:153-174`

Affected URL: `/lactation-consultant-chennai`

Current implementation: Placeholder review cards are visible content.

Why it matters: Placeholder testimonials reduce trust and may imply fabricated reviews if left live.

Recommended fix: Remove the section until real, permissioned testimonials are available. Do not fabricate names, ratings, review dates, or review schema.

Risk level: High

## 4. Medium Priority - P2

- Section routes (`/services`, `/about-divya`, `/book-consultation`, `/gallery`) all render the full homepage, not page-specific documents. This can be acceptable for users, but search engines may treat them as near-duplicate pages with different canonicals. See `src/App.jsx:116-160`.
- `/home` and `/about` are routed aliases with canonical targets but no HTTP redirect. See `src/App.jsx:70-73` and `src/App.jsx:243-246`.
- `src/components/Gallery.jsx` exists but is not mounted; `/gallery` shows only placeholder copy. See `src/App.jsx:101-112` and `src/App.jsx:154`.
- FAQ schema exists on the homepage and service pages, but there is no `WebPage`, `BreadcrumbList`, or `Service` schema tying those FAQs to the relevant page/service. See `src/components/FAQ.jsx:63-64` and `src/pages/seo/SeoPageParts.jsx:77-91`.
- Several health claims need citations or softer language: "same-day appointments", "Most mothers feel a difference immediately", "Studies show...", "frenectomy ... complications are extremely rare", "1,000+ hours" for IBCLC. See `src/pages/seo/LactationConsultantChennai.jsx:67`, `src/pages/seo/LactationConsultantChennai.jsx:125`, `src/pages/seo/OnlineLactationConsultation.jsx:82-83`, `src/pages/seo/TongueTieAssessmentChennai.jsx:96-98`, `src/pages/seo/LactationConsultantChennai.jsx:189-190`.
- Phone number is present in CTAs and schema, but footer shows email `hello@breastbuddies.com` while the live domain is `.co.in`. NEEDS BUSINESS CONFIRMATION. See `src/components/Footer.jsx:45`.
- No Search Console verification or GA4/GTM was found; only Vercel Analytics and Speed Insights are mounted. See `src/main.jsx:8-17`.
- No privacy policy, terms, or data-use notice route was found, despite collection of health-context form data.

## 5. Low Priority - P3

- `src/App.css`, `src/assets/react.svg`, and `src/assets/vite.svg` appear to be starter/unused assets.
- `src/index.css:354-420` and following launch-page CSS appears legacy or experimental and not routed.
- `dist/` is committed/generated output in the working tree. Confirm whether it is intended for deployment; otherwise it adds audit noise.
- Meta keywords in `index.html:7-10` have negligible SEO value and may encourage keyword stuffing habits.
- Several anchor labels are generic CTA labels ("Call Now", "WhatsApp Us") and could be improved with surrounding context or aria labels.

## 6. Page-Level SEO Matrix

| URL | Page Purpose | Search Intent | Primary Topic | Title | Meta Description | H1 | Canonical | Indexable? | Schema | Internal Links | Content Quality | GEO Readiness | Issues | Recommended Action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Home/brand/service overview | Brand + lactation support | BreastBuddies lactation support | Present via Helmet | Present via Helmet | One H1 | Self | Yes | Global LocalBusiness/MedicalBusiness + FAQ | Strong nav/CTA | Good overview | Moderate | CSR metadata; schema thin | Add prerender/static title and richer graph |
| `/services` | Section alias | Service discovery | Services | Present via Helmet | Present via Helmet | Homepage H1, section H2 | Self | Yes, but duplicate risk | Homepage FAQ/global | Strong | Thin as standalone route | Moderate | Same full homepage content as `/` | Consider canonical to `/` or build true services page |
| `/about-divya` | Section alias | Practitioner trust | Divya profile | Present via Helmet | Present via Helmet | Homepage H1, about H2 | Self | Yes, but duplicate risk | Homepage FAQ/global | Strong | Good but no full bio page | Good | Not a document-level about page | Build true About page or canonical section aliases |
| `/book-consultation` | Section alias | Conversion | Consultation request | Present via Helmet | Present via Helmet | Homepage H1, booking H2 | Self | Yes, but duplicate risk | Homepage FAQ/global | Strong CTA | Conversion content good | Moderate | Form does not submit | Fix form before SEO expansion |
| `/gallery` | Gallery placeholder | Visual proof | Gallery | Present via Helmet | Present via Helmet | Homepage H1 + gallery H2 | Self | Technically yes | Homepage FAQ/global | Normal | Thin | Low | Placeholder only | Noindex/remove until real gallery exists, or mount `Gallery.jsx` |
| `/lactation-consultant-chennai` | Service/location page | Local commercial | Lactation consultant Chennai | Present | Present | One H1 | Self | Yes | FAQPage | Some service links | Useful but credential/testimonial issues | Good | IBCLC and placeholder reviews | Confirm credentials; remove placeholders; add Service/Breadcrumb schema |
| `/low-milk-supply-help-chennai` | Problem page | Problem/commercial | Low milk supply | Present | Present | One H1 | Self | Yes | FAQPage | Good related links | Good | Moderate | Needs citations for health guidance | Add citations/reviewed-by and Service schema |
| `/tongue-tie-assessment-chennai` | Problem/service page | Problem/commercial | Tongue tie feeding support | Present | Present | One H1 | Self | Yes | FAQPage | Weak; no header/footer shell | Useful but higher medical claim risk | Moderate | No shared nav; missing OG URL/type; unsupported claims | Use shell; add cautious language/citations |
| `/online-lactation-consultation-india` | Online service page | Commercial | Online lactation consultation India | Present | Present | One H1 | Self | Yes | FAQPage | Weak; no header/footer shell | Good | Good | No shared nav; "studies show" uncited | Use shell; cite evidence or soften |
| `/online-lactation-consultation-nri-mothers` | NRI service page | Commercial/international | NRI online lactation support | Present | Present | One H1 | Self | Yes | FAQPage | Good | Good | Good | Needs business confirmation for time zones | Add service schema and direct answer block |
| `/online-lactation-consultant-international` | Global online service page | Commercial/international | International online lactation | Present | Present | One H1 | Self | Yes | FAQPage | Good | Good | Good | IBCLC claim needs confirmation | Confirm credential; add evidence/supporting references |
| `/lactation-consultant-{area}-chennai` | Neighborhood local landing pages | Local commercial | Lactation consultant in area | Templated | Templated | One H1 | Self | Yes | FAQPage | Good | Thin/templated | Moderate | Doorway risk | Add unique confirmed local proof or consolidate |
| `/admin/login` | Admin login | Non-indexable admin | Admin auth | Inherits base initial HTML unless rendered | No route noindex | One H1 | None | Should not be indexed | None | N/A | N/A | N/A | Robots disallow only | Add noindex/header/auth protections |
| `/admin` | Admin dashboard | Non-indexable admin | Protected admin | Inherits base initial HTML unless rendered | No route noindex | H1 depending view | None | Should not be indexed | None | N/A | N/A | N/A | Robots disallow only | Add noindex and ensure auth-only access |

## 7. Structured Data Matrix

| Page | Current Schema | Recommended Schema | Errors | Warnings | Entity `@id` | Required Action |
|---|---|---|---|---|---|---|
| All initial HTML | LocalBusiness + MedicalBusiness | Organization/LocalBusiness or MedicalBusiness, WebSite | Missing `@id`, logo, image, address/service area precision | MedicalBusiness type needs confirmation | `/#organization`, `/#website` | Rebuild graph from confirmed facts |
| Home | FAQPage in component | WebPage + FAQPage + service references | FAQ injected client-side | FAQ is not connected to organization/page | `/#home`, `/#faq` | Add page-level graph |
| About | None specific | AboutPage + Person | No Person schema with credentials | Credentials need confirmation | `/#divya-umashankar` | Add only confirmed credentials |
| Service pages | FAQPage only | Service + WebPage + BreadcrumbList + FAQPage | Missing service entity | FAQ duplicated pattern | `/service/{slug}#service` | Add reusable structured data component |
| Neighborhood pages | FAQPage only | ServiceArea page or local landing WebPage + BreadcrumbList | Doorway risk if unsupported | Same template repeated | `/{slug}#webpage` | Use only if real service area is confirmed |
| Contact/booking | None specific | ContactPage or WebPage + ContactPoint | No dedicated ContactPage | Form not functioning | `/#contact` | Add after conversion flow is fixed |
| Articles/blog | None | Article/BlogPosting | No article system found | N/A | N/A | Create only when educational articles exist |
| Reviews | None | No Review schema until verified | Placeholder testimonials | Do not mark up unverified reviews | N/A | Remove placeholders |

## 8. Keyword / Intent Architecture

| Cluster | Intent | Existing URL | Recommended URL/Action |
|---|---|---|---|
| BRAND | Find BreastBuddies / Divya | `/`, `/about-divya` | Keep; make `/about-divya` a real practitioner/about document or canonical it to `/` |
| SERVICES | Broad service overview | `/services`, `/lactation-consultant-chennai` | Build a true `/services` page or canonical section route to `/`; use dedicated service detail pages below |
| PROBLEMS / CONCERNS | Latch, pain, low supply, tongue tie | `/low-milk-supply-help-chennai`, `/tongue-tie-assessment-chennai` | Add dedicated latch/pain article or service page; cite claims |
| ANTENATAL | Breastfeeding classes during pregnancy | Homepage services + popup | Consider `/antenatal-breastfeeding-class-chennai` if this is a recurring confirmed service |
| POSTPARTUM | Newborn feeding, postpartum support | Homepage services | Consider `/postpartum-breastfeeding-support-chennai` or article cluster |
| NEWBORN FEEDING | Early feeding questions | FAQ/home | Educational article: `/newborn-feeding-support` or `/newborn-feeding-guide` if content exists |
| LOCAL INTENT | Chennai/neighborhood queries | `/lactation-consultant-chennai`, neighborhood pages | Keep main Chennai page; only keep neighborhood pages if unique proof/service coverage is confirmed |
| INFORMATIONAL QUESTIONS | "What does a lactation consultant do?", latch, supply, online effectiveness | FAQ/home/service pages | Build educational articles with concise answer, explanation, evidence, and next action |

Avoid cannibalization: do not let `/services`, `/lactation-consultant-chennai`, and all neighborhood pages target the same exact "lactation consultant Chennai" intent with near-identical content.

## 9. GEO / AEO Opportunity Matrix

| Question | Best Current Page | Answer Present? | Direct Answer Quality | Supporting Evidence | Schema Support | Entity Clarity | Recommended Improvement |
|---|---|---:|---|---|---|---|---|
| What does a lactation consultant do? | `/` FAQ | Yes | Moderate | None | FAQPage | Moderate | Add concise answer + services list + practitioner tie |
| When should I see a lactation consultant? | `/` and `/lactation-consultant-chennai` | Yes | Good | None | FAQPage | Good | Add reviewed-by/date if articleized |
| How can I improve baby's latch? | `/lactation-consultant-chennai` | Partial | Low | None | None | Moderate | Create latch article or service section |
| What can cause low milk supply? | `/low-milk-supply-help-chennai` | Partial | Moderate | None | FAQPage | Good | Add causes table and when to seek help |
| Can I prepare during pregnancy? | `/` services | Partial | Low | None | None | Moderate | Create antenatal prep page/article if service confirmed |
| Is online lactation consultation effective? | `/online-lactation-consultation-india` | Yes | Moderate | Claim uncited | FAQPage | Good | Cite evidence or soften |
| How does online consultation work? | `/online-lactation-consultant-international` | Yes | Good | None | FAQPage | Good | Add step-by-step HowTo only if appropriate |
| When should a newborn feed? | None strong | No | N/A | N/A | None | Low | Create educational article if desired |
| What happens during a lactation consultation? | Online pages | Yes | Good | None | None | Good | Add Service schema and process section |

## 10. Internal Linking Recommendations

| Source page | Anchor context | Target page | Reason |
|---|---|---|---|
| Home Services card | "Low milk supply support" | `/low-milk-supply-help-chennai` | Move users from broad service to problem-specific support |
| Home Services card | "Tongue tie breastfeeding support" | `/tongue-tie-assessment-chennai` | Connect service mention to dedicated page |
| Home FAQ | "online consultations" | `/online-lactation-consultation-india` | Support online-intent discovery |
| `/lactation-consultant-chennai` | "Book a consultation" | `/book-consultation` | Current page uses phone/WhatsApp; add form path |
| `/tongue-tie-assessment-chennai` | "Low milk supply" | `/low-milk-supply-help-chennai` | Related problem navigation |
| `/low-milk-supply-help-chennai` | "latch assessment" | `/lactation-consultant-chennai` | Supports user journey from symptom to consultation |
| Neighborhood pages | "online video consultations" | `/online-lactation-consultation-india` | Already present; keep |
| Footer | "Privacy" | recommended `/privacy-policy` | Needed for form/data trust |

## 11. Performance Findings

| Issue | File/component | CWV affected | Severity | Recommended fix |
|---|---|---|---|---|
| Client-only rendering and hydration needed before complete page metadata/content | `src/main.jsx:11-20`, `src/App.jsx:242-295` | LCP/SEO rendering | High | Prerender public routes or SSR/SSG |
| Google Fonts loaded via CSS `@import` | `src/index.css:1` | LCP/CLS | Medium | Move to `<link rel=preconnect>` and stylesheet in head or self-host fonts |
| Promotional popup image is high-priority and large PNG (~1.84 MB) | `src/config/promotionalPopup.js:2-6`, `src/components/PromotionalPopup.jsx:126-135` | LCP/INP | Medium | Use compressed WebP/AVIF and schedule/expire campaigns |
| Static social image missing | `index.html:18-20` | Share rendering | High | Add existing correctly sized asset |
| Legacy launch CSS is large and likely unused | `src/index.css:354+` | CSS size/maintainability | Low | Remove after confirming no route uses it |
| Several large PNG/JPEG alternates remain in `public/` | `public/` asset inventory | Cache/storage | Low | Keep source originals outside deployed public path if not referenced |
| Header, popup, and WhatsApp fixed UI can compete for first viewport attention | `src/components/Header.jsx`, `src/components/PromotionalPopup.jsx`, `src/components/FloatingWhatsApp.jsx` | INP/UX | Medium | Delay popup or suppress on first visit from organic landing pages |

## 12. Accessibility Findings

| Issue | WCAG relevance | File/component | Severity | Recommended fix |
|---|---|---|---|---|
| Success message is not announced with `role=status` or `aria-live` | Status messages | `src/components/BookingForm.jsx:133-152` | Medium | Add live region semantics |
| Validation errors are not programmatically connected to inputs | Error identification | `src/components/BookingForm.jsx:156-192` | Medium | Add `aria-invalid`, `aria-describedby`, IDs |
| SEO page FAQ uses native `details`, but summary lacks visible focus styling | Keyboard focus | `src/pages/seo/SeoPageParts.jsx:58-67` | Low | Add focus-visible classes |
| Dialog popup lacks full focus trap | Modal/dialog pattern | `src/components/PromotionalPopup.jsx:75-141` | Medium | Trap focus while modal is open |
| Admin dashboard tables may be wide on mobile | Reflow | `src/pages/AdminDashboard.jsx:1216+` | Low | Verify with mobile QA; add responsive summaries if needed |
| Decorative service images use empty alt correctly | Image alt | `src/components/Services.jsx:94-95` | Pass | Keep decorative empty alt |

## 13. Security / Code Findings

| Issue | File | Risk | Recommended action |
|---|---|---|---|
| PII/health-context console logging | `src/components/BookingForm.jsx:80-81` | Critical | Remove logging before production |
| `.env` exists locally with Vite-prefixed variables | `.env`, `.env.example:1-5` | Medium | Confirm `.env` is not committed; remember `VITE_*` values are public in client bundles |
| Admin allowlist duplicated in frontend and SQL | `src/services/adminAccess.js:1-4`, `supabase/bookings.sql` | Medium | Keep backend/RLS as source of truth; avoid relying on frontend filter |
| `dangerouslySetInnerHTML` used for JSON-LD | `src/components/FAQ.jsx:63-64`, `src/pages/seo/SeoPageParts.jsx:77-91` | Low | Safe if only static/trusted strings are used; keep JSON.stringify |
| Admin routes only robots-disallowed, not noindexed | `public/robots.txt:3-4`, `src/App.jsx:270-293` | Medium | Add noindex or auth-only response strategy; robots alone is not index prevention |
| External WhatsApp links mostly use `rel` when target blank | Multiple | Low | Add `rel` to all future external `target="_blank"` links |

## 14. Recommended Site Architecture

Confirmed current architecture:

- `/` - brand homepage with core service overview, practitioner intro, FAQ, testimonials, process, and booking form
- `/services` - route alias to homepage services section
- `/about-divya` - route alias to homepage profile section
- `/book-consultation` - route alias to homepage booking section
- `/gallery` - route alias to a placeholder gallery section
- Dedicated SEO pages for Chennai lactation consulting, low milk supply, tongue tie, online consultation, NRI mothers, international online consultation, and neighborhood landings
- `/admin/login` and `/admin` - protected admin SPA routes

Recommended SEO architecture:

- `/` - homepage
- `/about-divya` - real About/Practitioner page with confirmed credentials
- `/services` - real services index
- `/services/lactation-consultation-chennai` or keep `/lactation-consultant-chennai` as canonical main service page
- `/services/low-milk-supply-help-chennai`
- `/services/tongue-tie-feeding-support-chennai`
- `/services/online-lactation-consultation-india`
- `/services/online-lactation-consultation-nri-mothers`
- `/book-consultation` - real conversion page once form is functional
- `/resources/...` - educational articles only where enough medically responsible content exists
- Neighborhood pages: keep only if each has confirmed in-person coverage and unique value; otherwise consolidate into a "Chennai service areas" section on the main local page
- `/privacy-policy` - needed before collecting personal/health-context data
- `/terms` or `/consultation-policy` - NEEDS BUSINESS CONFIRMATION

Do not create pages for every keyword. Use a page only where a distinct user intent and sufficiently helpful content exist.

## 15. 30-DAY IMPLEMENTATION PLAN

Week 1: Critical technical fixes

- Fix consultation form persistence and user-facing error/success states.
- Remove PII console logging.
- Confirm credentials, business name, phone, email, service area, home visit/in-person details, and practitioner titles.
- Remove placeholder testimonials.
- Add missing social image or correct OG image URL.

Week 2: Metadata + schema + architecture

- Add static fallback title/description/canonical in `index.html`.
- Centralize route metadata.
- Decide SSR/SSG/prerender strategy for public pages.
- Build connected structured data graph with confirmed facts.
- Add `noindex` strategy for admin routes.

Week 3: Content / GEO / internal linking

- Improve direct-answer sections for key lactation questions.
- Add evidence/citations or soften medical claims.
- Build or consolidate service pages based on search intent.
- Strengthen contextual internal links between service/problem/booking pages.

Week 4: Performance + measurement + final validation

- Optimize popup and public assets.
- Improve font loading.
- Add Search Console verification and conversion tracking plan.
- Run Lighthouse/PageSpeed and rich-results validation.
- Validate sitemap, robots, canonicals, and social previews after deployment.

## 16. CHANGE PLAN

CREATE:

| File | Why |
|---|---|
| `SEO_AUDIT.md` | This audit report. |
| `public/og-image.jpg` or another confirmed social preview asset | Fix broken OG/Twitter image reference. |
| `src/components/SeoHead.jsx` | Centralize metadata generation. |
| `src/components/StructuredData.jsx` | Centralize JSON-LD with connected `@id` graph. |
| `src/routes/publicRoutes.js` | Single source for routes, sitemap, metadata, and prerender list. |
| `src/pages/PrivacyPolicy.jsx` | Explain data collection before form submission. NEEDS BUSINESS CONFIRMATION. |

MODIFY:

| File | Why |
|---|---|
| `src/components/BookingForm.jsx` | Submit real bookings, remove PII logging, improve error/success accessibility. |
| `src/App.jsx` | Use central route metadata, add noindex handling for admin, reduce duplicate route risk. |
| `index.html` | Add static title/canonical/fallback metadata and fix social image. |
| `public/sitemap.xml` | Regenerate from canonical public routes; remove thin/placeholder URLs if not indexable. |
| `public/robots.txt` | Keep admin disallow; add only if architecture changes require it. |
| `src/pages/seo/*.jsx` | Confirm credentials, remove unsupported claims, use shared shell, add schema/internal links. |
| `src/content/neighborhoods.js` | Keep only confirmed service areas and add unique factual support. |
| `src/index.css` | Optimize font loading strategy and remove confirmed unused legacy CSS. |
| `src/components/PromotionalPopup.jsx` and `src/config/promotionalPopup.js` | Optimize image format, accessibility, and campaign expiry behavior. |
| `src/components/Footer.jsx` | Confirm email/domain and add privacy/contact links. |

DELETE:

| File/Asset | Why |
|---|---|
| `src/App.css` | Appears unused Vite starter CSS. Confirm before deleting. |
| `src/assets/react.svg`, `src/assets/vite.svg` | Starter assets not referenced by live pages. |
| Unreferenced PNG/JPEG duplicates in `public/` and `src/assets/` | Keep source originals outside deployed public path if not used. Do not delete the official logo asset. |
| `public/images/popups/antenatal-session-august.png` | Past campaign asset if no longer used. Current date is 2026-09-05. Confirm before deleting. |

KEEP UNCHANGED:

| File/Asset | Why |
|---|---|
| `public/breastbuddies-logo.*` | Official logo must not be altered. |
| Supabase RLS policies in `supabase/bookings.sql` | Security-sensitive; adjust only with careful review and explicit implementation phase. |
| Existing analytics IDs/configuration | Do not change IDs without measurement plan. |
| Local `.env` values | Do not expose or commit secrets/config values. |

## Repository / Architecture Notes

- Framework: React `^19.2.6`, Vite `^8.0.12`, Tailwind CSS `^4.3.0`, React Router `^7.16.0`. See `package.json:12-35`.
- Rendering model: CSR SPA. Entry is `src/main.jsx:11-20`; routing is in `src/App.jsx:242-295`; Vercel rewrites all paths to `index.html`.
- Deployment config: `vercel.json` has a single catch-all rewrite to `/index.html`.
- Public assets: logos, profile images, popup images, favicons, robots, and sitemap live under `public/`.
- Bundled assets: service imagery and starter SVGs live in `src/assets/`.
- Forms: main public `BookingForm` is currently local state only; Supabase booking service exists but is not used by the current public form.
- Analytics: Vercel Analytics and Speed Insights only. No GA4/GTM/Search Console verification found in source.
- Duplicate/unused code: `Gallery.jsx` is not mounted; `App.css` appears unused; legacy launch CSS exists.

## Robots.txt Audit

Current file: `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/login
Sitemap: https://www.breastbuddies.co.in/sitemap.xml
```

Assessment:

- Important public pages are crawlable.
- Admin paths are disallowed for crawling, which is appropriate for crawl management.
- Sitemap is referenced with the production `www` HTTPS domain.
- No accidental public-page `Disallow` was found.
- Important caveat: robots disallow does not guarantee URLs stay out of search if discovered elsewhere. Admin routes should also have noindex/auth-only handling.

## XML Sitemap Audit

Current file: `public/sitemap.xml:3-20`

- Exists and uses production HTTPS `www.breastbuddies.co.in` URLs.
- Includes homepage, core section routes, service/problem pages, online pages, and seven neighborhood pages.
- Does not include non-canonical aliases `/home` and `/about`, which is correct if those remain aliases.
- Includes `/gallery`, but the route renders placeholder-only content at `src/App.jsx:101-112`.
- Manual maintenance creates drift risk because routes are defined separately in `src/App.jsx` and `src/content/neighborhoods.js`.
- No automated check confirms URLs are non-redirecting, non-404, or indexable at deploy time.

## Local SEO Audit

Confirmed from repository:

- Brand name: BreastBuddies
- Practitioner identity: Divya Umashankar
- Phone/WhatsApp: `+91 7338890927`
- Service area: Chennai, India, and online worldwide are stated
- Services: antenatal breastfeeding classes, postpartum breastfeeding support, latch, low supply, newborn feeding, tongue tie guidance, relactation, induced lactation, special feeding needs
- In-person: hospital consult/home visit claims appear on SEO pages; NEEDS BUSINESS CONFIRMATION
- Address: not found; NEEDS BUSINESS CONFIRMATION
- Email: `hello@breastbuddies.com`; NEEDS BUSINESS CONFIRMATION due `.co.in` site domain
- Credentials: ACLP and other roles confirmed on visible profile; IBCLC needs confirmation before use

## Service Page SEO Recommendations

| Topic | Current coverage | Recommendation |
|---|---|---|
| Lactation Consultant | Dedicated Chennai page | Optimize after credential confirmation |
| Breastfeeding Support | Homepage/services | Consider dedicated service index |
| Latching / Latch Difficulties | Mentioned | Dedicated article or service section |
| Low Milk Supply | Dedicated page | Keep and strengthen evidence |
| Antenatal Preparation | Homepage + popup | Dedicated page if recurring service |
| Newborn Feeding | Mentioned/FAQ | Educational article |
| Breastfeeding Consultation | Homepage + Chennai page | Keep, clarify process |
| Online Lactation Consultation | Dedicated India/NRI/international pages | Keep but prevent cannibalization |
| In-Person Consultation | Mentioned | Needs business confirmation |
| Relactation | Mentioned | Educational article or service page if strong demand |
| Bottle-to-Breast Transition | Not found | Article if offered |
| Formula Reduction Support | Not found | Article if offered; careful medical language |
| Weaning | Mentioned only lightly | Article if offered |
| Tongue-Tie Feeding Support | Dedicated page | Keep, soften/cite medical claims |
| Premature Baby Feeding Support | Not explicit | Needs business confirmation before page |
| Twin Breastfeeding Support | Not found | Article/page only if service is offered |

## Content / E-E-A-T Audit

Strengths:

- Practitioner identity is visible.
- Qualifications and affiliations are listed.
- Tone is empathetic and generally responsible.
- Online consultation limitations are acknowledged in `src/components/BookingForm.jsx:111-115`.

Weaknesses:

- Credential inconsistency around IBCLC is the largest E-E-A-T issue.
- No article author/reviewer/date model exists.
- Health claims are not sourced.
- Testimonials are anonymous/generic, and one SEO page has placeholders.
- Privacy and consultation policy pages are absent.

## STOP

No production code fixes were implemented in this phase.

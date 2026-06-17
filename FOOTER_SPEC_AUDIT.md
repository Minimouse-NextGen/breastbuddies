# BreastBuddies Footer Spec / Audit

## Purpose

This file documents the intended footer design, layout, content structure, and validation checklist for the BreastBuddies website footer.

## Current Source

- Component: `src/components/Footer.jsx`

## Design Direction

- Style: Premium healthcare website footer
- Background: Full-width blue gradient
- Text color: White with softer white secondary text
- Layout: Compact, balanced, supportive to page content
- Behavior: Responsive across desktop, tablet, and mobile

## Visual Spec

### Background

- Full width
- Gradient:
  - Start: `#1E2A52`
  - End: `#4F8EF7`

### Typography

- Font family: `Inter` for body and utility text
- Brand wordmark: `Playfair Display`
- Main footer text: white
- Secondary/footer supporting text: white at reduced opacity

### Spacing

- Vertical padding:
  - Desktop: compact, not oversized
- Horizontal container:
  - Wider than standard page container
  - Current target: `92vw`, max width `1600px`
  - Desktop side padding target: `48px` to `72px`

## Layout Spec

### Desktop

Use 4 columns:

1. Brand
2. Quick Links
3. Connect
4. Our Commitment

Expected visual order:

`[ Brand ] [ Quick Links ] [ Connect ] [ Our Commitment ]`

### Tablet

- 2-column layout

### Mobile

- 1-column stacked layout

## Column Content

### Column 1: Brand

Must contain only:

- BreastBuddies logo
- `breastbuddies` wordmark on the same row as logo
- Tagline below:
  - `Because every mother deserves support.`

Brand requirements:

- Logo and wordmark aligned as one unit
- Tagline directly below wordmark
- Compact internal spacing
- Brand column slightly wider than the other columns

### Column 2: Quick Links

Links:

- Home
- About Divya
- Services
- Book Consultation

Requirements:

- Must not overlap brand block
- Must start at a consistent horizontal position

### Column 3: Connect

Content:

- Chat on WhatsApp
- `hello@breastbuddies.com`
- `@breastbuddies`

Requirements:

- WhatsApp icon remains visible
- Align top with Quick Links and Our Commitment

### Column 4: Our Commitment

Content:

- `Empathetic. Evidence-informed. Personalized. Here for every step of your feeding journey.`

Requirements:

- Same top alignment as Quick Links and Connect

## Bottom Copyright Block

Must appear centered below the columns.

Line 1:

- `© 2026 BreastBuddies. All Rights Reserved.`

Line 2:

- `Because every mother deserves support.`

Requirements:

- Center aligned
- Balanced spacing above and below
- Visually grouped with footer, not floating too far below

## Non-Goals

Do not change:

- WhatsApp floating button position
- Admin login page
- Other page sections
- Footer content wording unless explicitly requested

## Audit Checklist

Use this checklist before approving footer changes:

- Blue gradient background is present across full width
- Footer content is wider than the default page container
- No excessive empty space on far left/right at desktop widths
- Brand block is compact and aligned
- Logo and `breastbuddies` are on the same row
- Tagline is directly below the brand wordmark
- Quick Links does not overlap the brand block
- Footer shows 4 columns on desktop
- Footer shows 2 columns on tablet
- Footer shows 1 column on mobile
- Quick Links, Connect, and Our Commitment align cleanly at the top
- Copyright block is centered below all columns
- Footer looks correct at 100% browser zoom
- Footer looks balanced at 1366px width
- Footer looks balanced at 1920px width

## Notes

- If future visual fixes are requested, update this file alongside `src/components/Footer.jsx` so the implementation and spec stay aligned.

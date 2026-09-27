# Product

<!-- impeccable:product-schema 1 -->

> Written during the 2026 site redesign. The owner was unavailable for the init interview, so every
> fact below was inferred from the repository (`src/data/*`, `src/seo/*`, page copy) and the owner's
> redesign brief. Facts marked *(inferred)* should be confirmed by the owner.

## Platform

web

## Users

Owners, founders and operators of growing businesses (clinics and dental practices, real estate
agencies, law and professional-services firms, hotels and short-lets, e-commerce, logistics,
education providers and B2B SaaS) in Nigeria and the rest of Africa, the UK, US, Canada and Europe.
They arrive because the business is losing time (everything runs through a few people), losing
leads (slow replies, missed calls, no follow-up) or losing money on AI that never shipped. They are
evaluating whether an outside team can take that work on, and what it costs. *(inferred)*

## Product Purpose

The Lapis AI (The Lapis AI Limited, founded 2022, based in Lagos) builds, runs and reports on AI
workers for growing businesses on a monthly subscription. The marketing site's job is to make the
offer and the prices clear and get the visitor to book a free 30-minute discovery call (or the paid
AI Opportunity Audit). Success is a booked call from a qualified business.

## Positioning

Operated AI, not a one-off build. Every AI worker comes with four things: a job description, a KPI,
an operator (Lapis monitors, fixes and improves it under an SLA) and a monthly impact report. The
monthly fee covers running it, so nothing is abandoned after launch.

## Operating Context

- Sales path (`src/data/process.ts`): free 30-minute discovery call → AI Opportunity Audit ($490,
  credited) → proposal with three options → subscription & onboarding → go live in 2–4 weeks →
  monthly impact report.
- Contact happens through the `/contact` form (EmailJS), WhatsApp and phone (Nigeria and Canada
  lines), and email (`team@thelapisai.com.ng`).
- `?plan=` and `?topic=` query parameters preselect the contact form.

## Capabilities and Constraints

- Three products (`src/data/pricing.ts`): Lapis Lead Desk (from $390/month), Lapis AI Workforce
  (from $1,250 per AI worker/month) and the 45-Day AI Rescue (from $7,500, fixed fee by scope).
  Extras: AI Opportunity Audit, Fractional Head of AI, Market Watch AI worker, Team AI Workshop.
- Prices are in US dollars only and exclude VAT. Annual plans: 2 months free. Never show naira.
- Five service capabilities, eight industry pages, three solution pages, a blog and case studies.
- Static React site prerendered for SEO; one H1 per page, JSON-LD, sitemap and llms files are
  verified by `npm run verify:seo` and must keep passing.

## Brand Commitments

- Name: "The Lapis AI" (alternate "Lapis AI"). Slogan: "AI that keeps working and pays."
- Existing mark: `src/data/logs.png` / `src/data/logo-mark.webp`.
- Voice: plain, direct, British-leaning spelling, no hype, no hourly billing, honest about fit.
- The 2026 redesign brief pins the visual direction to an owner-supplied reference (dark olive,
  photographic, glass UI). See DESIGN.md.

## Evidence on Hand

- Three anonymised case studies with real client quotes and results (`src/data/testimonials.ts`):
  real estate (8+ hrs/agent/week), hospitality (14% RevPAR), SaaS (<4 hrs to detect changes).
- Ten client logos (`src/client_logos/`).
- Founded 2022; go-live 2–4 weeks after signing; replies in under 60 seconds (Lead Desk).
- Absent, and must not be fabricated: star ratings, named or photographed testimonial authors,
  awards, press, client counts, revenue figures or performance claims beyond the case studies.

## Product Principles

1. Prove, don't claim: only real numbers from the case studies, pricing and process.
2. Start with the problem (time, leads, AI spend), then the product that fixes it.
3. Every page ends with one clear next step: the free discovery call.
4. Prices are visible and plain; no "contact us for pricing".

## Accessibility & Inclusion

WCAG 2.1 AA for text contrast, visible focus states, keyboard-operable menus and carousels, and
`prefers-reduced-motion` respected. Many visitors are on mobile data in Nigeria, so pages must stay
light and fast. *(inferred)*

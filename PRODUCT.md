# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Plain static HTML, CSS, and JavaScript — zero build step, drop-in ready for GitHub Pages (`index.html`, `privacy.html`, `site-config.js`, `script.js`, `google-apps-script/Code.gs`, `.nojekyll`, `robots.txt`, `sitemap.xml`), preserving the existing Google Apps Script → Google Sheets enquiry pipeline and prefilled WhatsApp fallback.

## Users

Owners and founders of independent cafés, bakeries, and small hospitality or local businesses (starting in Hyderabad, India) evaluating whether to hire a studio for a table QR digital menu or a bespoke small-business website, often browsing on mobile between service hours or on desktop when planning a launch or refresh.

## Product Purpose

Convince independent hospitality and small-business owners that Madeform can translate the real-world care and character of their physical space onto the web, let them compare transparent fixed-starting-price packages without guesswork, inspect live working proof (Aster Coffee website + QR digital menu), and start a project immediately via WhatsApp or the project enquiry form.

## Positioning

An independent Hyderabad web design and digital experience studio built specifically around small hospitality businesses and local places with character: direct work with the person designing and building the site, clear upfront Indian-rupee pricing (Digital menus at ₹2,999 for up to 30 items + ₹50 per extra item; Business websites from ₹7,999; Custom quotes), and live working proof rather than generic templates or vague agency retainers.

## Operating Context

Visitors arrive via Instagram, WhatsApp referrals, Google search, or QR links, often scanning a live menu demo on their phone at a counter or reviewing studio work on a laptop. Decision-makers care about fast clarity on scope and price (including what is excluded, such as custom domains), seeing how a digital menu feels on a real phone, and reaching Madeform effortlessly on WhatsApp (+91 63014 38905) or through a zero-friction project form without marketing trackers or spam.

## Capabilities and Constraints

- Preserve all factual pricing and scope commitments: Digital menus ₹2,999 (up to 30 menu items, ₹50 per extra item beyond 30; mobile-friendly menu with categories/prices, table QR code + shareable link, location/contact/WhatsApp link, hosting setup included); Business websites from ₹7,999 (responsive homepage, photo gallery, business introduction, optional products/menu + QR code, contact & location page with directions, social links & WhatsApp, hosting setup included); Custom quotes agreed before work begins; Custom domains excluded (extra); final scope and any paid hosting, maintenance, extra revisions, or advanced features agreed upfront.
- Preserve working functionality: `site-config.js` `appsScriptUrl` endpoint detection, iframe-postMessage Google Apps Script submission with idempotency `requestId`, honeypot spam field, client-side validation, automatic fallback to prefilled WhatsApp draft (`https://wa.me/916301438905`), package CTA pre-selection of the `#service` dropdown, full package comparison table, accessible mobile navigation, and `privacy.html`.
- Preserve privacy commitments: no marketing trackers or analytics cookies; avoid unnecessary third-party font/script tracking dependencies where local files can be shipped cleanly.
- Original folder `/Users/omi/madeform-github-pages` must remain strictly unmodified; all new work lives in `/Users/omi/madeform-v2`.

## Brand Commitments

- Name: Madeform (Hyderabad, India).
- Tagline / positioning voice from existing site: "A little more you, online." — warm, grounded, plainspoken, unpretentious studio voice.
- Existing brand marks on hand in `/Users/omi/madeform-github-pages/images/`: `madeform-logo.svg` (geometric lowercase wordmark) and `madeform-mark.svg` (vermilion `#e84b25` square `m` monogram). Treated as available brand assets (not locked to the incumbent frosted-glass visual world, since this is a redesign).

## Evidence on Hand

- Live studio concept: **Aster Coffee** website (`https://madeformezy.github.io/Aster-coffee/`) and live mobile digital menu (`https://madeformezy.github.io/Aster-coffee/menu.html`).
- Existing visual assets (reference/reusable from `/Users/omi/madeform-github-pages/images/`): `aster-demo.webp` (screenshot of Aster Coffee live site), `aster-table.webp` (editorial photo of Aster printed menu + espresso cup on olive café table), `aster-menu-qr.png` (working QR code for Aster Coffee digital menu), `madeform-logo.svg`, `madeform-mark.svg`, `favicon.svg`.
- **Absences that must not be fabricated**: No paid client testimonials, client logos, customer counts, turnaround guarantees, or live client case studies beyond Aster Coffee exist on hand. Aster Coffee must remain honestly labeled as an independent studio concept (with AI-generated café imagery). Any additional demonstration UI or interactive preview must be clearly truthful and never invent fake clients or commercial claims.

## Product Principles

- Lead with proof of craft, not agency slogans — let a café owner immediately feel how their place could look and work online.
- Radical pricing and scope transparency — never hide exclusions (custom domain, extra items, scope agreement) or bury the ₹2,999 / ₹7,999 numbers.
- Frictionless path to conversation — every section should cleanly bridge to WhatsApp or a pre-selected project enquiry without dark patterns or clutter.
- Honest representation — label concept work accurately and keep privacy commitments zero-tracker and plainspoken.

## Accessibility & Inclusion

Keyboard-accessible navigation and mobile menu with focus management and `inert` background handling, skip link, semantic landmarks, live status announcements on enquiry submission, reduced-motion support, sufficient contrast across desktop and mobile viewports, and zero dependence on third-party trackers.

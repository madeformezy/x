# Madeform — Redesign (`madeform-v2`)

Static HTML, CSS, and JavaScript site for **Madeform** (Hyderabad, India), drop-in ready for GitHub Pages with zero build step. The original `/Users/omi/madeform-github-pages` folder remains untouched.

## Deploying to GitHub Pages

1. Upload the contents of this folder (`index.html`, `privacy.html`, `style.css`, `script.js`, `site-config.js`, `favicon.svg`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `images/`, `fonts/`, `google-apps-script/`) to your repository root.
2. In **Settings → Pages**, choose **Deploy from a branch → `main` → `/(root)` → Save**.
3. No build step or external font/tracker requests are required.

## Google Sheets Enquiry Setup

- Paste `google-apps-script/Code.gs` into the Apps Script project for your private Google Sheet.
- Set Script Properties `SPREADSHEET_ID` and `SITE_ORIGIN` (`https://madeformezy.github.io`), run `setupEnquirySheet()`, and deploy as a Web App (`Execute as: Me`, `Who has access: Anyone`).
- Paste the `/exec` URL into `appsScriptUrl` in `site-config.js`.
- Without an endpoint configured, submitting the form opens a prefilled WhatsApp draft to `+91 63014 38905`.

## Pricing & Proof

- **Digital menus:** ₹2,999 for up to 30 items, plus ₹50 per extra item (custom domain excluded).
- **Business websites:** From ₹7,999 (custom domain excluded; scope agreed upfront).
- **Live proof:** [Aster Coffee](https://madeformezy.github.io/Aster-coffee/) and its [mobile digital menu](https://madeformezy.github.io/Aster-coffee/menu.html) (independent studio concept with AI-generated café imagery).

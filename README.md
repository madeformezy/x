# Madeform — upload directly to GitHub Pages

This is the complete, already-built website. `index.html` is at the top level.
There is no build command, package installation or custom Actions workflow.

## Publish to your existing `madeformezy/x` repository

1. Open the repository's **Code** tab. Remove the old website files and any old custom `.github/workflows/deploy.yml` workflow.
2. Choose **Add file → Upload files**. Upload the **contents of this folder**: `index.html`, the other files, and the `images`, `fonts` and `google-apps-script` folders. Do not upload the ZIP or put everything inside another folder.
3. Commit to `main`.
4. Go to **Settings → Pages**. Set **Source: Deploy from a branch**, **Branch: main**, **Folder: /(root)**, then **Save**.
5. Allow GitHub to finish publishing, then open https://madeformezy.github.io/x/ . If Safari shows the previous version, use **Option–Command–R** to reload from the server.

An empty `.nojekyll` file is included for direct static publication. Keep it when uploading with Git. The normal HTML/CSS/JS and asset folders also work with GitHub's default branch publication.

## Google Sheets form

The actual Google Apps Script URL has not been supplied yet. The form will offer WhatsApp rather than claim a submission was saved while the endpoint is empty.

1. Create a private Google Sheet. Open **Extensions → Apps Script** and paste `google-apps-script/Code.gs`.
2. In **Project Settings → Script Properties**, set `SPREADSHEET_ID` to the actual Sheet ID and `SITE_ORIGIN` to `https://madeformezy.github.io` (no `/x/`, no trailing slash).
3. Run `setupEnquirySheet()` once and approve Google access.
4. **Deploy → New deployment → Web app**: execute as **Me**, access **Anyone**. Copy the URL ending in `/exec`.
5. Paste that URL between the empty quotes for `appsScriptUrl` in **site-config.js**, save, and upload the changed file to `main`.
6. Test the form from the published website and check the Sheet for the row.

For branch publishing, edit `site-config.js` directly. GitHub Actions variables are not used.

WhatsApp opens a chat with +91 63014 38905. The Aster QR links directly to the verified menu. The required font license is retained in `fonts/OFL.txt`.

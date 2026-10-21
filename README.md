# Bloom Lab — public site

Marketing site and privacy policy for **Bloom Lab**, the cozy idle greenhouse and plant-breeding game for Android by Little Fathom. Served at **https://bloomlab.littlefathom.com**.

- `/` — landing page (features, screenshots, press kit)
- `/privacy/` — privacy policy. **Use `https://bloomlab.littlefathom.com/privacy/` in Google Play Console.**
- `/app-ads.txt` — AdMob authorisation (see below)

Built with Vite + React + TypeScript. Both pages are pre-rendered to static HTML at build time, so the site works on any static host and the policy is readable without JavaScript. No cookies, analytics or third-party requests — fonts and images are self-hosted.

## Before going live

Site details live in [`src/site.config.ts`](src/site.config.ts) (developer: Little Fathom, contact: info@littlefathom.com; the Play Store URL stays a placeholder, showing "Coming soon", until the game is public):

| Field | What to put |
|---|---|
| `developerName` | Your name or studio, shown in the footer and policy |
| `contactEmail` | Privacy contact address (Google Play requires one) |
| `siteUrl` | Canonical origin (`https://bloomlab.littlefathom.com`); also hard-coded in the `<head>` of `index.html` and `privacy/index.html` |
| `playStoreUrl` | Play listing URL once the app is live (`https://play.google.com/store/apps/details?id=com.littlefathom.bloom_lab`); until then the button reads “Coming soon” |
| `privacyLastUpdated` | Change whenever the policy text changes |

`npm run build` prints a warning while `developerName` or `contactEmail` are unset, and the policy highlights them in red.

If the game changes what data it handles (a new SDK, Play Games achievements/leaderboards going live, new permissions), update `src/pages/Privacy.tsx` and `privacyLastUpdated` before shipping that version.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173 and /privacy/
npm test          # Vitest + Testing Library
npm run lint      # oxlint
npm run build     # type-check, build, pre-render into dist/
npm run preview   # serve dist/ locally
```

## Images and press kit

Originals from the game repo live in `public/assets/` and are served unchanged at stable URLs (the landing page's press kit links to them):

- `/assets/icon-1024.png`, `/assets/icon-512.png`
- `/assets/feature-graphic.png` (1024 × 500)
- `/assets/screenshots/01-meadow.png` … `06-orders.png` (1080 × 1920)

`public/assets/web/` holds resized WebP versions (with PNG/JPEG fallbacks) used on the page via `srcset`, plus `feature-graphic-1024.jpg` for Open Graph / Twitter cards. `favicon.ico`, `favicon-32.png` and `apple-touch-icon.png` are made from the 1024 icon. If the store art changes, copy the new originals in and regenerate the web versions at the same widths (screenshots 360/540/720, feature graphic 640/1024, icon 96/192).

## app-ads.txt

`public/app-ads.txt` authorises Google AdMob (publisher `pub-4029439063083388`) to sell ads in Bloom Lab. It is published at `/app-ads.txt`, the site root. AdMob crawls it from the **Developer website** set in the Play listing, so that field **must be `https://bloomlab.littlefathom.com`** for AdMob to find it. If a new ad network is added, append its line here.

## Deploy

Upload the contents of `dist/` to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3…) and point `bloomlab.littlefathom.com` at it with a DNS record (usually a `CNAME` to the host). Pages live at `/index.html` and `/privacy/index.html`, so no rewrite rules are needed. Serve over HTTPS.

For GitHub Pages with a custom domain, add a `public/CNAME` file containing `bloomlab.littlefathom.com` so it is copied into `dist/`.

After deploying, check:

- `https://bloomlab.littlefathom.com/privacy/` loads (paste it into Play Console → App content → Privacy policy, and into the store listing).
- `https://bloomlab.littlefathom.com/app-ads.txt` returns the AdMob line as plain text.

## Credits

Font: Nunito, SIL Open Font License 1.1 (`public/fonts/OFL.txt`). Game art © Little Fathom.

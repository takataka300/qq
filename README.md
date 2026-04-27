# KNEC Hub — Static Site

Plain HTML / CSS / JavaScript version of KNEC Hub. No build step, no dependencies — open `index.html` in any browser, or push this folder to GitHub Pages / Netlify / Vercel as-is.

## Files

| File | Purpose |
|---|---|
| `index.html` | Past Papers home — KCSE, KJSEA, KPSEA, College + search & "request paper" payment flow |
| `kuccps.html` | KUCCPS Course Finder & Placement Results (dropdown switcher) |
| `app.html` | KnecStream movies app landing page |
| `styles.css` | Shared styles |
| `script.js` | Shared JS — search, dropdown, M-Pesa payment modal |
| `knecstream.jpg` | App hero image |

## Deploy to GitHub Pages

1. Push this `static-site/` folder to a GitHub repo.
2. **Settings → Pages → Source:** *Deploy from a branch* → `main` → `/static-site` (or move files to repo root and pick `/`).
3. Done — site is live at `https://<user>.github.io/<repo>/`.

## Local preview

Just double-click `index.html`, or run a tiny server for proper routing:

```bash
cd static-site
python3 -m http.server 8000
# open http://localhost:8000
```

## M-Pesa till

Hard-coded in `script.js` as `0734002689`. Change the `TILL` constant near the top of the file to update it everywhere.

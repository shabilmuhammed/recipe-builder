# 🥗 Pantry Pal

A cute, personal recipe helper. Add the ingredients you have at home and get your **top 5**
easy, healthy recipes — an even mix of **Kerala/Indian** and **Western** dishes, air-fryer
first, tailored for a beginner cook. Built to live on your iPhone/iPad home screen.

- **Frontend:** React + Vite (mobile-first, installable PWA)
- **Recipes:** OpenAI (`gpt-4o-mini`) via a tiny serverless function — your API key stays on the server
- **Saved on device:** your basket is stored in the browser (localStorage); nothing is uploaded

## Run it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your OpenAI key (this file is gitignored, so it never gets committed):
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and paste your key: `OPENAI_API_KEY=sk-...`
3. Start the app (this also runs the `/api/recipes` function):
   ```bash
   npm run dev
   ```
   Open the printed URL. To try it on your iPhone on the same Wi-Fi, run `npm run dev -- --host`
   and open the Network URL it shows.

## Deploy (free, always-on)

1. Push to GitHub (already wired to `shabilmuhammed/recipe-builder`).
2. On [vercel.com](https://vercel.com), **Add New → Project → Import** this repo.
3. In the project's **Settings → Environment Variables**, add `OPENAI_API_KEY`.
4. Deploy. Open the URL on your iPhone → Share → **Add to Home Screen**.

Every future `git push` auto-deploys.

## Make the app icons (optional)

PNG icons are generated from `public/icon.svg`:
```bash
npm run icons
```

## Change the recipe model

Edit `MODEL` in [`api/recipes.js`](api/recipes.js) (default `gpt-4o-mini`; try `gpt-4.1-mini`
for richer results).

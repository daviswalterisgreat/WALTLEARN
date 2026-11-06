# WaltLearn — what's been built (final summary)

## Site files
- `index.html` — all screens, onboarding, profile, auth, studio
- `styles.css` — design, layout, motion (welcome rings, shake animation, links, wipe transition)
- `data.js` — 6 hand‑authored topics (Networking, Python, AI & ML, Quantum Physics, Personal Finance, Public Speaking), 24 lessons
- `app.js` — planner, lesson player, quiz, stats, live search, shake, voice, accounts, Supabase cloud
- `selftest.js` — 631 content/planner/depth/live checks
- `README.md` — full documentation

## New opening screen
- Black‑and‑white cinematic motion piece with orbital rings, scan line, split wordmark.
- Buttons: **Google login**, **Create account**, **Log in**.
- Local phone demo stays on this device, no SMS needed.
- White flash transitions to the coloured school after login.

## Google cloud login (free, no WhatsApp cost)
- Paste your Supabase URL + anon key into `supabase-config.js`.
- Google **Continue with Google** button appears.
- First sign‑in stores name/age/language/level in your Supabase `profiles` table.
- Row Level Security means the browser can only touch the signed‑in learner's own row.
- Users can be seen in Supabase Dashboard → Authentication → Users and Table Editor → profiles.
- Free limits: 50k monthly users, 500 MB database, 2 projects. Project pauses after 1 week of inactivity; unpause from the dashboard.

## Phone + WhatsApp (local demo)
- Keeps working even without Supabase keys.
- Demo code shown on screen; generated locally, never sent.
- Real Twilio/Whilst authentication needs a paid provider and is wired in only after you add keys — the UI stays the same.

## Shake & manual fact
- Shake your phone for a new “Did you know” fact (iOS asks permission once).
- On laptop/desktop the **New fact** button does the same, with a subtle animation.
- Vibration on fact change.

## Motion graphics
- Welcome screen: rotating conic/radial grid, floating dots, scan line.
- Welcome‑to‑school white‑flash wipe, then the coloured school returns.
- No framework, no build step. Opens via double‑click `index.html`.

## Deeper live topics
- Wikipedia topics keep up to **6 sentences** per lesson instead of 3.
- Hours control depth: 1h → 3 steps, 2h → 4, 4h → 5, 8h → all 6.
- Each lesson marked Live / Live + more source; source link kept.

## Further‑reading links (studio panel)
YouTube, Reddit, Quora, X, Google, Wikipedia search links — all real search URLs, never guessed accounts or invented video IDs.

## Monetisation groundwork
- **WaltLearn Pro** early‑access card on the profile page.
- Stores interest locally only; no payment taken.
- Real money later needs a provider (Razorpay/Stripe) + server webhook.

## Responsive
- Wide screens: 3‑column rails (220 px / 1 fr / 250 px).
- ≤1280 px stacks, ≤680 px single column.
- Max width 1400 px.
- Mobile 375 px tested: no horizontal overflow, welcome fills, Google works.

## What stays free forever
- All 24 written lessons and their 3‑core / 3‑deep / 1‑case‑study structure.
- The planner, quiz, stats, voice, games, fact card, shake animation.
- Local accounts (one profile per device) — no server needed.
- Google login if you connect Supabase (free tier).

## Checks
- `node selftest.js` → **All 631 checks passed**.
- `node --check app.js` / `data.js` clean.
- Mobile 375 px and desktop tested, no console errors, no overflow.

## Next steps for you
1. **If you want real cloud accounts**: create a free Supabase project, paste URL + anon key into `supabase-config.js`, then open the site. Google login appears, sign in, finish profile.
2. **If you only want local accounts**: leave `supabase-config.js` empty. The phone demo stays on the device.
3. **When you earn money**: add a Twilio/Wholesale WhatsApp account and / or Razorpay/Stripe. The UI already has placeholders.
4. **Run `node selftest.js`** any time to verify the planner and depth logic.

Enjoy teaching at any depth — without paying a backend until you need to.
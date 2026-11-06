# WaltLearn

A small school that runs in the browser. Pick a topic, say how much time you have, and it builds a path: short lessons in small steps, a written note, video searches, practice and a test. Teach in English or Hinglish, at your level, and it remembers your progress on this device. Six topics are written by hand; anything else can be pulled in live from Wikipedia. Create a local account with a phone number, or use the demo code shown on screen.

## How time changes the depth

The hours you choose change what each lesson teaches, not just how much practice follows:

| Time | Each written lesson | Each live (Wikipedia) lesson |
| --- | --- | --- |
| 1 hour | the 3 core steps | 3 sourced sentences |
| 2–3 hours | core + 2 worked examples | 4 sourced sentences |
| 4–5 hours | core + 3 deep dives | 5 sourced sentences |
| 8 hours | all of the above + a case study | all 6 sourced sentences |

Longer plans also get more recall, practice, video and project steps, but the extra teaching comes first. Written steps are in English and Hinglish; live steps are English only.

## Account, WhatsApp code and the backend

There is **no server in this project**. It is a static site, so:

- Accounts are stored in `localStorage` on this device, keyed by the phone number.
- The 6-digit code is generated locally and shown on screen in **demo mode**. It is not a real authentication system and must not be used to protect money or private data.
- The login flow is already shaped for a real WhatsApp OTP. Set `AUTH_ENDPOINT` in the accounts section of `app.js` to your server URL; the page will then call:
  - `POST {AUTH_ENDPOINT}/otp/start` with `{ "phone": "+919876543210" }`
  - `POST {AUTH_ENDPOINT}/otp/verify` with `{ "phone": "+919876543210", "code": "123456" }`

A real implementation needs:

1. A server and a database (phone, hashed code, expiry, attempts, account).
2. A WhatsApp Business provider such as Meta Cloud API or Twilio. This costs money and needs verification.
3. Codes hashed at rest, a 5-minute expiry, rate limits, and logs that never print the code.
4. A session cookie or token after verification. The browser must never hold provider keys.

Set `AUTH_ENDPOINT = ""` to stay in local demo mode. The page never pretends a code was sent when it was not.

## Monetisation

The profile shows a **WaltLearn Pro** early-access card; it stores interest on the device only. No payment is taken. Real money needs a provider such as Razorpay or Stripe plus a server endpoint and webhook, because prices and entitlements cannot be trusted to the browser.

## Open it

Double-click `index.html`. No install, no build step, no account.

If your browser blocks storage on `file://`, serve the folder instead:

```
python -m http.server 8000
```

then open `http://localhost:8000`.

## What is here

| File | Job |
| --- | --- |
| `index.html` | All screens |
| `styles.css` | Design, layout, motion |
| `data.js` | Topic library: 6 topics, 24 lessons, English + Hinglish |
| `app.js` | Planner, lesson player, quiz, stats, live Wikipedia search |
| `selftest.js` | Content and planner checks — `node selftest.js` |

## Add a topic

Copy one block in `data.js` and change it. Each topic needs:

- `id`, `title`, `accent` (colour), `blurb`, `fact`
- `x`, `y` — position on the map, 0–100
- `links` — ids of topics to draw a line to
- `lessons` — each with `title`, `mins`, `bullets` (`en` and `hi`), `deep` (3 bilingual steps), `master` (1 bilingual case step), `note`, and one `quiz`

The home page, search and stats pick up new topics automatically.

## Search anything (live)

Typing a topic that is not in the library and pressing Enter searches **Wikipedia** — a free API that needs no key and allows browser requests. Pick a result and it is turned into a 4-lesson path in seconds:

- the lead section plus up to three sections of the article, in order, become lessons;
- each lesson keeps up to six real sentences from the article, so nothing is invented;
- a longer time budget shows more of those sourced sentences (3, 4, 5 or all 6);
- live topics carry a **Live** badge and a link to the source;
- they end with a teach-back task instead of a test, because a machine-written quiz from arbitrary text would be guessing;
- they are saved in `localStorage` under "Your live library";
- the three newest also appear as satellite nodes on the knowledge map.

Live topics are English only and need a connection the first time. Content is © Wikipedia contributors, CC BY-SA 4.0.

## Voice, games, facts and the visual studio

- **Welcome and accounts.** The first screen is a monochrome motion piece with `Create account` and `Log in`. The phone → code → profile flow is real UI; the code is local demo mode until `AUTH_ENDPOINT` is connected.
- **Voice.** The speaker button in the lesson bar reads each step aloud (English only, browser speech engine). The mic in the search bar does voice search where the browser supports speech recognition (Chrome/Edge); other browsers hide it. Nothing is recorded or sent anywhere.
- **Quick fire.** A five-question game on the home page, drawn from every written lesson, in your chosen language.
- **Did you know.** A real fact per topic. Shake your phone for a new one (iOS asks permission once) or press `New fact` on a laptop. Live topics pull a sentence from their own article.
- **Go deeper.** The plan screen links the topic to YouTube, Reddit, Quora, X, Google and Wikipedia searches. These are search URLs, never guessed accounts or invented video IDs.
- **Studio.** The plan screen shows the topic's Wikipedia photo (live topics), a fact and two YouTube **search** links. Tap the visual to open it full screen: drag to turn it in 3D, scroll to zoom, double-click to reset. This is the real article photo on a turning card, not a 3D model.
- **Home layout.** On wide screens the game and facts sit in rails either side of the hero; below 1280 px they stack.

## Where a real AI plugs in

The teaching is hand-written today on purpose: it works offline, costs nothing and cannot make things up. To generate any topic:

1. Put a small server in front (an API key in the browser is public — never ship one in `app.js`).
2. On "Build my path", call the model with the topic, hours, level and language, and return the same plan shape that `buildPlan()` returns in `app.js`.
3. Keep the written lessons as the fallback for the six starter topics.

Keep video links as YouTube **search** URLs (`https://www.youtube.com/results?search_query=...`) — never let a model invent video IDs.

## Honest limits

- Six topics are written by hand. The live library covers anything else, but only as a sourced summary.
- Each written lesson has 3 core steps, 3 deep dives and 1 case study. Live topics use up to six of the article's own sentences and add no invented depth.
- Live topics need Wikipedia to be reachable, are English only, and are no substitute for the full article.
- Accounts, progress and the Pro waitlist live in `localStorage` on one browser, one device. There is no server, database, real OTP or payment processing yet.
- The test is one question per lesson — a check for you, not an exam.
- Hinglish lessons are written, not machine-translated.
- Shake-to-change and voice search need HTTPS (or localhost) and browser permission. The `New fact` button works everywhere.

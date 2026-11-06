# Free cloud login with Supabase

This adds **real Google login** to WaltLearn and stores each learner's profile in
your own Supabase project. It costs nothing at this stage.

The phone + WhatsApp screen stays as a **local demo** until you connect a paid
WhatsApp provider. Google is the real, free login.

## What you get

- Real accounts with Google. No SMS or WhatsApp bill.
- Every learner in **Supabase Dashboard -> Authentication -> Users**.
- Name, age, status, language and level in **Table Editor -> profiles**.
- Row Level Security: a learner can only read and edit their own profile.
- Local phone demo still works with no connection, so the site never breaks.

Free limits: **50,000 monthly active users, 500 MB database, 2 projects**. A free
project pauses after one week of inactivity; open the dashboard and unpause it.

## 1. Create the project

1. Go to `https://supabase.com`, sign in, and create a new project.
2. Wait for the database to finish starting.
3. Keep the project open. You need two values later:
   - Project URL, like `https://abcdefgh.supabase.co`
   - Publishable (anon) key from **Project Settings -> API**

## 2. Create Google OAuth credentials

1. Go to `https://console.cloud.google.com` and create a project.
2. Open **APIs & Services -> OAuth consent screen**.
   - Choose **External**.
   - Fill the app name, support email and developer email.
   - Save. Add test users while the app is in testing mode.
3. Open **APIs & Services -> Credentials -> Create credentials -> OAuth client ID**.
   - Application type: **Web application**.
   - Authorized JavaScript origins:
     - `http://localhost:4174`
     - your live site origin, for example `https://waltlearn.netlify.app`
   - Authorized redirect URI:
     - `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
   - Create it and copy the **Client ID** and **Client secret**.

## 3. Turn on Google in Supabase

1. Supabase Dashboard -> **Authentication -> Providers -> Google**.
2. Enable it and paste the Client ID and Client secret.
3. Open **Authentication -> URL Configuration**.
   - Site URL: your live site, for example `https://waltlearn.netlify.app`
   - Redirect URLs: add both
     - `http://localhost:4174/**`
     - `https://waltlearn.netlify.app/**`

## 4. Create the profiles table

1. Supabase Dashboard -> **SQL Editor -> New query**.
2. Paste everything from `supabase/schema.sql` and click **Run**.
3. Check **Table Editor -> profiles**. It should exist and be empty.

The SQL turns on Row Level Security, so the public browser key can only touch the
signed-in learner's own row.

## 5. Add your two keys

Open `supabase-config.js` and fill:

```js
window.WALT_SUPABASE = {
  url: "https://YOUR-PROJECT-REF.supabase.co",
  anonKey: "YOUR-PUBLISHABLE-OR-ANON-KEY"
};
```

The publishable/anon key is designed to be public. It is safe only because the
SQL policies are in place. **Never put the `service_role` key in this file.**

## 6. Host the site

Google login does not work from `file://`, because Google needs an allowed
redirect URL. Use one of these free options:

- **Netlify Drop:** open `https://app.netlify.com/drop` and drag the whole
  `WALT LEARN` folder in. Use the free `*.netlify.app` URL.
- **Vercel** or **Cloudflare Pages**: import the folder, no build step.
- **Local test:** run `python -m http.server 4174` in the folder and open
  `http://localhost:4174`.

After hosting, go back to Supabase URL Configuration and add the real URL if it
is different from the one above.

## 7. Test it

1. Open the live site.
2. The welcome screen shows **Continue with Google**.
3. Sign in, then finish the profile form.
4. Supabase -> **Authentication -> Users** now shows the account.
5. Supabase -> **Table Editor -> profiles** shows the profile.
6. Press **Log out** on the profile screen, then log in again. The profile should
   load from Supabase instead of asking again.

## See who is logged in

You do not need to build an admin page for the first version:

- **Authentication -> Users**: email, provider, created date, last sign-in.
- **Table Editor -> profiles**: name, age, status, phone, language, level.

For a custom admin page later, use a Supabase **Edge Function** with the
`service_role` key kept on the server and an admin password. Never ship that key
to the browser.

## Security rules

- Keep Row Level Security on. Do not add a public "read all profiles" policy.
- Never expose phone numbers or emails publicly.
- Never put the `service_role` key, Twilio token or WhatsApp token in `app.js`.
- Collect only what you need. Phone numbers are personal data; check India's
  DPDP rules if you store them.
- Rate-limit any custom OTP endpoint if you add one later.

## WhatsApp later

The exact phone + WhatsApp flow needs a paid provider:

- Supabase phone auth supports WhatsApp only through **Twilio / Twilio Verify**.
- Test with Supabase **test phone numbers** and fixed codes, or the Twilio
  sandbox. Both are for testing, not public launch.
- For real users: WhatsApp Business sender, approved authentication template,
  and a per-message charge from Meta/Twilio.
- Keep the Twilio credentials on a server, never in the browser.

When that is connected, the phone screen can replace the local demo code with
Supabase `signInWithOtp` and `verifyOtp`.

## Troubleshooting

- **No Google button:** `supabase-config.js` is empty or the CDN was blocked.
  Check the browser console, then refresh.
- **Redirect error:** the URL you opened is not in Supabase Redirect URLs, or the
  Google redirect URI is missing `/auth/v1/callback`.
- **`new row violates row level security`:** run `supabase/schema.sql` again and
  check that you are signed in.
- **Profile saved but not in the table:** the table or policies are missing.
  The site keeps the profile locally and shows a warning.
- **Free project paused:** open the Supabase dashboard and restore it.

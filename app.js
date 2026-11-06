"use strict";

/* WaltLearn — app logic.
   No framework, no build step. All progress lives in localStorage. */

const LS_KEY = "waltlearn.v1";
const SVGNS = "http://www.w3.org/2000/svg";

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

const byId = (id) => TOPICS.find((t) => t.id === id);
const allTopics = () => TOPICS.concat(Object.values(state.live || {}));
const topicById = (id) => allTopics().find((t) => t.id === id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rich = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");

/* Line icons, drawn in-house so the whole site stays emoji-free. */
const ICONS = {
  networking:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.3"/><circle cx="5" cy="18" r="2.3"/><circle cx="19" cy="18" r="2.3"/><path d="M11 7.2 6.4 15.6M13 7.2l4.6 8.4M7.3 18h9.4"/></svg>',
  python: '<svg viewBox="0 0 24 24"><path d="M9 6.5 3.5 12 9 17.5M15 6.5 20.5 12 15 17.5"/></svg>',
  ai: '<svg viewBox="0 0 24 24"><rect x="6.5" y="6.5" width="11" height="11" rx="3"/><path d="M10 3v3.5M14 3v3.5M10 17.5V21M14 17.5V21M3 10h3.5M3 14h3.5M17.5 10H21M17.5 14H21"/><circle cx="12" cy="12" r="1.8"/></svg>',
  quantum:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-60 12 12)"/></svg>',
  money:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><path d="M9 8.6h6M12 8.6V16M9 12.2h6"/></svg>',
  speaking:
    '<svg viewBox="0 0 24 24"><path d="M3.5 10v4M7.5 7.2v9.6M11.5 4v16M15.5 8.2v7.6M19.5 10.4v3.2"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24"><path d="M12 3v3.6M12 17.4V21M3 12h3.6M17.4 12H21M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.1"/></svg>'
};
const icon = (id) => `<span class="icon">${ICONS[id] || ICONS.spark}</span>`;

/* ---------------- voice (English only) ---------------- */

function speak(text) {
  const clean = stripTags(String(text || ""))
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return;
  if (!("speechSynthesis" in window)) return toast("This browser has no voice engine.");
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(clean);
  u.lang = "en-US";
  u.rate = 1;
  const voice = speechSynthesis.getVoices().find((v) => /^en[-_]/i.test(v.lang));
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

const voiceOn = () => !!state.voiceOn;

function setVoice(on) {
  state.voiceOn = !!on;
  save();
  const btn = $("#voiceBtn");
  if (!btn) return;
  btn.classList.toggle("is-on", !!on);
  btn.setAttribute("aria-pressed", on ? "true" : "false");
}

function announceVoice() {
  const s = state.session;
  const item = s && s.plan && s.plan[s.index];
  if (item && item.kind === "lesson") {
    const t = topicById(s.topicId);
    const lesson = t && t.lessons[item.lessonIndex];
    if (lesson) {
      const spoken = spokenBullets(lesson, item.depth);
      return speak(spoken[Math.max(0, (s.step || 1) - 1)]);
    }
  }
  speak("Voice is on. I will read each step in English.");
}

const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => iso(new Date());

const fmt = (m) => {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
};

const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

/* ---------------- state ---------------- */

function freshState() {
  return {
    profile: null,
    phone: null,
    accounts: {},
    userId: null,
    email: null,
    authProvider: null,
    googleName: null,
    pro: false,
    stats: { lessons: 0, minutes: 0, quizzes: [], days: [], byTopic: {} },
    session: null,
    live: {},
    voiceOn: false
  };
}

let state = freshState();

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return freshState();
    const data = JSON.parse(raw);
    return Object.assign(freshState(), data);
  } catch (err) {
    return freshState();
  }
}

function save() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (err) {
    /* storage full or blocked: the app still works for this visit */
  }
}

/* ---------------- optional Supabase cloud login ----------------
   Google login is real and free. Phone + WhatsApp stays a local
   demo until a paid WhatsApp provider is connected. See SUPABASE.md. */

let sb = null;

const supabaseConfig = () =>
  (typeof window !== "undefined" && window.WALT_SUPABASE) || { url: "", anonKey: "" };

function hasSupabaseConfig(cfg = supabaseConfig()) {
  return !!(cfg && String(cfg.url || "").trim() && String(cfg.anonKey || "").trim());
}

function profileRowFromState(profile, userId, phone) {
  return {
    id: userId,
    name: profile.name,
    age: Number(profile.age) || null,
    status: profile.status || null,
    phone: phone || null,
    lang: profile.lang || "en",
    level: profile.level || "standard"
  };
}

function profileFromRow(row) {
  return {
    name: row.name || "Learner",
    age: Number(row.age) || 0,
    status: row.status || "Student",
    lang: row.lang === "hi" ? "hi" : "en",
    level: ["simple", "standard", "deep"].includes(row.level) ? row.level : "standard"
  };
}

function loadSupabaseLib() {
  if (window.supabase) return Promise.resolve(window.supabase);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js";
    s.onload = () => resolve(window.supabase);
    s.onerror = () => reject(new Error("Supabase library failed to load"));
    document.head.appendChild(s);
  });
}

async function initSupabase() {
  const cfg = supabaseConfig();
  if (!hasSupabaseConfig(cfg)) return "local";
  try {
    await loadSupabaseLib();
    if (!window.supabase) throw new Error("Supabase library missing");
    sb = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, detectSessionInUrl: true, autoRefreshToken: true }
    });
    const googleBtn = $("#googleBtn");
    if (googleBtn) googleBtn.hidden = false;
    const signupBtn = $("#authSignup");
    if (signupBtn) {
      signupBtn.classList.remove("w-primary");
      signupBtn.classList.add("w-ghost");
    }
    const or = $("#welcomeOr");
    if (or) or.hidden = false;
    const localNote = $("#authLocalNote");
    if (localNote) localNote.hidden = false;
    const note = $("#welcomeNote");
    if (note) note.textContent = "Free while in beta · Google login is live · Phone demo stays on this device";

    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    const session = data && data.session;
    if (!session) return "local";

    state.userId = session.user.id;
    state.email = session.user.email || null;
    state.authProvider = "google";
    state.googleName =
      (session.user.user_metadata && (session.user.user_metadata.full_name || session.user.user_metadata.name)) || "";
    state.phone = null;
    save();

    const { data: row, error: rowErr } = await sb
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();
    if (rowErr) {
      console.warn("Supabase profile load failed:", rowErr.message);
      return "onboard";
    }
    if (row) {
      state.profile = profileFromRow(row);
      state.phone = row.phone || null;
      save();
      return "home";
    }
    return "onboard";
  } catch (err) {
    console.warn("Supabase init failed:", err);
    return "local";
  }
}

async function googleLogin() {
  if (!sb) {
    toast("Google login is not connected yet. Add your Supabase keys in supabase-config.js.");
    return;
  }
  if (location.protocol === "file:") {
    toast("Google login needs a hosted page. Open the site from localhost or Netlify.");
    return;
  }
  const redirectTo = location.origin + location.pathname;
  const { error } = await sb.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo }
  });
  if (error) toast("Google login could not start. Check the redirect URL in Supabase.");
}

async function saveProfileRow() {
  if (!sb || !state.userId || !state.profile) return true;
  const row = profileRowFromState(state.profile, state.userId, state.phone);
  const { error } = await sb.from("profiles").upsert(row, { onConflict: "id" });
  if (error) {
    console.warn("Supabase profile save failed:", error.message);
    toast("Saved here. Cloud sync failed — run the profiles SQL in SUPABASE.md.");
    return false;
  }
  return true;
}

function markDay() {
  const d = today();
  if (!state.stats.days.includes(d)) state.stats.days.push(d);
}

function streakCount(days) {
  const set = new Set(days || []);
  const d = new Date();
  if (!set.has(iso(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(iso(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/* ---------------- planning ---------------- */

const DEEP_STEPS = { core: 0, standard: 2, deep: 3, master: 3 };

function depthFor(hours) {
  return hours >= 8 ? "master" : hours >= 4 ? "deep" : hours >= 2 ? "standard" : "core";
}

function lessonMinutes(lesson, depth, live) {
  const isLive = live === undefined ? !!lesson.live : live;
  if (isLive) {
    const want = { core: 3, standard: 4, deep: 5, master: 6 }[depth] || 3;
    const steps = Math.min((lesson.bullets && lesson.bullets.en.length) || 3, want);
    return lesson.mins + Math.max(0, steps - 3) * 2;
  }
  return lesson.mins + ({ core: 0, standard: 8, deep: 14, master: 20 }[depth] || 0);
}

function bulletsFor(lesson, depth = "core") {
  const lang = (state.profile && state.profile.lang) || "en";
  const core = (lesson.bullets && lesson.bullets[lang]) || lesson.bullets.en;
  if (lesson.live) {
    const simple = state.profile && state.profile.level === "simple";
    const want = simple ? 3 : ({ core: 3, standard: 4, deep: 5, master: 6 }[depth] || 3);
    return core.slice(0, Math.max(3, Math.min(core.length, want)));
  }
  const deep = (lesson.deep && (lesson.deep[lang] || lesson.deep.en)) || [];
  const master = (lesson.master && (lesson.master[lang] || lesson.master.en)) || [];
  const arr = core
    .concat(deep.slice(0, DEEP_STEPS[depth] || 0))
    .concat(depth === "master" ? master : []);
  if (state.profile && state.profile.level === "simple") {
    return arr.slice(0, Math.max(2, arr.length - (arr.length > 4 ? 2 : 1)));
  }
  return arr;
}

function spokenBullets(lesson, depth = "core") {
  if (lesson.live) return bulletsFor(lesson, depth);
  const deep = (lesson.deep && lesson.deep.en) || [];
  const master = (lesson.master && lesson.master.en) || [];
  return lesson.bullets.en
    .concat(deep.slice(0, DEEP_STEPS[depth] || 0))
    .concat(depth === "master" ? master : []);
}

/* Splits a topic into a path that fits the chosen time.
   Longer budgets unlock deeper steps inside each lesson, not just more
   practice: 1h = core, 2h = +worked examples, 4h+ = +deep dives,
   8h = +a case study. The remaining minutes become recall, practice,
   video and project steps. */
function buildPlan(topic, hours) {
  const budget = hours * 60;
  const depth = depthFor(hours);
  const core = topic.lessons.map((l, i) => ({
    kind: "lesson",
    mins: lessonMinutes(l, depth, topic.live),
    depth,
    live: !!topic.live,
    title: l.title,
    lessonIndex: i
  }));

  let left = budget - core.reduce((a, b) => a + b.mins, 0);
  const out = core.slice();

  const canQuiz = topic.lessons.every((l) => l.quiz);
  const endMins = 10;
  const hasEnd = left >= endMins;
  if (hasEnd) left -= endMins;

  const extras = [];
  const recipes = [
    (l) => ({
      kind: "recall",
      mins: 10,
      title: `Active recall — ${l.title}`,
      body: `Close everything. Write down five things you remember from “${l.title}” without looking. Then check and fix what you missed. Retrieving is what makes it stick.`
    }),
    (l) => ({
      kind: "practice",
      mins: 15,
      title: `Teach it back — ${l.title}`,
      body: `Explain “${l.title}” out loud in simple words, as if to a 12-year-old. The place where you get stuck is exactly what to review.`
    }),
    (l) => ({
      kind: "video",
      mins: 15,
      title: `Watch — ${l.title}`,
      body: "Open the YouTube search below and watch one video on this. Note three things the lesson did not mention.",
      link: yt(`${topic.title} ${l.title}`)
    }),
    () => ({
      kind: "project",
      mins: 20,
      title: `Mini project — ${topic.title}`,
      body: `Make a one-page cheat sheet for ${topic.title} in your own words, using only the lessons you have finished. If you cannot fill the page, you know what to revisit.`
    })
  ];

  // Spread the spare time over a readable number of practice steps.
  if (left >= 10) {
    const count = Math.min(16, Math.max(3, Math.round(left / 20)));
    for (let i = 0; i < count; i++) {
      const pick = recipes[i % recipes.length](topic.lessons[i % topic.lessons.length]);
      const mins = Math.max(8, Math.round(left / (count - i)));
      extras.push(Object.assign({}, pick, { mins }));
      left -= mins;
    }
  }

  if (budget >= 150 && extras.length >= 4) {
    const mid = Math.floor(extras.length / 2);
    extras[mid] = Object.assign({}, extras[mid], {
      kind: "break",
      title: "Take a real break",
      body: "Stand up, drink water, look far away for a few minutes. Your brain files things while you rest.",
      link: null
    });
  }

  // Alternate lessons and practice so the path breathes.
  const merged = [];
  let li = 0;
  let ei = 0;
  while (li < out.length || ei < extras.length) {
    if (li < out.length) merged.push(out[li++]);
    if (ei < extras.length) merged.push(extras[ei++]);
  }

  if (hasEnd) {
    merged.push(
      canQuiz
        ? { kind: "quiz", mins: 8, title: "Final test" }
        : {
            kind: "recall",
            mins: 10,
            title: "Close the loop — teach it back",
            body: `Close everything. Explain ${topic.title} out loud in five minutes, in your own words, as if a friend asked. Then reopen the source and fill the gaps. That gap list is what to review next.`
          }
    );
  }
  return merged;
}

const KIND_LABEL = {
  lesson: "Core lesson",
  recall: "Active recall",
  practice: "Practice",
  video: "Video",
  project: "Mini project",
  break: "Rest",
  quiz: "Test"
};

const planMinutes = (plan) => plan.reduce((a, b) => a + b.mins, 0);

/* ---------------- navigation ---------------- */

function show(name) {
  $$(".screen").forEach((s) => s.classList.toggle("is-active", s.id === `screen-${name}`));
  document.body.classList.toggle("mode-focus", name === "learn" || name === "quiz");
  document.body.classList.toggle("mode-auth", name === "welcome");
  document.body.classList.toggle("no-profile", !state.profile);
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  window.scrollTo(0, 0);
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ---------------- accounts ----------------
   Local demo accounts live in localStorage. Real WhatsApp OTPs need a
   server + WhatsApp Business/Twilio credentials. Set AUTH_ENDPOINT to
   that server and the flow will use it instead of the local code. */

const AUTH_ENDPOINT = "";
let authMode = "signup";
let pendingAuth = null;
let resendTimer = 0;

const prettyPhone = (digits) => `+91 ${String(digits).slice(0, 5)} ${String(digits).slice(5)}`;

function normalizePhone(raw) {
  let digits = String(raw).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function rememberAccount() {
  if (!state.phone || !state.profile) return;
  state.accounts = state.accounts || {};
  state.accounts[state.phone] = { profile: state.profile, savedAt: Date.now() };
}

function enterApp() {
  rememberAccount();
  save();
  const wipe = $("#wipe");
  const word = document.querySelector(".w-word");
  let overlay = null;
  if (word && word.offsetParent !== null) {
    const r = word.getBoundingClientRect();
    const text = (word.textContent || "").replace(/\s+/g, "");
    overlay = document.createElement("div");
    overlay.className = "fly-overlay";
    const fs = getComputedStyle(word).fontSize;
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "fly-char";
      span.textContent = ch;
      span.style.position = "fixed";
      span.style.left = (r.left + (i / text.length) * r.width) + "px";
      span.style.top = r.top + "px";
      span.style.fontSize = fs;
      span.style.fontWeight = "800";
      span.style.color = "#f5f5f5";
      span.style.zIndex = "400";
      span.style.pointerEvents = "none";
      span.style.willChange = "transform, opacity";
      overlay.appendChild(span);
    });
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.querySelectorAll(".fly-char").forEach((span, i) => {
        const dx = (Math.random() * 2 - 1) * 60;
        const dy = -120 - Math.random() * 180;
        const rot = (Math.random() * 2 - 1) * 40;
        span.style.transition = `transform .9s ${i * 0.03}s cubic-bezier(.2, .7, .3, 1), opacity .9s ${i * 0.03}s ease`;
        span.style.transform = `translate(${dx}vw, ${dy}px) scale(.1) rotate(${rot}deg)`;
        span.style.opacity = "0";
      });
    });
  }
  wipe.classList.add("is-on");
  setTimeout(() => {
    renderGraph();
    renderHome();
    show("home");
    const homeH1 = document.querySelector("#screen-home h1");
    if (homeH1) {
      homeH1.classList.remove("is-revealing");
      void homeH1.offsetWidth;
      homeH1.classList.add("is-revealing");
    }
  }, 320);
  setTimeout(() => {
    wipe.classList.remove("is-on");
    if (overlay) overlay.remove();
  }, 920);
}

function showPhonePane() {
  $("#authPhonePane").hidden = false;
  $("#authCodePane").hidden = true;
  $("#authDemo").textContent = "";
  $("#authCodeDemo").textContent = "";
  $("#authError").textContent = "";
}

function openAuth(mode) {
  authMode = mode;
  pendingAuth = null;
  $("#authCard").hidden = false;
  $("#welcomeActions").hidden = true;
  $("#welcomeOr").hidden = true;
  if ($("#welcomeSide")) $("#welcomeSide").hidden = true;
  $("#authEyebrow").textContent = mode === "login" ? "Log in" : "Create account";
  $("#authCard").classList.remove("is-visible");
  void $("#authCard").offsetWidth;
  $("#authCard").classList.add("is-visible");
  showPhonePane();
  $("#phoneInput").value = "";
  $("#phoneInput").focus();
  if (window.innerWidth < 900) {
    setTimeout(() => $("#authCard").scrollIntoView({ behavior: "smooth", block: "center" }), 90);
  }
}

function closeAuth() {
  $("#authCard").hidden = true;
  $("#welcomeActions").hidden = false;
  $("#welcomeOr").hidden = !sb;
  if ($("#welcomeSide")) $("#welcomeSide").hidden = false;
  pendingAuth = null;
  clearInterval(resendTimer);
}

function startResend() {
  clearInterval(resendTimer);
  let left = 30;
  const btn = $("#codeResend");
  btn.disabled = true;
  btn.textContent = `Resend in ${left}s`;
  resendTimer = setInterval(() => {
    left -= 1;
    if (left <= 0) {
      clearInterval(resendTimer);
      btn.disabled = false;
      btn.textContent = "Resend code";
    } else {
      btn.textContent = `Resend in ${left}s`;
    }
  }, 1000);
}

async function sendCode(phone) {
  if (AUTH_ENDPOINT) {
    try {
      const res = await fetch(`${AUTH_ENDPOINT}/otp/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${phone}` })
      });
      if (!res.ok) throw new Error("send failed");
      pendingAuth = { phone, expires: Date.now() + 5 * 60 * 1000, remote: true };
      $("#authDemo").textContent = "Code sent on WhatsApp.";
    } catch (err) {
      $("#authDemo").textContent = "Could not send the code. Check the connection and try again.";
      return false;
    }
  } else {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    pendingAuth = { phone, code, expires: Date.now() + 5 * 60 * 1000, remote: false };
    $("#authDemo").textContent = `Demo mode: WhatsApp is not connected yet. Your code is ${code}.`;
  }
  $("#authPhonePane").hidden = true;
  $("#authCodePane").hidden = false;
  $("#authSentTo").textContent = `Sent to ${prettyPhone(phone)}.`;
  $("#authCodeDemo").textContent = pendingAuth.remote
    ? ""
    : `Demo mode: WhatsApp is not connected yet. Your code is ${pendingAuth.code}.`;
  $("#authError").textContent = "";
  $("#codeInput").value = "";
  $("#codeInput").focus();
  startResend();
  return true;
}

async function verifyCode(code) {
  if (!pendingAuth) return "Request a code first.";
  if (Date.now() > pendingAuth.expires) return "That code expired. Send a new one.";
  let ok = false;
  if (pendingAuth.remote) {
    try {
      const res = await fetch(`${AUTH_ENDPOINT}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: `+91${pendingAuth.phone}`, code })
      });
      ok = res.ok;
    } catch (err) {
      ok = false;
    }
  } else {
    ok = code === pendingAuth.code;
  }
  if (!ok) return "That code is not correct. Check it and try again.";

  const phone = pendingAuth.phone;
  pendingAuth = null;
  clearInterval(resendTimer);
  const account = state.accounts && state.accounts[phone];
  if (account) {
    state.profile = account.profile;
    state.phone = phone;
    enterApp();
    toast(`Welcome back, ${account.profile.name}.`);
    return "";
  }
  if (authMode === "login") {
    state.phone = phone;
    save();
    show("onboard");
    toast("No account for that number yet. Finish this to create it.");
    return "";
  }
  state.phone = phone;
  save();
  show("onboard");
  toast("Number confirmed. Tell me who is learning.");
  return "";
}

async function logout() {
  rememberAccount();
  if (sb) {
    const { error } = await sb.auth.signOut();
    if (error) {
      toast("Could not sign out. Check your connection and try again.");
      return;
    }
  }
  state.profile = null;
  state.phone = null;
  state.userId = null;
  state.email = null;
  state.authProvider = null;
  state.googleName = null;
  state.session = null;
  save();
  closeAuth();
  show("welcome");
  toast("Logged out. Progress is still on this device.");
}

/* ---------------- home ---------------- */

function renderGraph() {
  const stage = $("#graphNodes");
  const edgeLayer = $("#graphEdges");
  stage.innerHTML = "";
  edgeLayer.innerHTML = "";

  const seen = new Set();
  TOPICS.forEach((t) => {
    (t.links || []).forEach((other) => {
      const key = [t.id, other].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      const b = topicById(other);
      if (!b) return;
      const line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", t.x);
      line.setAttribute("y1", t.y);
      line.setAttribute("x2", b.x);
      line.setAttribute("y2", b.y);
      line.setAttribute("vector-effect", "non-scaling-stroke");
      line.dataset.a = t.id;
      line.dataset.b = other;
      edgeLayer.appendChild(line);
    });
  });

  TOPICS.forEach((t) => {
    const btn = document.createElement("button");
    btn.className = "node";
    btn.type = "button";
    btn.dataset.topic = t.id;
    btn.style.left = `${t.x}%`;
    btn.style.top = `${t.y}%`;
    btn.style.setProperty("--accent", t.accent);
    btn.setAttribute("aria-label", `Open ${t.title}`);
    btn.innerHTML = `<span class="node-tile">${icon(t.id)}</span><span class="node-name">${esc(t.title)}</span>`;
    btn.style.setProperty("--delay", `${(t.x + t.y) * -0.06}s`);
    btn.addEventListener("click", () => openTopic(t.id));
    btn.addEventListener("mouseenter", () => highlightNode(t.id));
    btn.addEventListener("mouseleave", () => highlightNode(null));
    btn.addEventListener("focus", () => highlightNode(t.id));
    btn.addEventListener("blur", () => highlightNode(null));
    stage.appendChild(btn);
  });

  // Live topics join the map as satellites, newest first, three at most.
  const allLive = Object.values(state.live || {});
  const live = allLive.slice(-3).reverse();
  const slots = [
    { x: 15, y: 12 },
    { x: 15, y: 88 },
    { x: 85, y: 88 }
  ];
  live.forEach((t, i) => {
    const pos = slots[i];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "node is-live";
    btn.dataset.topic = t.id;
    btn.style.left = `${pos.x}%`;
    btn.style.top = `${pos.y}%`;
    btn.style.setProperty("--accent", t.accent);
    btn.setAttribute("aria-label", `Open live topic: ${t.title}`);
    const label = t.title.length > 22 ? `${t.title.slice(0, 21).trim()}…` : t.title;
    btn.innerHTML = `<span class="node-tile">${icon("spark")}</span><span class="node-name">${esc(label)}</span>`;
    btn.addEventListener("click", () => openPlan(t.id));
    btn.addEventListener("mouseenter", () => highlightNode(t.id));
    btn.addEventListener("mouseleave", () => highlightNode(null));
    btn.addEventListener("focus", () => highlightNode(t.id));
    btn.addEventListener("blur", () => highlightNode(null));
    stage.appendChild(btn);
  });

  $("#graphTag").innerHTML = `<span></span>${allLive.length ? `starter + ${allLive.length} live` : "starter library"}`;
}

function highlightNode(id) {
  $$(".node").forEach((n) => n.classList.toggle("is-dim", !!id && n.dataset.topic !== id));
  $$("#graphEdges line").forEach((l) => l.classList.toggle("hot", !!id && (l.dataset.a === id || l.dataset.b === id)));
}

function topicMinutes(t) {
  return t.lessons.reduce((a, l) => a + l.mins, 0);
}

function makeCard(t, i) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "topic-card";
  card.style.setProperty("--accent", t.accent);
  card.style.setProperty("--i", i);
  card.innerHTML = `
    <span class="card-icon">${icon(t.icon || t.id)}</span>
    <h3>${esc(t.title)}${t.live ? '<span class="badge-live">Live</span>' : ""}</h3>
    <p>${esc(t.blurb)}</p>
    <span class="meta"><b>${t.lessons.length} lessons</b><span>${fmt(topicMinutes(t))}${t.live ? "" : " core"}</span>${t.live ? "<span>Wikipedia</span>" : ""}</span>`;
  card.addEventListener("click", () => (t.live ? openPlan(t.id) : openTopic(t.id)));
  return card;
}

function renderTopicGrid(list) {
  const grid = $("#topicGrid");
  const items = list || TOPICS;
  grid.innerHTML = "";
  items.forEach((t, i) => grid.appendChild(makeCard(t, i)));
  $("#topicCount").textContent = `${items.length} of ${TOPICS.length}`;
}

function renderLiveGrid() {
  const topics = Object.values(state.live || {});
  const section = $("#liveSection");
  section.classList.toggle("hidden", !topics.length);
  if (!topics.length) return;
  const grid = $("#liveGrid");
  grid.innerHTML = "";
  topics
    .slice()
    .reverse()
    .forEach((t, i) => grid.appendChild(makeCard(t, i)));
  $("#liveCount").textContent = `${topics.length} saved on this device`;
}

function renderHome() {
  const p = state.profile;
  const h = new Date().getHours();
  const part = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  $("#greeting").textContent = p ? `${part}, ${p.name}` : "Welcome to the school";

  if (!$("#graphNodes").childElementCount) renderGraph();
  renderTopicGrid();
  renderLiveGrid();

  const results = $("#liveResults");
  if (results) {
    results.classList.add("hidden");
    results.innerHTML = "";
  }

  const hint = $("#searchHint");
  const total = TOPICS.reduce((a, t) => a + t.lessons.length, 0);
  hint.textContent = `${TOPICS.length} written topics · ${total} lessons · press Enter to search the live library`;
  $("#searchInput").value = "";

  const cont = $("#continueBtn");
  const s = state.session;
  if (s && !s.finished && s.plan && s.plan[s.index]) {
    const topic = topicById(s.topicId);
    const left = s.plan.slice(s.index).reduce((a, b) => a + b.mins, 0);
    $("#continueText").textContent = `Continue ${topic ? topic.title : "lesson"} · ${fmt(left)} left`;
    cont.classList.remove("hidden");
  } else {
    cont.classList.add("hidden");
  }

  const av = $("#avatarBtn");
  av.textContent = p ? p.name.charAt(0).toUpperCase() : "?";
  $("#railStreak").textContent = streakCount(state.stats.days);
}

function filterTopics(q) {
  const query = q.trim().toLowerCase();
  if (!query) {
    renderTopicGrid();
    highlightNode(null);
    $("#searchHint").textContent = "Tap a node, or search by topic, lesson or keyword.";
    return [];
  }
  const matches = TOPICS.filter((t) =>
    `${t.title} ${t.blurb} ${t.lessons.map((l) => l.title).join(" ")}`.toLowerCase().includes(query)
  );
  $$(".node").forEach((n) =>
    n.classList.toggle("is-dim", !matches.some((m) => m.id === n.dataset.topic))
  );
  $$("#graphEdges line").forEach((l) => l.classList.remove("hot"));
  renderTopicGrid(matches);
  $("#searchHint").textContent = matches.length
    ? `${matches.length} topic${matches.length === 1 ? "" : "s"} match “${q.trim()}”`
    : `Not in the written library. Press Enter to search the live library for “${q.trim()}”.`;
  return matches;
}

/* ---------------- quick fire game ---------------- */

const gameState = { pool: [], i: 0, score: 0, answered: false };

const allQuestions = () =>
  TOPICS.flatMap((t) => t.lessons.filter((l) => l.quiz).map((l) => ({ topic: t, quiz: l.quiz })));

const shuffle = (arr) =>
  arr
    .map((v) => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1]);

function startGame() {
  gameState.pool = shuffle(allQuestions()).slice(0, 5);
  gameState.i = 0;
  gameState.score = 0;
  gameState.answered = false;
  renderGame();
}

function gameLang() {
  return state.profile && state.profile.lang === "hi" ? "hi" : "en";
}

function renderGame() {
  const g = gameState;
  const body = $("#gameBody");
  $("#gameScore").textContent = `${g.score} / 5`;
  if (!g.pool.length) return;

  if (g.i >= g.pool.length) {
    body.innerHTML = `
      <p class="game-q">You got ${g.score} of ${g.pool.length}.</p>
      <p class="game-fb">${g.score >= 4 ? "Sharp. That is real recall." : "Good rep. Play again and the weak ones will stick."}</p>
      <button class="btn btn-ghost btn-sm" id="gameAgain" type="button">Play again</button>`;
    $("#gameAgain").addEventListener("click", startGame);
    return;
  }

  const item = g.pool[g.i];
  const q = item.quiz;
  const lang = gameLang();
  body.innerHTML = `
    <p class="mini-copy">${esc(item.topic.title)}</p>
    <p class="game-q">${esc(q.q[lang] || q.q.en)}</p>
    <div class="game-opts">
      ${(q.options[lang] || q.options.en)
        .map((o, idx) => `<button class="game-opt" type="button" data-idx="${idx}">${esc(o)}</button>`)
        .join("")}
    </div>
    <div id="gameFb"></div>`;
  body.querySelectorAll(".game-opt").forEach((btn) => {
    btn.addEventListener("click", () => answerGame(Number(btn.dataset.idx)));
  });
}

function answerGame(picked) {
  const g = gameState;
  if (g.answered) return;
  g.answered = true;
  const q = g.pool[g.i].quiz;
  const lang = gameLang();
  const right = picked === q.answer;
  if (right) g.score++;
  $("#gameScore").textContent = `${g.score} / 5`;

  $$("#gameBody .game-opt").forEach((b, k) => {
    b.disabled = true;
    if (k === q.answer) b.classList.add("is-right");
    else if (k === picked) b.classList.add("is-wrong");
  });

  $("#gameFb").innerHTML = `
    <p class="game-fb">${right ? "Correct." : "Not quite."} ${esc(q.why[lang] || q.why.en)}</p>
    <div class="game-actions">
      <button class="btn btn-ghost btn-sm" id="gameNext" type="button">
        ${g.i + 1 >= g.pool.length ? "See score" : "Next"} →
      </button>
    </div>`;
  $("#gameNext").addEventListener("click", () => {
    g.i += 1;
    g.answered = false;
    renderGame();
  });
}

/* ---------------- did you know ---------------- */

let factTopicId = null;

function renderFact() {
  const pool = allTopics().filter((t) => t.fact);
  if (!pool.length) return;
  let topic = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && topic.id === factTopicId) {
    topic = pool[(pool.indexOf(topic) + 1) % pool.length];
  }
  factTopicId = topic.id;
  $("#factText").textContent = topic.fact;
  $("#factSource").textContent = topic.title;
}

function shuffleFact() {
  const card = $("#factCard");
  if (!card) return;
  card.classList.remove("is-shaking");
  void card.offsetWidth;
  card.classList.add("is-shaking");
  if (navigator.vibrate) navigator.vibrate(16);
  setTimeout(renderFact, 170);
  setTimeout(() => card.classList.remove("is-shaking"), 700);
}

/* Shake the phone for a new fact. iOS needs a tap before motion events;
   Android and desktop just work. The New fact button is always there. */
function initShake() {
  const enable = $("#enableShake");
  const attach = () => {
    let prev = 0;
    let last = 0;
    window.addEventListener(
      "devicemotion",
      (e) => {
        const a = e.accelerationIncludingGravity || e.acceleration;
        if (!a) return;
        const mag = Math.hypot(a.x || 0, a.y || 0, a.z || 0);
        if (!prev) {
          prev = mag;
          return;
        }
        const delta = Math.abs(mag - prev);
        prev = mag;
        const now = Date.now();
        if (delta > 18 && now - last > 1300) {
          last = now;
          shuffleFact();
        }
      },
      { passive: true }
    );
  };
  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    enable.classList.remove("hidden");
    enable.addEventListener("click", async () => {
      try {
        const res = await DeviceMotionEvent.requestPermission();
        if (res !== "granted") return toast("Shake permission was not granted. Use New fact.");
        attach();
        enable.textContent = "Shake is on";
        enable.disabled = true;
      } catch (err) {
        toast("Shake is not available in this browser. Use New fact.");
      }
    });
  } else if (typeof DeviceMotionEvent !== "undefined") {
    attach();
  }
}

/* ---------------- live library (Wikipedia) ---------------- */

const WIKI = "https://en.wikipedia.org/w/api.php";
const SKIP_SECTION = /^(references|see also|external links|further reading|notes|bibliography|citations|sources|footnotes|gallery|works cited|explanatory notes|literature)/i;
const LIVE_ACCENTS = ["#7c5cff", "#2ee6d6", "#ff5d8f", "#ffb26b", "#6ee787", "#5ea8ff"];

const stripTags = (s) => String(s).replace(/<[^>]*>/g, "");
const decodeEntities = (s) => {
  const el = document.createElement("textarea");
  el.innerHTML = s;
  return el.value;
};

function wiki(params) {
  const qs = new URLSearchParams(Object.assign({ format: "json", origin: "*" }, params));
  return fetch(`${WIKI}?${qs}`).then((res) => {
    if (!res.ok) throw new Error(`Wikipedia ${res.status}`);
    return res.json();
  });
}

function splitSections(text) {
  const out = [];
  let cur = { title: "Overview", paras: [] };
  String(text)
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^==+\s*(.+?)\s*==+$/);
      if (m) {
        if (cur.paras.length) out.push(cur);
        cur = { title: m[1], paras: [] };
      } else if (line.trim()) {
        cur.paras.push(line.trim());
      }
    });
  if (cur.paras.length) out.push(cur);
  return out;
}

/* Turns a Wikipedia article into lessons. Real sentences, no invented facts,
   and no quiz: a machine-written test would be guessing. */
function buildLiveTopic(title, extract, slug) {
  const lessons = [];
  for (const sec of splitSections(extract)) {
    if (SKIP_SECTION.test(sec.title)) continue;
    const text = sec.paras.join(" ").replace(/\s+/g, " ");
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 55 && s.length < 420);
    if (sentences.length < 3) continue;
    const bullets = sentences.slice(0, 6);
    const name = lessons.length === 0 ? "Start here" : sec.title.slice(0, 64);
    const note = `Live summary of “${sec.title}” from the Wikipedia article “${title}”. Open the original for context and citations.`;
    lessons.push({
      title: name,
      mins: 10 + Math.min(6, Math.round(bullets.slice(0, 3).join(" ").length / 320)),
      bullets: { en: bullets, hi: bullets },
      note: { en: note, hi: note },
      quiz: null,
      live: true
    });
    if (lessons.length === 4) break;
  }
  if (lessons.length < 2) return null;

  const flat = String(extract).replace(/\s+/g, " ");
  let first = (flat.split(/(?<=[.!?])\s+/)[0] || flat).trim();
  if (first.length > 160) first = `${first.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  const accent = LIVE_ACCENTS[[...title].reduce((a, c) => a + c.charCodeAt(0), 0) % LIVE_ACCENTS.length];
  const safe = lessons
    .flatMap((l) => l.bullets.en)
    .filter((s) => !/died|death|kill|overdose|suicid|murder|accused|arrest|controvers|abuse/i.test(s));
  const fact = safe[Math.floor(safe.length / 3)] || safe[0] || first;

  return {
    id: slug,
    title,
    icon: "spark",
    accent,
    blurb: first,
    fact,
    live: true,
    source: `https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, "_"))}`,
    lessons,
    links: []
  };
}

function liveStatus(panel, text, busy) {
  panel.classList.remove("hidden");
  panel.innerHTML = `<div class="live-status">${busy ? '<span class="spinner"></span>' : ""}${text}</div>`;
}

async function liveSearch(q) {
  const panel = $("#liveResults");
  liveStatus(panel, `Searching Wikipedia for “${esc(q)}”…`, true);
  try {
    const data = await wiki({ action: "query", list: "search", srsearch: q, srlimit: 5 });
    const hits = (data.query && data.query.search) || [];
    if (!hits.length) return liveStatus(panel, `No Wikipedia article matched “${esc(q)}”. Try fewer words.`);
    liveStatus(panel, "Pick a source — it becomes a lesson path in seconds.");
    hits.forEach((h) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "live-hit";
      b.innerHTML = `<span class="live-hit-title">${esc(decodeEntities(h.title))}</span><span class="live-hit-snippet">${esc(
        decodeEntities(stripTags(h.snippet))
      )}</span>`;
      b.addEventListener("click", () => openLive(decodeEntities(h.title)));
      panel.appendChild(b);
    });
  } catch (err) {
    liveStatus(panel, "Couldn't reach Wikipedia. Check your connection and try again.");
  }
}

async function openLive(title) {
  const slug = `live-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56)}`;
  state.live = state.live || {};
  if (state.live[slug]) return openPlan(slug);

  const panel = $("#liveResults");
  liveStatus(panel, `Reading “${esc(title)}” and building your path…`, true);
  try {
    const data = await wiki({ action: "query", prop: "extracts", explaintext: 1, redirects: 1, titles: title });
    const pages = (data.query && data.query.pages) || {};
    const page = Object.values(pages)[0];
    if (!page || !page.extract) throw new Error("no extract");
    const topic = buildLiveTopic(page.title || title, page.extract, slug);
    if (!topic) return liveStatus(panel, "That article is too short to teach from. Pick another result.");
    state.live[slug] = topic;
    save();
    renderGraph();
    renderHome();
    openPlan(slug);
    toast(`“${topic.title}” saved to your live library.`);
  } catch (err) {
    liveStatus(panel, "Couldn't load that article. Try another result.");
  }
}

/* ---------------- topic dialog ---------------- */

let currentTopicId = null;

function openTopic(id) {
  const t = topicById(id);
  if (!t) return;
  currentTopicId = id;
  $("#dlgIcon").innerHTML = icon(t.icon || t.id);
  $("#dlgTitle").textContent = t.title;
  $("#dlgBlurb").textContent = t.blurb;
  $("#dlgMeta").innerHTML = `
    <span><b>${t.lessons.length}</b> lessons</span>
    <span><b>${fmt(topicMinutes(t))}</b> of teaching</span>
    <span><b>${state.profile ? state.profile.lang === "hi" ? "Hinglish" : "English" : "English"}</b></span>`;
  $("#dlgLessons").innerHTML = t.lessons
    .map((l) => `<div>${esc(l.title)}<span>${l.mins} min</span></div>`)
    .join("");
  $("#dlgVideo").href = yt(`${t.title} explained`);
  const dlg = $("#topicDialog");
  if (typeof dlg.showModal === "function") dlg.showModal();
  else dlg.setAttribute("open", "");
}

/* ---------------- plan ---------------- */

let planHours = 2;

function openPlan(id) {
  const t = topicById(id);
  if (!t) return;
  currentTopicId = id;
  $("#planIcon").innerHTML = icon(t.icon || t.id);
  $("#planTitle").textContent = t.title;
  $("#planBlurb").textContent = t.blurb;
  const src = $("#planSource");
  if (t.live) {
    src.hidden = false;
    src.innerHTML = `Live summary · source <a href="${t.source}" target="_blank" rel="noopener">Wikipedia</a> · English`;
  } else {
    src.hidden = true;
    src.innerHTML = "";
  }
  $("#planPreview").classList.add("hidden");
  renderHourChips();
  updatePlanMeta();
  renderStudio(t);
  show("plan");
}

/* ---------------- topic studio + 360 viewer ---------------- */

let studioTopicId = null;
let studioStamp = 0;

function posterMarkup(t) {
  return `<span class="icon">${ICONS[t.icon] || ICONS[t.id] || ICONS.spark}</span><span class="studio-name">${esc(t.title)}</span>`;
}

function renderDeepLinks(t) {
  const q = encodeURIComponent(t.title);
  const links = [
    ["YouTube", yt(t.title)],
    ["Reddit", `https://www.reddit.com/search/?q=${q}`],
    ["Quora", `https://www.quora.com/search?q=${q}`],
    ["X", `https://x.com/search?q=${q}&f=live`],
    ["Google", `https://www.google.com/search?q=${q}`],
    ["Wikipedia", t.live ? t.source : `https://en.wikipedia.org/w/index.php?search=${q}`]
  ];
  $("#studioLinks").innerHTML = links
    .map(([name, href]) => `<a class="deep-link" href="${href}" target="_blank" rel="noopener">${name}<span>↗</span></a>`)
    .join("");
}

function renderStudio(t) {
  studioTopicId = t.id;
  const poster = $("#studioPoster");
  poster.style.setProperty("--accent", t.accent || "var(--violet)");
  poster.innerHTML = posterMarkup(t);
  const img = $("#studioImg");
  img.hidden = true;
  img.removeAttribute("src");
  $("#studioVisual").style.setProperty("--accent", t.accent || "var(--violet)");
  $("#studioFact").textContent = t.fact || t.blurb;
  $("#studioMusic").href = yt(`${t.title} music playlist`);
  $("#studioVideo").href = yt(`${t.title} explained`);
  renderDeepLinks(t);

  const stamp = ++studioStamp;
  if (!t.live) return;
  loadTopicImage(t).then((src) => {
    if (!src || stamp !== studioStamp || studioTopicId !== t.id) return;
    img.src = src;
    img.alt = `${t.title} — Wikipedia image`;
    img.hidden = false;
  });
}

async function loadTopicImage(t) {
  if (t.image) return t.image;
  if (t.image === null) return null;
  try {
    const data = await wiki({ action: "query", prop: "pageimages", pithumbsize: 1200, redirects: 1, titles: t.title });
    const page = Object.values((data.query && data.query.pages) || {})[0];
    t.image = page && page.thumbnail ? page.thumbnail.source.replace(/^\/\//, "https://") : null;
  } catch (err) {
    t.image = null;
  }
  save();
  return t.image;
}

const view3d = { x: -8, y: 0, scale: 1, drag: null, spin: true, raf: 0, resume: 0 };

function viewerPaint() {
  $("#viewerCard").style.transform = `rotateX(${view3d.x}deg) rotateY(${view3d.y}deg) scale(${view3d.scale})`;
}

function viewerVisual(t, src) {
  const poster = $("#viewerPoster");
  poster.style.setProperty("--accent", t.accent || "var(--violet)");
  poster.innerHTML = posterMarkup(t);
  const img = $("#viewerImg");
  if (src) {
    img.src = src;
    img.alt = `${t.title} — Wikipedia image`;
    img.hidden = false;
    poster.hidden = true;
  } else {
    img.hidden = true;
    img.removeAttribute("src");
    poster.hidden = false;
  }
}

function viewerLoop() {
  const box = $("#viewer");
  if (!box || box.hidden) return;
  if (view3d.spin && !view3d.drag) view3d.y += 0.22;
  viewerPaint();
  view3d.raf = requestAnimationFrame(viewerLoop);
}

function openViewer() {
  const t = topicById(studioTopicId || currentTopicId);
  if (!t) return;
  $("#viewerLabel").textContent = t.title;
  $("#viewerEyebrow").textContent = t.live ? "Wikipedia visual" : "Topic visual";
  viewerVisual(t, t.image || null);
  view3d.x = -8;
  view3d.y = 0;
  view3d.scale = 1;
  view3d.spin = true;
  view3d.drag = null;
  $("#viewer").hidden = false;
  document.body.classList.add("viewing");
  cancelAnimationFrame(view3d.raf);
  viewerLoop();
  if (t.live && !t.image) {
    loadTopicImage(t).then((src) => {
      if (!src || studioTopicId !== t.id || $("#viewer").hidden) return;
      t.image = src;
      viewerVisual(t, src);
    });
  }
}

function closeViewer() {
  $("#viewer").hidden = true;
  cancelAnimationFrame(view3d.raf);
  document.body.classList.remove("viewing");
  const img = $("#viewerImg");
  img.hidden = true;
  img.removeAttribute("src");
}

function renderHourChips() {
  const box = $("#hourChips");
  box.innerHTML = "";
  [1, 2, 3, 5, 8].forEach((h) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (h === planHours ? " is-on" : "");
    b.textContent = `${h} hour${h === 1 ? "" : "s"}`;
    b.dataset.hours = h;
    b.addEventListener("click", () => {
      planHours = h;
      renderHourChips();
      updatePlanMeta();
      $("#planPreview").classList.add("hidden");
    });
    box.appendChild(b);
  });
}

function updatePlanMeta() {
  const t = topicById(currentTopicId);
  const depth = depthFor(planHours);
  const core = t.lessons.reduce((a, l) => a + lessonMinutes(l, depth, t.live), 0);
  const lvl = state.profile ? state.profile.level : "standard";
  const lvlText = lvl === "simple" ? "brand new" : lvl === "deep" ? "deep" : "some experience";
  const lang = t.live ? "English (live source)" : state.profile && state.profile.lang === "hi" ? "Hinglish" : "English";
  const tight = planHours * 60 - core < 16;
  const tail = t.lessons.every((l) => l.quiz) ? "practice, recall and a test." : "practice, recall and a final teach-back.";
  const depthText = t.live
    ? "from the sourced article, with more sentences at longer times"
    : depth === "master"
      ? "with a case study, deep dives and worked examples"
      : depth === "deep"
        ? "with deep dives and worked examples"
        : depth === "standard"
          ? "with worked examples"
          : "core ideas only";
  $("#planMeta").innerHTML = `
    Teaching takes <b>${fmt(core)}</b> ${depthText}. ${tight ? "This is tight, so we keep the path lean." : `The rest becomes ${tail}`}<br>
    Teaching in <b>${lang}</b>, at a level for someone with <b>${lvlText}</b>.`;
  $("#buildPlanBtn").textContent = `Build my ${planHours}-hour path`;
}

function renderPlanPreview() {
  const t = topicById(currentTopicId);
  const plan = buildPlan(t, planHours);
  const total = planMinutes(plan);
  $("#planSummaryTitle").textContent = `${t.title} in ${planHours} hour${planHours === 1 ? "" : "s"}`;
  $("#planItems").textContent = plan.length;
  $("#planMinutes").textContent = total;
  $("#planLessons").textContent = t.lessons.length;

  const list = $("#planList");
  list.innerHTML = "";
  plan.forEach((item, i) => {
    const kind =
      item.kind === "lesson"
        ? item.live
          ? item.depth === "core"
            ? "Live lesson"
            : "Live + more source"
          : item.depth === "master"
            ? "Deep dive + case"
            : item.depth === "deep"
              ? "Deep dive"
              : item.depth === "standard"
                ? "Lesson + examples"
                : "Core lesson"
        : KIND_LABEL[item.kind] || "Step";
    const li = document.createElement("li");
    li.className = `is-${item.kind}`;
    li.innerHTML = `
      <span class="num">${String(i + 1).padStart(2, "0")}</span>
      <div><div class="kind">${kind}</div><div class="title">${esc(item.title)}</div></div>
      <span class="mins">${item.mins} min</span>`;
    list.appendChild(li);
  });

  $("#planPreview").classList.remove("hidden");
  $("#startPlanBtn").textContent = `Start learning · ${fmt(total)} →`;
  $("#planPreview").scrollIntoView({ behavior: "smooth", block: "start" });
}

function startPlan() {
  const t = topicById(currentTopicId);
  state.session = {
    topicId: t.id,
    hours: planHours,
    plan: buildPlan(t, planHours),
    index: 0,
    step: 0,
    started: Date.now(),
    finished: false,
    quiz: null
  };
  save();
  show("learn");
  renderLearn();
}

/* ---------------- lesson ---------------- */

function addMsg(kind, html) {
  const el = document.createElement("div");
  el.className = `msg ${kind}`;
  el.innerHTML = html;
  $("#chat").appendChild(el);
  return el;
}

function scrollChat() {
  const chat = $("#chat");
  chat.scrollTop = chat.scrollHeight;
}

function setActions(items) {
  const box = $("#chatActions");
  box.innerHTML = "";
  items.forEach((it) => {
    const el = document.createElement(it.href ? "a" : "button");
    el.className = "btn " + (it.variant === "ghost" ? "btn-ghost" : "btn-primary");
    el.textContent = it.label;
    if (it.href) {
      el.href = it.href;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.type = "button";
      el.addEventListener("click", it.onClick);
    }
    box.appendChild(el);
  });
}

function updateProgress() {
  const s = state.session;
  if (!s || !s.plan) return;
  const done = s.plan.slice(0, s.index).reduce((a, b) => a + b.mins, 0);
  const total = planMinutes(s.plan);
  const pct = Math.min(100, Math.round((done / total) * 100));
  $("#learnBar").style.width = `${pct}%`;
  $("#learnProgress").setAttribute("aria-valuenow", String(pct));
  $("#learnTime").textContent = `${done} / ${total} min`;
}

function renderLearn() {
  const s = state.session;
  if (!s || !s.plan || s.index >= s.plan.length) return finishSession();
  const topic = topicById(s.topicId);
  const item = s.plan[s.index];

  if (item.kind === "quiz") return startQuiz();

  updateProgress();
  const chat = $("#chat");
  chat.innerHTML = "";

  if (item.kind === "lesson") renderLessonStep(topic, item, true);
  else renderTask(topic, item);
  scrollChat();
}

function renderLessonStep(topic, item, firstRender) {
  const lesson = topic.lessons[item.lessonIndex];
  const bullets = bulletsFor(lesson, item.depth);
  const s = state.session;
  s.step = Math.max(1, Math.min(s.step || 1, bullets.length));

  if (firstRender) {
    addMsg("title", esc(lesson.title));
    for (let i = 0; i < s.step; i++) addMsg("coach", rich(bullets[i]));
  }
  drawLessonActions(topic, lesson, bullets);
  if (firstRender && voiceOn()) {
    const spoken = spokenBullets(lesson, item.depth);
    speak(spoken[s.step - 1] || bullets[s.step - 1]);
  }
  save();
}

function drawLessonActions(topic, lesson, bullets) {
  const s = state.session;
  if (s.step < bullets.length) {
    setActions([{ label: "Continue →", onClick: nextBullet }]);
    return;
  }
  endOfLesson(topic, lesson);
}

function endOfLesson(topic, lesson) {
  const lang = (state.profile && state.profile.lang) || "en";
  addMsg("note", `<b>Keep this</b>${rich(lesson.note[lang] || lesson.note.en)}`);
  if (!topic.live && state.profile && state.profile.level === "deep") {
    addMsg(
      "note",
      "<b>Go deeper</b>Find one real source on this lesson and note where it disagrees with what you just read. That is how you move past a summary."
    );
  }
  const actions = [{ label: "Mark lesson done →", onClick: advance }];
  if (topic.live && topic.source) {
    actions.push({ label: "Read the article ↗", href: topic.source, variant: "ghost" });
  } else {
    actions.push({ label: "Watch a video on this ↗", href: yt(`${topic.title} ${lesson.title}`), variant: "ghost" });
  }
  setActions(actions);
  scrollChat();
}

function nextBullet() {
  const s = state.session;
  const topic = topicById(s.topicId);
  const item = s.plan[s.index];
  const lesson = topic.lessons[item.lessonIndex];
  const bullets = bulletsFor(lesson, item.depth);
  s.step = Math.min(bullets.length, s.step + 1);
  addMsg("coach", rich(bullets[s.step - 1]));
  if (voiceOn()) {
    const spoken = spokenBullets(lesson, item.depth);
    speak(spoken[s.step - 1] || bullets[s.step - 1]);
  }
  scrollChat();
  if (s.step >= bullets.length) endOfLesson(topic, lesson);
  save();
}

function renderTask(topic, item) {
  const s = state.session;
  addMsg("title", esc(item.title));
  addMsg("coach", rich(item.body));
  if (voiceOn()) speak(item.body);
  if (item.kind === "video") {
    addMsg("note", `<b>Search</b>Open the video search, watch one clip, then come back and write your three notes.`);
  }
  const buttons = [{ label: "Done →", onClick: advance }];
  if (item.link) buttons.push({ label: "Find a video ↗", href: item.link, variant: "ghost" });
  setActions(buttons);
  s.step = 0;
  save();
}

function completeItem() {
  const s = state.session;
  const item = s.plan[s.index];
  state.stats.minutes += item.mins;
  if (item.kind === "lesson") {
    state.stats.lessons += 1;
    const key = s.topicId;
    const t = state.stats.byTopic[key] || { lessons: 0, best: 0 };
    t.lessons += 1;
    state.stats.byTopic[key] = t;
  }
  markDay();
}

function advance() {
  const s = state.session;
  if (!s) return;
  completeItem();
  s.index += 1;
  s.step = 0;
  save();

  if (s.index >= s.plan.length) return finishSession();
  if (s.plan[s.index].kind === "quiz") return startQuiz();
  updateProgress();
  show("learn");
  renderLearn();
}

/* ---------------- quiz ---------------- */

function startQuiz() {
  const s = state.session;
  const topic = topicById(s.topicId);
  if (!s.quiz || s.quiz.done) s.quiz = { i: 0, answers: [], answered: false, saved: false, done: false };
  s.step = 0;
  save();
  show("quiz");
  renderQuiz();
}

function questionsFor(topic) {
  return topic.lessons.map((l) => l.quiz);
}

function renderQuiz() {
  const s = state.session;
  const topic = topicById(s.topicId);
  const qs = questionsFor(topic);
  const i = s.quiz.i;
  if (i >= qs.length) return showResult();

  const q = qs[i];
  const lang = (state.profile && state.profile.lang) || "en";
  $("#quizProgress").textContent = `Question ${i + 1} of ${qs.length}`;
  $("#quizRunning").textContent = `${s.quiz.answers.filter(Boolean).length} correct`;
  $("#quizQuestion").textContent = q.q[lang] || q.q.en;
  $("#quizWhy").hidden = true;
  $("#quizWhy").textContent = "";
  $("#quizNext").disabled = true;
  $("#quizNext").textContent = i === qs.length - 1 ? "See my score →" : "Next →";

  const box = $("#quizOptions");
  box.innerHTML = "";
  const opts = q.options[lang] || q.options.en;
  opts.forEach((text, idx) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "opt";
    b.innerHTML = `<span class="letter">${"ABC"[idx] || idx + 1}</span><span>${esc(text)}</span>`;
    b.addEventListener("click", () => answerQuiz(idx, q, qs.length));
    box.appendChild(b);
  });
}

function answerQuiz(idx, q, total) {
  const s = state.session;
  if (s.quiz.answered) return;
  s.quiz.answered = true;
  const lang = (state.profile && state.profile.lang) || "en";
  const correct = idx === q.answer;
  s.quiz.answers.push(correct);
  save();

  $$("#quizOptions .opt").forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add("correct");
    else if (i === idx) b.classList.add("wrong");
    else b.classList.add("dim");
  });

  const why = q.why[lang] || q.why.en;
  const box = $("#quizWhy");
  box.hidden = false;
  box.innerHTML = `<b>${correct ? "Correct." : "Not quite."}</b> ${esc(why)}`;
  $("#quizRunning").textContent = `${s.quiz.answers.filter(Boolean).length} correct`;
  $("#quizNext").disabled = false;
  $("#quizNext").textContent = s.quiz.i >= total - 1 ? "See my score →" : "Next →";
  $("#quizNext").focus();
}

function nextQuestion() {
  const s = state.session;
  s.quiz.i += 1;
  s.quiz.answered = false;
  save();
  if (s.quiz.i >= questionsFor(topicById(s.topicId)).length) showResult();
  else renderQuiz();
}

function showResult() {
  const s = state.session;
  const topic = topicById(s.topicId);
  const qs = questionsFor(topic);
  const answers = s.quiz.answers;
  const correct = answers.filter(Boolean).length;
  const score = answers.length ? Math.round((correct / answers.length) * 100) : 0;
  const lang = (state.profile && state.profile.lang) || "en";

  $("#scoreRing").style.setProperty("--p", score);
  $("#scoreNum").textContent = `${score}%`;
  $("#resultTitle").textContent =
    score >= 80 ? "You actually learned it." : score >= 50 ? "Solid start." : "Worth one more pass.";
  $("#resultMsg").textContent = `${topic.title} · ${correct} of ${answers.length} correct. ${
    score >= 80
      ? "Your stats are updated."
      : "Revisit the lessons you missed, then try the test again — that is how the score moves."
  }`;

  const review = $("#resultReview");
  review.innerHTML = qs
    .map((q, i) => {
      const ok = answers[i];
      const right = (q.options[lang] || q.options.en)[q.answer];
      return `<div class="item">
        <span class="tick ${ok ? "ok" : "no"}">${ok ? "✓" : "✕"}</span>
        <p><b>${esc(q.q[lang] || q.q.en)}</b>${esc(right)}</p>
      </div>`;
    })
    .join("");

  if (!s.quiz.saved) {
    s.quiz.saved = true;
    const quizItem = s.plan[s.index];
    if (quizItem) state.stats.minutes += quizItem.mins;
    state.stats.quizzes.push({ topicId: topic.id, score, date: today(), at: Date.now() });
    const bt = state.stats.byTopic[topic.id] || { lessons: 0, best: 0 };
    bt.best = Math.max(bt.best || 0, score);
    state.stats.byTopic[topic.id] = bt;
    markDay();
  }
  s.quiz.done = true;
  s.finished = true;
  save();
  show("result");
}

function retryQuiz() {
  const s = state.session;
  s.quiz = { i: 0, answers: [], answered: false, saved: false, done: false };
  s.finished = false;
  save();
  show("quiz");
  renderQuiz();
}

function finishSession() {
  const s = state.session;
  if (s) {
    s.finished = true;
    s.index = s.plan.length;
    save();
  }
  toast("Path complete — nice work.");
  renderHome();
  show("home");
}

/* ---------------- stats ---------------- */

function renderStats() {
  const st = state.stats;
  const tests = st.quizzes.length;
  const avg = tests ? Math.round(st.quizzes.reduce((a, q) => a + q.score, 0) / tests) : 0;
  const streak = streakCount(st.days);

  $("#statsName").textContent = state.profile ? state.profile.name : "";
  $("#statGrid").innerHTML = `
    <div class="stat"><b>${st.lessons}</b><span>Lessons done</span></div>
    <div class="stat"><b>${fmt(st.minutes)}</b><span>Time learning</span></div>
    <div class="stat"><b>${avg}%</b><span>Average score</span><span class="hint">${tests} test${tests === 1 ? "" : "s"} taken</span></div>
    <div class="stat"><b>${streak}</b><span>Day streak</span><span class="hint">${streak ? "Keep it alive today" : "Finish one step today"}</span></div>`;

  const rows = allTopics()
    .map((t) => {
      const bt = st.byTopic[t.id] || { lessons: 0, best: 0 };
      const pct = Math.round((bt.lessons / t.lessons.length) * 100);
      return `<div class="ts-row">
      <span><span class="row-icon" style="color:${t.accent}">${icon(t.icon || t.id)}</span>${esc(t.title)}${bt.best ? `<em class="best">${bt.best}%</em>` : ""}</span>
      <span class="bar"><i style="width:${Math.min(100, pct)}%;--accent:${t.accent}"></i></span>
      <span class="pct">${bt.lessons}/${t.lessons.length}</span>
    </div>`;
    })
    .join("");
  $("#topicStats").innerHTML = rows;

  const recent = st.quizzes.slice(-5).reverse();
  $("#recentTests").innerHTML = recent.length
    ? recent
        .map((q) => {
          const t = topicById(q.topicId);
          return `<div class="item"><div><span class="title">${
            t ? `<span class="row-icon" style="color:${t.accent}">${icon(t.icon || t.id)}</span>${esc(t.title)}` : "Topic"
          }</span><span class="date">${q.date}</span></div><b>${q.score}%</b></div>`;
        })
        .join("")
    : `<p class="empty">No tests yet. Finish a path to get your first score.</p>`;
}

/* ---------------- profile ---------------- */

function selectChip(containerId, attr, value) {
  $$(`#${containerId} .chip`).forEach((c) => c.classList.toggle("is-on", c.dataset[attr] === value));
}

function chipValue(containerId, attr) {
  const on = $(`#${containerId} .chip.is-on`);
  return on ? on.dataset[attr] : null;
}

function wireChips(containerId) {
  const box = $(`#${containerId}`);
  box.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip || !box.contains(chip)) return;
    $$(".chip", box).forEach((c) => c.classList.toggle("is-on", c === chip));
  });
}

function renderProfile() {
  const p = state.profile;
  if (!p) return show("welcome");
  $("#profileAvatar").textContent = p.name.charAt(0).toUpperCase();
  $("#profileName").textContent = p.name;
  $("#profileSub").textContent = `${p.age} · ${p.status} · learning in ${p.lang === "hi" ? "Hinglish" : "English"}`;
  $("#accountLine").textContent = state.email
    ? `Signed in with Google as ${state.email}.`
    : state.phone
      ? `Signed in as ${prettyPhone(state.phone)}.`
      : "This profile lives on this device.";
  $("#proWaitlist").textContent = state.pro ? "You're on the early-access list" : "Join early access";
  $("#pfName").value = p.name;
  $("#pfAge").value = p.age;
  $("#pfStatus").value = p.status;
  selectChip("pfLangChips", "lang", p.lang);
  selectChip("pfLevelChips", "level", p.level);
}

/* ---------------- reset ---------------- */

async function resetAll() {
  const msg = sb
    ? "Delete your profile, progress and scores from this device and the cloud profile? Your Google sign-in itself stays."
    : "Delete your profile, progress and scores from this device?";
  if (!window.confirm(msg)) return;
  if (sb) {
    try {
      if (state.userId) await sb.from("profiles").delete().eq("id", state.userId);
      await sb.auth.signOut();
    } catch (err) {
      /* still clear this device below */
    }
  }
  try {
    localStorage.removeItem(LS_KEY);
  } catch (err) {
    /* ignore */
  }
  state = freshState();
  location.reload();
}

/* ---------------- init ---------------- */

function mergeTopics(a, b) {
  const key = [a, b].sort().join("|").toLowerCase();
  const map = {
    "networking|python": ["Network Automation", "Python for Networks"],
    "ai & ml|networking": ["AI Network Ops", "Smart Routing"],
    "ai & ml|python": ["Machine Learning with Python", "AI Pipelines"],
    "ai & ml|quantum": ["Quantum ML", "Quantum Neural Nets"],
    "money|python": ["Algorithmic Trading", "Finance Bots"],
    "ai & ml|speaking": ["AI Speech Coach", "Voice Assistants"],
    "networking|quantum": ["Quantum Networks", "Secure Channels"],
    "money|networking": ["Fintech Infrastructure", "Payment Rails"],
    "python|quantum": ["Quantum Computing with Python", "Qiskit Labs"],
    "money|speaking": ["Pitch & Finance", "Investor Voice"],
    "python|speaking": ["Voice Bots with Python", "Speech Scripts"],
    "quantum|speaking": ["Quantum Voice", "Qubit Narratives"],
    "ai & ml|money": ["AI Trading", "Smart Portfolios"],
    "networking|speaking": ["Network Storytelling", "Tech Talks"],
    "money|quantum": ["Quantum Finance", "Risk Modelling"],
  };
  if (map[key]) return map[key];
  return [a + " " + b + " Fusion", b + " " + a + " Lab"];
}

function mergeTopics(a, b) {
  const key = [a, b].sort().join("|").toLowerCase();
  const map = {
    "networking|python": ["Network Automation", "Python for Networks"],
    "ai & ml|networking": ["AI Network Ops", "Smart Routing"],
    "ai & ml|python": ["Machine Learning with Python", "AI Pipelines"],
    "ai & ml|quantum": ["Quantum ML", "Quantum Neural Nets"],
    "money|python": ["Algorithmic Trading", "Finance Bots"],
    "ai & ml|speaking": ["AI Speech Coach", "Voice Assistants"],
    "networking|quantum": ["Quantum Networks", "Secure Channels"],
    "money|networking": ["Fintech Infrastructure", "Payment Rails"],
    "python|quantum": ["Quantum Computing with Python", "Qiskit Labs"],
    "money|speaking": ["Pitch & Finance", "Investor Voice"],
    "python|speaking": ["Voice Bots with Python", "Speech Scripts"],
    "quantum|speaking": ["Quantum Voice", "Qubit Narratives"],
    "ai & ml|money": ["AI Trading", "Smart Portfolios"],
    "networking|speaking": ["Network Storytelling", "Tech Talks"],
    "money|quantum": ["Quantum Finance", "Risk Modelling"],
  };
  if (map[key]) return map[key];
  return [a + " " + b + " Fusion", b + " " + a + " Lab"];
}


/* ---------------- custom MCQ test ---------------- */
const MCQ_RANKS = [
  "Beginner", "Novice", "Learner", "Student", "Apprentice",
  "Practitioner", "Scholar", "Analyst", "Specialist", "Explorer",
  "Researcher", "Expert", "Master", "Authority", "Pioneer",
  "Innovator", "Visionary", "Luminary", "Legend", "Grandmaster"
];

function mcqGenerateQuestions(topic, difficulty) {
  const t = topic.trim();
  const pool = [];
  const builtIn = (typeof TOPICS !== "undefined") ? TOPICS.find((x) => x.title.toLowerCase() === t.toLowerCase() || x.id === t.toLowerCase().replace(/\s+/g, "")) : null;
  if (builtIn) {
    for (const lesson of builtIn.lessons) {
      if (lesson.quiz && lesson.quiz.q) {
        const q = lesson.quiz.q.en || lesson.quiz.q;
        const opts = lesson.quiz.options.en || lesson.quiz.options;
        const ans = lesson.quiz.answer;
        const why = lesson.quiz.why ? (lesson.quiz.why.en || lesson.quiz.why) : "";
        pool.push({ q, opts, ans, why });
      }
      const bullets = (lesson.bullets && lesson.bullets.en) || [];
      for (let i = 0; i < bullets.length && pool.length < 25; i++) {
        const b = bullets[i];
        pool.push({
          q: "Which statement is true about " + builtIn.title + "?",
          opts: [b, "None of the above", "It is not related", "It applies only to advanced users"],
          ans: 0,
          why: b
        });
      }
    }
  }
  const generic = [
    { q: "What is the main purpose of studying " + t + "?", opts: ["To gain knowledge and skills", "To waste time", "To avoid other subjects", "To memorize facts only"], ans: 0, why: "Learning builds understanding and capability." },
    { q: "Which approach helps most when learning " + t + "?", opts: ["Cramming the night before", "Regular small sessions", "Skipping hard parts", "Only reading summaries"], ans: 1, why: "Spaced repetition builds stronger memory." },
    { q: "What should you do when stuck on a " + t + " problem?", opts: ["Give up immediately", "Break it into smaller steps", "Copy someone else's answer", "Skip to the next topic"], ans: 1, why: "Breaking problems down makes them solvable." },
    { q: "How do you know you have understood " + t + "?", opts: ["You memorized the definitions", "You can explain it simply", "You read it once", "You passed a quiz without studying"], ans: 1, why: "Explaining simply proves real understanding." },
    { q: "Which resource is most reliable for " + t + "?", opts: ["Random social media posts", "Peer-reviewed sources and textbooks", "Unverified blogs", "Hearsay"], ans: 1, why: "Verified sources reduce misinformation." },
    { q: "What is a good study habit for " + t + "?", opts: ["Studying only before exams", "Consistent daily practice", "Avoiding difficult topics", "Multitasking while studying"], ans: 1, why: "Consistency beats intensity." },
    { q: "How should you review " + t + " material?", opts: ["Never review", "Spaced repetition over time", "Re-read once", "Highlight everything"], ans: 1, why: "Spaced repetition strengthens long-term memory." },
    { q: "What is the value of practice in " + t + "?", opts: ["Practice is unnecessary", "Practice builds skill and confidence", "Only theory matters", "Practice wastes time"], ans: 1, why: "Practice transforms knowledge into skill." },
    { q: "When learning " + t + ", what is most important?", opts: ["Speed over understanding", "Deep understanding", "Memorizing answers", "Avoiding mistakes"], ans: 1, why: "Deep understanding lasts longer than surface memorization." },
    { q: "How can you apply " + t + " knowledge?", opts: ["Keep it theoretical only", "Build small projects", "Never use it", "Wait for someone to ask"], ans: 1, why: "Application cements learning." },
  ];
  let gi = 0;
  while (pool.length < 20 && gi < generic.length) {
    pool.push(generic[gi]);
    gi++;
  }
  while (pool.length < 20) {
    const g = generic[pool.length % generic.length];
    pool.push({ q: g.q + " (advanced)", opts: g.opts, ans: g.ans, why: g.why });
  }
  let questions = pool.slice(0, 20);
  if (difficulty === "hard") {
    questions = questions.map((q) => {
      const correct = q.opts[q.ans];
      const shuffled = [...q.opts].sort(() => Math.random() - 0.5);
      return { ...q, opts: shuffled, ans: shuffled.indexOf(correct) };
    });
  }
  return questions;
}

let mcqState = { topic: "", difficulty: "medium", questions: [], idx: 0, score: 0, answers: [] };

function mcqStart() {
  const topic = ($("#mcqTopic") || {}).value || "";
  const difficulty = ($("#mcqDifficulty") || {}).value || "medium";
  if (!topic.trim()) { toast("Enter a topic name."); return; }
  mcqState = { topic: topic.trim(), difficulty, questions: mcqGenerateQuestions(topic.trim(), difficulty), idx: 0, score: 0, answers: [] };
  $("#mcqSetup").hidden = true;
  $("#mcqResult").hidden = true;
  $("#mcqQuiz").hidden = false;
  $("#mcqQuizTopic").textContent = mcqState.topic;
  mcqRenderQuestion();
}

function mcqRenderQuestion() {
  const q = mcqState.questions[mcqState.idx];
  if (!q) { mcqFinish(); return; }
  $("#mcqProgress").textContent = (mcqState.idx + 1) + " / 20";
  $("#mcqBarFill").style.width = ((mcqState.idx / 20) * 100) + "%";
  $("#mcqQuestion").textContent = q.q;
  $("#mcqFeedback").textContent = "";
  const opts = $("#mcqOptions");
  opts.innerHTML = "";
  q.opts.forEach((o, i) => {
    const btn = document.createElement("button");
    btn.className = "mcq-opt";
    btn.type = "button";
    btn.textContent = o;
    btn.addEventListener("click", () => mcqAnswer(i));
    opts.appendChild(btn);
  });
}

function mcqAnswer(i) {
  const q = mcqState.questions[mcqState.idx];
  const opts = $("#mcqOptions").querySelectorAll(".mcq-opt");
  opts.forEach((b) => (b.disabled = true));
  const correct = i === q.ans;
  if (correct) { mcqState.score++; opts[i].classList.add("is-correct"); $("#mcqFeedback").textContent = "Correct! " + (q.why || ""); }
  else { opts[i].classList.add("is-wrong"); opts[q.ans].classList.add("is-correct"); $("#mcqFeedback").textContent = "Not quite. " + (q.why || ""); }
  mcqState.answers.push({ q: q.q, chosen: i, correct, correctAns: q.ans });
  setTimeout(() => {
    mcqState.idx++;
    if (mcqState.idx < 20) mcqRenderQuestion();
    else mcqFinish();
  }, 1600);
}

function mcqFinish() {
  $("#mcqQuiz").hidden = true;
  $("#mcqResult").hidden = false;
  const score = mcqState.score;
  $("#mcqScore").textContent = score + " / 20";
  const rank = MCQ_RANKS[Math.max(0, Math.min(19, score - 1))] || "Beginner";
  $("#mcqRank").textContent = "Rank: " + rank + ". " + (score >= 15 ? "Outstanding!" : score >= 10 ? "Good work!" : "Keep practicing!");
  const name = (state.profile && state.profile.name) ? state.profile.name : "Learner";
  $("#certName").textContent = name;
  $("#certTopic").textContent = mcqState.topic;
  $("#certScore").textContent = score;
  $("#certRank").textContent = rank;
  $("#certDifficulty").textContent = mcqState.difficulty.charAt(0).toUpperCase() + mcqState.difficulty.slice(1);
  $("#certDate").textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  state.mcqResults = state.mcqResults || [];
  state.mcqResults.push({ topic: mcqState.topic, score, rank, date: new Date().toISOString() });
  save();
}

function mcqReset() {
  $("#mcqSetup").hidden = false;
  $("#mcqQuiz").hidden = true;
  $("#mcqResult").hidden = true;
  $("#mcqTopic").value = "";
}

function init() {
  const preloader = $("#preloader");
  if (preloader) {
    setTimeout(() => preloader.classList.add("is-done"), 1200);
    setTimeout(() => preloader.remove(), 1900);
  }
  state = load();

  selectChip("langChips", "lang", "en");
  selectChip("levelChips", "level", "standard");

  ["langChips", "levelChips", "pfLangChips", "pfLevelChips"].forEach(wireChips);

  // global navigation
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (!nav) return;
    const target = nav.dataset.nav;
    if (!state.profile) return show("welcome");
    if (target === "home") renderHome();
    if (target === "stats") renderStats();
    if (target === "profile") renderProfile();
    show(target);
  });

  // welcome + local phone accounts
  $("#authSignup").addEventListener("click", () => openAuth("signup"));
  $("#authLogin").addEventListener("click", () => openAuth("login"));
  $("#authClose").addEventListener("click", closeAuth);
  $("#phoneForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const phone = normalizePhone($("#phoneInput").value);
    if (!phone) {
      $("#authDemo").textContent = "Enter a valid 10-digit Indian mobile number.";
      return;
    }
    await sendCode(phone);
  });
  $("#codeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = $("#codeInput").value.replace(/\D/g, "");
    if (code.length !== 6) {
      $("#authError").textContent = "Enter the 6-digit code.";
      return;
    }
    const err = await verifyCode(code);
    if (err) $("#authError").textContent = err;
  });
  $("#codeBack").addEventListener("click", () => {
    clearInterval(resendTimer);
    showPhonePane();
  });
  $("#codeResend").addEventListener("click", () => pendingAuth && sendCode(pendingAuth.phone));
  $("#googleBtn").addEventListener("click", googleLogin);
  $("#logoutBtn").addEventListener("click", logout);
  $("#proWaitlist").addEventListener("click", () => {
    state.pro = true;
    save();
    toast("You're on the early-access list for this device.");
  });

  const form = $("#searchForm");
  const input = $("#searchInput");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return ($("#searchHint").textContent = "Type a topic, or tap a node above.");
    const matches = filterTopics(q);
    if (matches.length === 1) openTopic(matches[0].id);
    else if (matches.length > 1) $("#searchHint").textContent = `${matches.length} topics match — pick one from the list.`;
    else liveSearch(q);
  });
  input.addEventListener("input", () => {
    const panel = $("#liveResults");
    panel.classList.add("hidden");
    panel.innerHTML = "";
    filterTopics(input.value);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input && document.querySelector(".screen.is-active")?.id === "screen-home") {
      e.preventDefault();
      input.focus();
    }
  });

  $("#continueBtn").addEventListener("click", () => {
    if (!state.session) return;
    show("learn");
    renderLearn();
  });

  // voice: read lessons aloud, English only
  setVoice(state.voiceOn);
  $("#voiceBtn").addEventListener("click", () => {
    const on = !state.voiceOn;
    setVoice(on);
    if (!on) {
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      return;
    }
    announceVoice();
  });

  // voice search, English only
  const mic = $("#micBtn");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    mic.classList.add("hidden");
  } else {
    mic.addEventListener("click", () => {
      const rec = new SR();
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      mic.classList.add("is-listening");
      rec.onresult = (event) => {
        input.value = event.results[0][0].transcript;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        form.requestSubmit();
      };
      rec.onerror = () => toast("I could not hear that. Type it instead.");
      rec.onend = () => mic.classList.remove("is-listening");
      try {
        rec.start();
      } catch (err) {
        mic.classList.remove("is-listening");
      }
    });
  }

  // quick fire + fact card + live-search chips
  $("#gameStart").addEventListener("click", startGame);
  $("#factShuffle").addEventListener("click", shuffleFact);
  $("#factShake").addEventListener("click", shuffleFact);
  $("#factSpeak").addEventListener("click", () => speak($("#factText").textContent));
  initShake();
  renderFact();
  $$("[data-try]").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.dataset.try;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      form.requestSubmit();
    });
  });

  // topic studio + 360 visual
  $("#studioVisual").addEventListener("click", openViewer);
  $("#studioSpeak").addEventListener("click", () => speak($("#studioFact").textContent));
  $("#viewerClose").addEventListener("click", closeViewer);

  const vcard = $("#viewerCard");
  vcard.addEventListener("pointerdown", (e) => {
    view3d.drag = { x: e.clientX, y: e.clientY };
    view3d.spin = false;
    clearTimeout(view3d.resume);
    vcard.classList.add("is-dragging");
    if (vcard.setPointerCapture) vcard.setPointerCapture(e.pointerId);
  });
  vcard.addEventListener("pointermove", (e) => {
    if (!view3d.drag) return;
    view3d.y += (e.clientX - view3d.drag.x) * 0.45;
    view3d.x = Math.max(-34, Math.min(34, view3d.x - (e.clientY - view3d.drag.y) * 0.3));
    view3d.drag = { x: e.clientX, y: e.clientY };
  });
  const endDrag = () => {
    if (!view3d.drag) return;
    view3d.drag = null;
    vcard.classList.remove("is-dragging");
    view3d.resume = setTimeout(() => {
      view3d.spin = true;
    }, 2400);
  };
  vcard.addEventListener("pointerup", endDrag);
  vcard.addEventListener("pointercancel", endDrag);
  vcard.addEventListener("dblclick", () => {
    view3d.x = -8;
    view3d.y = 0;
    view3d.scale = 1;
  });
  $("#viewerStage").addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      view3d.scale = Math.max(0.7, Math.min(1.9, view3d.scale - e.deltaY * 0.001));
    },
    { passive: false }
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#viewer").hidden) closeViewer();
  });

  $("#onboardForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#onName").value.trim();
    const age = parseInt($("#onAge").value, 10);
    if (!name || !age) return toast("Add your name and age to continue");
    state.profile = {
      name,
      age,
      status: $("#onStatus").value,
      lang: chipValue("langChips", "lang") || "en",
      level: chipValue("levelChips", "level") || "standard"
    };
    rememberAccount();
    save();
    void saveProfileRow();
    enterApp();
    toast(`Welcome, ${name}. Pick a topic to begin.`);
  });

  $("#topicDialog").addEventListener("click", (e) => {
    if (e.target === $("#topicDialog")) $("#topicDialog").close();
  });
  $("#dlgClose").addEventListener("click", () => $("#topicDialog").close());
  $("#dlgStart").addEventListener("click", () => {
    $("#topicDialog").close();
    openPlan(currentTopicId);
  });

  $("#buildPlanBtn").addEventListener("click", renderPlanPreview);
  $("#startPlanBtn").addEventListener("click", startPlan);

  $("#quizNext").addEventListener("click", nextQuestion);
  $("#retryBtn").addEventListener("click", retryQuiz);
  $("#quizClose").addEventListener("click", () => {
    renderHome();
    show("home");
    toast("Test paused. Continue from the home screen whenever you're ready.");
  });

  $("#profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#pfName").value.trim();
    const age = parseInt($("#pfAge").value, 10);
    if (!name || !age) return toast("Add your name and age");
    state.profile = {
      name,
      age,
      status: $("#pfStatus").value,
      lang: chipValue("pfLangChips", "lang") || "en",
      level: chipValue("pfLevelChips", "level") || "standard"
    };
    rememberAccount();
    save();
    void saveProfileRow();
    renderProfile();
    renderHome();
    toast("Saved. New lessons use these settings.");
  });

  $("#resetBtn").addEventListener("click", resetAll);

// Split title into per-letter spans for the balloon effect
  document.querySelectorAll(".w-word > span").forEach((wordSpan) => {
    const text = wordSpan.textContent;
    wordSpan.textContent = "";
    [...text].forEach((ch) => {
      const s = document.createElement("span");
      s.className = "wl";
      s.textContent = ch;
      wordSpan.appendChild(s);
    });
  });

  // Typewriter rotating word
  const rotWord = $("#rotWord");
  if (rotWord) {
    const words = ["networking", "python", "quantum", "money", "speaking", "anything"];
    let wi = 0, ci = 0, deleting = false;
    function tick() {
      const w = words[wi];
      if (!deleting) {
        rotWord.textContent = w.slice(0, ci + 1);
        ci++;
        if (ci === w.length) { deleting = true; setTimeout(tick, 1400); return; }
        setTimeout(tick, 90);
      } else {
        rotWord.textContent = w.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 300); return; }
        setTimeout(tick, 50);
      }
    }
    tick();
  }

  // Count-up stats
  function countUp(el, target, duration) {
    if (!el) return;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  countUp($("#st1"), 6, 1200);
  countUp($("#st2"), 24, 1400);

  // Infinite marquee
  const track = $("#wMarqueeTrack");
  if (track) {
    const items = ["Networking", "Python", "AI & ML", "Quantum", "Money", "Speaking", "Anything you search", "WaltLearn"];
    const html = items.map((t) => "<span>" + t + "</span>").join("");
    track.innerHTML = html + html;
  }

  // Drag-and-merge category tags
  const ticker = document.querySelector(".w-ticker");
  const mergedBox = $("#wMerged");
  if (ticker && mergedBox) {
    let dragged = null;
    ticker.querySelectorAll("span").forEach((tag) => {
      tag.setAttribute("draggable", "true");
      tag.addEventListener("dragstart", (e) => {
        dragged = tag;
        tag.classList.add("is-dragging");
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("text/plain", tag.textContent.trim());
      });
      tag.addEventListener("dragend", () => {
        tag.classList.remove("is-dragging");
        ticker.querySelectorAll("span").forEach((t) => t.classList.remove("is-drop-target"));
        dragged = null;
      });
      tag.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (dragged && dragged !== tag) tag.classList.add("is-drop-target");
      });
      tag.addEventListener("dragleave", () => tag.classList.remove("is-drop-target"));
      tag.addEventListener("drop", (e) => {
        e.preventDefault();
        tag.classList.remove("is-drop-target");
        if (!dragged || dragged === tag) return;
        const a = dragged.textContent.trim();
        const b = tag.textContent.trim();
        const names = mergeTopics(a, b);
        names.forEach((nm) => {
          const merged = document.createElement("span");
          merged.className = "merged-box";
          merged.textContent = nm;
          mergedBox.appendChild(merged);
        });
        while (mergedBox.children.length > 6) mergedBox.removeChild(mergedBox.firstChild);
      });
    });
  }

  // Interactive feature box: steps + chips
  const wsSteps = $("#wsSteps");
  const wsPreview = $("#wsPreview");
  if (wsSteps && wsPreview) {
    const steps = wsSteps.querySelectorAll("span");
    const cards = wsPreview.querySelectorAll(".ws-preview-card");
    function showStep(n) {
      steps.forEach((s) => s.classList.toggle("is-active", s.dataset.step === String(n)));
      cards.forEach((c) => c.classList.toggle("is-active", c.dataset.for === String(n)));
    }
    steps.forEach((s) => {
      s.addEventListener("click", () => showStep(s.dataset.step));
    });
    showStep("1");
  }
  document.querySelectorAll(".welcome-side .ws-chip").forEach((chip) => {
    chip.style.cursor = "pointer";
    chip.addEventListener("click", () => {
      document.querySelectorAll(".welcome-side .ws-chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
    });
  });

  // Custom cursor + magnetic buttons + mouse parallax
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  const trail1 = $("#cursorTrail1");
  const trail2 = $("#cursorTrail2");
  const trail3 = $("#cursorTrail3");
  const label = $("#cursorLabel");
  if (dot && ring && window.matchMedia("(pointer: fine)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let t1x = 0, t1y = 0, t2x = 0, t2y = 0, t3x = 0, t3y = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px, " + my + "px)";
    });
    function loop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = "translate(" + rx + "px, " + ry + "px)";
      t1x += (mx - t1x) * 0.22; t1y += (my - t1y) * 0.22;
      if (trail1) trail1.style.transform = "translate(" + t1x + "px, " + t1y + "px)";
      t2x += (t1x - t2x) * 0.25; t2y += (t1y - t2y) * 0.25;
      if (trail2) trail2.style.transform = "translate(" + t2x + "px, " + t2y + "px)";
      t3x += (t2x - t3x) * 0.3; t3y += (t2y - t3y) * 0.3;
      if (trail3) trail3.style.transform = "translate(" + t3x + "px, " + t3y + "px)";
      if (label) label.style.transform = "translate(" + rx + "px, " + ry + "px)";
      requestAnimationFrame(loop);
    }
    loop();
    const hoverSel = "a, button, .w-ticker span, .welcome-side, .deep-link, .node-tile, .w-primary, .w-ghost, .w-google";
    const labels = { ".w-primary": "Start", ".w-ghost": "Enter", ".welcome-side": "Explore", ".deep-link": "Open" };
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest(hoverSel);
      if (t) {
        dot.classList.add("is-hover");
        ring.classList.add("is-hover");
        let lbl = "";
        for (const sel in labels) { if (t.matches(sel) || t.closest(sel)) { lbl = labels[sel]; break; } }
        if (label) { label.textContent = lbl; label.style.opacity = lbl ? "1" : "0"; }
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverSel)) {
        dot.classList.remove("is-hover");
        ring.classList.remove("is-hover");
        if (label) label.style.opacity = "0";
      }
    });
    const art = document.querySelector(".welcome-art");
    const wm = document.querySelector(".w-watermark");
    document.addEventListener("mousemove", (e) => {
      if (!document.querySelector(".screen.is-active") || document.querySelector(".screen.is-active").id !== "screen-welcome") return;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      if (art) art.style.transform = "translate(" + (dx * 12) + "px, " + (dy * 12) + "px)";
      if (wm) wm.style.transform = "translate(-50%, -50%) translate(" + (dx * -20) + "px, " + (dy * -20) + "px)";
    });
    document.querySelectorAll(".w-primary, .w-ghost, .w-google").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + (x * 0.25) + "px, " + (y * 0.25) + "px)";
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
    const title = document.querySelector(".w-word");
    if (title) {
      document.addEventListener("mousemove", (e) => {
        if (!document.querySelector(".screen.is-active") || document.querySelector(".screen.is-active").id !== "screen-welcome") return;
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
        title.style.transform = "perspective(900px) rotateY(" + (dx * 8) + "deg) rotateX(" + (-dy * 8) + "deg)";
      });
    }
    let audioCtx = null;
    function playTick() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "sine";
        o.frequency.value = 880;
        g.gain.value = 0.03;
        o.connect(g); g.connect(audioCtx.destination);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
        o.stop(audioCtx.currentTime + 0.09);
      } catch (e) {}
    }
    document.querySelectorAll(".w-primary, .w-ghost, .w-ticker span, .welcome-side").forEach((el) => {
      el.addEventListener("mouseenter", playTick);
    });
  }

  // MCQ test wiring
  const mcqNavBtn = $("#mcqNavBtn");
  if (mcqNavBtn) mcqNavBtn.addEventListener("click", () => { renderHome(); show("mcq"); });
  const mcqForm = $("#mcqForm");
  if (mcqForm) mcqForm.addEventListener("submit", (e) => { e.preventDefault(); mcqStart(); });
  const mcqBack = $("#mcqBack");
  if (mcqBack) mcqBack.addEventListener("click", () => { renderHome(); show("home"); });
  const mcqRetry = $("#mcqRetry");
  if (mcqRetry) mcqRetry.addEventListener("click", mcqReset);
  const mcqHome = $("#mcqHome");
  if (mcqHome) mcqHome.addEventListener("click", () => { renderHome(); show("home"); });
  const mcqPrint = $("#mcqPrint");
  if (mcqPrint) mcqPrint.addEventListener("click", () => window.print());


  //   renderGraph();
  initReveals();

  // MCQ test wiring
  initSupabase()
    .then((status) => {
      if (status === "onboard") {
        if (state.googleName) $("#onName").value = state.googleName;
        show("onboard");
        toast("Signed in with Google. Finish your profile.");
        return;
      }
      if (state.profile) {
        renderHome();
        show("home");
      } else {
        show("welcome");
      }
    })
    .catch((err) => {
      console.warn("Cloud login check failed:", err);
      if (state.profile) {
        renderHome();
        show("home");
      } else {
        show("welcome");
      }
    });
}

function initReveals() {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  $$("#screen-home .section, #screen-home .graph").forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    buildPlan,
    planMinutes,
    streakCount,
    bulletsFor,
    iso,
    splitSections,
    buildLiveTopic,
    hasSupabaseConfig,
    profileRowFromState,
    profileFromRow
  };
} else if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
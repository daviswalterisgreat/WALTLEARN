"use strict";
/* Self-check for the content and the study-path planner.
   Run: node selftest.js */

const assert = require("node:assert/strict");
const { TOPICS } = require("./data.js");
const { buildPlan, planMinutes, streakCount, bulletsFor, splitSections, buildLiveTopic, hasSupabaseConfig, profileRowFromState, profileFromRow } = require("./app.js");

let checks = 0;
const ok = (cond, msg) => {
  assert.ok(cond, msg);
  checks++;
};

/* ---- content integrity ---- */
ok(TOPICS.length >= 5, "need a starter library");
ok(new Set(TOPICS.map((t) => t.id)).size === TOPICS.length, "topic ids must be unique");

for (const t of TOPICS) {
  ok(!!t.title && !!t.blurb, `topic ${t.id} is incomplete`);
  ok(typeof t.fact === "string" && t.fact.length > 20, `topic ${t.id} needs a real fact`);
  ok(Number.isFinite(t.x) && t.x >= 0 && t.x <= 100, `topic ${t.id} x`);
  ok(Number.isFinite(t.y) && t.y >= 0 && t.y <= 100, `topic ${t.id} y`);
  for (const other of t.links || []) ok(TOPICS.some((x) => x.id === other), `bad link ${other} in ${t.id}`);

  ok(t.lessons.length >= 3, `topic ${t.id} needs at least 3 lessons`);
  for (const lesson of t.lessons) {
    ok(lesson.mins > 0, `lesson time in ${t.id}`);
    ok(
      lesson.deep && lesson.deep.en.length === 3 && lesson.deep.hi.length === 3,
      `3 deep steps in ${t.id}/${lesson.title}`
    );
    ok(
      lesson.master && lesson.master.en.length === 1 && lesson.master.hi.length === 1,
      `case step in ${t.id}/${lesson.title}`
    );
    for (const lang of ["en", "hi"]) {
      ok(lesson.bullets[lang] && lesson.bullets[lang].length >= 3, `bullets ${lang} in ${t.id}/${lesson.title}`);
      ok(lesson.note[lang] && lesson.note[lang].length > 20, `note ${lang} in ${t.id}/${lesson.title}`);
      ok(lesson.quiz.q[lang], `quiz question ${lang} in ${t.id}/${lesson.title}`);
      const opts = lesson.quiz.options[lang];
      ok(opts && opts.length === 3, `3 options ${lang} in ${t.id}/${lesson.title}`);
      ok(lesson.quiz.answer >= 0 && lesson.quiz.answer < opts.length, `answer index in ${t.id}/${lesson.title}`);
      ok(lesson.quiz.why[lang], `explanation ${lang} in ${t.id}/${lesson.title}`);
    }
  }
}

/* ---- planner ---- */
for (const t of TOPICS) {
  for (const hours of [1, 2, 3, 5, 8]) {
    const plan = buildPlan(t, hours);
    const total = planMinutes(plan);
    ok(total <= hours * 60, `${t.id} ${hours}h over budget: ${total}`);
    ok(total > hours * 60 - 21, `${t.id} ${hours}h leaves too much unused: ${total}`);
    ok(plan[0].kind === "lesson" && plan[0].lessonIndex === 0, `${t.id} ${hours}h must start with lesson 1`);
    ok(plan[plan.length - 1].kind === "quiz", `${t.id} ${hours}h must end with a test`);
    ok(plan.every((i) => i.mins > 0), `${t.id} ${hours}h has an empty step`);
    ok(plan.every((i) => i.kind !== "lesson" || (i.lessonIndex >= 0 && i.lessonIndex < t.lessons.length)), `${t.id} ${hours}h bad lesson index`);
  }
}

const short = buildPlan(TOPICS[0], 1);
ok(short.filter((i) => i.kind !== "lesson").length <= 1, "1 hour should stay lean");
const long = buildPlan(TOPICS[0], 8);
ok(long.length > 12, "8 hours should have a full path");
ok(long.some((i) => i.kind === "break"), "long sessions should include a break");

/* ---- depth scales with the time budget ---- */
const lessonItem = (hours) => buildPlan(TOPICS[0], hours).find((i) => i.kind === "lesson");
ok(lessonItem(1).depth === "core", "1 hour stays on core steps");
ok(lessonItem(2).depth === "standard", "2 hours unlocks worked examples");
ok(lessonItem(4).depth === "deep", "4 hours unlocks deep dives");
ok(lessonItem(5).depth === "deep", "5 hours keeps the deep tier");
ok(lessonItem(8).depth === "master", "8 hours adds a case study");
ok(
  lessonItem(1).mins < lessonItem(2).mins && lessonItem(2).mins < lessonItem(4).mins,
  "longer paths give each lesson more teaching time"
);
const base = TOPICS[0].lessons[0];
ok(bulletsFor(base, "core").length === 3, "core tier teaches the 3 essentials");
ok(bulletsFor(base, "standard").length === 5, "standard tier adds 2 worked examples");
ok(bulletsFor(base, "deep").length === 6, "deep tier adds all 3 deep dives");
ok(bulletsFor(base, "master").length === 7, "8-hour tier adds the case study");
ok(lessonItem(8).mins === base.mins + 20, "8-hour lessons get case-study time");
ok(bulletsFor(base, "deep").every((s) => s.length > 60), "deep steps carry real explanation");

/* ---- live library: article -> lessons ---- */
const sample = `
Photosynthesis is the process by which plants use sunlight to make food from carbon dioxide and water. It happens mostly in the leaves, inside cells that contain chlorophyll. The process releases oxygen as a by-product, which animals and people breathe. Chlorophyll absorbs red and blue light most strongly, which is why leaves look green to us. Plants store the sugar they make as starch, and animals get it by eating plants or other animals. The overall reaction needs carbon dioxide, water and light, and it produces sugar and oxygen.

== Light reactions ==
The light reactions happen in the thylakoid membranes of the chloroplast. Sunlight excites electrons in chlorophyll, and water is split to replace them. This produces ATP and NADPH, which carry energy to the next stage of the process. The energy from the excited electrons is used to pump protons across the membrane. That proton gradient drives an enzyme that makes ATP, the cell's energy currency. Oxygen is released when water molecules are split, which is the oxygen we breathe.

== Calvin cycle ==
The Calvin cycle uses ATP and NADPH to fix carbon dioxide into sugar. The enzyme RuBisCO grabs carbon dioxide and attaches it to a five-carbon sugar. After several steps the plant has a three-carbon molecule it can turn into glucose. The cycle turns three times to produce one three-carbon molecule, and six times for one glucose. RuBisCO is thought to be the most abundant enzyme on Earth, and it is also quite slow. Some plants use different pathways to avoid losing water, but the core chemistry is the same.
`;

ok(splitSections(sample).length === 3, "article splits into 3 sections");
const live = buildLiveTopic("Photosynthesis", sample, "live-photosynthesis");
ok(live && live.live === true, "live topic builds");
ok(live.lessons.length === 3, "live topic keeps every usable section");
ok(live.lessons.every((l) => l.quiz === null), "live lessons never invent a quiz");
ok(live.lessons.every((l) => l.live === true), "live lessons are marked as sourced");
ok(live.source.startsWith("https://en.wikipedia.org/wiki/"), "live topic links its source");
ok(live.lessons[0].title === "Start here", "lead section becomes the first lesson");
ok(live.lessons.every((l) => l.bullets.en.length === 6 && l.bullets.hi.length === 6), "live lessons keep up to six real sentences");
ok(typeof live.fact === "string" && live.fact.length > 10, "live topic carries a real fact");

const firstLive = live.lessons[0];
ok(bulletsFor(firstLive, "core").length === 3, "1-hour live lesson shows 3 sourced steps");
ok(bulletsFor(firstLive, "standard").length === 4, "2-hour live lesson adds a sourced step");
ok(bulletsFor(firstLive, "deep").length === 5, "4-hour live lesson adds more source");
ok(bulletsFor(firstLive, "master").length === 6, "8-hour live lesson uses all sourced steps");
const live8 = buildPlan(live, 8).find((i) => i.kind === "lesson");
ok(live8.live === true && live8.depth === "master", "8-hour live path scales from the real article");
ok(live8.mins > firstLive.mins, "live lesson time grows with more sentences");

const livePlan = buildPlan(live, 2);
ok(planMinutes(livePlan) <= 120, "live path fits the time budget");
ok(livePlan[livePlan.length - 1].kind === "recall", "live path ends with a teach-back, not a quiz");
ok(buildLiveTopic("Tiny", "== Empty ==\nToo short.", "x") === null, "thin articles are rejected");

/* ---- optional cloud profile mapping ---- */
ok(hasSupabaseConfig({}) === false, "blank config keeps local mode");
ok(hasSupabaseConfig({ url: "", anonKey: "key" }) === false, "missing URL keeps local mode");
ok(hasSupabaseConfig({ url: "https://abc.supabase.co", anonKey: "pub" }) === true, "real config turns cloud login on");
const row = profileRowFromState(
  { name: "A", age: 20, status: "Student", lang: "hi", level: "deep" },
  "uuid-1",
  "9876543210"
);
ok(row.id === "uuid-1" && row.name === "A" && row.age === 20, "profile row keeps id and age");
ok(row.lang === "hi" && row.level === "deep" && row.phone === "9876543210", "profile row keeps language, level and phone");
const back = profileFromRow(row);
ok(back.name === "A" && back.age === 20 && back.lang === "hi" && back.level === "deep", "profile row maps back safely");
const fallbackRow = profileFromRow({ name: "", age: "x", lang: "fr", level: "weird" });
ok(
  fallbackRow.name === "Learner" && fallbackRow.age === 0 && fallbackRow.lang === "en" && fallbackRow.level === "standard",
  "bad cloud rows fall back safely"
);

/* ---- streak ---- */
const d = new Date();
const day = (offset) => {
  const x = new Date(d);
  x.setDate(x.getDate() - offset);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};
ok(streakCount([day(0), day(1), day(2)]) === 3, "streak counts consecutive days");
ok(streakCount([day(1), day(2)]) === 2, "streak survives a day not yet started");
ok(streakCount([]) === 0, "empty streak is 0");

console.log(`All ${checks} checks passed.`);

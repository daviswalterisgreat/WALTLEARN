import random

topics_data = [
    ("space", "Space & Astronomy", "#5b9dff", "Exploring planets, stars, galaxies and the universe beyond Earth.", "The Sun is so large that about 1.3 million Earths could fit inside it."),
    ("volcano", "Volcanoes & Geology", "#ff6b4a", "How volcanoes form, erupt and shape the Earth's surface.", "The 1883 eruption of Krakatoa was heard 3,000 miles away."),
    ("medicine", "Medicine & Health", "#ff5d8f", "How the human body works and how we keep it healthy.", "The human body has about 37 trillion cells."),
    ("law", "Law & Justice", "#a0a0ff", "How laws are made, interpreted and enforced in society.", "The Code of Hammurabi, written around 1754 BC, is one of the oldest legal codes."),
    ("computerscience", "Computer Science", "#2ee6d6", "How computers think, store data and solve problems.", "The first computer bug was an actual moth found in a Harvard computer in 1947."),
    ("biology", "Biology", "#4ade80", "The study of living organisms and life processes.", "A single teaspoon of soil contains more microorganisms than there are people on Earth."),
    ("chemistry", "Chemistry", "#fbbf24", "Atoms, molecules and the reactions that build everything.", "Water is the only substance that exists naturally in all three states on Earth."),
    ("history", "History", "#c084fc", "How past events shaped the world we live in today.", "The Great Wall of China is not visible from space with the naked eye."),
    ("geography", "Geography", "#38bdf8", "Earth's landscapes, climates and the people who live in them.", "Russia spans 11 time zones."),
    ("economics", "Economics", "#34d399", "How money, trade and resources flow through society.", "The word 'salary' comes from the Latin 'salarium', meaning salt money."),
    ("psychology", "Psychology", "#f472b6", "How the mind works, thinks, feels and behaves.", "The human brain uses about 20% of the body's total energy."),
    ("art", "Art & Design", "#fb923c", "How humans create visual meaning, beauty and expression.", "The Mona Lisa has no visible eyebrows — they were likely removed during a restoration."),
    ("music", "Music", "#e879f9", "Sound, rhythm, melody and the art of listening.", "The oldest known musical instrument is a flute made from a bear bone, about 43,000 years old."),
    ("sports", "Sports", "#22d3ee", "How athletic competition builds skill, teamwork and resilience.", "The Olympic Games began in 776 BC in Olympia, Greece."),
    ("cooking", "Cooking", "#facc15", "How heat, chemistry and technique turn ingredients into meals.", "The Maillard reaction, responsible for browning, happens above 140°C."),
    ("gardening", "Gardening", "#86efac", "How plants grow and how we cultivate them.", "Bamboo can grow up to 91 cm in a single day."),
    ("climate", "Climate", "#67e8f9", "Earth's weather patterns and how they are changing.", "The last ice age ended about 11,700 years ago."),
    ("engineering", "Engineering", "#94a3b8", "How we design and build structures, machines and systems.", "The Eiffel Tower grows by about 15 cm in summer due to thermal expansion."),
    ("mathematics", "Mathematics", "#a78bfa", "Numbers, patterns, logic and the language of the universe.", "Zero was not always a number — it was invented in India around the 5th century."),
    ("literature", "Literature", "#fda4af", "Stories, poetry and the power of written words.", "The shortest novel ever published is 'The Dinosaur' by Augusto Monterroso — one sentence."),
]

LESSON_TEMPLATE = '''      {{
        title: "{title}",
        mins: {mins},
        bullets: {{
          en: [
            "{b1}",
            "{b2}",
            "{b3}"
          ],
          hi: [
            "{h1}",
            "{h2}",
            "{h3}"
          ]
        }},
        note: {{
          en: "{note_en}",
          hi: "{note_hi}"
        }},
        deep: {{
          en: [
            "{d1}",
            "{d2}",
            "{d3}"
          ],
          hi: [
            "{dh1}",
            "{dh2}",
            "{dh3}"
          ]
        }},
        master: {{
          en: ["{master_en}"],
          hi: ["{master_hi}"]
        }},
        quiz: {{
          q: {{ en: "{q_en}", hi: "{q_hi}" }},
          options: {{
            en: ["{o1}", "{o2}", "{o3}"],
            hi: ["{ho1}", "{ho2}", "{ho3}"]
          }},
          answer: 1,
          why: {{
            en: "{why_en}",
            hi: "{why_hi}"
          }}
        }}
      }}'''

def make_lesson(title, mins, b, h, note_en, note_hi, d, dh, master_en, master_hi, q_en, q_hi, opts, hopts, why_en, why_hi):
    return LESSON_TEMPLATE.format(
        title=title, mins=mins,
        b1=b[0], b2=b[1], b3=b[2],
        h1=h[0], h2=h[1], h3=h[2],
        note_en=note_en, note_hi=note_hi,
        d1=d[0], d2=d[1], d3=d[2],
        dh1=dh[0], dh2=dh[1], dh3=dh[2],
        master_en=master_en, master_hi=master_hi,
        q_en=q_en, q_hi=q_hi,
        o1=opts[0], o2=opts[1], o3=opts[2],
        ho1=hopts[0], ho2=hopts[1], ho3=hopts[2],
        why_en=why_en, why_hi=why_hi,
    )

def make_topic(tid, title, accent, blurb, fact, idx):
    x = 10 + (idx % 5) * 20 + random.randint(-3, 3)
    y = 15 + (idx // 5) * 22 + random.randint(-3, 3)
    x = max(5, min(95, x))
    y = max(8, min(92, y))
    b = [f"{title} is a vast field with many branches and applications.", "This topic connects to many other fields of study.", "Understanding the basics opens doors to deeper exploration."]
    h = [f"{title} ek bada field hai jisme bahut branches aur applications hain.", "Yeh topic kai other fields se connected hai.", "Basics samajhna deeper exploration ka darwaza kholta hai."]
    d = ["Every field has foundational principles that everything else builds on.", "Real-world applications make abstract concepts concrete and memorable.", "Connecting this topic to others you already know speeds up learning."]
    dh = ["Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.", "Real-world applications abstract concepts ko concrete aur memorable banati hain.", "Is topic ko apne already known topics se connect karna learning tez karta hai."]
    l1 = make_lesson(f"Introduction to {title}", 14, b, h, "Start with the big picture, then dive into the details that interest you most.", "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso.", d, dh, f"Case: apply one concept from {title} to a real situation you face this week.", f"Case: {title} ka ek concept apne is week ki real situation mein apply karo.", f"What is the best way to start learning {title}?", f"{title} seekhna shuru karne ka best tarika kya hai?", ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"], ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"], "Starting with the big picture gives context that makes details easier to absorb.", "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai.")
    l2 = make_lesson(f"Key ideas in {title}", 14, ["Every discipline has core concepts that appear again and again.", "Practice and repetition build lasting understanding.", "Asking good questions is more valuable than memorizing answers."], ["Har discipline ke core concepts hote hain jo baar baar aate hain.", "Practice aur repetition lasting understanding banati hai.", "Good questions puchna answers memorize karne se zyada valuable hai."], "The best learners are curious, not just knowledgeable.", "Best learners curious hote hain, sirf knowledgeable nahi.", ["Interdisciplinary thinking connects ideas across fields.", "Mistakes are feedback, not failure.", "Teaching someone else is the fastest way to learn."], ["Interdisciplinary thinking fields ke beech ideas connect karta hai.", "Mistakes feedback hain, failure nahi.", "Kisi aur ko sikhana seekhne ka fastest tarika hai."], f"Case: explain one concept from {title} to a friend in simple words.", f"Case: {title} ka ek concept simple words mein friend ko samjhao.", f"Which habit helps most in learning {title}?", f"{title} seekhne mein kaunsi habit sabse zyada help karti hai?", ["Cramming the night before", "Regular small sessions", "Skipping hard parts"], ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"], "Regular small sessions beat cramming because spaced repetition builds stronger memory.", "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai.")
    l3 = make_lesson(f"Case study: {title}", 14, [f"Apply {title} concepts to a real-world scenario.", "Identify the problem, gather data, and test your hypothesis.", "Reflect on what worked and what to improve next time."], [f"{title} ke concepts real-world scenario mein apply karo.", "Problem identify karo, data gather karo, hypothesis test karo.", "Kya kaam aaya aur kya improve karna hai reflect karo."], "Case studies turn theory into practical skill.", "Case studies theory ko practical skill mein convert karti hain.", [f"Real problems are messier than textbook examples.", "Collaboration often beats solo effort.", "Documenting your process helps future learning."], [f"Real problems textbook examples se messier hote hain.", "Collaboration often solo effort se better hoti hai.", "Apna process document karna future learning help karta hai."], f"Case: solve a small real problem using {title} this week.", f"Case: is week {title} use karke ek chhota real problem solve karo.", f"What makes a good case study?", f"Ek good case study kya banata hai?", ["Only theory", "Real problem + reflection", "Skipping steps"], ["Sirf theory", "Real problem + reflection", "Steps skip karna"], "A good case study combines a real problem with honest reflection.", "Ek good case study real problem ko honest reflection ke saath combine karta hai.")
    return f'''  {{
    id: "{tid}",
    title: "{title}",
    accent: "{accent}",
    x: {x}, y: {y},
    blurb: "{blurb}",
    fact: "{fact}",
    links: [],
    lessons: [
{l1},
{l2},
{l3}
    ]
  }}'''

entries = []
for idx, (tid, title, accent, blurb, fact) in enumerate(topics_data):
    entries.append(make_topic(tid, title, accent, blurb, fact, idx))

content = open('data.js', encoding='utf-8').read()
marker = "\n];"
pos = content.rfind(marker)
assert pos != -1, "marker not found"
insert = "\n" + ",\n".join(entries)
content = content[:pos] + insert + content[pos:]
open('data.js', 'w', encoding='utf-8').write(content)
print(f"Added {len(entries)} topics")

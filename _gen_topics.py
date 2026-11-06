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

def make_topic(tid, title, accent, blurb, fact, idx):
    x = 10 + (idx % 5) * 20 + random.randint(-3, 3)
    y = 15 + (idx // 5) * 22 + random.randint(-3, 3)
    x = max(5, min(95, x))
    y = max(8, min(92, y))
    en_bullet = f"{title} is a vast field with many branches and applications."
    hi_bullet = f"{title} ek bada field hai jisme bahut branches aur applications hain."
    return f'''  {{
    id: "{tid}",
    title: "{title}",
    accent: "{accent}",
    x: {x}, y: {y},
    blurb: "{blurb}",
    fact: "{fact}",
    links: [],
    lessons: [
      {{
        title: "Introduction to {title}",
        mins: 10,
        bullets: {{
          en: [
            "{blurb}",
            "This topic connects to many other fields of study.",
            "Understanding the basics opens doors to deeper exploration."
          ],
          hi: [
            "{blurb}",
            "Yeh topic kai other fields se connected hai.",
            "Basics samajhna deeper exploration ka darwaza kholta hai."
          ]
        }},
        note: {{
          en: "Start with the big picture, then dive into the details that interest you most.",
          hi: "Bade picture se shuru karo, phir jo details pasand aaye unmein ghuso."
        }},
        deep: {{
          en: [
            "Every field has foundational principles that everything else builds on.",
            "Real-world applications make abstract concepts concrete and memorable.",
            "Connecting this topic to others you already know speeds up learning."
          ],
          hi: [
            "Har field ki foundational principles hoti hain jinpar sab kuch build hota hai.",
            "Real-world applications abstract concepts ko concrete aur memorable banati hain.",
            "Is topic ko apne already known topics se connect karna learning tez karta hai."
          ]
        }},
        master: {{
          en: ["Case: apply one concept from this topic to a real situation you face this week."],
          hi: ["Case: is topic ka ek concept apne is week ki real situation mein apply karo."]
        }},
        quiz: {{
          q: {{ en: "What is the best way to start learning {title}?", hi: "{title} seekhna shuru karne ka best tarika kya hai?" }},
          options: {{
            en: ["Memorize everything first", "Start with the big picture", "Skip to advanced topics"],
            hi: ["Pehle sab memorize karo", "Bade picture se shuru karo", "Advanced topics pe jump karo"]
          }},
          answer: 1,
          why: {{
            en: "Starting with the big picture gives context that makes details easier to absorb.",
            hi: "Bade picture se shuru karna context deta hai jo details absorb karna aasaan banata hai."
          }}
        }}
      }},
      {{
        title: "Key ideas in {title}",
        mins: 12,
        bullets: {{
          en: [
            "Every discipline has core concepts that appear again and again.",
            "Practice and repetition build lasting understanding.",
            "Asking good questions is more valuable than memorizing answers."
          ],
          hi: [
            "Har discipline ke core concepts hote hain jo baar baar aate hain.",
            "Practice aur repetition lasting understanding banati hai.",
            "Good questions puchna answers memorize karne se zyada valuable hai."
          ]
        }},
        note: {{
          en: "The best learners are curious, not just knowledgeable.",
          hi: "Best learners curious hote hain, sirf knowledgeable nahi."
        }},
        deep: {{
          en: [
            "Interdisciplinary thinking connects ideas across fields.",
            "Mistakes are feedback, not failure.",
            "Teaching someone else is the fastest way to learn."
          ],
          hi: [
            "Interdisciplinary thinking fields ke beech ideas connect karta hai.",
            "Mistakes feedback hain, failure nahi.",
            "Kisi aur ko sikhana seekhne ka fastest tarika hai."
          ]
        }},
        master: {{
          en: ["Case: explain one concept from this topic to a friend in simple words."],
          hi: ["Case: is topic ka ek concept simple words mein friend ko samjhao."]
        }},
        quiz: {{
          q: {{ en: "Which habit helps most in learning any topic?", hi: "Koi bhi topic seekhne mein kaunsi habit sabse zyada help karti hai?" }},
          options: {{
            en: ["Cramming the night before", "Regular small sessions", "Skipping hard parts"],
            hi: ["Raat ko cramming", "Regular chhote sessions", "Hard parts skip karna"]
          }},
          answer: 1,
          why: {{
            en: "Regular small sessions beat cramming because spaced repetition builds stronger memory.",
            hi: "Regular chhote sessions cramming se better hain because spaced repetition strong memory banati hai."
          }}
        }}
      }}
    ]
  }},'''

entries = []
for idx, (tid, title, accent, blurb, fact) in enumerate(topics_data):
    entries.append(make_topic(tid, title, accent, blurb, fact, idx))

# Read data.js
content = open('data.js', encoding='utf-8').read()
# Find the closing of TOPICS array: the last "];" 
# Insert before the final "];"
marker = "\n];"
# Find last occurrence
pos = content.rfind(marker)
assert pos != -1, "marker not found"
insert = ",\n" + ",\n".join(entries)
content = content[:pos] + insert + content[pos:]
open('data.js', 'w', encoding='utf-8').write(content)
print(f"Added {len(entries)} topics")

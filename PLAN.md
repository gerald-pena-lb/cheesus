# Faith Quest — Project Plan

> A fun, rewarding Bible-learning app for an 11-year-old, focused on the
> Catholic faith: the New Testament with highlights of the Old Testament.
> Tablet-first. Parent-approved real-world rewards.

*(Working name — "Faith Quest." Other ideas: "Grace Trail," "Light of the
World," "Disciples," or let your daughter name it herself — that's a nice
first bit of ownership for her.)*

---

## 1. The vision in one paragraph

Your daughter opens the app on her iPad and sees a colorful "journey map."
Each stop is a short, illustrated Bible story she can read (and sometimes
watch a short safe video for). After each story she answers a few friendly
quiz questions. Right answers and finished lessons earn **Grace Points**.
Daily use builds a **streak**, and milestones unlock **badges** she can
collect. She spends her Grace Points in a **Reward Store** on real-world
treats *you* have set up — and when she "buys" one, **you get a request to
approve it** and deliver it in real life. The whole thing is bright,
encouraging, age-appropriate, and never scary or preachy.

---

## 2. Who it's for & design principles

- **Player:** an 11-year-old who is new to the Catholic faith.
- **Parent (you):** sets up rewards, approves redemptions, can see progress.

Design rules we'll follow:
- **Tablet-first, touch-friendly.** Big tap targets, large readable text,
  minimal typing.
- **Encouraging, never punishing.** Wrong answers gently explain the right
  one; no "you failed" screens. She can always retry.
- **Age-appropriate Catholic content.** Warm, simple, faithful to Catholic
  understanding (e.g. respectful of Mary and the saints, the 7-book "deutero-
  canonical" Old Testament where relevant). Stories chosen for an 11-year-old —
  we skip the violent/adult detail.
- **Short sessions.** A lesson + quiz is ~5 minutes, so it fits a school night.
- **Visually rich.** Every lesson has art; many have a short video.
- **Private & offline-friendly.** Her data stays on the device; no accounts,
  no ads, no data collection. (More in §8.)

---

## 3. How it's built (recommended technical approach)

**A Progressive Web App (PWA).**

- It's a website that you "Add to Home Screen" on the iPad. After that it
  opens **full-screen like a real app**, with its own icon, and works
  **offline**. No App Store, no $99/yr Apple developer fee, no review delays.
- Built with a modern, maintainable stack: **React + Vite + Tailwind CSS**.
  This gives us a polished, animated, responsive interface fairly quickly.
- **All progress saved on the device** (Grace Points, streaks, badges, reward
  requests) using the browser's local storage. For the first version this
  means **no server and no running costs at all**.
- **Parent Zone** is a PIN-protected section in the same app where you manage
  rewards and approve redemptions. For v1 this works entirely on the one iPad —
  simple and private.

**Why not a native iPhone/Android app?** More cost, more friction, slower to
build, and no real benefit here. A PWA looks and feels native for this use.

**Later, if you want it on multiple devices** (e.g. she uses the iPad but you
approve from your phone), we add a small cloud backend so progress and reward
requests sync. That's a clean upgrade we design for now but don't build yet.

---

## 4. Core features

### The Journey (learning)
- A visual map/path of **lessons grouped into chapters** (see §5).
- Each **lesson** = a title, an illustration, 2–4 short "story cards" of
  simple text, an optional embedded short video, and a memorable "Golden
  Verse."
- After the story: a **quiz** of 3–5 multiple-choice questions with friendly
  feedback.

### Rewards & motivation
- **Grace Points** earned for finishing a lesson, each correct answer, and a
  perfect-quiz bonus.
- **Daily streak** with a small bonus for showing up; gentle, never guilt-y.
- **Badges** for milestones ("Finished the Parables," "7-day streak,"
  "Knows the 12 Apostles").
- **Reward Store**: a grid of rewards *you* define, each with a Grace-Point
  price and a picture.

### Parent-approved redemption flow
1. She taps a reward she can afford → "Request this reward."
2. Points are held; the request appears in **Parent Zone → Pending**.
3. You approve (points spent) or decline (points returned), optionally with a
   note ("Saturday after lunch!").
4. Approved rewards show in her "My Rewards" list so she remembers what's
   coming.

### Parent Zone (PIN-protected)
- Add / edit / remove rewards and their prices and images.
- Approve / decline redemption requests.
- See her progress (lessons done, points, streak, badges).
- Adjust difficulty or reset if needed.

---

## 5. Content plan

**Scope you asked for:** mainly **New Testament**, plus **Old Testament
highlights**. Proposed chapters for the first version:

**Old Testament Highlights**
1. Creation & the Garden
2. Noah and the Ark
3. Abraham's promise
4. Moses & the Exodus (burning bush, Red Sea, Ten Commandments)
5. David and Goliath
6. Daniel in the lions' den
7. The prophets point to a Savior (intro to Christmas)

**New Testament — the heart of it**
8. The Annunciation & Christmas (Mary, the angel Gabriel, the Nativity)
9. John the Baptist & Jesus' baptism
10. Jesus calls the 12 Apostles
11. Miracles (water into wine, calming the storm, feeding the 5,000)
12. Parables (Good Samaritan, Prodigal Son, the Sower, Lost Sheep)
13. The Beatitudes & the Our Father
14. Holy Week: Palm Sunday → Last Supper → the Cross
15. **Easter** — the Resurrection
16. The Ascension & Pentecost (the Holy Spirit, birth of the Church)
17. The early Church & St. Paul

**Plus light Catholic "faith basics" woven in:** the Sign of the Cross, who
Mary is, what the Mass remembers, a few key saints. Kept gentle and optional.

**For the prototype** I'd fully build **3–4 lessons end to end** (likely David
& Goliath, the Nativity, the Good Samaritan, and Easter) so you can both
experience the complete loop — then we mass-produce the rest using that
template.

**Content sourcing & accuracy:** I'll write the lesson text in kid-friendly
language. Because faithfulness matters to you, I'd suggest **you (or your
parish/a priest) review the text** before she uses it. We can also align it
with a known Catholic children's resource if you have a favorite.

---

## 6. Images & video (the "visually appealing" part)

To keep this legal, safe, and reliable we **won't hot-link random web images**.
Instead:

- **Art:** classic religious paintings that are **public domain** (e.g. via
  Wikimedia Commons) and **free illustration libraries**. These look beautiful
  and we're allowed to use them. We download and bundle them so they always
  load, even offline.
- **Video:** **curated, pre-watched YouTube links** embedded in lessons —
  short, kid-safe clips (e.g. reputable Catholic/children's Bible channels).
  Every video is one we've checked first, not an open search box. Embeds use
  YouTube's privacy-friendly mode and we can disable "related videos."
- You'll be able to swap any image or video later from a simple list.

I'll prepare a **media shortlist for your approval** before embedding anything.

---

## 7. Data we store (all on-device for v1)

- Profile: her name/avatar, total Grace Points, current streak, last-played date.
- Progress: which lessons completed, quiz scores, badges earned.
- Rewards: the reward catalog you define; redemption requests and their status.
- Parent PIN (stored only on the device).

No personal data leaves the iPad in v1.

---

## 8. Safety, privacy & "parent peace of mind"

- **No accounts, no sign-up, no email, no ads, no analytics, no tracking.**
- **No open internet browsing** inside the app — only the specific lessons,
  images, and videos we put in.
- Videos are a fixed, vetted list; no autoplay into "recommended" content.
- Parent Zone is **PIN-locked** so she can't approve her own rewards or change
  prices.
- Everything stays on the device unless you later choose cloud sync.

---

## 9. Build roadmap (phased)

**Phase 1 — Prototype (the loop works):**
App shell + journey map + 3–4 complete lessons with art + quizzes + Grace
Points + a basic Reward Store + Parent Zone with PIN, reward editing, and the
approve/decline flow. Installable on the iPad. *Goal: she can actually play it.*

**Phase 2 — Content & polish:**
Fill in the rest of the chapters, add videos, add badges & streak animations,
sound effects, nicer transitions, an avatar she can customize.

**Phase 3 — Optional upgrades:**
Cloud sync (approve from your phone), more reward types, printable
"certificates," seasonal themes (Advent/Lent/Easter).

---

## 10. What I need from you to proceed

1. **App name** — keep "Faith Quest," pick another, or let her name it.
2. **The reward list to start** — 4–6 real-world rewards and roughly what each
   should "cost" (e.g. ice cream = 50, movie night = 200, $5 = 300). I'll seed
   these; you can change them anytime in Parent Zone.
3. **Content review preference** — happy for me to draft lesson text for your
   review, or do you have a specific Catholic children's source you'd like me
   to follow?
4. **Any "house rules"** — a points target you have in mind per day, or
   anything you specifically want her to learn first.

Once you're happy with this plan, I'll build the **Phase 1 prototype** and you
can both try it on the iPad the same day.

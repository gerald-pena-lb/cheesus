# 🧀 Cheesus — A Faith Adventure

A fun, rewarding Bible-learning app for kids, focused on the Catholic faith:
the New Testament with highlights of the Old Testament, Mother Mary, the
saints, and the Church today. Tablet-first. Earns **Philippine Pesos (₱)** that
can be exchanged for **parent-approved real-world rewards**.

> Built as a no-build, offline-capable web app (PWA). No accounts, no ads, no
> tracking. See `PLAN.md` for the full design.

---

## ▶️ How to run it (try it today)

It's just files — no installation, no build step.

**Easiest (on a computer):**
1. Open the project folder.
2. Because browsers restrict some features on `file://`, run a tiny local
   server. With Python installed:
   ```bash
   cd cheesus
   python3 -m http.server 8000
   ```
3. Open **http://localhost:8000** in a browser.

**On the iPad (recommended for your daughter):**
- Host the folder for free (see *Deploy* below), open the link in **Safari**,
  then tap **Share → Add to Home Screen**. It installs an icon and opens
  full-screen like a real app, and works **offline** afterward.

---

## 🚀 Deploy it for free (so it has a real link)

Any static host works. Two no-cost options:

- **Netlify Drop** — go to https://app.netlify.com/drop and drag the `cheesus`
  folder in. You get a link instantly.
- **GitHub Pages** — push this repo, then Settings → Pages → deploy from the
  branch. Your app appears at `https://<you>.github.io/cheesus/`.

---

## 👪 Parent Zone

Tap the **👪** button (top-right). Default PIN is **`1234`** — change it inside.
From there you can:
- **Approve / decline** reward requests (declined → pesos are returned).
- **Add / remove rewards** and set their peso prices.
- **Set lesson videos** — paste a YouTube Kids link per lesson.
- See her progress (pesos, weekly goal, lessons, streak).

---

## 🪙 How the rewards work

- A perfect lesson earns **₱100** (₱25 finish + ₱15 × 4 correct + ₱15 perfect).
- Three good lessons a week ≈ the **₱300 weekly goal** shown on the home screen.
- Small **daily streak bonus** for showing up.
- She spends pesos in the **Reward Store** → request goes to **you** → you
  approve and deliver the real-world treat.

Tune any of these numbers in `js/data.js` (the `ECONOMY` block).

---

## 📺 Videos (YouTube Kids only)

Each lesson has a **"Watch on YouTube Kids"** link that opens in a new tab —
it never embeds the open YouTube. By default it opens a YouTube Kids search for
the topic (kid-safe). For an exact video, open it in YouTube Kids, copy the
link, and paste it in **Parent Zone → Set lesson videos**.

---

## 📚 Adding more lessons (no coding needed beyond copy/paste)

Everything content-related lives in **`js/data.js`**:
- `WEEKS` — the full **40-week** map. Each lesson has `built: true/false`.
- `LESSONS` — the actual story + quiz for each built lesson.

To turn a "Coming soon" lesson into a real one:
1. Add an entry in `LESSONS` using the lesson's `id` (copy an existing lesson
   as a template — story `reads`, a `verse`, and a `quiz`).
2. Change that lesson's `built:false` to `built:true` in `WEEKS`.

~9 lessons are fully written as a starter set (all of Week 1, plus the
Annunciation, the Nativity, the Good Samaritan, Easter, St. Francis, and the
modern popes). The other 31 weeks are mapped and ready to fill in.

> **Please review the lesson text** (you, or your parish/a priest). It's
> written to be kid-friendly and faithful to Catholic teaching, but a quick
> check gives peace of mind — especially the "Popes of Our Time" facts.

---

## ☁️ Optional: cloud sync (approve from your own phone)

Off by default — the app works fully on one device. To let your daughter earn
on the iPad while **you approve rewards from your phone in real time**:

1. Create a free project at https://supabase.com
2. In the SQL editor, run **`supabase/schema.sql`**.
3. Project Settings → API: copy the **Project URL** and the **anon public** key.
4. Paste them into **`js/config.js`**, and choose a private `FAMILY_CODE`.
5. Use the same three values on both devices.

Both devices then share one synced profile, keyed by your secret family code.

---

## 🗂️ Project layout

```
index.html              app shell
css/styles.css          all styling
js/data.js              CONTENT — curriculum, lessons, rewards, economy
js/app.js               app logic (navigation, quizzes, pesos, parent zone)
js/config.js            optional Supabase keys (blank = on-device)
js/sync.js              optional cloud sync
manifest.webmanifest    PWA install info
sw.js                   offline service worker
icon.svg                app icon
supabase/schema.sql     database setup for cloud sync
PLAN.md                 full project plan
```

# 🚀 Put Cheesus online with Vercel + Supabase

No terminal needed — everything below is done in your web browser.
You can do **Part 1 first** and the app will already be live (on-device mode).
Add **Part 2 + 3** whenever you want cross-device sync (approve from your phone).

---

## Part 1 — Go live on Vercel (~5 minutes)

1. Go to **https://vercel.com** and **Sign up / Log in with GitHub**
   (use the account that owns `gerald-pena-lb/cheesus`).
2. Click **Add New… → Project**.
3. Find **`cheesus`** in the list and click **Import**.
4. On the configure screen:
   - **Framework Preset:** choose **Other** (this is a plain static site).
   - **Build Command:** leave empty.
   - **Output Directory:** leave empty / default.
   - Don't add any environment variables.
5. Click **Deploy**. After a few seconds you'll get a live link like
   `https://cheesus-xxxx.vercel.app` — that's your app! 🎉

### ⚠️ One thing about branches
Right now the app lives on the branch **`claude/zen-hawking-98fjpz`**, not
`main`. Two easy options:
- **Quickest:** In Vercel → your project → **Settings → Git → Production
  Branch**, set it to `claude/zen-hawking-98fjpz` and redeploy.
- **Cleaner long-term:** Merge that branch into `main` on GitHub (I can open a
  pull request for you if you ask), then Vercel deploys `main` automatically.

### 📲 Add it to the iPad
Open the Vercel link in **Safari** on the iPad → tap **Share** →
**Add to Home Screen**. It installs an icon and opens full-screen like an app.

---

## Part 2 — Create the Supabase backend (~5 minutes)

1. Go to **https://supabase.com** → **Start your project** / log in.
2. **New project.** Give it a name (e.g. `cheesus`), set a database password
   (save it somewhere), and pick a **region close to the Philippines**
   (e.g. *Southeast Asia (Singapore)*). Create it.
3. When it's ready, open the **SQL Editor** (left sidebar) → **New query**.
4. Open the file **`supabase/schema.sql`** from this repo, copy everything,
   paste it into the query box, and click **Run**. You should see "Success".
5. Go to **Project Settings → API** and copy two things:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - **anon public** key (a long string)

---

## Part 3 — Connect the app to Supabase

You only need to fill in three values in **`js/config.js`**:

```js
window.CHEESUS_CONFIG = {
  SUPABASE_URL: "https://abcdxyz.supabase.co",   // your Project URL
  SUPABASE_ANON_KEY: "eyJhbGciOi...",            // your anon public key
  FAMILY_CODE: "pena-family-2026",               // any secret word you choose
};
```

Two ways to do it:

- **Let me do it:** paste me your Project URL + anon public key + a family code
  in chat and I'll commit it for you. *(The anon key is meant to be public and
  is safe to share — access is protected by Row-Level Security plus your secret
  family code.)*
- **Do it yourself on GitHub:** open `js/config.js` on github.com → click the
  **pencil ✏️** → paste your values → **Commit changes**.

Either way, **Vercel automatically redeploys** within a few seconds. Now open
the same link on the **iPad** and on **your phone** using the **same family
code** — she earns on the iPad, and reward requests pop up for you to approve
on your phone, live. ☁️

---

## 🔄 How updates work from now on
Every time a change is committed to the deployed branch, **Vercel rebuilds and
publishes it automatically** — no terminal, no manual upload. So when I add
more lessons, they'll appear on your live link on their own.

## 💸 Cost
Both Vercel (Hobby) and Supabase (Free) have free tiers that are *far* more than
this app will ever use. Expected cost: **$0**.

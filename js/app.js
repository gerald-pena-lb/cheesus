/* ==========================================================================
   Anima Christi — application logic
   ========================================================================== */
(function () {
  "use strict";
  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");

  /* -------------------- state & storage -------------------- */
  const KEY = "cheesus_state_v1";
  const DEFAULT_STATE = () => ({
    name: "",
    buddy: "",              // saint buddy id
    pesos: 0,
    streak: { count: 0, last: "" },
    week: { key: "", earned: 0 },
    completed: {},          // lessonId -> { correct, total }
    badges: [],             // badge ids
    rewards: clone(REWARDS),
    requests: [],           // { id, rewardId, emoji, name, cost, status, when, note }
    videos: {},             // lessonId -> overridden YouTube Kids url
    parentPin: "1234",
    _updatedAt: 0,
  });
  let state = load();

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(DEFAULT_STATE(), JSON.parse(raw));
    } catch (e) {}
    return DEFAULT_STATE();
  }
  function save(sync = true) {
    state._updatedAt = Date.now();
    localStorage.setItem(KEY, JSON.stringify(state));
    if (sync && window.Sync) Sync.push(state);
  }

  /* -------------------- date helpers -------------------- */
  function todayStr() { const d = new Date(); return d.toISOString().slice(0, 10); }
  function currentWeekKey() {
    // ISO-ish week key: year + week number
    const d = new Date(); const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + week;
  }
  function rollWeek() {
    const wk = currentWeekKey();
    if (state.week.key !== wk) { state.week = { key: wk, earned: 0 }; }
  }
  function daysBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  /* -------------------- economy -------------------- */
  function awardPesos(amount, reason) {
    rollWeek();
    state.pesos += amount;
    state.week.earned += amount;
  }
  function touchStreak() {
    const t = todayStr();
    if (state.streak.last === t) return 0; // already counted today
    let bonus = 0;
    if (state.streak.last && daysBetween(state.streak.last, t) === 1) state.streak.count += 1;
    else state.streak.count = 1;
    state.streak.last = t;
    bonus = ECONOMY.dailyStreakBonus;
    if (state.streak.count >= 3) earnBadge("b_streak3");
    if (state.streak.count >= 7) earnBadge("b_streak7");
    return bonus;
  }
  function earnBadge(id) {
    if (!state.badges.includes(id)) { state.badges.push(id); return true; }
    return false;
  }

  /* -------------------- lesson lookups -------------------- */
  function weekOfLesson(id) { return WEEKS.find(w => w.lessons.some(l => l.id === id)); }
  function lessonMeta(id) {
    for (const w of WEEKS) { const l = w.lessons.find(x => x.id === id); if (l) return l; }
    return null;
  }
  function videoUrl(id) { return state.videos[id] || (LESSONS[id] && LESSONS[id].video) || ""; }
  function buddyCheer() {
    const s = getSaint(state.buddy); const c = s.cheers || ["Great job!"];
    return c[Math.floor(Math.random() * c.length)];
  }

  /* -------------------- navigation -------------------- */
  let view = { name: "home", data: null };
  function go(name, data) { view = { name, data }; render(); window.scrollTo(0, 0); }

  /* ============================================================
     RENDER
     ============================================================ */
  function render() {
    rollWeek();
    if (!state.name) return renderWelcome();
    const body = {
      home: renderHome, lesson: renderLesson, quiz: renderQuiz,
      result: renderResult, store: renderStore, badges: renderBadges,
      profile: renderProfile,
    }[view.name] || renderHome;
    app.innerHTML = topbar() + `<div id="screen"></div>`;
    $("#screen").innerHTML = "";
    body();
    bindTop();
  }

  function topbar() {
    const buddy = state.buddy ? `<button class="buddybtn" id="profileBtn" title="My profile">${chibiSVG(state.buddy, 34)}</button>` : "";
    const sIcon = (window.Sound && Sound.isMuted()) ? "🔇" : "🔊";
    return `<div class="topbar">
      ${buddy}
      <div class="brand">Anima&nbsp;Christi</div>
      <div class="spacer"></div>
      <button class="iconbtn" id="soundBtn" title="Sound on/off">${sIcon}</button>
      <div class="coin">${ECONOMY.currencySymbol} ${state.pesos}</div>
      <button class="iconbtn" id="parentBtn" title="Parent Zone">👪</button>
    </div>`;
  }
  function bindTop() {
    const p = $("#parentBtn"); if (p) p.onclick = openParentGate;
    const pr = $("#profileBtn"); if (pr) pr.onclick = () => go("profile");
    const sb = $("#soundBtn"); if (sb) sb.onclick = () => { const m = Sound.toggle(); sb.textContent = m ? "🔇" : "🔊"; };
  }

  /* -------------------- welcome -------------------- */
  function renderWelcome() {
    app.innerHTML = `
      <div class="scene scene-royal" style="margin-top:24px">
        <div class="big">✝️</div>
        <h2>Anima Christi</h2>
        <p style="font-weight:800;opacity:.95">A fun adventure through the Bible — with a saint buddy by your side!</p>
      </div>
      <div class="card">
        <div class="field"><label>What's your name?</label>
          <input id="nm" placeholder="Type your name" maxlength="20"/></div>
        <label class="tiny" style="font-weight:900;font-size:14px;color:var(--purple-d)">Choose your Saint Buddy 😇</label>
        <div class="buddy-grid" id="avs">
          ${SAINTS.map(s => buddyChoice(s)).join("")}
        </div>
        <div id="buddyInfo" class="buddy-info hidden"></div>
        <button class="btn" id="startBtn">Start my journey ✨</button>
      </div>`;
    let picked = "";
    const info = $("#buddyInfo");
    document.querySelectorAll("#avs [data-s]").forEach(b => b.onclick = () => {
      picked = b.dataset.s;
      document.querySelectorAll("#avs [data-s]").forEach(x => x.classList.remove("sel"));
      b.classList.add("sel");
      const s = getSaint(picked);
      if (window.Sound) Sound.buddy(s.motif);
      info.classList.remove("hidden");
      info.innerHTML = `<div class="bi-title">${escapeH(s.full)}</div>
        <div class="bi-sub">“${escapeH(s.title)}”</div>
        <div class="bi-p">${escapeH(s.personality)}</div>`;
    });
    $("#startBtn").onclick = () => {
      const v = $("#nm").value.trim();
      if (!v) { toast("Please type your name first 🙂"); $("#nm").focus(); return; }
      if (!picked) { toast("Pick a saint buddy to join you! 😇"); return; }
      state.name = v; state.buddy = picked; save();
      const s = getSaint(picked);
      go("home"); toast(`${s.name} is now your buddy! ${s.attr}`);
      if (window.Sound) Sound.reward();
    };
  }
  function buddyChoice(s) {
    return `<button class="buddy-choice" data-s="${s.id}">
      ${chibiSVG(s.id, 72)}<div class="bc-name">${escapeH(s.name)}</div></button>`;
  }

  /* -------------------- HOME / journey -------------------- */
  function renderHome() {
    const s = $("#screen");
    const target = ECONOMY.weeklyTarget;
    const earned = state.week.earned;
    const pct = Math.min(100, Math.round((earned / target) * 100));
    const done = earned >= target;

    let units = {}, order = [];
    WEEKS.forEach(w => { if (!units[w.unit]) { units[w.unit] = []; order.push(w.unit); } units[w.unit].push(w); });

    const totalLessons = WEEKS.reduce((n, w) => n + w.lessons.length, 0);
    const doneLessons = Object.keys(state.completed).length;

    s.innerHTML = `
      <div class="goal ${done ? "done" : ""}">
        <div class="row"><h3>This week's goal</h3>
          <div class="small">${ECONOMY.currencySymbol}${earned} / ${target}</div></div>
        <div class="bar"><span style="width:${pct}%"></span></div>
        ${done ? `<div class="cheer">🎉 Goal reached — amazing work this week!</div>`
               : `<div class="small" style="margin-top:8px">Earn ${ECONOMY.currencySymbol}${target - earned} more to hit your goal!</div>`}
      </div>

      <div class="tabs">
        <button class="tab active" id="tabJourney">📖 Journey</button>
        <button class="tab" id="tabStore">🎁 Rewards</button>
        <button class="tab" id="tabBadges">🏅 Badges</button>
      </div>

      <div class="greet">
        <div class="greet-buddy">${chibiSVG(state.buddy, 56)}</div>
        <div class="greet-text">
          <div class="greet-hi">Hi ${escapeH(state.name)}! <span class="streak-mini">🔥 ${state.streak.count}</span></div>
          <div class="greet-cheer">${escapeH(buddyCheer())}</div>
        </div>
      </div>
      <div class="sec-title" style="font-size:16px">📖 Your Journey <span class="tiny">&nbsp;${doneLessons}/${totalLessons} lessons</span></div>
      <div id="journey"></div>
    `;
    $("#tabStore").onclick = () => go("store");
    $("#tabBadges").onclick = () => go("badges");

    const j = $("#journey");
    order.forEach(unit => {
      j.insertAdjacentHTML("beforeend", `<div class="unit-head">${unit}</div>`);
      units[unit].forEach(w => j.insertAdjacentHTML("beforeend", weekCard(w)));
    });
    j.querySelectorAll("[data-lesson]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.lesson;
        if (LESSONS[id]) go("lesson", { id, page: 0 });
        else toast("That lesson is coming soon! ✨");
      };
    });
  }

  function weekCard(w) {
    const doneCount = w.lessons.filter(l => state.completed[l.id]).length;
    const rows = w.lessons.map(l => {
      const isBuilt = !!LESSONS[l.id];
      const isDone = !!state.completed[l.id];
      const cls = isDone ? "done" : (isBuilt ? "" : "locked");
      const right = isDone ? `<span class="dot">✓</span>`
        : isBuilt ? `<span class="earn">+${ECONOMY.currencySymbol}${maxLessonPesos(l.id)}</span>`
                  : `<span class="soon">SOON</span>`;
      const dot = isDone ? `✓` : (isBuilt ? "📖" : "🔒");
      return `<button class="lesson-row ${cls}" data-lesson="${l.id}">
        <span class="dot">${dot}</span><span>${escapeH(l.title)}</span>${isDone ? `<span class="earn" style="margin-left:auto">Done</span>` : right}
      </button>`;
    }).join("");
    return `<div class="week">
      <div class="week-top">
        <div class="week-num">${w.week}</div>
        <div><div class="week-title">${escapeH(w.title)}</div>
        <div class="week-sub">Week ${w.week} • ${w.unit}</div></div>
        <div class="week-progress">${doneCount}/${w.lessons.length}</div>
      </div>
      <div class="lessons">${rows}</div>
    </div>`;
  }
  function maxLessonPesos(id) {
    const L = LESSONS[id]; if (!L) return 0;
    return ECONOMY.lessonComplete + L.quiz.length * ECONOMY.perCorrect + ECONOMY.perfectBonus;
  }

  /* -------------------- LESSON (story cards) -------------------- */
  function renderLesson() {
    const { id, page } = view.data;
    const L = LESSONS[id]; const meta = lessonMeta(id);
    const last = page >= L.reads.length - 1;
    const r = L.reads[page];
    const vurl = videoUrl(id);
    const s = $("#screen");
    s.innerHTML = `
      <button class="backbtn" id="back">← Back</button>
      <div class="scene scene-${L.theme}" style="margin-top:10px">
        <div class="big pop">${L.emoji}</div>
        <h2>${escapeH(meta.title)}</h2>
      </div>
      <div class="card read pop">
        <h3>${escapeH(r.h)}</h3>
        <p>${escapeH(r.p)}</p>
        ${last ? verseBlock(L) : ""}
        ${last && vurl ? `<a class="video-btn" href="${vurl}" target="_blank" rel="noopener">📺 Watch on YouTube Kids</a>
          <div class="video-note">Opens YouTube Kids in a new tab</div>` : ""}
      </div>
      <div class="dots">${L.reads.map((_, i) => `<i class="${i === page ? "on" : ""}"></i>`).join("")}</div>
      <button class="btn ${last ? "green" : ""}" id="next">${last ? "Take the quiz! ✏️" : "Next →"}</button>
    `;
    $("#back").onclick = () => go("home");
    $("#next").onclick = () => {
      if (last) go("quiz", { id, q: 0, correct: 0, answered: false });
      else go("lesson", { id, page: page + 1 });
    };
  }
  function verseBlock(L) {
    return `<div class="verse"><div class="q">“${escapeH(L.verse.text)}”</div>
      <div class="ref">— ${escapeH(L.verse.ref)}</div></div>`;
  }

  /* -------------------- QUIZ -------------------- */
  function renderQuiz() {
    const d = view.data; const L = LESSONS[d.id];
    const Q = L.quiz[d.q];
    const s = $("#screen");
    s.innerHTML = `
      <button class="backbtn" id="back">← Back</button>
      <div class="card">
        <div class="tiny" style="font-weight:900">Question ${d.q + 1} of ${L.quiz.length}</div>
        <div class="q-prompt">${escapeH(Q.q)}</div>
        <div id="opts">${Q.options.map((o, i) => `<button class="opt" data-i="${i}" data-nosound="1">${escapeH(o)}</button>`).join("")}</div>
        <div id="fb"></div>
        <button class="btn green hidden" id="cont">Continue →</button>
      </div>`;
    $("#back").onclick = () => go("home");
    const opts = s.querySelectorAll(".opt");
    opts.forEach(b => b.onclick = () => {
      if (d.answered) return;
      d.answered = true;
      const i = +b.dataset.i;
      const right = i === Q.answer;
      opts.forEach((x, xi) => {
        x.classList.add(xi === Q.answer ? "correct" : (xi === i ? "wrong" : "dim"));
      });
      if (right) d.correct++;
      if (window.Sound) (right ? Sound.correct() : Sound.wrong());
      $("#fb").innerHTML = `<div class="feedback ${right ? "ok" : "no"}">
        ${right ? "✅ Correct! " : "💡 Good try! "} ${escapeH(Q.explain)}</div>`;
      const cont = $("#cont"); cont.classList.remove("hidden");
      cont.textContent = (d.q < L.quiz.length - 1) ? "Next question →" : "See my reward! 🎉";
      cont.onclick = () => {
        if (d.q < L.quiz.length - 1) go("quiz", { ...d, q: d.q + 1, answered: false });
        else finishLesson(d);
      };
    });
  }

  /* -------------------- finish + reward -------------------- */
  function finishLesson(d) {
    const L = LESSONS[d.id];
    const total = L.quiz.length;
    const firstTime = !state.completed[d.id];

    let earned = 0;
    earned += d.correct * ECONOMY.perCorrect;
    if (firstTime) earned += ECONOMY.lessonComplete;
    const perfect = d.correct === total;
    if (perfect) earned += ECONOMY.perfectBonus;
    const streakBonus = touchStreak();
    earned += streakBonus;

    awardPesos(earned);

    // badges
    let newBadges = [];
    if (firstTime && earnBadge("b_first")) newBadges.push("b_first");
    if (perfect && earnBadge("b_perfect")) newBadges.push("b_perfect");
    if (L.badge && earnBadge(L.badge)) newBadges.push(L.badge);
    const wk = weekOfLesson(d.id);
    if (wk && wk.week === 1 && wk.lessons.every(l => l.id === d.id || state.completed[l.id])) {
      if (earnBadge("b_week1")) newBadges.push("b_week1");
    }

    // record best score
    const prev = state.completed[d.id];
    if (!prev || d.correct > prev.correct) state.completed[d.id] = { correct: d.correct, total };

    save();
    go("result", { id: d.id, correct: d.correct, total, earned, perfect, streakBonus, newBadges, cheer: buddyCheer() });
    confetti();
    if (window.Sound) { newBadges.length ? Sound.badge() : Sound.reward(); }
  }

  function renderResult() {
    const d = view.data; const meta = lessonMeta(d.id);
    const s = $("#screen");
    const buddy = getSaint(state.buddy);
    const stars = "⭐".repeat(d.correct) + "▪️".repeat(d.total - d.correct);
    const badgeHtml = d.newBadges.length
      ? `<div class="card center"><div class="tiny" style="font-weight:900">NEW BADGE!</div>
         ${d.newBadges.map(id => { const b = BADGES.find(x => x.id === id); return `<div class="big" style="font-size:48px">${b.emoji}</div><div style="font-weight:900;color:var(--purple-d)">${escapeH(b.name)}</div>`; }).join("")}</div>`
      : "";
    s.innerHTML = `
      <div class="celebrate">
        <div class="big">${d.perfect ? "🏆" : "🎉"}</div>
        <h2>${d.perfect ? "Perfect!" : "Great job!"}</h2>
        <div style="font-size:24px;margin:6px 0">${stars}</div>
        <div class="earn-pill">+ ${ECONOMY.currencySymbol}${d.earned}</div>
        <div class="tiny">You got ${d.correct} of ${d.total} right${d.streakBonus ? ` • +${ECONOMY.currencySymbol}${d.streakBonus} daily streak bonus 🔥` : ""}</div>
      </div>
      <div class="buddy-say">
        ${chibiSVG(state.buddy, 64)}
        <div class="bubble">${escapeH(d.cheer || buddy.cheers[0])}</div>
      </div>
      ${badgeHtml}
      <button class="btn" id="more">Back to my journey 📖</button>
      <button class="btn gold" id="spend">Go to Reward Store 🎁</button>
    `;
    $("#more").onclick = () => go("home");
    $("#spend").onclick = () => go("store");
  }

  /* -------------------- REWARD STORE -------------------- */
  function renderStore() {
    const s = $("#screen");
    const myReq = state.requests.slice().reverse();
    s.innerHTML = `
      <button class="backbtn" id="back">← Back</button>
      <div class="sec-title">🎁 Reward Store <span class="spacer"></span>
        <span class="coin">${ECONOMY.currencySymbol} ${state.pesos}</span></div>
      <div class="grid">
        ${state.rewards.map(r => {
          const can = state.pesos >= r.cost;
          return `<div class="reward ${can ? "" : "cant"}">
            <div class="emoji">${r.emoji}</div>
            <div class="name">${escapeH(r.name)}</div>
            <div class="price">${ECONOMY.currencySymbol}${r.cost}</div>
            <button class="btn" data-buy="${r.id}" ${can ? "" : "disabled"}>${can ? "Get it!" : "Keep earning"}</button>
          </div>`;
        }).join("")}
      </div>
      ${myReq.length ? `<div class="sec-title" style="font-size:17px">My requests</div>
        ${myReq.map(rq => `<div class="chip"><span class="emoji">${rq.emoji}</span>
          <div><div style="font-weight:900">${escapeH(rq.name)}</div>
          <div class="tiny">${ECONOMY.currencySymbol}${rq.cost}${rq.note ? " • " + escapeH(rq.note) : ""}</div></div>
          <span class="status ${rq.status}">${rq.status === "pending" ? "Waiting for parent" : rq.status === "approved" ? "Approved! 🎉" : "Not yet"}</span></div>`).join("")}` : ""}
    `;
    $("#back").onclick = () => go("home");
    s.querySelectorAll("[data-buy]").forEach(b => b.onclick = () => requestReward(b.dataset.buy));
  }

  function requestReward(rid) {
    const r = state.rewards.find(x => x.id === rid);
    if (!r || state.pesos < r.cost) return;
    state.pesos -= r.cost; // held until parent decides; returned if declined
    state.requests.push({
      id: "req_" + Date.now(), rewardId: r.id, emoji: r.emoji, name: r.name,
      cost: r.cost, status: "pending", when: todayStr(), note: "",
    });
    save();
    toast("Sent to your parent for approval! 🙏");
    go("store");
  }

  /* -------------------- BADGES -------------------- */
  function renderBadges() {
    const s = $("#screen");
    s.innerHTML = `
      <button class="backbtn" id="back">← Back</button>
      <div class="sec-title">🏅 My Badges <span class="tiny">&nbsp;${state.badges.length}/${BADGES.length}</span></div>
      <div class="badge-grid">
        ${BADGES.map(b => { const got = state.badges.includes(b.id);
          return `<div class="badge ${got ? "" : "locked"}"><div class="e">${b.emoji}</div>
            <div class="n">${escapeH(b.name)}</div>
            <div class="tiny">${got ? escapeH(b.desc) : "Locked"}</div></div>`; }).join("")}
      </div>`;
    $("#back").onclick = () => go("home");
  }

  /* -------------------- PROFILE -------------------- */
  function renderProfile() {
    const s = $("#screen");
    const b = getSaint(state.buddy);
    const doneLessons = Object.keys(state.completed).length;
    const perfects = Object.values(state.completed).filter(c => c.correct === c.total).length;
    s.innerHTML = `
      <button class="backbtn" id="back">← Back</button>
      <div class="profile-hero scene-royal">
        <div class="ph-chibi">${chibiSVG(state.buddy, 120)}</div>
        <div class="ph-name">${escapeH(state.name)}</div>
        <div class="ph-buddy">with ${escapeH(b.full)}</div>
      </div>
      <div class="card">
        <div class="bi-sub" style="text-align:center">“${escapeH(b.title)}” • Feast day ${escapeH(b.feast || "")}</div>
        <p class="read" style="margin-top:8px"><span style="font-size:16px">${escapeH(b.personality)}</span></p>
        <div class="bubble center" style="margin-top:10px">${escapeH(b.cheers[0])}</div>
        <button class="btn ghost" id="changeBuddy">😇 Choose a different buddy</button>
      </div>
      <div class="card">
        <div class="mini-stat"><span>🪙 Total ${ECONOMY.currencyName}</span><span>${ECONOMY.currencySymbol}${state.pesos}</span></div>
        <div class="mini-stat"><span>🎯 This week</span><span>${ECONOMY.currencySymbol}${state.week.earned} / ${ECONOMY.weeklyTarget}</span></div>
        <div class="mini-stat"><span>📖 Lessons done</span><span>${doneLessons}</span></div>
        <div class="mini-stat"><span>💯 Perfect quizzes</span><span>${perfects}</span></div>
        <div class="mini-stat"><span>🔥 Day streak</span><span>${state.streak.count}</span></div>
        <div class="mini-stat"><span>🏅 Badges</span><span>${state.badges.length}/${BADGES.length}</span></div>
      </div>`;
    $("#back").onclick = () => go("home");
    $("#changeBuddy").onclick = () => chooseBuddyDialog();
  }

  function chooseBuddyDialog() {
    const ov = overlay(`
      <h2>Choose your Saint Buddy 😇</h2>
      <div class="buddy-grid" id="cb"></div>
      <div id="cbInfo" class="buddy-info hidden"></div>
      <button class="btn" id="cbsave">Choose this buddy</button>
      <button class="btn ghost" id="cbcancel">Cancel</button>
    `);
    const grid = ov.querySelector("#cb");
    grid.innerHTML = SAINTS.map(s => `<button class="buddy-choice ${s.id === state.buddy ? "sel" : ""}" data-s="${s.id}">${chibiSVG(s.id, 64)}<div class="bc-name">${escapeH(s.name)}</div></button>`).join("");
    let picked = state.buddy;
    const info = ov.querySelector("#cbInfo");
    function showInfo(id) { const s = getSaint(id); info.classList.remove("hidden");
      info.innerHTML = `<div class="bi-title">${escapeH(s.full)}</div><div class="bi-sub">“${escapeH(s.title)}”</div><div class="bi-p">${escapeH(s.personality)}</div>`; }
    showInfo(picked);
    grid.querySelectorAll("[data-s]").forEach(btn => btn.onclick = () => {
      picked = btn.dataset.s;
      grid.querySelectorAll("[data-s]").forEach(x => x.classList.remove("sel"));
      btn.classList.add("sel"); showInfo(picked);
      if (window.Sound) Sound.buddy(getSaint(picked).motif);
    });
    ov.querySelector("#cbcancel").onclick = () => ov.remove();
    ov.querySelector("#cbsave").onclick = () => {
      state.buddy = picked; save(); ov.remove();
      const s = getSaint(picked); toast(`${s.name} is now your buddy! ${s.attr}`);
      render();
    };
  }

  /* ============================================================
     PARENT ZONE (PIN-protected)
     ============================================================ */
  function openParentGate() {
    let entered = "";
    const ov = overlay(`
      <h2>👪 Parent Zone</h2>
      <p class="tiny">Enter your 4-digit PIN (default 1234)</p>
      <div class="pin-row">
        ${[0,1,2,3].map(i => `<input class="pinbox" data-i="${i}" inputmode="numeric" maxlength="1"/>`).join("")}
      </div>
      <button class="btn" id="pinok">Enter</button>
      <button class="btn ghost" id="pincancel">Cancel</button>
    `);
    const boxes = ov.querySelectorAll(".pinbox");
    boxes.forEach((b, i) => {
      b.oninput = () => { if (b.value && i < 3) boxes[i + 1].focus(); };
    });
    ov.querySelector("#pincancel").onclick = () => ov.remove();
    ov.querySelector("#pinok").onclick = () => {
      entered = Array.from(boxes).map(b => b.value).join("");
      if (entered === state.parentPin) { ov.remove(); openParentPanel(); }
      else { toast("Wrong PIN 🔒"); boxes.forEach(b => b.value = ""); boxes[0].focus(); }
    };
    boxes[0].focus();
  }

  function openParentPanel() {
    const pending = state.requests.filter(r => r.status === "pending");
    const ov = overlay(`
      <h2>👪 Parent Zone</h2>
      <div class="mini-stat"><span>Total ${ECONOMY.currencyName}</span><span>${ECONOMY.currencySymbol}${state.pesos}</span></div>
      <div class="mini-stat"><span>This week</span><span>${ECONOMY.currencySymbol}${state.week.earned} / ${ECONOMY.weeklyTarget}</span></div>
      <div class="mini-stat"><span>Lessons done</span><span>${Object.keys(state.completed).length}</span></div>
      <div class="mini-stat"><span>Day streak</span><span>${state.streak.count} 🔥</span></div>
      <div class="mini-stat"><span>Cloud sync</span><span>${Sync && Sync.enabled ? (Sync.isReady() ? "On ☁️" : "Connecting…") : "Off (on-device)"}</span></div>

      <div class="sec-title" style="font-size:16px;margin-top:16px">Reward requests ${pending.length ? `(${pending.length})` : ""}</div>
      <div id="reqs">${pending.length ? "" : `<p class="tiny">No requests waiting.</p>`}</div>

      <div class="sec-title" style="font-size:16px">Manage rewards</div>
      <div id="adminrewards"></div>
      <button class="btn ghost small" id="addReward">＋ Add reward</button>

      <div class="sec-title" style="font-size:16px">Settings</div>
      <button class="btn ghost" id="changePin">Change PIN</button>
      <button class="btn ghost" id="editVideos">Set lesson videos (YouTube Kids)</button>
      <button class="btn" id="closeP">Done</button>
    `);
    // pending requests
    const reqs = ov.querySelector("#reqs");
    pending.forEach(r => {
      const row = document.createElement("div");
      row.className = "adminrow";
      row.innerHTML = `<span class="emoji">${r.emoji}</span>
        <span class="grow">${escapeH(r.name)}<br><span class="tiny">${ECONOMY.currencySymbol}${r.cost} • ${r.when}</span></span>`;
      const ok = document.createElement("button"); ok.className = "btn green small"; ok.textContent = "Approve";
      const no = document.createElement("button"); no.className = "btn ghost small"; no.textContent = "Decline";
      ok.onclick = () => { r.status = "approved"; save(); toast("Approved! 🎉"); ov.remove(); openParentPanel(); };
      no.onclick = () => { r.status = "declined"; state.pesos += r.cost; save(); toast("Declined — pesos returned."); ov.remove(); openParentPanel(); };
      row.appendChild(ok); row.appendChild(no);
      reqs.appendChild(row);
    });
    // manage rewards
    const ar = ov.querySelector("#adminrewards");
    function drawRewards() {
      ar.innerHTML = "";
      state.rewards.forEach(r => {
        const row = document.createElement("div"); row.className = "adminrow";
        row.innerHTML = `<span class="emoji">${r.emoji}</span>
          <span class="grow">${escapeH(r.name)} <span class="tiny">— ${ECONOMY.currencySymbol}${r.cost}</span></span>
          <button class="x">✕</button>`;
        row.querySelector(".x").onclick = () => { state.rewards = state.rewards.filter(x => x.id !== r.id); save(); drawRewards(); };
        ar.appendChild(row);
      });
    }
    drawRewards();
    ov.querySelector("#addReward").onclick = () => addRewardDialog(() => { ov.remove(); openParentPanel(); });
    ov.querySelector("#changePin").onclick = () => changePinDialog();
    ov.querySelector("#editVideos").onclick = () => { ov.remove(); editVideosDialog(); };
    ov.querySelector("#closeP").onclick = () => { ov.remove(); render(); };
  }

  function addRewardDialog(after) {
    const ov = overlay(`
      <h2>Add a reward</h2>
      <div class="field"><label>Emoji</label><input id="re" value="🎁" maxlength="2"/></div>
      <div class="field"><label>Reward name</label><input id="rn" placeholder="e.g. Trip to the mall"/></div>
      <div class="field"><label>Cost in ${ECONOMY.currencyName} (${ECONOMY.currencySymbol})</label><input id="rc" type="number" value="300"/></div>
      <button class="btn" id="rsave">Save reward</button>
      <button class="btn ghost" id="rcancel">Cancel</button>
    `);
    ov.querySelector("#rcancel").onclick = () => ov.remove();
    ov.querySelector("#rsave").onclick = () => {
      const name = ov.querySelector("#rn").value.trim();
      const cost = parseInt(ov.querySelector("#rc").value, 10);
      if (!name || !cost || cost < 1) { toast("Please add a name and cost."); return; }
      state.rewards.push({ id: "r_" + Date.now(), emoji: ov.querySelector("#re").value || "🎁", name, cost });
      save(); ov.remove(); after && after();
    };
  }

  function changePinDialog() {
    const ov = overlay(`
      <h2>Change PIN</h2>
      <div class="field"><label>New 4-digit PIN</label>
        <input id="np" inputmode="numeric" maxlength="4" placeholder="••••"/></div>
      <button class="btn" id="ps">Save</button>
      <button class="btn ghost" id="pc">Cancel</button>
    `);
    ov.querySelector("#pc").onclick = () => ov.remove();
    ov.querySelector("#ps").onclick = () => {
      const v = ov.querySelector("#np").value.trim();
      if (!/^\d{4}$/.test(v)) { toast("PIN must be 4 digits."); return; }
      state.parentPin = v; save(); ov.remove(); toast("PIN updated 🔒");
    };
  }

  function editVideosDialog() {
    const built = WEEKS.flatMap(w => w.lessons).filter(l => LESSONS[l.id]);
    const ov = overlay(`
      <h2>Lesson videos</h2>
      <p class="tiny">Paste a <b>YouTube Kids</b> link for any lesson (from youtubekids.com). Leave blank to use the safe default search link.</p>
      <div id="vlist"></div>
      <button class="btn" id="vsave">Save videos</button>
      <button class="btn ghost" id="vcancel">Cancel</button>
    `);
    const list = ov.querySelector("#vlist");
    built.forEach(l => {
      const f = document.createElement("div"); f.className = "field";
      f.innerHTML = `<label>${escapeH(l.title)}</label>
        <input data-id="${l.id}" placeholder="https://www.youtubekids.com/..." value="${escapeAttr(state.videos[l.id] || "")}"/>`;
      list.appendChild(f);
    });
    ov.querySelector("#vcancel").onclick = () => { ov.remove(); render(); };
    ov.querySelector("#vsave").onclick = () => {
      list.querySelectorAll("input[data-id]").forEach(inp => {
        const v = inp.value.trim();
        if (v) state.videos[inp.dataset.id] = v; else delete state.videos[inp.dataset.id];
      });
      save(); ov.remove(); toast("Videos saved 📺"); render();
    };
  }

  /* -------------------- UI helpers -------------------- */
  function overlay(html) {
    const ov = document.createElement("div");
    ov.className = "overlay";
    ov.innerHTML = `<div class="modal">${html}</div>`;
    ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
    document.body.appendChild(ov);
    return ov;
  }
  let toastTimer;
  function toast(msg) {
    let t = $("#toast"); if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }
  function confetti() {
    const layer = $("#confetti"); if (!layer) return;
    const colors = ["#f7b500","#7c3aed","#ff7eb6","#22c55e","#3b82f6"];
    for (let i = 0; i < 60; i++) {
      const b = document.createElement("div");
      b.className = "confetti-bit";
      b.style.left = Math.random() * 100 + "vw";
      b.style.background = colors[i % colors.length];
      b.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
      b.style.animationDelay = (Math.random() * 0.4) + "s";
      layer.appendChild(b);
      setTimeout(() => b.remove(), 3200);
    }
  }
  function escapeH(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function escapeAttr(s) { return escapeH(s).replace(/'/g, "&#39;"); }

  /* -------------------- cloud sync wiring -------------------- */
  function applyRemote(remote) {
    // adopt remote state, keep PIN local-or-remote (remote wins for shared data)
    state = Object.assign(DEFAULT_STATE(), remote);
    localStorage.setItem(KEY, JSON.stringify(state));
    render();
  }
  if (window.Sync) Sync.init(() => state, applyRemote);

  /* -------------------- global click sounds -------------------- */
  // Browsers need a user gesture before audio can play — unlock on first tap.
  document.addEventListener("pointerdown", () => { if (window.Sound) Sound.unlock(); }, { once: true });
  document.addEventListener("click", (e) => {
    if (!window.Sound) return;
    const el = e.target.closest("button, .lesson-row, .reward, .buddy-choice, a.video-btn");
    if (!el || el.classList.contains("opt") || el.dataset.nosound) return;
    Sound.click();
  }, true);

  /* -------------------- service worker -------------------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  /* -------------------- go! -------------------- */
  render();
})();

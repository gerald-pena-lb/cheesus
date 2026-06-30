/* ==========================================================================
   Anima Christi — sound engine (Web Audio, no files, works offline)
   Gentle, kid-friendly blips synthesized in the browser. Mute is persisted.
   ========================================================================== */
window.Sound = (function () {
  const MK = "ac_muted";
  let ctx = null;
  let muted = localStorage.getItem(MK) === "1";

  function ac() {
    if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) ctx = new AC(); }
    return ctx;
  }
  // one note
  function tone(freq, start, dur, type, vol) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    o.connect(g); g.connect(c.destination);
    const t = c.currentTime + start;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.03);
  }
  function play(seq, type, vol) {
    if (muted) return;
    const c = ac(); if (!c) return;
    try { if (c.state === "suspended") c.resume(); } catch (e) {}
    seq.forEach(n => tone(n[0], n[1], n[2], type, vol));
  }

  // note frequencies
  const N = { A4:440, C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99,
              A5:880, B5:987.77, C6:1046.5, D6:1174.66, E6:1318.5, G4:392, E4:329.63 };

  const buddyMotifs = {
    twinkle: () => play([[N.C6,0,0.1],[N.E6,0.09,0.1],[N.G5,0.18,0.14]], "triangle", 0.14),
    fanfare: () => play([[N.C5,0,0.1],[N.G5,0.1,0.1],[N.C6,0.2,0.22]], "square", 0.12),
    gentle:  () => play([[N.E5,0,0.16],[N.A5,0.14,0.22]], "sine", 0.14),
    playful: () => play([[N.G5,0,0.08],[N.C6,0.08,0.08],[N.E6,0.16,0.08],[N.C6,0.24,0.12]], "triangle", 0.13),
    holy:    () => play([[N.C5,0,0.5],[N.E5,0,0.5],[N.G5,0,0.5],[N.C6,0.12,0.5]], "sine", 0.07),
  };

  return {
    isMuted: () => muted,
    toggle() { muted = !muted; localStorage.setItem(MK, muted ? "1" : "0"); if (!muted) this.click(); return muted; },
    unlock() { try { const c = ac(); if (c && c.state === "suspended") c.resume(); } catch (e) {} },
    click()   { play([[N.E5, 0, 0.06]], "triangle", 0.10); },
    nav()     { play([[N.G5, 0, 0.07]], "sine", 0.09); },
    correct() { play([[N.E5,0,0.1],[N.G5,0.09,0.1],[N.C6,0.18,0.16]], "sine", 0.16); },
    wrong()   { play([[N.D5,0,0.14],[N.A4,0.12,0.2]], "sine", 0.12); }, // soft, not harsh
    reward()  { play([[N.C5,0,0.1],[N.E5,0.1,0.1],[N.G5,0.2,0.1],[N.C6,0.3,0.28]], "triangle", 0.16); },
    badge()   { play([[N.G5,0,0.1],[N.C6,0.12,0.12],[N.E6,0.24,0.22]], "sine", 0.16); },
    buddy(motif) { (buddyMotifs[motif] || buddyMotifs.twinkle)(); },
  };
})();

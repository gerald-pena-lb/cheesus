/* ==========================================================================
   Cheesus — optional cloud sync via Supabase
   --------------------------------------------------------------------------
   The whole app state is stored as ONE JSON row, keyed by FAMILY_CODE.
   - On start: pull the row; if it's newer than what's on this device, use it.
   - On change: push the row (last-write-wins by timestamp).
   - Realtime: when the parent approves a reward on their phone, the child's
     iPad updates within a second.
   If config is blank, this module does nothing and the app runs on-device.
   ========================================================================== */
window.Sync = (function () {
  const cfg = window.CHEESUS_CONFIG || {};
  const enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && cfg.FAMILY_CODE);
  let client = null, applyRemote = null, ready = false;

  function loadLib() {
    return new Promise((resolve, reject) => {
      if (window.supabase) return resolve();
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function init(getState, onRemote) {
    applyRemote = onRemote;
    if (!enabled) return false;
    try {
      await loadLib();
      client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
      // initial pull
      const { data } = await client.from("cheesus_state")
        .select("state, updated_at").eq("family_code", cfg.FAMILY_CODE).maybeSingle();
      if (data && data.state) {
        const local = getState();
        if (!local._updatedAt || (data.state._updatedAt || 0) > local._updatedAt) {
          applyRemote(data.state);
        }
      }
      // realtime updates
      client.channel("cheesus-" + cfg.FAMILY_CODE)
        .on("postgres_changes",
          { event: "*", schema: "public", table: "cheesus_state",
            filter: "family_code=eq." + cfg.FAMILY_CODE },
          (payload) => {
            const remote = payload.new && payload.new.state;
            if (remote && applyRemote) applyRemote(remote);
          })
        .subscribe();
      ready = true;
      return true;
    } catch (e) {
      console.warn("[Cheesus] Cloud sync unavailable, using on-device storage.", e);
      return false;
    }
  }

  async function push(state) {
    if (!enabled || !client) return;
    try {
      await client.from("cheesus_state")
        .upsert({ family_code: cfg.FAMILY_CODE, state, updated_at: new Date().toISOString() },
                { onConflict: "family_code" });
    } catch (e) { console.warn("[Cheesus] push failed", e); }
  }

  return { enabled, isReady: () => ready, init, push };
})();

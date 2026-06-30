/* ==========================================================================
   Cheesus — runtime config endpoint (Vercel Serverless Function)
   --------------------------------------------------------------------------
   Lets you set your Supabase keys as ENVIRONMENT VARIABLES in the Vercel
   dashboard instead of editing any code. This function reads them at runtime
   and hands them to the app as window.CHEESUS_CONFIG.

   In Vercel → your project → Settings → Environment Variables, add:
     SUPABASE_URL        = https://xxxx.supabase.co
     SUPABASE_ANON_KEY   = (your anon public key)
     FAMILY_CODE         = (any secret word, same on every device)
   Then Redeploy. If they're left unset, the app simply runs on-device.
   ========================================================================== */
module.exports = (req, res) => {
  const cfg = {
    SUPABASE_URL:
      process.env.SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    SUPABASE_ANON_KEY:
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_KEY || "",
    FAMILY_CODE: process.env.FAMILY_CODE || "",
  };
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).send("window.CHEESUS_CONFIG = " + JSON.stringify(cfg) + ";");
};

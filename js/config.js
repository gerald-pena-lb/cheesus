/* ==========================================================================
   Cheesus — configuration
   --------------------------------------------------------------------------
   CLOUD SYNC (optional):
   Leave these blank to run fully on-device (offline, zero setup).
   To let a parent approve rewards from another phone in real time:
     1) Create a free project at https://supabase.com
     2) In the SQL editor, run the file  supabase/schema.sql
     3) Project Settings -> API: copy the Project URL and the "anon public" key
     4) Paste them below, and pick any shared FAMILY_CODE (a secret word)
   The same FAMILY_CODE on the iPad and on the parent's phone links them.
   ========================================================================== */
window.CHEESUS_CONFIG = {
  SUPABASE_URL: "",        // e.g. "https://abcdxyz.supabase.co"
  SUPABASE_ANON_KEY: "",   // the long "anon public" key
  FAMILY_CODE: "",         // any shared secret word, e.g. "pena-family-2026"
};

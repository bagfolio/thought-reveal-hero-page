import { createClient } from '@supabase/supabase-js';

// Load Vite env vars (must start with VITE_ prefix in .env.local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

// Conditionally create client to prevent errors during development
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl as string, supabaseKey as string)
  : createClient('https://axgignngicetxisamkka.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4Z2lnbm5naWNldHhpc2Fta2thIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTMxMTQ2NCwiZXhwIjoyMDYwODg3NDY0fQ.cyAfOTiOtb3MHnskVYlafjKLvFBef1RfE8rhb-2Cxf4');

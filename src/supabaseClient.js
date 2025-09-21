import { createClient } from "@supabase/supabase-js";

// اینا رو از پنل Supabase > Project Settings > API بردار
const supabaseUrl = "https://whmiagnxwjjbhbqscehl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobWlhZ254d2pqYmhicXNjZWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3Mjg1NTUsImV4cCI6MjA2OTMwNDU1NX0.NPYFF4PNc-XrazCsBslgYSp5uf91apghLCJ4nCiJK_U";

export const supabase = createClient(supabaseUrl, supabaseKey);


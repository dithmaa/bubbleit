import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cjzxixoqfbznoekmwbtv.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqenhpeG9xZmJ6bm9la213YnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NDExNTksImV4cCI6MjA0NjIxNzE1OX0.bUtqyhLH1JopiF--vTTTOHFu9uZIUSUWOMBWgLF7Pks";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;

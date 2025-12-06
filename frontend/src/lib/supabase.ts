import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://andexgnhnfbuzbzxzsms.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZGV4Z25obmZidXpienh6c21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMzYzMzIsImV4cCI6MjA4MDYxMjMzMn0.yjOorTfKx3Za4xo_5FNqIiFBMoDBUA35FP5Wh2LLH4I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

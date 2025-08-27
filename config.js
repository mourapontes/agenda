// config.js
const SUPABASE_URL = "https://vshmpjeklylzhmqzsuer.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzaG1wamVrbHlsemhtcXpzdWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTIzMjMsImV4cCI6MjA3MTg2ODMyM30.M0AZPymrv2Gm7aHbq8_cWvz2xfV5la0xOYGqg3SGjk8";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

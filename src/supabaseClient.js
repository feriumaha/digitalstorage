import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aasmkqcnwbqaynqbmjdr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhc21rcWNud2JxYXlucWJtamRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA1NzgwNzMsImV4cCI6MjAzNjE1NDA3M30.mlSutpW5EVQeSHMPC_LxKw8OX4c1bybQSLKzt__IwC4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grkfdkyuvmwkyluszrlp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya2Zka3l1dm13a3lsdXN6cmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0NTU4MDAsImV4cCI6MjAyOTAzMTgwMH0.C6qG72RevQ4zkMu8sAteJV89BhWBo-W4dQjsUkzIXf4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
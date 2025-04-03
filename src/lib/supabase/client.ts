
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key - in a real production app, 
// you would use environment variables
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function pushSchema() {
  try {
    const migrationPath = path.join(__dirname, '../supabase/migrations/20240305000000_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) throw error;
    
    console.log('Schema successfully pushed to Supabase');
  } catch (error) {
    console.error('Error pushing schema:', error);
    process.exit(1);
  }
}

pushSchema();
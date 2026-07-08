const { Pool } = require('pg');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
let dbUrl = '';
for (const line of envFile.split('\n')) {
  if (line.startsWith('DATABASE_URL=')) {
    dbUrl = line.split('=')[1].trim().replace(/['"]/g, '');
  }
}

const pool = new Pool({
  connectionString: dbUrl
});

async function main() {
  try {
    console.log('Adding specifications JSONB column...');
    await pool.query(`ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS specifications JSONB;`);
    console.log('Successfully added specifications column.');
    
    // Check if the column is added
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'projects' AND column_name = 'specifications';
    `);
    console.log('Column details:', res.rows);
  } catch (err) {
    console.error('Error adding column:', err);
  } finally {
    await pool.end();
  }
}

main();

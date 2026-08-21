const { Pool } = require('pg');
const fs = require('fs');

let dbUrl = process.env.DATABASE_URL || '';
if (!dbUrl && fs.existsSync('.env.local')) {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  for (const line of envFile.split('\n')) {
    if (line.trim().startsWith('DATABASE_URL=')) {
      dbUrl = line.split('=')[1].trim().replace(/['"]/g, '');
    }
  }
}

const pool = new Pool({
  connectionString: dbUrl,
  ssl: dbUrl.includes('localhost') ? false : { rejectUnauthorized: false },
});

async function main() {
  try {
    console.log('Making image_url column optional in public.operators table...');
    await pool.query(`ALTER TABLE public.operators ALTER COLUMN image_url DROP NOT NULL;`);
    await pool.query(`ALTER TABLE public.operators ALTER COLUMN image_url SET DEFAULT '';`);
    console.log('Successfully updated public.operators schema!');
  } catch (err) {
    console.error('Error altering table:', err.message);
  } finally {
    await pool.end();
  }
}

main();

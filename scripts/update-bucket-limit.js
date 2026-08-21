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
    console.log('Inspecting storage.buckets in Supabase Postgres...');
    const bucketsRes = await pool.query(`SELECT id, name, public, file_size_limit, allowed_mime_types FROM storage.buckets;`);
    console.log('Current buckets:', bucketsRes.rows);

    console.log('Updating ecometal_uploads bucket file_size_limit to 100MB (104857600 bytes)...');
    await pool.query(`
      INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
      VALUES ('ecometal_uploads', 'ecometal_uploads', true, 104857600, NULL)
      ON CONFLICT (id) DO UPDATE 
      SET file_size_limit = 104857600, public = true;
    `);

    const updatedRes = await pool.query(`SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'ecometal_uploads';`);
    console.log('Updated bucket details:', updatedRes.rows);
  } catch (err) {
    console.error('Error updating bucket limit:', err.message);
  } finally {
    await pool.end();
  }
}

main();

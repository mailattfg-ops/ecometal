// Replace the dummy seed/test rows in public.projects with the five real
// projects assembled from the client's "Website Information.docx" photo set.
// Location is intentionally left blank on every row -- the UI hides the field
// when it is empty.
const ROOT = __dirname;
const { Pool } = require(ROOT + '/node_modules/pg');
const fs = require('fs');

const env = fs.readFileSync(ROOT + '/.env.local', 'utf8');
const url = env.split('\n').find(l => l.startsWith('DATABASE_URL='))
  .slice('DATABASE_URL='.length).trim().replace(/['"]/g, '');

const PROJECTS = require('./seed_projects_data.js');

const pool = new Pool({ connectionString: url });

const COLS = [
  'title', 'category', 'description', 'image_url', 'area', 'location',
  'completion_time', 'bedrooms', 'client_name', 'client_link', 'tagline',
  'read_time', 'download_pdf_url', 'quote_text', 'quote_author', 'quote_role',
  'key_benefits', 'project_narrative', 'additional_images', 'specifications',
];

(async () => {
  const before = await pool.query('SELECT id, title FROM public.projects ORDER BY id');
  console.log('Removing', before.rowCount, 'existing rows:');
  for (const r of before.rows) console.log(`  #${r.id} ${r.title}`);

  await pool.query('DELETE FROM public.projects');
  await pool.query('ALTER SEQUENCE projects_id_seq RESTART WITH 1');

  for (const p of PROJECTS) {
    const values = COLS.map(c =>
      c === 'specifications' ? JSON.stringify(p[c] ?? []) : (p[c] ?? '')
    );
    const ph = COLS.map((_, i) => `$${i + 1}`).join(', ');
    const res = await pool.query(
      `INSERT INTO public.projects (${COLS.join(', ')}) VALUES (${ph}) RETURNING id, title`,
      values
    );
    console.log(`  inserted #${res.rows[0].id} ${res.rows[0].title}`);
  }

  const after = await pool.query('SELECT id, title, category, image_url FROM public.projects ORDER BY id');
  console.log('\nFinal table:');
  for (const r of after.rows) console.log(`  #${r.id} ${r.title} — ${r.category} — ${r.image_url}`);
  await pool.end();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });

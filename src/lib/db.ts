import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

let pool: Pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString });
} else {
  // Prevent creating multiple pools during hot reloading in development
  if (!(global as any)._postgresPool) {
    (global as any)._postgresPool = new Pool({ connectionString });
  }
  pool = (global as any)._postgresPool;
}

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res.rows;
}

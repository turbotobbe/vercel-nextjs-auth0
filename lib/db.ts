import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon requires SSL
});

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res;
} 
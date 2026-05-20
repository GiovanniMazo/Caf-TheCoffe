import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config({ path: path.resolve('.env') });

const { Pool } = pkg;

// schema.sql está en Backend/schema.sql
const schemaPath = path.resolve('schema.sql');
const schemaSql = await fs.readFile(schemaPath, 'utf8');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || 'coffeeclub',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Mepecihe03',
});

try {
  await pool.query(schemaSql);
  console.log('schema.sql ejecutado correctamente');
} finally {
  await pool.end();
}


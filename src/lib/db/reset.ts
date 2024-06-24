import { sql } from "drizzle-orm";
import { likesTable, usersTable, postsTable } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

async function reset() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

  const tables = await db.execute(query);

  // @LauraKirby
  for (let table of tables.rows) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query);
  }
}

reset().catch((e) => {
  console.error(e);
});

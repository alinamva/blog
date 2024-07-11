import { sql } from "drizzle-orm";
import { likesTable, usersTable, postsTable } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const dropAllTables = sql`
  DO $$ DECLARE
    r RECORD;
  BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
      EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
  END $$;
`;

async function resetDatabase() {
  try {
    await db.execute(dropAllTables);
    console.log("All tables have been dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
  } finally {
    await pool.end();
  }
}

resetDatabase();

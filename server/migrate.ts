import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const sqlite = new Database("database.sqlite");
const db = drizzle(sqlite);

async function main() {
  console.log("Running migrations...");

  try {
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }

  sqlite.close();
}

main();

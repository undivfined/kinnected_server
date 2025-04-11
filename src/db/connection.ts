import { Pool } from "pg";

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../../.env.${ENV}` });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

const db = new Pool();

export default db;

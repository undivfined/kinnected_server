"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../../.env.${ENV}` });
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error("PGDATABASE or DATABASE_URL not set");
}
else {
    console.log(`Connected to ${process.env.PGDATABASE}`);
}
const db = new pg_1.Pool();
exports.default = db;

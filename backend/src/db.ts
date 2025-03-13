import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "db",
  database: process.env.POSTGRES_DB || "sales_db",
  password: process.env.POSTGRES_PASSWORD || "admin123",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export default pool;
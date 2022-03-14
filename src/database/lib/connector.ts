import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const {
  PG_USERNAME,
  PG_PASSWORD,
  PG_DATABASE,
  PG_DATABASE_TEST,
  PG_HOST,
  ENV,
} = process.env;

const database = ENV === "dev" ? PG_DATABASE : PG_DATABASE_TEST;


export default new Pool({
  database: database,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  host: PG_HOST,
}) as any;

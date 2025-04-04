import { type Config } from "drizzle-kit";
import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite", // Turso 使用 SQLite 协议
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["my_portfolio_2_*"],
} satisfies Config;

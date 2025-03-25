// 从 drizzle-kit 包中导入 Config 类型
import { type Config } from "drizzle-kit";

// 从本地环境配置文件导入 env 对象
import { env } from "@/env";

// 导出默认的 Drizzle 配置对象
export default {
  // 指定 Schema 文件的位置，用于定义数据库表结构
  schema: "./src/server/db/schema.ts",
  // 设置数据库类型为 SQLite
  dialect: "sqlite",
  // 数据库连接凭证
  dbCredentials: {
    // 使用环境变量中的数据库 URL
    url: env.DATABASE_URL,
  },
  // 设置表名过滤器，只包含以 "my_portfolio_2_" 开头的表
  tablesFilter: ["my_portfolio_2_*"],
} satisfies Config;

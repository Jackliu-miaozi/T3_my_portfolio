// 从 @libsql/client 导入创建客户端的方法和类型
import { createClient, type Client } from "@libsql/client";
// 从 drizzle-orm/libsql 导入 drizzle ORM
import { drizzle } from "drizzle-orm/libsql";

// 导入环境变量
import { env } from "@/env";
// 导入数据库模式定义
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// 定义全局类型，用于在开发环境中缓存数据库连接
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

// 创建数据库客户端：如果全局已有客户端则使用已有的，否则创建新的客户端
export const client =
  globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// 在开发环境中将客户端存储到全局对象中
if (env.NODE_ENV !== "production") globalForDb.client = client;

// 使用 drizzle 创建数据库实例，并传入 schema
export const db = drizzle(client, { schema });

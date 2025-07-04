import { relations, sql } from "drizzle-orm";
import { index, primaryKey, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `my_portfolio_2_${name}`,
);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    context: d.text({ length: 256 }),
    image: d.text({ length: 256 }),
    name: d.text({ length: 256 }),
    createdBy: d.text({ length: 256 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("id_idx").on(t.id)],
);

export const users = createTable("user", (d) => ({
  id: d
    .text({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text({ length: 255 }),
  email: d.text({ length: 255 }).notNull(),
  emailVerified: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
  image: d.text({ length: 255 }),
  passwordHash: d.text({ length: 255 }),
  // createdAt: d.integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
  // updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.text({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.text({ length: 255 }).notNull(),
    providerAccountId: d.text({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.text({ length: 255 }),
    scope: d.text({ length: 255 }),
    id_token: d.text(),
    session_state: d.text({ length: 255 }),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.text({ length: 255 }).notNull().primaryKey(),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [index("session_userId_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.text({ length: 255 }).notNull(),
    token: d.text({ length: 255 }).notNull(),
    expires: d.integer({ mode: "timestamp" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const myartical = createTable(
  "myartical",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    content: d.text({ length: 256 }),
    title: d.text({ length: 256 }),
    summary: d.text({ length: 256 }),
    category: d.text({ length: 256 }),
    image: d.text({ length: 256 }),
    name: d.text({ length: 256 }),
    createdBy: d.text({ length: 256 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(datetime('now'))`)
      .notNull(),
  }),
  (t) => [index("myartical_id_idx").on(t.id)],
);


export const images = createTable(
  "images",
  (d) => ({
    id: d.text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    fileName: d.text("file_name").notNull(),
    fileType: d.text("file_type").notNull(),
    data: d.text("data", { length: 2147483647 }).notNull(),
    uploadedBy: d.text("uploaded_by").notNull().references(() => users.id),
    createdAt: d.integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  }),
  (t) => [index("images_uploaded_by_idx").on(t.uploadedBy)]
);

// 在现有schema.ts文件中添加以下代码
export const articleLikes = createTable(
  "article_likes",
  (d) => ({
    id: d.text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    articleId: d.integer("article_id").notNull(),
    ipAddress: d.text("ip_address").notNull(),
    createdAt: d.integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  }),
  (t) => [
    // 创建复合索引，确保每个IP只能对一篇文章点赞一次
    index("article_ip_idx").on(t.articleId, t.ipAddress),
    // 创建文章ID索引，用于快速查询文章的点赞数
    index("article_id_idx").on(t.articleId)
  ]
);

// 添加文章阅读量统计表
export const articleViews = createTable(
  "article_views",
  (d) => ({
    id: d.text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
    articleId: d.integer("article_id").notNull(),
    ipAddress: d.text("ip_address").notNull(),
    createdAt: d.integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  }),
  (t) => [
    // 创建复合索引，确保每个IP对一篇文章的访问只记录一次
    index("article_view_ip_idx").on(t.articleId, t.ipAddress),
    // 创建文章ID索引，用于快速查询文章的阅读量
    index("article_view_id_idx").on(t.articleId)
  ]
);

// // 从 @t3-oss/env-nextjs 导入 createEnv 函数，用于创建环境变量配置
// import { createEnv } from "@t3-oss/env-nextjs";
// // 从 zod 导入 z 对象，用于环境变量验证
// import { z } from "zod";
// // 导出环境变量配置对象
// export const env = createEnv({
//   /**
//    * Specify your server-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars.
//    */
//   // 服务器端环境变量配置
//   server: {
//     // AUTH_SECRET: 在生产环境必须提供，开发环境可选
//     AUTH_SECRET:
//       process.env.NODE_ENV === "production"
//         ? z.string()
//         : z.string().optional(),
//     // Discord OAuth 认证 ID
//     AUTH_GITHUB_ID: z.string(),
//     // Discord OAuth 认证密钥
//     AUTH_GITHUB_SECRET: z.string(),
//     // 数据库连接 URL，必须是有效的 URL 格式
//     DATABASE_URL: z.string().url(),
//     // 运行环境，只能是 development、test 或 production，默认为 development
//     NODE_ENV: z
//       .enum(["development", "test", "production"])
//       .default("development"),
//   },
//   /**
//    * Specify your client-side environment variables schema here. This way you can ensure the app
//    * isn't built with invalid env vars. To expose them to the client, prefix them with
//    * `NEXT_PUBLIC_`.
//    */
//   // 客户端环境变量配置（当前为空）
//   client: {
//     // NEXT_PUBLIC_CLIENTVAR: z.string(),
//   },
//   /**
//    * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
//    * middlewares) or client-side so we need to destruct manually.
//    */
//   // 运行时环境变量映射
//   runtimeEnv: {
//     AUTH_SECRET: process.env.AUTH_SECRET,
//     AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
//     AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
//     DATABASE_URL: process.env.DATABASE_URL,
//     NODE_ENV: process.env.NODE_ENV,
//   },
//   // /**
//   //  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
//   //  * useful for Docker builds.
//   //  */
//   // 跳过环境变量验证，通常用于 Docker 构建
//   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
// });

import { headers } from "next/headers";
import { Input } from "@/components/ui/input";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { saltAndHashPassword } from "@/lib/saltAndHashPassword";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import arcjet, { protectSignup, shield } from "@/lib/arcjet";

// 配置 Arcjet 实例
const aj = arcjet
  .withRule(
    // Arcjet's protectSignup rule is a combination of email validation, bot
    // protection and rate limiting. Each of these can also be used separately
    // on other routes e.g. rate limiting on a login route. See
    // https://docs.arcjet.com/get-started
    protectSignup({
      email: {
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        // Block emails that are disposable, invalid, or have no MX records
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        // configured with a list of bots to allow from
        // https://arcjet.com/bot-list
        allow: [], // prevents bots from submitting the form
      },
      // It would be unusual for a form to be submitted more than 5 times in 10
      // minutes from the same IP address
      rateLimit: {
        // uses a sliding window rate limit
        mode: "LIVE",
        interval: "2m", // counts requests over a 10 minute sliding window
        max: 5, // allows 5 submissions within the window
      },
    }),
  )
  // You can chain multiple rules, so we'll include shield
  .withRule(
    // Shield detects suspicious behavior, such as SQL injection and cross-site
    // scripting attacks.
    shield({
      mode: "LIVE",
    }),
  );

export const signupRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(20),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .regex(/^(?=.*[A-Z]).*$/, "密码必须包含至少一个大写字母"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 检查邮箱和用户名是否已存在
      const [emailExists, nameExists] = await Promise.all([
        ctx.db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, input.email),
        }),
        ctx.db.query.users.findFirst({
          where: (users, { eq }) => eq(users.name, input.name),
        }),
      ]);

      if (emailExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "该邮箱已被注册",
        });
      }

      if (nameExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "该用户名已被使用",
        });
      }

      // Arcjet 防护检查
      const userIp =
        process.env.NODE_ENV === "development"
          ? "127.0.0.1"
          : (ctx.headers.get("x-forwarded-for") ?? "127.0.0.1");

      const decision = await aj.protect(
        {
          headers: Object.fromEntries(ctx.headers.entries()),
          method: "POST",
          url: "/api/trpc/signup.register",
        },
        {
          fingerprint: userIp,
          email: input.email,
        },
      );

      if (decision.isDenied()) {
        if (decision.reason.isEmail()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "邮箱地址无效或不被允许",
          });
        }
        if (decision.reason.isRateLimit()) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "请求过于频繁，请稍后再试",
          });
        }
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "注册请求被拒绝",
        });
      }

      // 创建用户
      await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        passwordHash: await saltAndHashPassword(input.password),
      });

      return { success: true };
    }),
  checkname: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.name, input.name),
      });
      return existingUser !== null;
    }),
  checkemail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      });
      return existingUser !== null;
    }),
  checkNameExists: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(users.name, input.name),
      });

      return {
        exists: !!existingUser,
      };
    }),
});

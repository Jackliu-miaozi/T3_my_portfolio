import { z } from "zod";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import arcjet, { detectBot, fixedWindow, sensitiveInfo, shield, slidingWindow } from "@/lib/arcjet";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

// 配置 Arcjet 实例用于内容过滤
// 自定义中文敏感词检测函数
// 从外部文件导入敏感词列表
import { sensitiveWords } from "@/lib/sensitive-words";

function detectChineseSensitiveContent(
  tokens: string[],
): Array<"CHINESE_SENSITIVE" | undefined> {
  return tokens.map((token) => {
    if (sensitiveWords.some((word) => typeof word === 'string' && typeof token === 'string' && token.includes(word))) {
      return "CHINESE_SENSITIVE";
    }
  });
}

const aj = arcjet
  .withRule(
    sensitiveInfo({
      mode: "LIVE",
      deny: [
        "CREDIT_CARD_NUMBER",
        "EMAIL",
        "PHONE_NUMBER",
        "IP_ADDRESS",
        "CHINESE_SENSITIVE", // 新增中文敏感词检测类型
      ],
      detect: detectChineseSensitiveContent, // 添加自定义检测函数
      contextWindowSize: 2, // 设置上下文窗口大小
    }),
  )
  .withRule(
    shield({
      mode: "LIVE",
    }),
  )
  .withRule(
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // configured with a list of bots to allow from
      // https://arcjet.com/bot-list
      allow: [], // blocks all automated clients
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      max: 5,
      window: "60s",
    }),
  );

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ context: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // 检查内容是否包含敏感信息
      const userIp =
        process.env.NODE_ENV === "development"
          ? "127.0.0.1"
          : (ctx.headers.get("x-forwarded-for") ?? "127.0.0.1");

      // 构造一个类似于 NextRequest 的对象
      const mockRequest = {
        headers: Object.fromEntries(ctx.headers.entries()),
        method: "POST",
        url: "/api/trpc/post.create",
        body: input.context, // 直接传递内容
      };

      const decision = await aj.protect(mockRequest, {
        fingerprint: userIp,
      });

      if (decision.isDenied()) {
        if (decision.reason.isSensitiveInfo()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "留言内容包含敏感信息（如信用卡号码、邮箱等），请修改后重试",
          });
        }
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "留言内容被拒绝",
        });
      }

      // 内容检查通过，创建留言
      await ctx.db.insert(posts).values({
        context: input.context,
        image: ctx.session.user.image,
        name: ctx.session.user.name,
        createdBy: ctx.session.user.name,
        createdAt: new Date(),
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });
    return post ?? null;
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const entries = await ctx.db
        .select({
          id: posts.id,
          context: posts.context,
          createdAt: posts.createdAt,
          createdBy: posts.createdBy,
          image: posts.image,
        })
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(50);
      return entries;
    } catch (error) {
      console.error("Failed to fetch guestbook entries:", error);
      return [];
    }
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),

  // 添加回复留言的API
  reply: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        replyContent: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // 检查回复内容是否包含敏感信息
      const originalPost = await ctx.db.query.posts.findFirst({
        where: eq(posts.id, input.postId),
      });

      if (!originalPost) {
        throw new Error("留言不存在");
      }

      // 创建回复内容，将回复添加到原始留言的context后面，使用更明显的换行分隔
      const updatedContext = `${originalPost.context}\n\nJack回复:\n${input.replyContent}`;
      //这个正则表达式用于匹配以"Jack回复:"开头的行

      // 更新留言内容
      await ctx.db
        .update(posts)
        .set({
          context: updatedContext,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, input.postId));
    }),
});

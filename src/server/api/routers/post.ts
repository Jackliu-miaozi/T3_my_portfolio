import { z } from "zod";
import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ context: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
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
      // 获取原始留言
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

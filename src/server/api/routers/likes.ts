import { z } from "zod";
import { and, eq, count } from "drizzle-orm";
import { headers } from "next/headers";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { articleLikes } from "@/server/db/schema";

// 获取客户端IP的辅助函数
async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded 
    ? forwarded.split(',')[0] 
    : headersList.get("x-real-ip") ?? "127.0.0.1";
  // 确保返回的IP地址不为undefined
  return ip ?? "127.0.0.1";
}
// 获取文章点赞状态
export const likesRouter = createTRPCRouter({
  // 获取文章点赞状态
  getLikeStatus: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const clientIp = await getClientIp(); // 添加await
        const articleId = parseInt(input.articleId);
        
        // 检查用户是否已点赞
        const existingLike = await ctx.db.query.articleLikes.findFirst({
          where: and(
            eq(articleLikes.articleId, articleId),
            eq(articleLikes.ipAddress, clientIp)
          )
        });
        
        // 获取总点赞数
        const likesResult = await ctx.db
          .select({ value: count() })
          .from(articleLikes)
          .where(eq(articleLikes.articleId, articleId));
        
        const totalLikes = likesResult[0]?.value ?? 0;
        
        return {
          hasLiked: !!existingLike,
          totalLikes
        };
      } catch (error) {
        console.error("获取点赞状态失败:", error);
        throw new Error("获取点赞状态失败");
      }
    }),

  // 点赞或取消点赞
  toggleLike: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const clientIp = await getClientIp(); // 添加await
        const articleId = parseInt(input.articleId);
        
        // 检查用户是否已点赞
        const existingLike = await ctx.db.query.articleLikes.findFirst({
          where: and(
            eq(articleLikes.articleId, articleId),
            eq(articleLikes.ipAddress, clientIp)
          )
        });
        
        if (existingLike) {
          // 已点赞，取消点赞
          await ctx.db
            .delete(articleLikes)
            .where(
              and(
                eq(articleLikes.articleId, articleId),
                eq(articleLikes.ipAddress, clientIp)
              )
            );
        } else {
          // 未点赞，添加点赞
          await ctx.db.insert(articleLikes).values({
            articleId,
            ipAddress: clientIp,
            createdAt: new Date()
          });
        }
        
        // 获取更新后的点赞总数
        const likesResult = await ctx.db
          .select({ value: count() })
          .from(articleLikes)
          .where(eq(articleLikes.articleId, articleId));
        
        const totalLikes = likesResult[0]?.value ?? 0;
        
        return {
          hasLiked: !existingLike,
          totalLikes
        };
      } catch (error) {
        console.error("点赞操作失败:", error);
        throw new Error("点赞操作失败");
      }
    }),
});

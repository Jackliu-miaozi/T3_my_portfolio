import { z } from "zod";
import { and, eq, count } from "drizzle-orm";
import { headers } from "next/headers";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { articleViews } from "@/server/db/schema";

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

export const viewsRouter = createTRPCRouter({
  // 获取文章阅读量
  getViewCount: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const articleId = parseInt(input.articleId);
        
        // 获取总阅读量
        const viewsResult = await ctx.db
          .select({ value: count() })
          .from(articleViews)
          .where(eq(articleViews.articleId, articleId));
        
        const totalViews = viewsResult[0]?.value ?? 0;
        
        return {
          totalViews
        };
      } catch (error) {
        console.error("获取阅读量失败:", error);
        throw new Error("获取阅读量失败");
      }
    }),

  // 记录文章阅读
  recordView: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const clientIp = await getClientIp();
        const articleId = parseInt(input.articleId);
        
        // 检查用户是否已阅读过该文章
        const existingView = await ctx.db.query.articleViews.findFirst({
          where: and(
            eq(articleViews.articleId, articleId),
            eq(articleViews.ipAddress, clientIp)
          )
        });
        
        if (!existingView) {
          // 未阅读过，记录阅读
          await ctx.db.insert(articleViews).values({
            articleId,
            ipAddress: clientIp,
            createdAt: new Date()
          });
        }
        
        // 获取更新后的阅读总数
        const viewsResult = await ctx.db
          .select({ value: count() })
          .from(articleViews)
          .where(eq(articleViews.articleId, articleId));
        
        const totalViews = viewsResult[0]?.value ?? 0;
        
        return {
          totalViews
        };
      } catch (error) {
        console.error("记录阅读失败:", error);
        throw new Error("记录阅读失败");
      }
    }),
});
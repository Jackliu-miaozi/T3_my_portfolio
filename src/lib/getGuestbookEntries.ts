import { posts } from '@/server/db/schema';
import { desc } from "drizzle-orm";
import { db } from "@/server/db";

export async function getGuestbookEntries() {
    try {
        const entries = await db
            // 选择要查询的字段，包括留言的基本信息和关联的用户信息
            .select({
                id: posts.id,
                context: posts.context,
                createdAt: posts.createdAt,
                createdBy: posts.createdBy,
                image: posts.image,
            })
            .from(posts)
            // 按照留言创建时间降序排序，最新的留言显示在前面
            .orderBy(desc(posts.createdAt))
            // 限制返回最多50条记录
            .limit(50);
        return entries;
    } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
        return [];
    }
}

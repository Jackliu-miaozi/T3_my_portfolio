import { z } from "zod";
import { desc } from "drizzle-orm";

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
});

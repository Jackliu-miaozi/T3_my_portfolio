import { z } from "zod";
import { desc, eq } from "drizzle-orm";



import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { myartical } from "@/server/db/schema";

export const articalRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        title: z.string().min(1),
        category: z.string().min(1),
        summary: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(myartical).values({
        content: input.content,
        title: input.title,
        summary: input.summary,
        category: input.category,
        image: ctx.session.user.image,
        name: ctx.session.user.name,
        createdBy: ctx.session.user.name,
        createdAt: new Date(),
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const articals = await ctx.db
        .select({
          id: myartical.id,
          content: myartical.content,
          createdAt: myartical.createdAt,
          createdBy: myartical.createdBy,
          image: myartical.image,
          name: myartical.name,
          title: myartical.title,
          summary: myartical.summary,
          category: myartical.category,
        })
        .from(myartical)
        .orderBy(desc(myartical.createdAt))
        .limit(50);
      return articals;
    } catch (error) {
      console.error("Failed to fetch guestbook entries:", error);
      return [];
    }
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(myartical)
        .where(eq(myartical.id, input.id));

    }),
});

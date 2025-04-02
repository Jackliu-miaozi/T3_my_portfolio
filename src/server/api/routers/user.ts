import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
export const userRouter = createTRPCRouter({
  checkUserExists: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, input.userId),
      });
      // 检查用户是否存在，如果用户存在返回true，否则返回false
      return user !== null;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.query.users.findMany();
    return users;
  }),
  deleteUser: protectedProcedure
   .input(z.object({ userId: z.string() }))
   .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(users).where(eq(users.id, input.userId));
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { saltAndHashPassword } from "@/lib/saltAndHashPassword";
import { eq } from "drizzle-orm";

export const signupRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .regex(/^(?=.*[A-Z]).*$/, "密码必须包含至少一个大写字母"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      await ctx.db.insert(users).values({
        name: input.name,
        email: input.email,
        passwordHash: await saltAndHashPassword(input.password),
      });

      return true;
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

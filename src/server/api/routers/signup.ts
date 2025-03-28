import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { saltAndHashPassword } from "@/lib/saltAndHashPassword";

export const signupRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
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
});

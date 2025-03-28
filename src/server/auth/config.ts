import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/lib/getUserFromDb";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
//当使用jwt时，不要有adapter
//当使用database时，不要有jwt
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", label: "邮箱", placeholder: "请输入邮箱" },
        password: {
          type: "password",
          label: "密码", 
          placeholder: "请输入密码",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("请提供邮箱和密码");
        }

        const user = await getUserFromDb(
          credentials.email as string,
          credentials.password as string
        );

        if (!user) {
          throw new Error("邮箱或密码错误");
        }

        return user;
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/sign-in",
  },
} satisfies NextAuthConfig;
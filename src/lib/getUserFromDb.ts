import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "./saltAndHashPassword";

/**
 * 从数据库中获取用户信息并验证密码
 * @param email 用户邮箱
 * @param password 用户输入的原始密码
 * @returns 如果验证成功返回用户对象，否则返回null
 */
export async function getUserFromDb(email: string, password: string) {
  try {
    // 查询匹配email的用户
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // 如果未找到用户或用户没有设置密码，返回null
    if (!user?.passwordHash) {
      return null;
    }

    // 验证密码是否匹配
    const isValid = await verifyPassword(user.passwordHash, password);
    
    // 如果密码不匹配，返回null
    if (!isValid) {
      return null;
    }

    // 返回用户对象
    return user;
  } catch (error) {
    console.error("Error querying user from database:", error);
    return null;
  }
}

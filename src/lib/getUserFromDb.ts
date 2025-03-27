import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import {verifyPassword} from "./saltAndHashPassword";

/**
 * 从数据库中获取用户信息并验证密码
 * @param email 用户邮箱
 * @param pwHash 密码哈希值
 * @returns 如果验证成功返回用户对象，否则返回null
 */
export async function getUserFromDb(email: string, pwHash: string) {
  try {
    // 查询匹配email和密码哈希值的用户
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    const isValid = await verifyPassword(pwHash, user!.passwordHash!);
    // 如果未找到用户或密码哈希不匹配，返回null
    if (!user || !isValid) {
      return null;
    }

    // 返回用户对象
    return user;
  } catch (error) {
    console.error("Error querying user from database:", error);
    return null;
  }
}

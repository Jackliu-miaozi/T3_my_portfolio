import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export async function saltAndHashPassword(password: string): Promise<string> {
  // 生成16字节的随机盐值
  const salt = randomBytes(16).toString("hex");

  // 使用scrypt进行密码哈希，生成64字节的哈希值
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;

  // 将盐值和哈希值拼接在一起，使用.分隔
  return `${salt}.${hash.toString("hex")}`;
}

export async function verifyPassword(
  storedHash: string,
  password: string,
): Promise<boolean> {
  // 分离存储的盐值和哈希值
  const [salt, hash] = storedHash.split(".");

  // 使用相同的盐值和参数重新计算哈希
  const newHash = (await scryptAsync(password, salt!, 64)) as Buffer;

  // 比较哈希值是否相同
  return hash === newHash.toString("hex");
}

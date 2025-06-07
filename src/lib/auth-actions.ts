"use server";

import { signIn, signOut } from "@/server/auth";

/**
 * 用户登录 Server Action
 * 处理用户登录请求
 */
export async function signInAction() {
  await signIn();
}

/**
 * 用户登出 Server Action
 * 处理用户登出请求
 */
export async function signOutAction() {
  await signOut();
}
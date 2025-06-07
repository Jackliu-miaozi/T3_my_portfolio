import { signOutAction } from "@/lib/auth-actions";

/**
 * 登出按钮组件
 * 使用外部定义的 Server Action 处理登出逻辑
 */
export function SignOut() {
  return (
    <form action={signOutAction}>
      <button type="submit" className="cursor-pointer">
        退出登录
      </button>
    </form>
  );
}

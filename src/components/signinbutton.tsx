import { signInAction } from "@/lib/auth-actions";

/**
 * 登录按钮组件
 * 使用外部定义的 Server Action 处理登录逻辑
 */
export function SignIn() {
  return (
    <form action={signInAction}>
      <button type="submit" className="cursor-pointer">
        登录
      </button>
    </form>
  );
}

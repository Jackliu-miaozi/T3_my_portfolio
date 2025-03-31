import { signOut } from "@/server/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="cursor-pointer">
        退出登录
      </button>
    </form>
  );
}

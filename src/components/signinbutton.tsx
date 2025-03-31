import { signIn } from "@/server/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button type="submit" className="cursor-pointer">
        登录
      </button>
    </form>
  );
}

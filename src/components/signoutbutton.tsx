import { signOut } from "@/server/auth";
import router from 'next/navigation';

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">登出</button>
    </form>
  );
}

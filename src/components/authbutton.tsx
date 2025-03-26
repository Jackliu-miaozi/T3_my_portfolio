
import { signIn } from "next-auth/react";
import { Button } from "@/app/_components/ui/button"

export default async function AuthButton() {
    const handleSignIn = () => {
        void signIn("github", { callbackUrl: "/guestbook" })
            .catch(error => {
                console.error('登录失败:', error);
            });
    };

    return (
        <>
            <Button onClick={handleSignIn} className="flex items-center space-x-2">
                <span>使用GitHub登录</span>
            </Button>
        </>
    )
}

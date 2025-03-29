import * as React from "react";
import { cn } from "@/lib/utils";
import { Dog } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { auth } from "@/server/auth";

export async function MobileNav() {
  const session = await auth();
  return (
    <NavigationMenu className="px-3 md:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Dog />
            开始
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid-cols-1">
              <ListItem href="/" title="回首页" className="mb-[-2]"></ListItem>
              <div className="border-b"></div>
              <ListItem href="/guestbook" title="给Jack留言"></ListItem>
              <div className="border-b"></div>
              <ListItem href="/aboutme" title="关于我"></ListItem>
              <div className="border-b"></div>
              <ListItem href="/myartical" title="文章"></ListItem>
              <div className="border-b"></div>
              {/* 搞反了不改了，加了个！ */}
              {!session ? (
                <ListItem href="/sign-in" title="登录"></ListItem>
              ) : (
                <ListItem href="/dashboard" title="我的后台"></ListItem>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

"use client";

import { Button } from "@/app/_components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("链接已复制到剪贴板");

      // 1.5秒后重置状态
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      toast.error("复制失败，请手动复制");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={handleCopy}
        className={cn(
          "transition-colors duration-200",
          copied &&
            "border-green-200 bg-green-100 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400",
        )}
      >
        复制链接
      </Button>
      {copied && (
        <Check className="animate-in fade-in h-5 w-5 text-green-500" />
      )}
    </div>
  );
}

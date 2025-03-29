
"use client";

import Image from "next/image";
import { api } from "@/trpc/react";

export function GuestbookEntries() {
    const { data: entries, isLoading } = api.post.getAll.useQuery();
    // 格式化日期
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    if (isLoading || !entries) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-pulse text-gray-500 dark:text-gray-400">
                    加载留言中...
                </div>
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                暂无留言，成为第一个留言的人吧！
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {entries.map((entry) => (
                <div key={entry.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            {entry.image ? (
                                <Image
                                    src={entry.image}
                                    alt={entry.createdBy ?? "用户"}
                                    className="h-10 w-10 rounded-full"
                                    width={40}
                                    height={40}
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        {entry.createdBy?.charAt(0) ?? "?"}
                                    </span>
                                </div>
                            )}
                            <div>
                                <p className="font-medium">{entry.createdBy ?? "匿名用户"}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(entry.createdAt.toString())}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-gray-800 dark:text-gray-200">
                        {entry.context}
                    </p>
                </div>
            ))}
        </div>
    );
}
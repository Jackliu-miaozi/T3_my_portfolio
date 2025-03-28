'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type GuestbookEntry = {
  id: string;
  message: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
};

// 模拟数据，实际应用中应该从API获取
const MOCK_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    message: '很高兴看到你的作品集！非常棒的设计。',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    user: {
      name: '张三',
      image: null,
    },
  },
  {
    id: '2',
    message: '我很喜欢你的项目，希望有机会合作！',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      name: '李四',
      image: null,
    },
  },
  {
    id: '3',
    message: '你的技术栈很有深度，学习了！',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user: {
      name: '王五',
      image: null,
    },
  },
];

export function GuestbookEntries() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求
    const fetchEntries = async () => {
      try {
        // 实际应用中应该从API获取数据
        // const response = await fetch('/api/guestbook');
        // const data = await response.json();
        // setEntries(data);
        
        // 使用模拟数据
        await new Promise(resolve => setTimeout(resolve, 800));
        setEntries(MOCK_ENTRIES);
      } catch (error) {
        console.error('获取留言失败', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchEntries().catch(error => {
      console.error('获取留言时发生错误:', error);
    });
  }, []);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (isLoading) {
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
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        暂无留言，成为第一个留言的人吧！
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div key={entry.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {entry.user.image ? (
                <Image
                  src={entry.user.image}
                  alt={entry.user.name ?? '用户'}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {entry.user.name?.charAt(0) ?? '?'}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{entry.user.name ?? '匿名用户'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(entry.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-800 dark:text-gray-200">{entry.message}</p>
        </div>
      ))}
    </div>
  );
}
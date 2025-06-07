import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

/**
 * 创建优化的QueryClient实例
 * 配置了更好的缓存策略和SSR支持
 */
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // SSR优化：设置默认的staleTime避免客户端立即重新请求
        staleTime: 60 * 1000, // 1分钟
        // 缓存时间：数据在内存中保留的时间
        gcTime: 10 * 60 * 1000, // 10分钟
        // 重试配置：网络错误时的重试策略
        retry: (failureCount, error) => {
          // 对于4xx错误不重试，对于网络错误重试最多3次
          if (error instanceof Error && error.message.includes('4')) {
            return false;
          }
          return failureCount < 3;
        },
        // 重试延迟：指数退避策略
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // 网络重连时重新获取数据
        refetchOnReconnect: true,
        // 窗口重新获得焦点时重新获取数据
        refetchOnWindowFocus: false, // 默认关闭，由具体组件决定
      },
      mutations: {
        // mutation重试配置
        retry: (failureCount, error) => {
          // mutation通常不重试，除非是网络错误
          if (error instanceof Error && error.message.includes('Network')) {
            return failureCount < 2;
          }
          return false;
        },
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });

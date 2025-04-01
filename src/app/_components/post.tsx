import React from 'react'

export default function post() {
  return (
    <div>
      hello post
    </div>
  )
}

// // "use client" 声明这是一个客户端组件
// "use client";

// // 从React中导入useState钩子用于状态管理
// import { useState } from "react";

// // 导入api工具，用于处理tRPC相关操作
// import { api } from "@/trpc/react";

// // 导出LatestPost组件
// export function LatestPost() {
//   // 使用tRPC查询获取最新的文章
//   const [latestPost] = api.post.getLatest.useSuspenseQuery();

//   // 获取tRPC工具实例，用于缓存失效等操作
//   const utils = api.useUtils();
//   // 创建name状态及其设置函数，初始值为空字符串
//   const [name, setName] = useState("");
//   // 创建文章的mutation操作
//   const createPost = api.post.create.useMutation({
//     // 成功回调：使缓存失效并清空输入框
//     onSuccess: async () => {
//       await utils.post.invalidate();
//       setName("");
//     },
//   });

//   return (
//     // 容器div，设置宽度和最大宽度
//     <div className="w-full max-w-xs">
//       {/* 条件渲染：如果有最新文章则显示，否则显示无文章提示 */}
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}
//       {/* 表单组件，处理文章创建 */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault(); // 阻止表单默认提交行为
//           createPost.mutate({ name }); // 调用mutation创建文章
//         }}
//         className="flex flex-col gap-2"
//       >
//         {/* 文章标题输入框 */}
//         <input
//           type="text"
//           placeholder="Title"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
//         />
//         {/* 提交按钮 */}
//         <button
//           type="submit"
//           className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
//           disabled={createPost.isPending}
//         >
//           {createPost.isPending ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

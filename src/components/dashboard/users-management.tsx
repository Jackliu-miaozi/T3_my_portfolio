"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { toast } from "sonner";
import { UserDetailsDialog, DeleteUserDialog } from "./user-dialogs";

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt?: string;
};

export function UsersManagement() {
  const [showUserDetailsDialog, setShowUserDetailsDialog] = useState(false);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { data: users } = api.user.getAll.useQuery();
  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess: async () => {
      toast.success("用户已删除！");
      await utils.user.invalidate();
      setShowDeleteUserDialog(false);
    },
  });
  const utils = api.useUtils();

  // 处理查看用户详情
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetailsDialog(true);
  };

  // 处理删除用户确认
  const handleDeleteUserConfirm = (id: string) => {
    setSelectedUserId(id);
    setShowDeleteUserDialog(true);
  };

  // 处理删除用户
  const handleDeleteUser = () => {
    // 使用保存的用户ID进行删除操作
    if (
      selectedUserId &&
      selectedUserId !== "9f0b03bb-4f35-479d-a04e-6a307b9d4074"
    ) {
      // 调用删除用户的 API
      try {
        deleteUser.mutate({
          userId: selectedUserId,
        });
      } catch (error) {
        toast.error("用户删除失败！");
      }
    } else {
      toast.error("未找到要删除的用户！");
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        用户管理
      </h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">用户</th>
                <th className="p-4 text-left">邮箱</th>
                <th className="p-4 text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        {user.name?.[0] ?? "U"}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewUserDetails(user)}
                      >
                        详情
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUserConfirm(user.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 用户详情对话框 */}
      <UserDetailsDialog
        open={showUserDetailsDialog}
        onOpenChange={setShowUserDetailsDialog}
        user={selectedUser}
      />

      {/* 删除用户确认对话框 */}
      <DeleteUserDialog
        open={showDeleteUserDialog}
        onOpenChange={setShowDeleteUserDialog}
        onDelete={handleDeleteUser}
        isDeleting={deleteUser.isPending}
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";



export default function SignUpPage() {
  const [isCheckingName, setIsCheckingName] = useState(false);
  const checkNameMutation = api.signup.checkNameExists.useMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 表单验证状态
  const [validationState, setValidationState] = useState({
    nameMessage: "",
    nameValid: false,
    nameChecked: false,
    passwordsMatch: false,
    passwordsChecked: false,
    passwordStrength: "",
    passwordValid: false,
    passwordChecked: false,
  });

  // 检查所有必填字段是否已填写
  const allFieldsFilled =
    formValues.name.trim() !== "" &&
    formValues.email.trim() !== "" &&
    formValues.password.trim() !== "" &&
    formValues.confirmPassword.trim() !== "";

  // 检查昵称是否有效
  const validateName = async (name: string) => {
    if (name.trim() === "") {
      setValidationState((prev) => ({
        ...prev,
        nameMessage: "",
        nameValid: false,
        nameChecked: false,
      }));
      return;
    }

    if (name.length < 2) {
      setValidationState((prev) => ({
        ...prev,
        nameMessage: "昵称至少需要2个字符",
        nameValid: false,
        nameChecked: true,
      }));
    } else if (name.length > 20) {
      setValidationState((prev) => ({
        ...prev,
        nameMessage: "昵称不能超过20个字符",
        nameValid: false,
        nameChecked: true,
      }));
      return;
    }

    setIsCheckingName(true);
    setValidationState((prev) => ({
      ...prev,
      nameMessage: "正在检查昵称...",
      nameValid: false,
      nameChecked: true,
    }));
    try {
      // 调用 API 检查昵称是否已存在
      const result = await checkNameMutation.mutateAsync({ name });

      if (result.exists) {
        setValidationState((prev) => ({
          ...prev,
          nameMessage: "该昵称已被使用",
          nameValid: false,
          nameChecked: true,
        }));
      } else {
        setValidationState((prev) => ({
          ...prev,
          nameMessage: "昵称可用",
          nameValid: true,
          nameChecked: true,
        }));
      }
    } catch (error) {
      console.error("检查昵称时出错:", error);
      setValidationState((prev) => ({
        ...prev,
        nameMessage: "昵称检查失败，请重试",
        nameValid: false,
        nameChecked: true,
      }));
    } finally {
      setIsCheckingName(false);
    }
  };

  // 检查密码复杂度
  const validatePassword = (password: string) => {
    if (password.trim() === "") {
      setValidationState((prev) => ({
        ...prev,
        passwordStrength: "",
        passwordValid: false,
        passwordChecked: false,
      }));
      return;
    }

    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const isValid = hasMinLength && hasUpperCase;

    let message = "";
    if (!hasMinLength) {
      message = "密码长度至少需要8个字符";
    } else if (!hasUpperCase) {
      message = "密码需要包含至少一个大写字母";
    } else {
      message = "密码强度符合要求";
    }

    setValidationState((prev) => ({
      ...prev,
      passwordStrength: message,
      passwordValid: isValid,
      passwordChecked: true,
    }));
  };

  // 检查两次密码是否一致
  const validatePasswords = () => {
    if (formValues.password === "" || formValues.confirmPassword === "") {
      setValidationState((prev) => ({
        ...prev,
        passwordsMatch: false,
        passwordsChecked: false,
      }));
      return;
    }

    const match = formValues.password === formValues.confirmPassword;
    setValidationState((prev) => ({
      ...prev,
      passwordsMatch: match,
      passwordsChecked: true,
    }));
  };

  // 当密码变化时，检查复杂度
  useEffect(() => {
    validatePassword(formValues.password);
  }, [formValues.password]);

  // 当密码或确认密码变化时，检查是否匹配
  useEffect(() => {
    validatePasswords();
  }, [formValues.password, formValues.confirmPassword]);

  // 当昵称失去焦点时验证
  const handleNameBlur = () => {
    void validateName(formValues.name);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formValues.name.trim() !== "") {
        void validateName(formValues.name);
      }
    }, 500); // 500ms 的延迟

    return () => clearTimeout(timer);
  }, [formValues.name]);

  const registe = api.signup.register.useMutation({
    onSuccess: () => {
      toast("注册成功", {
        description: "您注册成功了，现在去登录吧",
        action: {
          label: "立即前往",
          onClick: () => router.push("/sign-in"),
        },
      });
      // 延迟1.5秒后跳转到登录页面，让用户有时间看到提示
      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    },
    onError: (error) => {
      setError(error.message || "注册过程中发生错误");
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      setIsLoading(false);
      return;
    }

    // 检查密码复杂度
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasMinLength || !hasUpperCase) {
      setError(
        "密码不符合复杂度要求，请确保密码长度至少8个字符且包含至少一个大写字母",
      );
      setIsLoading(false);
      return;
    }
    try {
      registe.mutate({
        name,
        email,
        password,
      });
    } catch (e) {
      setError("注册过程中发生错误");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            注册刘正源的网站
          </CardTitle>
          <CardDescription className="text-center">
            创建您的账号
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex">
                昵称 <span className="ml-1 text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="输入您的昵称"
                  required
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  onBlur={handleNameBlur}
                  className={
                    validationState.nameChecked
                      ? validationState.nameValid
                        ? "border-green-500 pr-10"
                        : "border-red-500 pr-10"
                      : ""
                  }
                />
                {validationState.nameChecked && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {validationState.nameValid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {validationState.nameChecked && (
                <p
                  className={
                    validationState.nameValid
                      ? "text-sm text-green-500"
                      : "text-sm text-red-500"
                  }
                >
                  {validationState.nameMessage}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="flex">
                邮箱 <span className="ml-1 text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="flex">
                密码 <span className="ml-1 text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="输入您的密码（至少8个字符，包含大写字母）"
                  required
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({ ...formValues, password: e.target.value })
                  }
                  className={
                    validationState.passwordChecked
                      ? validationState.passwordValid
                        ? "border-green-500 pr-10"
                        : "border-red-500 pr-10"
                      : ""
                  }
                />
                {validationState.passwordChecked && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {validationState.passwordValid ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {validationState.passwordChecked && (
                <p
                  className={
                    validationState.passwordValid
                      ? "text-sm text-green-500"
                      : "text-sm text-red-500"
                  }
                >
                  {validationState.passwordStrength}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="flex">
                确认密码 <span className="ml-1 text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="再次输入您的密码"
                  required
                  value={formValues.confirmPassword}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={
                    validationState.passwordsChecked
                      ? validationState.passwordsMatch
                        ? "border-green-500 pr-10"
                        : "border-red-500 pr-10"
                      : ""
                  }
                />
                {validationState.passwordsChecked && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {validationState.passwordsMatch ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {validationState.passwordsChecked &&
                !validationState.passwordsMatch && (
                  <p className="text-sm text-red-500">两次输入的密码不一致</p>
                )}
              {validationState.passwordsChecked &&
                validationState.passwordsMatch && (
                  <p className="text-sm text-green-500">密码输入一致</p>
                )}
            </div>
            {error && <div className="text-sm text-red-500">{error}</div>}

            <div className="flex items-start space-x-2">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                />
              </div>
              <div className="text-sm">
                <label
                  htmlFor="terms"
                  className="text-gray-700 dark:text-gray-300"
                >
                  我已阅读并同意 <span className="text-red-500">*</span>
                  <Link
                    href="/terms"
                    className="text-primary ml-1 hover:underline"
                    target="_blank"
                  >
                    网站使用条款
                  </Link>
                </label>
              </div>
            </div>

            <Button
              className="hover:bg-primary/90 active:bg-primary/70 w-full transition-colors"
              type="submit"
              disabled={isLoading || !agreedToTerms || !allFieldsFilled}
            >
              {isLoading ? "注册中..." : "注册"}
            </Button>
            <div className="mt-4 flex items-center justify-center text-sm">
              <Link href="/sign-in" className="text-primary hover:underline">
                已有账号？前去登录
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

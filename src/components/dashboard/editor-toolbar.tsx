"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { api } from "@/trpc/react"; // 导入 tRPC 客户端

// 类型导入
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

// 动态导入编辑器组件，禁用SSR
import '@wangeditor/editor/dist/css/style.css'

const Editor = dynamic(
  () => import('@wangeditor/editor-for-react').then(mod => mod.Editor),
  { ssr: false }
)

const Toolbar = dynamic(
  () => import('@wangeditor/editor-for-react').then(mod => mod.Toolbar),
  { ssr: false }
)

type EditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, placeholder = "请输入内容..." }: EditorProps) {
  // 编辑器实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  
  // 使用 tRPC 上传图片的 mutation
  const uploadImageMutation = api.upload.uploadImage.useMutation();

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: []
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: placeholder,
    MENU_CONF: {
      uploadImage: {
        // 自定义上传函数
        customUpload: async (file: File, insertFn: (url: string, alt: string, href: string) => void) => {
          try {
            // 将文件转换为 base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const base64 = reader.result as string;
              
              // 调用 tRPC mutation 上传图片
              const result = await uploadImageMutation.mutateAsync({
                image: base64,
                fileName: file.name,
              });
              
              // 插入图片到编辑器
              insertFn(result.url, result.alt, result.url);
            };
          } catch (error) {
            console.error("图片上传失败:", error);
            alert("图片上传失败，请重试");
          }
        },
        // 以下配置在使用 customUpload 时不需要
        // server: '/api/upload-image',
        // fieldName: 'file',
        maxFileSize: 10 * 1024 * 1024, // 10M
        allowedFileTypes: ['image/*'],
        timeout: 15 * 1000, // 15秒
        onSuccess(file: File, res: { url: string; [key: string]: unknown }) {
          console.log(`${file.name} 上传成功`, res)
        },
        onFailed(file: File, res: { url: string; [key: string]: unknown }) {
          console.log(`${file.name} 上传失败`, res)
        },
        onError(file: File, err: Error, res: { url: string; [key: string]: unknown }) {
          console.log(`${file.name} 上传出错`, err, res)
        }
      }
    }
  };

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="border border-input rounded-md overflow-hidden bg-white">
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        className="border-b border-input bg-white"
      />
      <Editor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={editor => onChange(editor.getHtml())}
        mode="default"
        className="prose dark:prose-invert min-h-[150px] px-3 py-2 bg-white"
      />
    </div>
  );
}
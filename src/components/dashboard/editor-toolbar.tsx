"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: []
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: placeholder,
    MENU_CONF: {}
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
        className="border-b border-input bg-white"  // 添加 bg-white
      />
      <Editor
        defaultConfig={editorConfig}
        value={value}
        onCreated={setEditor}
        onChange={editor => onChange(editor.getHtml())}
        mode="default"
        className="prose dark:prose-invert min-h-[150px] px-3 py-2 bg-white"  // 添加 bg-white
      />
    </div>
  );
}
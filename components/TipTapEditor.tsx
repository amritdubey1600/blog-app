'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useEffect, useState, useRef } from 'react';
import { ToolbarButton, ToolbarSeparator } from '@/lib/toolbarHelpers';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Type,
  Minus,
  Minimize2,
  Maximize2,
  Link,
  Upload,
  Undo,
  Redo
} from 'lucide-react';

export default function TipTapEditor({ value, onChange }: {
  value: string,
  onChange: (html: string) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm',
        },
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none p-4 min-h-[200px]',
      },
    },
  });

  // Sync external value into editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when in fullscreen
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [value, editor, isFullscreen]);

  // Handle image upload from file
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 1024 * 1024) {
      alert('Image size should be less than 1MB');
      return;
    }

    // Converted to base64 for demo purposes
    // In production this needs to be uploaded to a server/cloud storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      editor.chain().focus().setImage({ src: imageUrl }).run();
    };
    reader.readAsDataURL(file);

    // Reset file input
    event.target.value = '';
  };

  // Handle image from URL
  const handleImageFromUrl = () => {
    if (!editor) return;
    
    const url = prompt('Enter image URL:');
    if (url) {
      // Basic URL validation
      try {
        new URL(url);
        editor.chain().focus().setImage({ src: url }).run();
      } catch {
        alert('Please enter a valid URL');
      }
    }
  };

  if (!editor) {
    return (
      <div className="border border-slate-300 rounded-lg bg-white">
        <div className="border-b border-slate-200 p-3 bg-slate-50 rounded-t-lg">
          <div className="h-8 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="p-4 min-h-[200px] bg-slate-50 animate-pulse rounded-b-lg" />
      </div>
    );
  }

  return (
    <div
      className={`border border-slate-300 rounded-lg bg-white overflow-hidden transition-all duration-300 ease-in-out ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] bg-white rounded-none shadow-2xl flex flex-col' 
          : ''
      }`}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="border-b border-slate-200 p-3 bg-slate-50 flex flex-wrap items-center gap-1 flex-shrink-0">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Paragraph */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Paragraph"
        >
          <Type className="h-4 w-4" />
        </ToolbarButton>

        {/* Block Elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Image Options */}
        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
        >
          <Upload className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={handleImageFromUrl}
          title="Add Image from URL"
        >
          <Link className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarSeparator />

        <ToolbarButton
          onClick={() => setIsFullscreen(prev => !prev)}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </ToolbarButton>
      </div>

      {/* Editor Content */}
      <div className={`bg-white ${isFullscreen ? 'flex-1 overflow-hidden' : ''}`}>
        <EditorContent 
          editor={editor}
          className={`${
            isFullscreen 
              ? 'h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror_img]:cursor-pointer [&_.ProseMirror_img]:border-2 [&_.ProseMirror_img]:border-transparent [&_.ProseMirror_img:hover]:border-emerald-300' 
              : 'min-h-[350px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[350px] [&_.ProseMirror]:p-4 [&_.ProseMirror_img]:cursor-pointer [&_.ProseMirror_img]:border-2 [&_.ProseMirror_img]:border-transparent [&_.ProseMirror_img:hover]:border-emerald-300'
          }`}
        />
      </div>

      <div className="flex justify-between border-t border-slate-200 px-4 py-2 bg-slate-50 text-xs text-slate-500 flex-shrink-0">
        <p>💡 <strong>Image tips:</strong> Upload files up to 1MB or paste image URLs. Click on images to select/delete them.</p>
        {isFullscreen && <span className="ml-4 hidden sm:visible">Press <kbd className="px-1 py-0.5 bg-slate-200 rounded text-xs">Esc</kbd> to exit fullscreen</span>}
      </div>
    </div>
  );
}
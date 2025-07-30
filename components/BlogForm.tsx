"use client";

import { blogType } from "@/app/blogs/page";
import { useState } from "react";
import { PenTool, User, FileText, BookOpen, Send, AlertCircle, Info, Eye, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/firestoreFunctions";
import ReactMarkdown from 'react-markdown';

const BlogForm = () => {
  const [formData, setFormData] = useState<Omit<blogType, "id" | "date">>({
    title: "",
    author: "",
    summary: "",
    content: ""
  });
  const [err, setErr] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'write' | 'preview'>('write');

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (err) setErr("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErr("");

    try {
      const id = await addBlog(
        formData.title,
        formData.author,
        formData.summary,
        formData.content
      );

      // Navigate to the new blog page after successful submission
      router.push(`/blogs/${id}`);
    } catch (error) {
      console.error("Error adding blog:", error);
      setErr("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-emerald-600 p-3 rounded-xl">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Blog</h1>
          </div>
          <p className="text-slate-600 max-w-xl mx-auto">
            Share your thoughts, stories, and insights with the community
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">

            {/* Error Message */}
            {err && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700 font-medium">{err}</p>
              </div>
            )}

            {/* Title Field */}
            <div className="mb-6">
              <label htmlFor="title" className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Title</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your blog title..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Author Row */}
            <div className="mb-6">
              <label htmlFor="author" className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                <User className="h-4 w-4 text-emerald-600" />
                <span>Author</span>
              </label>
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Summary Field */}
            <div className="mb-6">
              <label htmlFor="summary" className="flex items-center space-x-2 text-slate-700 font-semibold mb-3">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>Summary</span>
              </label>
              <input
                type="text"
                name="summary"
                id="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief description of your blog..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Content Field with Tabs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center space-x-2 text-slate-700 font-semibold">
                  <PenTool className="h-4 w-4 text-emerald-600" />
                  <span>Content</span>
                </label>
                
                {/* Tab Toggle */}
                <div className="flex bg-slate-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('write')}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      previewMode === 'write'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('preview')}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      previewMode === 'preview'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="border border-slate-300 rounded-lg overflow-hidden">
                {previewMode === 'write' ? (
                  <textarea
                    name="content"
                    id="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your blog content here..."
                    rows={8}
                    className="w-full px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-y min-h-[200px] border-0"
                    required
                  />
                ) : (
                  <div className="prose prose-slate max-w-none p-4 bg-slate-50 min-h-[200px]">
                    {formData.content ? (
                      <ReactMarkdown>{formData.content}</ReactMarkdown>
                    ) : (
                      <p className="text-slate-400 italic">Nothing to preview yet. Switch to Write tab to add content.</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <p className="flex items-center text-xs font-bold text-slate-500 gap-1">
                  <Info className="h-4 w-4" />
                  Supports Markdown Syntax
                </p>
                <p className="text-xs text-slate-500">
                  {formData.content.length} characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group bg-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating Blog...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 group-hover:rotate-12" />
                  <span>Publish Blog</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
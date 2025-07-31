"use client";

import { blogType } from "@/app/blogs/page";
import { useState } from "react";
import { PenTool, User, FileText, BookOpen, Send, AlertCircle, ImageIcon, X, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { addBlog } from "@/lib/firestoreFunctions";
import dynamic from "next/dynamic";
import BlogFormHeader from "./BlogFormHeader";
import Image from "next/image";

const TipTapEditor = dynamic(() => import('./TipTapEditor'), { ssr: false })

const BlogForm = () => {
  const [formData, setFormData] = useState<Omit<blogType, "id" | "date">>({
    image:"",
    title: "",
    author: "",
    summary: "",
    content: ""
  });
  const [err, setErr] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErr("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErr("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setFormData(prev => ({
        ...prev,
        image: base64String
      }));
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
    
    // Clear error if it was related to image
    if (err) setErr("");
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    setImagePreview("");
    // Reset the file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErr("");

    try {
      const id = await addBlog(
        formData.image,
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

  // Function to get text content from HTML (for accurate character count)
  const getTextContent = (html: string): string => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return html;
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  // Function to count words from HTML content
  const getWordCount = (html: string): number => {
    const textContent = getTextContent(html);
    return textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlogFormHeader />

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 border-b border-emerald-100">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <span>Blog Details</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">

            {/* Error Message */}
            {err && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 font-medium">{err}</p>
              </div>
            )}

            {/* Form Grid - Row 1: Title and Author */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <span>Blog Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your blog title..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              {/* Author Field */}
              <div>
                <label htmlFor="author" className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Row 2: Summary Field - Full Width with More Height */}
            <div className="mb-8">
              <label htmlFor="summary" className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>Summary</span>
              </label>
              <textarea
                name="summary"
                id="summary"
                rows={4}
                value={formData.summary}
                onChange={handleChange}
                placeholder="A quick preview of what this blog post covers to hook readers and drive engagement..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical min-h-[120px]"
                required
              />
              <div className="mt-2 text-xs text-gray-500">
                {formData.summary.length}/150 characters recommended
              </div>
            </div>

            {/* Image Upload Field */}
            <div className="mb-8">
              <label htmlFor="image" className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <ImageIcon className="h-4 w-4 text-emerald-600" />
                <span>Featured Image</span>
              </label>
              
              {!imagePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={800}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Field */}
            <div className="mb-8">
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <PenTool className="h-4 w-4 text-emerald-600" />
                <span>Content</span>
              </label>

              <TipTapEditor
                value={formData.content}
                onChange={(html) =>
                  setFormData((prev) => ({ ...prev, content: html }))
                }
              />
              
              {/* Stats */}
              <div className="flex items-center mt-3 justify-between px-2">
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="bg-slate-100 px-2 py-1 rounded-full">
                    {getWordCount(formData.content)} words
                  </span>
                  <span className="bg-slate-100 px-2 py-1 rounded-full">
                    {getTextContent(formData.content).length} characters
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {formData.content ? "Content added ✓" : "Content required"}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-emerald-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
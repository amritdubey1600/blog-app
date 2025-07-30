import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock } from 'lucide-react';
import { blogType } from '../page';
import ReactMarkdown from 'react-markdown';
import { getBlog } from '@/lib/firestoreFunctions';

export default async function Blog({params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    const blog: blogType | undefined = await getBlog(id);

    if(!blog) notFound();

    // Calculate reading time (assuming 200 words per minute)
    const wordCount = blog.content.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Article Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        {blog.title}
                    </h1>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-slate-600 text-sm mb-6">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-emerald-600" />
                            <span className="font-medium">{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-emerald-600" />
                            <time dateTime={blog.date}>
                                {new Date(blog.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </time>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-emerald-600" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                        <p className="text-lg text-slate-700 leading-relaxed italic">
                            {blog.summary}
                        </p>
                    </div>
                </header>

                {/* Article Body */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                            <ReactMarkdown>{blog.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* Article Footer */}
                <footer className="mt-12 pt-8 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-emerald-100 p-3 rounded-full">
                                <User className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Written by {blog.author}</p>
                                <p className="text-sm text-slate-600">
                                    Published on {new Date(blog.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                        
                        <Link 
                            href="/blogs" 
                            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                        >
                            <span>View All Blogs</span>
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
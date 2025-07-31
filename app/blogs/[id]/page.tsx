import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock } from 'lucide-react';
import { blogType } from '../page';
import { getBlog } from '@/lib/firestoreFunctions';

export default async function Blog({params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    const blog: blogType | undefined = await getBlog(id);

    if(!blog) notFound();

    // Function to get text content from HTML for word count calculation
    const getTextFromHTML = (html: string): string => {
        // Remove HTML tags for word counting
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    // Calculate reading time (assuming 200 words per minute)
    const textContent = getTextFromHTML(blog.content);
    const wordCount = textContent.split(' ').filter(word => word.length > 0).length;
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
                    <div className="prose prose-slate prose-lg max-w-none 
                                    prose-headings:text-slate-900 prose-headings:font-bold
                                    prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8
                                    prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-6
                                    prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-5
                                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
                                    prose-strong:text-slate-900 prose-strong:font-semibold
                                    prose-em:text-slate-700 prose-em:italic
                                    prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                    prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
                                    prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
                                    prose-li:mb-1 prose-li:text-slate-700
                                    prose-hr:border-slate-300 prose-hr:my-8
                                    prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:max-w-full">
                        <div 
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            className="text-slate-700 leading-relaxed"
                        />
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
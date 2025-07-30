'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Search, X } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import NoBlogs from './NoBlogs';
import NoSearchResults from './NoSearchResults';

export interface blogType{
    id: string;
    title: string;
    author: string;
    date: string;
    summary: string;
    content: string;
};

interface BlogsPageProps {
    initialBlogs: blogType[];
}

export default function BlogsPage({ initialBlogs }: BlogsPageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState<'title' | 'author' | 'content'>('title');

    // Filter blogs based on search term and search type
    const filteredBlogs = useMemo(() => {
        if (!searchTerm.trim()) return initialBlogs;

        return initialBlogs.filter(blog => {
            const term = searchTerm.toLowerCase();
            
            switch (searchBy) {
                case 'title':
                    return blog.title.toLowerCase().includes(term);
                case 'author':
                    return blog.author.toLowerCase().includes(term);
                case 'content':
                    return blog.title.toLowerCase().includes(term) || 
                           blog.summary.toLowerCase().includes(term) || 
                           blog.content.toLowerCase().includes(term);
                default:
                    return blog.title.toLowerCase().includes(term);
            }
        });
    }, [initialBlogs, searchTerm, searchBy]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section with Integrated Search */}
            <div className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <BookOpen className="h-8 w-8 text-emerald-400" />
                        <h1 className="text-4xl font-bold tracking-tight">All Blogs</h1>
                    </div>
                    <p className="text-slate-300 text-lg mb-10">
                        Discover insights, stories, and ideas from our community of writers
                    </p>

                    {/* Centered Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                          <Search className="h-5 w-5 stroke-white" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search blogs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="block w-full pl-12 pr-12 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-slate-800 outline-none transition-all duration-300 text-lg"
                        />
                        {searchTerm && (
                          <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                          >
                            <X className="h-5 w-5 stroke-current" />
                          </button>
                        )}
                      </div>
                    </div>


                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        <button
                            onClick={() => setSearchBy('title')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                searchBy === 'title'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            }`}
                        >
                            Title
                        </button>
                        <button
                            onClick={() => setSearchBy('author')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                searchBy === 'author'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            }`}
                        >
                            Author
                        </button>
                        <button
                            onClick={() => setSearchBy('content')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                searchBy === 'content'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            }`}
                        >
                            All Content
                        </button>
                    </div>

                    {/* Search Results Info */}
                    {searchTerm && (
                        <div className="text-sm text-slate-300">
                            Found {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} 
                            {searchTerm && ` matching "${searchTerm}"`}
                        </div>
                    )}
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map((blog: blogType) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
                
                {/* Empty State - No Blogs */}
                {initialBlogs.length === 0 && <NoBlogs />}

                {/* Empty State - No Search Results */}
                {initialBlogs.length > 0 && filteredBlogs.length === 0 && searchTerm && (
                    <NoSearchResults searchTerm={searchTerm} clearSearch={clearSearch} />
                )}
            </div>
        </div>
    );
}
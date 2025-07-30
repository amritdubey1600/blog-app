'use client';

import Link from "next/link";
import { PenTool, Home, BookOpen, Plus, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-slate-900 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-emerald-600 p-2 rounded-xl group-hover:bg-emerald-500 transition-colors duration-200 shadow-lg">
                            <PenTool className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Blogger
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-1.5">
                        <Link 
                            href={'/'} 
                            className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                        >
                            <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            href={'/blogs'} 
                            className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                        >
                            <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span>Blogs</span>
                        </Link>
                        <Link 
                            href={'/blogs/form'} 
                            className="flex ml-2 items-center space-x-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group border border-slate-700 hover:border-emerald-500/50"
                        >
                            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
                            <span>Add Blog</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white focus:outline-none transition-colors duration-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="relative w-6 h-6">
                            <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                            <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                menuOpen 
                    ? 'max-h-64 opacity-100' 
                    : 'max-h-0 opacity-0'
            }`}>
                <div className="px-4 pb-4 space-y-2">
                    <Link 
                        href={'/'} 
                        className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:translate-x-1"
                        onClick={() => setMenuOpen(false)}
                    >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                    <Link 
                        href={'/blogs'} 
                        className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:translate-x-1"
                        onClick={() => setMenuOpen(false)}
                    >
                        <BookOpen className="h-4 w-4" />
                        <span>Blogs</span>
                    </Link>
                    <Link 
                        href={'/blogs/form'} 
                        className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700 hover:border-emerald-500/50 transform hover:translate-x-1"
                        onClick={() => setMenuOpen(false)}
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Blog</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
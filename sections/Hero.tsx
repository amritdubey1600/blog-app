import { Star, PenTool, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Hero(){
    return (
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">Welcome to Blogger</span>
            </div>
            
            {/* Hero Title */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Share Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400"> Stories</span>
            </h1>
            
            {/* Hero Subtitle */}
            <p className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              A modern platform where writers connect, ideas flourish, and stories come to life. 
              Join our community of passionate storytellers.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/blogs/form" 
                className="group w-full sm:w-fit justify-center inline-flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <PenTool className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Writing</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                href="/blogs" 
                className="group w-full sm:w-fit justify-center inline-flex items-center space-x-2 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                <BookOpen className="h-5 w-5" />
                <span>Explore Blogs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}
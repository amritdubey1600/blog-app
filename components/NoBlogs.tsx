import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function NoBlogs(){
    return (
        <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No blogs yet</h3>
            <p className="text-slate-500 mb-6">Get started by creating your first blog post</p>
            <Link 
                href="/blogs/form" 
                className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
                <span>Create Blog</span>
                <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    );
}
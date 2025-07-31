import { blogType } from "@/app/blogs/page";
import Link from "next/link";
import Image from "next/image";
import { User, Calendar, ArrowRight } from "lucide-react";

export default function BlogCard({blog}: {blog: blogType}) {
    return (
       <Link 
           href={`blogs/${blog.id}`} 
           key={blog.id}
           className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-emerald-200 overflow-hidden flex flex-col h-full"
       >
           {/* Blog Image */}
           <div className="relative h-48 overflow-hidden">
               <Image
                   src={blog.image || "/api/placeholder/400/200"}
                   alt={blog.title}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-300"
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           </div>

           <div className="p-6 flex-1 flex flex-col">
               {/* Blog Title */}
               <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
                   {blog.title}
               </h2>
               
               {/* Blog Summary */}
               <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                   {blog.summary}
               </p>
               
               {/* Meta Information */}
               <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                   <div className="flex items-center space-x-1">
                       <User className="h-3 w-3" />
                       <span>{blog.author}</span>
                   </div>
                   <div className="flex items-center space-x-1">
                       <Calendar className="h-3 w-3" />
                       <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                           year: 'numeric', 
                           month: 'short', 
                           day: 'numeric' 
                       })}</span>
                   </div>
               </div>
               
               {/* Read More Button */}
               <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700 mt-auto">
                   <span>Read more</span>
                   <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
               </div>
           </div>
           
           {/* Hover Effect Bar */}
           <div className="h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
       </Link>
    );
}
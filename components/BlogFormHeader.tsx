import { PenTool } from "lucide-react";

export default function BlogFormHeader(){
    return (
        <div className="text-center pb-4 sm:pb-8">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg">
              <PenTool className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                Create New Blog
              </h1>
            </div>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Share your thoughts, stories, and insights with the community. Create engaging content that inspires and connects.
          </p>
        </div>
    );
}
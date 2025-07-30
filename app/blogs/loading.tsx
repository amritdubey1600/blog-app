import { BookOpen } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple Icon */}
        <div className="mb-8">
          <div className="bg-emerald-600 p-6 rounded-2xl shadow-sm mx-auto w-fit">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Loading</h2>
          <p className="text-slate-500 text-sm">
            Please wait a moment...
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
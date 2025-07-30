import { Edit3, Heart, Shield } from "lucide-react";

export default function Features(){
    return (
      <section className="py-16 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Why Choose Blogger?
              </h2>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to create, share, and discover amazing content
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="bg-emerald-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <Edit3 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Easy Writing</h3>
              <p className="text-slate-600 leading-relaxed">
                Intuitive editor with clean interface. Focus on your content while we handle the rest.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Community</h3>
              <p className="text-slate-600 leading-relaxed">
                Connect with fellow writers, share ideas, and grow together in our vibrant community.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="bg-purple-100 p-4 rounded-xl w-fit mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Fast & Reliable</h3>
              <p className="text-slate-600 leading-relaxed">
                Lightning-fast performance with reliable hosting. Your content is always accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};
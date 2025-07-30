import { TrendingUp, PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA(){
    return (
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <TrendingUp className="h-16 w-16 mx-auto mb-6 opacity-80" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join thousands of writers who are already sharing their stories and building their audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blogs/form" 
              className="group inline-flex items-center justify-center space-x-2 bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 hover:shadow-lg transition-all duration-300"
            >
              <PenTool className="h-5 w-5" />
              <span>Create Your First Blog</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>  
    );
};
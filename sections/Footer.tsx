import { Heart } from "lucide-react";

export default function Footer(){
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm">
                © 2025 Blogger. All rights reserved.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center">
                Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for writers everywhere
              </p>
            </div>
          </div>
        </footer>
    );
};
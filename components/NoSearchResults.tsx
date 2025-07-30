import { Search, X } from "lucide-react";

interface PropsType{
    searchTerm: string;
    clearSearch: () => void;
};

export default function NoSearchResults({searchTerm, clearSearch}: PropsType) {
    return (
        <div className="text-center py-16">
            <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">No blogs found</h3>
            <p className="text-slate-500 mb-6">
                No blogs match your search for {searchTerm}. Try adjusting your search terms or search criteria.
            </p>
            <button
                onClick={() => clearSearch()}
                className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
                <span>Clear Search</span>
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
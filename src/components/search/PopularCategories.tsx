
import { ChevronDown } from "lucide-react";

interface PopularCategoriesProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export default function PopularCategories({ showFilters, setShowFilters }: PopularCategoriesProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Popular Searches
        </h2>
        <button 
          className="text-primary text-sm hover:underline focus:outline-none"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <>
              Hide Filters
              <ChevronDown className="h-4 w-4 ml-1 inline-block transform rotate-180" />
            </>
          ) : (
            <>
              Show Filters
              <ChevronDown className="h-4 w-4 ml-1 inline-block" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

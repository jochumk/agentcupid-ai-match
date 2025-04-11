
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NoResultsFoundProps {
  resetFilters: () => void;
}

export default function NoResultsFound({ resetFilters }: NoResultsFoundProps) {
  return (
    <div className="bg-white p-8 rounded-lg border text-center">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-medium mb-2">No results found</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        We couldn't find any AI agents that match your current filters. Try broadening your search criteria.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={resetFilters}>
          Clear All Filters
        </Button>
        <Button variant="outline" asChild>
          <Link to="/request-custom-solution">
            Request Custom Solution
          </Link>
        </Button>
      </div>
    </div>
  );
}

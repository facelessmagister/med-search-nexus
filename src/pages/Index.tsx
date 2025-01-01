import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { SearchFilters } from "@/components/SearchFilters";
import { useSearch } from "@/hooks/useSearch";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortOption } from "@/utils/searchRanking";

interface SearchFilters {
  databases: string[];
  yearFrom: string;
  yearTo: string;
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    databases: [],
    yearFrom: "",
    yearTo: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const { 
    results, 
    isLoading, 
    error, 
    currentPage, 
    setCurrentPage,
    sortBy,
    setSortBy 
  } = useSearch(query, filters);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          MedSearch Nexus
        </h1>
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={setQuery} />
          
          <div className="mt-6 flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              {showFilters ? (
                <>Hide Filters <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show Filters <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>
          
          <div className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            showFilters ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}>
            <div className="max-w-xl mx-auto">
              <SearchFilters onFilterChange={setFilters} />
            </div>
          </div>

          <div className="mt-8">
            <SearchResults 
              results={results} 
              isLoading={isLoading} 
              error={error}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onSortChange={setSortBy}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
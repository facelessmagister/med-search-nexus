import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "@/components/SearchResults";
import { SearchFilters } from "@/components/SearchFilters";
import { useSearch } from "@/hooks/useSearch";

const Index = () => {
  const [query, setQuery] = useState("");
  const { results, isLoading, error, currentPage, setCurrentPage } = useSearch(query);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl font-bold text-center mb-8">MedSearch Nexus</h1>
        <SearchBar onSearch={setQuery} />
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <SearchFilters />
            </div>
            <div className="md:col-span-3">
              <SearchResults 
                results={results} 
                isLoading={isLoading} 
                error={error}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import { useState, useEffect } from "react";
import { searchPubMed, PubMedResult } from "../services/pubmedService";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult extends PubMedResult {}

interface SearchFilters {
  databases: string[];
  yearFrom: string;
  yearTo: string;
}

export const useSearch = (query: string, filters?: SearchFilters) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const pubmedResults = await searchPubMed(query, filters);
        setResults(pubmedResults);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An error occurred");
        setError(error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, filters, currentPage, toast]);

  return { results, isLoading, error, currentPage, setCurrentPage };
};
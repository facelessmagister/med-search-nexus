import { useState, useEffect } from "react";
import { searchPubMed, PubMedResult } from "../services/pubmedService";
import { useToast } from "@/components/ui/use-toast";

interface SearchResult extends PubMedResult {}

export const useSearch = (query: string) => {
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
        const pubmedResults = await searchPubMed(query);
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
  }, [query, currentPage, toast]);

  return { results, isLoading, error, currentPage, setCurrentPage };
};
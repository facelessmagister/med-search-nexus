import { useState, useEffect } from "react";

interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // TODO: Implement actual API calls to medical databases
        // This is a mock implementation
        const mockResults: SearchResult[] = [
          {
            id: "1",
            title: "Example Medical Research Paper",
            authors: ["Smith J", "Johnson B"],
            journal: "Journal of Medicine",
            year: "2023",
            volume: "45",
            issue: "2",
            pages: "123-145",
            doi: "10.1234/med.2023.001"
          },
          // Add more mock results as needed
        ];

        setResults(mockResults);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage]);

  return { results, isLoading, error, currentPage, setCurrentPage };
};
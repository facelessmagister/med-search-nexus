import { Card, CardContent } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";

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

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const SearchResults = ({
  results,
  isLoading,
  error,
  currentPage,
  onPageChange,
}: SearchResultsProps) => {
  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCitation = (result: SearchResult) => {
    return `${result.authors.join(", ")}. ${result.title}. ${result.journal}. ${result.year};${result.volume}(${result.issue}):${result.pages}. doi:${result.doi}`;
  };

  return (
    <div className="space-y-6">
      {results.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No results found. Try a different search term.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{result.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatCitation(result)}
                  </p>
                  <button
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                    onClick={() => {/* TODO: Implement citation download */}}
                  >
                    <Download className="h-4 w-4" />
                    Download Citation
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination>
              {/* TODO: Implement pagination controls */}
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};
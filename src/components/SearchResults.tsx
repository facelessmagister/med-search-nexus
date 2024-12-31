import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ExternalLink } from "lucide-react";
import { downloadCitation } from "@/utils/citationUtils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  url?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export const SearchResults = ({
  results,
  isLoading,
  error,
  currentPage,
  onPageChange,
  totalPages = 5,
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
          <Card key={i} className="backdrop-blur-lg bg-background/50 border-primary/20">
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

  const handleDownload = (result: SearchResult, format: 'ris' | 'bibtex') => {
    downloadCitation(result, format);
  };

  const handleVisitWebsite = (result: SearchResult) => {
    const url = result.url || `https://doi.org/${result.doi}`;
    window.open(url, '_blank');
    toast.success("Opening article website in a new tab");
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
              <Card key={result.id} className="backdrop-blur-lg bg-background/50 border-primary/20 hover:bg-background/70 transition-all duration-300">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-primary">{result.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatCitation(result)}
                  </p>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          Download Citation
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDownload(result, 'ris')}>
                          Download RIS
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(result, 'bibtex')}>
                          Download BibTeX
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary flex items-center gap-1"
                      onClick={() => handleVisitWebsite(result)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      onClick={() => onPageChange(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};
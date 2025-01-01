export interface SearchResult {
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
  abstract?: string;
  citationCount?: number;
}

export interface SearchFilters {
  databases: string[];
  yearFrom: string;
  yearTo: string;
}
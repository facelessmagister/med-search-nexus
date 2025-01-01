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
}

export interface SearchFilters {
  databases: string[];
  yearFrom: string;
  yearTo: string;
}
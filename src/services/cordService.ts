import { SearchResult } from './types';

export const searchCORD = async (query: string): Promise<SearchResult[]> => {
  try {
    // Note: This is a placeholder URL - you would need to replace with actual CORD-19 API endpoint
    const response = await fetch(
      `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}+covid&limit=10`
    );
    const data = await response.json();
    
    return data.data.map((paper: any) => ({
      id: paper.paperId,
      title: paper.title,
      authors: paper.authors?.map((author: any) => author.name) || [],
      journal: paper.venue || 'CORD-19',
      year: paper.year?.toString() || '',
      volume: '',
      issue: '',
      pages: '',
      doi: paper.doi || '',
      url: paper.url,
      abstract: paper.abstract,
      citationCount: paper.citationCount,
    }));
  } catch (error) {
    console.error('Error searching CORD-19:', error);
    return [];
  }
};
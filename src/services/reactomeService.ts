import { SearchResult } from './types';

export const searchReactome = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://reactome.org/ContentService/search/query?query=${encodeURIComponent(query)}&cluster=true`
    );
    const data = await response.json();
    
    return data.results.map((item: any) => ({
      id: item.dbId || Math.random().toString(),
      title: item.name || 'Unknown Pathway',
      authors: [],
      journal: 'Reactome Database',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: item.stId || '',
      url: `https://reactome.org/content/detail/${item.stId}`,
      abstract: item.summation || '',
    }));
  } catch (error) {
    console.error('Error searching Reactome:', error);
    return [];
  }
};
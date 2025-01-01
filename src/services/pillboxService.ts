import { SearchResult } from './types';

export const searchPillbox = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`https://pillbox.nlm.nih.gov/REST/search?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    return data.results.map((item: any) => ({
      id: item.id || Math.random().toString(),
      title: item.medicine_name || 'Unknown Medicine',
      authors: [],
      journal: 'Pillbox Database',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: item.url || '',
      abstract: item.description || '',
    }));
  } catch (error) {
    console.error('Error searching Pillbox:', error);
    return [];
  }
};
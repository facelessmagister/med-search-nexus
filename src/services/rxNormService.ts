import { SearchResult } from './types';

export const searchRxNorm = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    if (!Array.isArray(data[3])) return [];
    
    return data[3].map((item: any, index: number) => ({
      id: `rxnorm-${index}`,
      title: item[0],
      authors: [],
      journal: 'RxNorm',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://mor.nlm.nih.gov/RxNav/search?searchBy=String&searchTerm=${encodeURIComponent(item[0])}`,
      abstract: item[1] || '',
    }));
  } catch (error) {
    console.error('Error searching RxNorm:', error);
    return [];
  }
};
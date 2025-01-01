import { SearchResult } from './types';

export const searchClinicalTable = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${encodeURIComponent(query)}&df=primary_name,description,synonyms`
    );
    const data = await response.json();
    
    return data[3].map((item: any, index: number) => ({
      id: `cts-${index}`,
      title: item[0],
      authors: [],
      journal: 'Clinical Table Search Service',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://clinicaltables.nlm.nih.gov/apidoc/conditions/v3/doc.html`,
      abstract: item[1] || '',
    }));
  } catch (error) {
    console.error('Error searching Clinical Table Service:', error);
    return [];
  }
};
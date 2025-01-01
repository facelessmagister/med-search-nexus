import { SearchResult } from './types';

export const searchRxNorm = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    if (!data.idGroup?.rxnormId) return [];

    const rxcui = data.idGroup.rxnormId[0];
    const detailsResponse = await fetch(
      `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/allrelated.json`
    );
    const details = await detailsResponse.json();

    return [{
      id: rxcui,
      title: data.idGroup.name,
      authors: [],
      journal: 'RxNorm',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://mor.nlm.nih.gov/RxNav/search?searchBy=RXCUI&searchTerm=${rxcui}`,
      abstract: details?.allRelatedGroup?.conceptGroup?.[0]?.conceptProperties?.[0]?.name || '',
    }];
  } catch (error) {
    console.error('Error searching RxNorm:', error);
    return [];
  }
};
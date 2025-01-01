import { searchPubMed } from './pubmedService';
import { searchClinicalTrials } from './clinicalTrialsService';
import { searchOpenFDA } from './openFDAService';
import { SearchResult, SearchFilters } from './types';

export const searchAllDatabases = async (
  query: string,
  filters: SearchFilters
): Promise<SearchResult[]> => {
  const selectedDatabases = new Set(filters.databases);
  const searchPromises: Promise<SearchResult[]>[] = [];

  if (selectedDatabases.has('PubMed') || selectedDatabases.size === 0) {
    searchPromises.push(searchPubMed(query, filters));
  }
  
  if (selectedDatabases.has('ClinicalTrials.gov')) {
    searchPromises.push(searchClinicalTrials(query));
  }
  
  if (selectedDatabases.has('OpenFDA')) {
    searchPromises.push(searchOpenFDA(query));
  }

  try {
    const results = await Promise.all(searchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error searching databases:', error);
    throw error;
  }
};
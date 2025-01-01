import { searchPubMed } from './pubmedService';
import { searchPillbox } from './pillboxService';
import { searchReactome } from './reactomeService';
import { SearchResult, SearchFilters } from './types';

export const searchAllDatabases = async (
  query: string,
  filters: SearchFilters
): Promise<SearchResult[]> => {
  const selectedDatabases = new Set(filters.databases);
  const searchPromises: Promise<SearchResult[]>[] = [];

  if (selectedDatabases.size === 0 || selectedDatabases.has('PubMed')) {
    searchPromises.push(searchPubMed(query, filters));
  }
  
  if (selectedDatabases.has('Pillbox')) {
    searchPromises.push(searchPillbox(query));
  }

  if (selectedDatabases.has('Reactome')) {
    searchPromises.push(searchReactome(query));
  }

  try {
    const results = await Promise.all(searchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error searching databases:', error);
    throw error;
  }
};
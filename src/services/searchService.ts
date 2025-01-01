import { searchPubMed } from './pubmedService';
import { searchClinicalTrials } from './clinicalTrialsService';
import { searchOpenFDA } from './openFDAService';
import { searchDailyMed } from './dailyMedService';
import { searchRxNorm } from './rxNormService';
import { searchClinicalTable } from './clinicalTableService';
import { searchCORD } from './cordService';
import { searchMIMIC } from './mimicService';
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
  
  if (selectedDatabases.has('ClinicalTrials.gov')) {
    searchPromises.push(searchClinicalTrials(query));
  }
  
  if (selectedDatabases.has('OpenFDA')) {
    searchPromises.push(searchOpenFDA(query));
  }

  if (selectedDatabases.has('DailyMed')) {
    searchPromises.push(searchDailyMed(query));
  }

  if (selectedDatabases.has('RxNorm')) {
    searchPromises.push(searchRxNorm(query));
  }

  if (selectedDatabases.has('Clinical Table Search')) {
    searchPromises.push(searchClinicalTable(query));
  }

  if (selectedDatabases.has('CORD-19')) {
    searchPromises.push(searchCORD(query));
  }

  if (selectedDatabases.has('MIMIC-IV')) {
    searchPromises.push(searchMIMIC(query));
  }

  try {
    const results = await Promise.all(searchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error searching databases:', error);
    throw error;
  }
};
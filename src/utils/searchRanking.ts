import Fuse from 'fuse.js';
import { SearchResult } from '../services/types';

export interface RankingWeights {
  titleWeight: number;
  abstractWeight: number;
  metadataWeight: number;
}

const DEFAULT_WEIGHTS: RankingWeights = {
  titleWeight: 3,
  abstractWeight: 2,
  metadataWeight: 1,
};

export type SortOption = 'relevance' | 'year' | 'citations' | 'journal';

export const rankSearchResults = (
  results: SearchResult[],
  query: string,
  sortBy: SortOption = 'relevance',
  weights: RankingWeights = DEFAULT_WEIGHTS
): SearchResult[] => {
  if (sortBy === 'year') {
    return [...results].sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  if (sortBy === 'journal') {
    return [...results].sort((a, b) => a.journal.localeCompare(b.journal));
  }

  if (sortBy === 'citations') {
    return [...results].sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
  }

  // Default relevance-based sorting using Fuse.js
  const fuseOptions = {
    keys: [
      { name: 'title', weight: weights.titleWeight },
      { name: 'abstract', weight: weights.abstractWeight },
      { name: 'journal', weight: weights.metadataWeight },
      { name: 'authors', weight: weights.metadataWeight },
    ],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
  };

  const fuse = new Fuse(results, fuseOptions);
  const rankedResults = fuse.search(query);
  
  return rankedResults.map(result => result.item);
};
import axios from 'axios';

const PUBMED_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';

export interface PubMedResult {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}

interface SearchFilters {
  databases: string[];
  yearFrom: string;
  yearTo: string;
}

export const searchPubMed = async (
  query: string,
  filters?: SearchFilters
): Promise<PubMedResult[]> => {
  try {
    let searchTerm = query;

    // Add year range to query if provided
    if (filters?.yearFrom && filters?.yearTo) {
      searchTerm += ` AND ("${filters.yearFrom}"[PDAT] : "${filters.yearTo}"[PDAT])`;
    }

    // Handle boolean operators
    searchTerm = searchTerm
      .replace(/\bAND\b/g, ' AND ')
      .replace(/\bOR\b/g, ' OR ')
      .replace(/\bNOT\b/g, ' NOT ');

    const searchResponse = await axios.get(`${PUBMED_BASE_URL}/esearch.fcgi`, {
      params: {
        db: 'pubmed',
        term: searchTerm,
        retmode: 'json',
        retmax: 10,
      },
    });

    const ids = searchResponse.data.esearchresult.idlist;

    if (!ids.length) return [];

    const summaryResponse = await axios.get(`${PUBMED_BASE_URL}/esummary.fcgi`, {
      params: {
        db: 'pubmed',
        id: ids.join(','),
        retmode: 'json',
      },
    });

    const results = Object.values(summaryResponse.data.result).filter(
      (item: any) => item.uid !== undefined
    );

    return results.map((item: any) => ({
      id: item.uid,
      title: item.title,
      authors: item.authors?.map((author: any) => author.name) || [],
      journal: item.fulljournalname || item.source,
      year: item.pubdate?.split(' ')[0] || '',
      volume: item.volume || '',
      issue: item.issue || '',
      pages: item.pages || '',
      doi: item.elocationid?.replace('doi: ', '') || '',
    }));
  } catch (error) {
    console.error('Error fetching from PubMed:', error);
    throw new Error('Failed to fetch results from PubMed');
  }
};
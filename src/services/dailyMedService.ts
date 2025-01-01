import { SearchResult } from './types';

export const searchDailyMed = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=${encodeURIComponent(query)}&pagesize=10`
    );
    const data = await response.json();
    
    return data.data.map((item: any) => ({
      id: item.setid,
      title: item.drug_name || 'Unknown Drug',
      authors: [],
      journal: 'DailyMed',
      year: new Date(item.published_date).getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${item.setid}`,
      abstract: item.drug_description || '',
    }));
  } catch (error) {
    console.error('Error searching DailyMed:', error);
    return [];
  }
};
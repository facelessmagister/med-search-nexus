import { SearchResult } from './types';

export const searchOpenFDA = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:${encodeURIComponent(query)}&limit=10`
    );
    const data = await response.json();
    
    return data.results.map((result: any) => ({
      id: result.safetyreportid || Math.random().toString(),
      title: result.patient?.drug?.[0]?.medicinalproduct || 'Unknown Drug',
      authors: [],
      journal: 'OpenFDA',
      year: new Date(result.receiptdate).getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://api.fda.gov/drug/event/${result.safetyreportid}.json`,
      abstract: `Reported reactions: ${result.patient?.reaction?.map((r: any) => r.reactionmeddrapt).join(', ')}`,
    }));
  } catch (error) {
    console.error('Error searching OpenFDA:', error);
    return [];
  }
};
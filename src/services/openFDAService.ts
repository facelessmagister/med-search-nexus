import axios from 'axios';
import { SearchResult } from './types';

const OPENFDA_BASE_URL = "https://api.fda.gov/drug/event.json";

export const searchOpenFDA = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(OPENFDA_BASE_URL, {
      params: {
        search: `patient.drug.medicinalproduct:${query}`,
        limit: 10,
      },
    });

    const results = response.data?.results || [];

    return results.map((result: any) => ({
      id: result.safetyreportid || '',
      title: result.patient?.drug?.[0]?.medicinalproduct || 'Untitled Drug Report',
      authors: [],
      journal: 'OpenFDA Drug Events',
      year: new Date(result.receiptdate).getFullYear().toString(),
      volume: 'N/A',
      issue: 'N/A',
      pages: 'N/A',
      doi: '',
      url: `https://api.fda.gov/drug/event/${result.safetyreportid}.json`,
    }));
  } catch (error) {
    console.error('Error fetching from OpenFDA:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch results from OpenFDA: ${error.message}`);
    }
    throw new Error('Failed to fetch results from OpenFDA');
  }
};
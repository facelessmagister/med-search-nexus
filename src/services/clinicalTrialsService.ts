import axios from 'axios';
import { SearchResult } from './types';

const CLINICAL_TRIALS_BASE_URL = "https://clinicaltrials.gov/api/query/study_fields";

export const searchClinicalTrials = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(CLINICAL_TRIALS_BASE_URL, {
      params: {
        expr: query,
        fields: "NCTId,BriefTitle,Condition,LocationCountry,InterventionName,Phase",
        max_rnk: 10,
        fmt: "json",
      },
    });

    const studies = response.data?.StudyFieldsResponse?.StudyFields || [];

    return studies.map((study: any) => ({
      id: study.NCTId?.[0] || '',
      title: study.BriefTitle?.[0] || 'Untitled Trial',
      authors: [], // Clinical trials don't have authors in the same way
      journal: 'ClinicalTrials.gov',
      year: new Date().getFullYear().toString(), // Using current year as trials are ongoing
      volume: study.Phase?.[0] || 'N/A',
      issue: 'N/A',
      pages: 'N/A',
      doi: '',
      url: `https://clinicaltrials.gov/study/${study.NCTId?.[0]}`,
    }));
  } catch (error) {
    console.error('Error fetching from ClinicalTrials.gov:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch results from ClinicalTrials.gov: ${error.message}`);
    }
    throw new Error('Failed to fetch results from ClinicalTrials.gov');
  }
};
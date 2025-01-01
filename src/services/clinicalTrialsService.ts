import { SearchResult } from './types';

export const searchClinicalTrials = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://clinicaltrials.gov/api/query/study_fields?expr=${encodeURIComponent(query)}&fields=NCTId,BriefTitle,Condition,BriefSummary&max_rnk=10&fmt=json`
    );
    const data = await response.json();
    
    const studies = data?.StudyFieldsResponse?.StudyFields || [];
    return studies.map((study: any) => ({
      id: study.NCTId?.[0] || Math.random().toString(),
      title: study.BriefTitle?.[0] || 'Untitled Study',
      authors: [],
      journal: 'ClinicalTrials.gov',
      year: new Date().getFullYear().toString(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      url: `https://clinicaltrials.gov/study/${study.NCTId?.[0]}`,
      abstract: study.BriefSummary?.[0] || '',
    }));
  } catch (error) {
    console.error('Error searching ClinicalTrials.gov:', error);
    return [];
  }
};
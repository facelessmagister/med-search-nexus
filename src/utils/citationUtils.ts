export const generateRISCitation = (result: {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}) => {
  const lines = [
    'TY  - JOUR',
    `TI  - ${result.title}`,
    ...result.authors.map(author => `AU  - ${author}`),
    `JO  - ${result.journal}`,
    `PY  - ${result.year}`,
    `VL  - ${result.volume}`,
    `IS  - ${result.issue}`,
    `SP  - ${result.pages}`,
    `DO  - ${result.doi}`,
    'ER  - '
  ];
  
  return lines.join('\r\n');
};

export const generateBibTeX = (result: {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}) => {
  const id = result.authors[0]?.split(' ')[0] + result.year;
  return `@article{${id},
  title={${result.title}},
  author={${result.authors.join(' and ')}},
  journal={${result.journal}},
  volume={${result.volume}},
  number={${result.issue}},
  pages={${result.pages}},
  year={${result.year}},
  doi={${result.doi}}
}`;
};

export const downloadCitation = (result: {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
}, format: 'ris' | 'bibtex') => {
  const content = format === 'ris' ? generateRISCitation(result) : generateBibTeX(result);
  const extension = format === 'ris' ? 'ris' : 'bib';
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `citation.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
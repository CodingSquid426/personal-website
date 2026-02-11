import React, { useEffect, useState } from 'react';
import Section from './Section';
import { BookOpen, Calendar, Link as LinkIcon, ExternalLink, FileText } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  publicationDate: string;
  doi?: string;
  url: string;
  resourceType?: string;
}

const KnowledgeCommons: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // CHANGE: Fetch from your local API route instead of the external URL
    fetch('/api/papers')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        // Check if hits exist to avoid crashes
        if (!data.hits || !data.hits.hits) {
          setPapers([]);
          setLoading(false);
          return;
        }

        const fetchedPapers = data.hits.hits.map((hit: any) => ({
          id: hit.id,
          title: hit.metadata.title,
          publicationDate: hit.metadata.publication_date,
          doi: hit.pids?.doi?.identifier,
          url: hit.links.self_html,
          resourceType: hit.metadata.resource_type?.title?.en || "Publication"
        }));
        setPapers(fetchedPapers);
        setLoading(false);
      })
      .catch(err => {
        console.error("KCWorks Fetch Error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // DEBUGGING: Show error message if something fails
  if (loading) return <Section id="papers" title="Publications"><div className="text-center p-4">Loading publications...</div></Section>;
  if (error) return <Section id="papers" title="Publications"><div className="text-center p-4 text-red-500">Could not load publications.</div></Section>;
  if (papers.length === 0) return <Section id="papers" title="Publications"><div className="text-center p-4">No publications found for Edward Mason.</div></Section>;

  return (
    <Section 
      id="papers" 
      title="Publications" 
      subtitle="Recent works deposited in Knowledge Commons." 
      className="bg-white"
    >
      <div className="space-y-6">
        {papers.map((paper) => (
          <div key={paper.id} className="group relative pl-8 border-l-2 border-slate-200 hover:border-accent-teal transition-colors">
            
            <div className="absolute -left-[9px] top-0 bg-white">
              <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-accent-teal transition-colors"></div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {paper.publicationDate}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-full text-slate-600">
                    {paper.resourceType}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-oxford transition-colors">
                  <a href={paper.url} target="_blank" rel="noopener noreferrer">
                    {paper.title}
                  </a>
                </h3>

                {paper.doi && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                    <LinkIcon size={14} />
                    <span>DOI: {paper.doi}</span>
                  </div>
                )}
              </div>

              <a 
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-accent-teal hover:text-teal-700 transition-colors"
              >
                View Paper <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default KnowledgeCommons;
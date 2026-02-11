import React, { useEffect, useState } from 'react';
import Section from './Section';
import { Edit3, GitCommit, ArrowRight, Clock } from 'lucide-react';

interface WikiEdit {
  pageid: number;
  title: string;
  timestamp: string;
  comment: string;
  revid: number;
}

const WikipediaEdits: React.FC = () => {
  const [edits, setEdits] = useState<WikiEdit[]>([]);
  const [loading, setLoading] = useState(true);
  const username = "Squid45"; // Your Wikipedia Username

  useEffect(() => {
    // Wikipedia API URL with origin=* to allow CORS
    const apiEndpoint = `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&uclimit=3&ucprop=title|timestamp|comment|ids&format=json&origin=*`;

    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.query && data.query.usercontribs) {
          setEdits(data.query.usercontribs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Wikipedia edits:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (edits.length === 0) return null;

  return (
    <div className="py-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Edit3 size={20} className="text-accent-teal" />
          Wikipedia Edits
        </h3>
        
        <div className="grid gap-4">
          {edits.map((edit) => (
            <a 
              key={edit.revid}
              href={`https://en.wikipedia.org/w/index.php?diff=${edit.revid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white border-l-4 border-slate-300 hover:border-accent-teal rounded shadow-sm hover:shadow-md transition-all group"
            >
              <GitCommit size={18} className="text-slate-400 group-hover:text-accent-teal flex-shrink-0" />
              <div className="flex-grow min-w-0"> {/* min-w-0 ensures truncation works */}
                <div className="flex items-center justify-between mb-1 gap-4">
                  <span className="font-bold text-slate-800 font-mono text-sm truncate">{edit.title}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    <Clock size={10} />
                    {new Date(edit.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-1 italic">
                  {edit.comment ? `"${edit.comment}"` : "Minor edit"}
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-accent-teal -ml-2 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <a 
            href={`https://en.wikipedia.org/wiki/Special:Contributions/${username}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-slate-400 hover:text-accent-teal transition-colors uppercase tracking-wider"
          >
            View all contributions →
          </a>
        </div>
      </div>
    </div>
  );
};

export default WikipediaEdits;
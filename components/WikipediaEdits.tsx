import React from 'react';
import Section from './Section';
import { Edit3, GitCommit, ArrowRight } from 'lucide-react';

const edits = [
  {
    page: "Literary Criticism",
    summary: "Expanded section on Post-Structuralism and added citations for 21st-century interpretations.",
    date: "Recent",
    diffUrl: "https://en.wikipedia.org/wiki/Literary_criticism"
  },
  {
    page: "Ethics of Artificial Intelligence",
    summary: "Clarified definitions regarding algorithmic bias and updated external reading list.",
    date: "Recent",
    diffUrl: "https://en.wikipedia.org/wiki/Ethics_of_artificial_intelligence"
  },
  {
    page: "Modernist Poetry",
    summary: "Minor copyedits and restructuring of the 'Themes' subsection for better readability.",
    date: "Past Year",
    diffUrl: "https://en.wikipedia.org/wiki/Modernist_poetry"
  }
];

const WikipediaEdits: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Edit3 size={20} className="text-accent-teal" />
          Wikipedia Edits
        </h3>
        
        <div className="grid gap-4">
          {edits.map((edit, idx) => (
            <a 
              key={idx}
              href={edit.diffUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white border-l-4 border-accent-teal rounded shadow-sm hover:shadow-md transition-all group"
            >
              <GitCommit size={18} className="text-slate-400 group-hover:text-accent-teal" />
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800 font-mono text-sm">{edit.page}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">{edit.date}</span>
                </div>
                <p className="text-sm text-slate-600">{edit.summary}</p>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-accent-teal -ml-2 opacity-0 group-hover:opacity-100 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WikipediaEdits;
import React from 'react';
import Section from './Section';
import { PenTool, ExternalLink } from 'lucide-react';

const Journalism: React.FC = () => {
  return (
    <Section id="journalism" title="Journalism & Public Writing" subtitle="Synthesizing complexity for broad audiences." className="bg-slate-50">
      <div className="space-y-12">
        
        {/* Newsquest */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-200 pb-12">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Newsquest Media</h3>
            <p className="text-sm text-slate-500 mb-4">Audience: 2 Million | SEO Optimized</p>
            <div className="h-1 w-12 bg-oxford rounded-full"></div>
          </div>
          <div className="md:w-2/3">
             <p className="text-slate-600 mb-4">
               Published 8 articles covering local governance, technology impacts, and community initiatives. Focused on clear communication and search engine optimization to maximize reach and engagement across regional titles.
             </p>
             <a href="#" className="text-accent-teal hover:text-teal-700 font-medium inline-flex items-center gap-1">
               Read Archive <ExternalLink size={14} />
             </a>
          </div>
        </div>

        {/* Aligned AI Blog */}
        <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-200 pb-12">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Aligned AI Blog</h3>
            <p className="text-sm text-slate-500 mb-4">Technical Synthesis</p>
            <div className="h-1 w-12 bg-accent-teal rounded-full"></div>
          </div>
          <div className="md:w-2/3">
             <p className="text-slate-600 mb-4">
               Authored technical deep-dives on "Best-of-N Jailbreaking" and "Concept Extrapolation". 
               Translated complex safety engineering concepts into accessible insights for non-technical stakeholders, investors, and policymakers.
             </p>
             <a href="#" className="text-accent-teal hover:text-teal-700 font-medium inline-flex items-center gap-1">
               Visit Blog <ExternalLink size={14} />
             </a>
          </div>
        </div>

        {/* Open Knowledge / Wikipedia */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-2">Open Knowledge</h3>
            <p className="text-sm text-slate-500 mb-4">Wikipedia & Polypedia</p>
            <div className="h-1 w-12 bg-amber-600 rounded-full"></div>
          </div>
          <div className="md:w-2/3">
             <p className="text-slate-600 mb-4">
               Dedicated to democratizing information. Leveraged the <span className="font-semibold">Polypedia</span> project to generate stub articles for under-represented languages. 
               Active Wikipedia editor contributing to pages on literary criticism and AI ethics.
             </p>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Journalism;
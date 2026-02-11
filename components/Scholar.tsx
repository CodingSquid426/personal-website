import React from 'react';
import Section from './Section';
import { BookOpen, FileText } from 'lucide-react';

const Scholar: React.FC = () => {
  return (
    <Section id="scholar" title="The Scholar" subtitle="Researching the intersection of language, policy, and technology.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Key Paper */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-oxford rounded-full">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-accent-teal uppercase tracking-wide mb-1">Key Paper</h4>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                Using Lexical Overrepresentation in LLMs as a Linguistic Framework for AI Text Detection
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-6 pl-16">
            A comprehensive study proposing new methodologies for detecting machine-generated text by analyzing statistical anomalies in lexical choices, bridging traditional linguistics with modern NLP.
          </p>
          <div className="pl-16">
            <a href="https://independent.academia.edu/EdwardMason18" target="_blank" rel="noopener noreferrer" className="text-oxford font-semibold hover:underline">Read on Academia.edu &rarr;</a>
          </div>
        </div>

        {/* Policy Work */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
             <div className="p-3 bg-amber-50 text-amber-700 rounded-full">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-1">Policy Work</h4>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                UN IGF 2025: Building Digital Governance Together
              </h3>
            </div>
          </div>
          <p className="text-slate-600 mb-6 pl-16">
            Policy Briefing & Workshop Proposal submitted to the United Nations Internet Governance Forum. Outlines frameworks for multi-stakeholder cooperation in regulating generative AI.
          </p>
          <div className="pl-16">
            <a href="#" className="text-oxford font-semibold hover:underline">View Policy Brief &rarr;</a>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Scholar;

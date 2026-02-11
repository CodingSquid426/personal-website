import React from 'react';
import Section from './Section';
import { Mic, TrendingUp, Award } from 'lucide-react';

const Leadership: React.FC = () => {
  return (
    <Section id="leadership" title="Press & Leadership" subtitle="Impact through governance and management." isDark={true}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* UN IGF */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Mic size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold font-serif text-white mb-1">UN Internet Governance Forum</h3>
            <p className="text-accent-teal text-sm font-medium mb-4">Sole Private Sector Representative</p>
            <p className="text-slate-400 text-sm">
              Voted on agenda setting alongside 50+ MPs. Represented private sector interests in high-level multi-stakeholder dialogues regarding digital rights and AI governance.
            </p>
          </div>
        </div>

        {/* Turl Street Orchestra */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold font-serif text-white mb-1">Turl Street Orchestra</h3>
            <p className="text-accent-teal text-sm font-medium mb-4">Treasurer</p>
            <p className="text-slate-400 text-sm">
              Successfully turned a bankruptcy risk into a 49% profit margin through rigorous financial planning, grant applications, and strategic event management.
            </p>
          </div>
        </div>

        {/* School/University */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Award size={100} />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold font-serif text-white mb-1">Honors & Society</h3>
            <p className="text-accent-teal text-sm font-medium mb-4">Oxford & Hampton School</p>
            <ul className="text-slate-400 text-sm space-y-2 list-disc list-inside">
              <li>Hampton School Headmaster’s Prize</li>
              <li>Oxford Law Society Member</li>
              <li>Oxford LGBTQ+ Society Sponsorship Officer</li>
            </ul>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Leadership;
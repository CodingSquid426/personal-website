import React from 'react';
import Section from './Section';
import { Download, Briefcase, GraduationCap } from 'lucide-react';

const timeline = [
  {
    role: "Founder Associate",
    org: "Aligned AI",
    date: "Current",
    desc: "Driving GTM strategy, product compliance, and technical synthesis for AI safety tools.",
    icon: <Briefcase size={20} />
  },
  {
    role: "Private Sector Representative",
    org: "UN Internet Governance Forum",
    date: "2023 - 2025",
    desc: "Voting on agenda setting and representing private sector interests in global digital governance.",
    icon: <Briefcase size={20} />
  },
  {
    role: "BA English Language & Literature",
    org: "University of Oxford",
    date: "Graduated 2024",
    desc: "Specialized in Stylometry, Digital Humanities, and 20th Century Criticism.",
    icon: <GraduationCap size={20} />
  }
];

const Resume: React.FC = () => {
  return (
    <Section id="cv" title="Curriculum Vitae" subtitle="Experience & Education." className="bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12 mb-16">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Dot */}
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-white border-4 border-oxford"></div>
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                   <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1 block">{item.date}</span>
                   <h3 className="text-xl font-bold text-slate-900">{item.role}</h3>
                   <h4 className="text-lg text-accent-teal font-medium mb-2">{item.org}</h4>
                   <p className="text-slate-600 max-w-lg">{item.desc}</p>
                </div>
                <div className="hidden md:block p-3 bg-slate-100 rounded-full text-slate-500">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Action */}
        <div className="bg-oxford text-white p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-2">Download Full Resume</h3>
            <p className="text-blue-200">Get the detailed PDF version of my professional background.</p>
          </div>
          <button className="flex items-center gap-2 bg-white text-oxford px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-sm">
            <Download size={20} />
            Download PDF
          </button>
        </div>

      </div>
    </Section>
  );
};

export default Resume;
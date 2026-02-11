import React from 'react';
import Section from './Section';
import { Code, Database, Shield, Terminal, Globe, Cpu } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    title: "Dissertation: Lexical Overrepresentation in LLMs",
    description: "Analyzed 500 million words using Oxford’s HPC clusters to identify 'AI accents' and hallucinations. Bridged literary stylometry with large-scale data analysis.",
    tags: ["HPC", "Python", "Stylometry", "Research"],
    link: "#",
    linkText: "View Code"
  },
  {
    title: "Polypedia",
    description: "A Python/MySQL translation system hosted on Google Cloud to democratize Wikipedia access for low-resource languages. Designed to lower the barrier to open knowledge.",
    tags: ["Python", "MySQL", "Google Cloud", "Translation"],
    link: "#",
    linkText: "View Code"
  },
  {
    title: "Defence Against the Dark Prompts",
    description: "Engineered the GTM launch and API compliance gating for this AI safety tool at Aligned AI. Focused on robust inputs and adversarial testing.",
    tags: ["AI Safety", "API", "GTM Strategy", "Compliance"],
    link: "#",
    linkText: "View Product"
  }
];

const skills = [
  { name: "Python", icon: <Terminal size={18} /> },
  { name: "MySQL", icon: <Database size={18} /> },
  { name: "HPC Clusters", icon: <Cpu size={18} /> },
  { name: "Google Cloud", icon: <Globe size={18} /> },
  { name: "Stylometry", icon: <Code size={18} /> },
  { name: "React", icon: <Code size={18} /> }
];

const Builder: React.FC = () => {
  return (
    <Section id="builder" title="The Builder" subtitle="Engineering tools for safety, analysis, and access." isDark={true}>
      
      {/* Skills Bar */}
      <div className="flex flex-wrap gap-4 mb-16">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-slate-300 text-sm hover:border-accent-teal hover:text-white transition-colors">
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-accent-teal/50 transition-all hover:shadow-xl group flex flex-col h-full">
            <div className="mb-4">
               {idx === 0 ? <Cpu className="text-accent-teal mb-4" size={32} /> : 
                idx === 1 ? <Globe className="text-accent-teal mb-4" size={32} /> : 
                <Shield className="text-accent-teal mb-4" size={32} /> }
               <h3 className="text-xl font-bold font-serif text-white mb-2">{project.title}</h3>
            </div>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
              {project.description}
            </p>
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs font-mono text-accent-teal bg-accent-teal/10 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-700 hover:bg-accent-teal px-4 py-2 rounded transition-colors w-full justify-center">
                <Code size={16} />
                {project.linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Builder;
import React from 'react';
import Section from './Section';
import { ExternalLink, Calendar, Newspaper } from 'lucide-react';

const articles = [
  {
    id: '21122',
    title: "Can the Cinematic Drama Survive in the Modern Era?",
    date: "April 30, 2022",
    description: "An analysis of the shifting landscape of cinema and the challenges facing serious dramatic storytelling in the age of blockbusters.",
    url: "https://www.london-now.co.uk/young-reporter/21122/",
    image: null // Add image URL here if you have one
  },
  {
    id: '21124', 
    title: "Article Title Needed (April 2022)", // <--- PLEASE UPDATE THIS TITLE
    date: "April 2022",
    description: "Reporting on local events and community initiatives as part of the Young Reporter scheme.",
    url: "https://www.london-now.co.uk/young-reporter/21124/",
    image: null
  },
  {
    id: '19902',
    title: "Wife of Willesden Review: A Delightful Reimagining of a Classic Chaucer Tale",
    date: "Dec 28, 2021",
    description: "Reviewing Zadie Smith’s adaptation of The Wife of Bath, exploring how it bridges contemporary slang with Shakespearean roots.",
    url: "https://www.london-now.co.uk/young-reporter/19902/",
    image: null
  },
  {
    id: '19263',
    title: "Eternals Represents the Next Step Forward for Disney's Diversity",
    date: "Nov 5, 2021",
    description: "Examining Marvel's Eternals as a pivotal moment for representation in mainstream superhero media.",
    url: "https://www.london-now.co.uk/young-reporter/19263/",
    image: null
  },
  {
    id: '19337',
    title: "Article Title Needed (Nov 2021)", // <--- PLEASE UPDATE THIS TITLE
    date: "Nov 2021",
    description: "Coverage of local news and student perspectives for the London Now publication.",
    url: "https://www.london-now.co.uk/young-reporter/19337/",
    image: null
  },
  {
    id: '18897',
    title: "Pledges For The Planet: School Eco-Club Begins Bold Plan of Climate Action",
    date: "Oct 2021",
    description: "Highlighting student-led environmental initiatives and the impact of local eco-clubs on community awareness.",
    url: "https://www.london-now.co.uk/young-reporter/18897/",
    image: null
  }
];

const Journalism: React.FC = () => {
  return (
    <Section 
      id="journalism" 
      title="Journalism" 
      subtitle="Synthesizing complexity for broad audiences." 
      className="bg-slate-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <a 
            key={article.id} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
          >
            {/* Image Header */}
            <div className="h-48 bg-slate-200 overflow-hidden relative flex items-center justify-center">
              {article.image ? (
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-2">
                  <Newspaper size={40} />
                  <span className="text-xs font-semibold uppercase tracking-widest">London Now</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3 uppercase tracking-wider">
                <Calendar size={12} />
                {article.date}
              </div>

              <h3 className="text-lg font-serif font-bold text-slate-900 mb-3 group-hover:text-accent-teal transition-colors line-clamp-3">
                {article.title}
              </h3>

              <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                {article.description}
              </p>

              <div className="flex items-center gap-1 text-sm font-semibold text-accent-teal mt-auto">
                Read Article <ExternalLink size={14} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export default Journalism;
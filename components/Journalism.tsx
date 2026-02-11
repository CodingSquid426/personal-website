import React, { useEffect, useState } from 'react';
import Section from './Section';
import { ExternalLink, Calendar, Globe } from 'lucide-react';

interface Article {
  url: string;
  title: string;
  image: string | null;
  description: string;
  siteName: string;
  date: string;
}

const articleUrls = [
  "https://www.london-now.co.uk/young-reporter/19902/",
  "https://www.london-now.co.uk/young-reporter/21124/",
  "https://www.london-now.co.uk/young-reporter/19337/",
  "https://www.london-now.co.uk/young-reporter/19263/",
  "https://www.london-now.co.uk/young-reporter/18897/",
  "https://www.london-now.co.uk/young-reporter/21122/"
];

const Journalism: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const promises = articleUrls.map(async (url) => {
        try {
          const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
          if (!res.ok) throw new Error('Failed');
          return await res.json();
        } catch (error) {
          console.error(`Error fetching ${url}`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      setArticles(results.filter((a) => a !== null)); // Filter out failed fetches
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <Section 
      id="journalism" 
      title="Journalism" 
      subtitle="Synthesizing complexity for broad audiences." 
      className="bg-slate-50"
    >
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <a 
              key={idx} 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
            >
              {/* Image Header */}
              <div className="h-48 bg-slate-200 overflow-hidden relative">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                    <Globe size={40} />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-oxford shadow-sm">
                  {article.siteName}
                </div>
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
      )}
    </Section>
  );
};

export default Journalism;
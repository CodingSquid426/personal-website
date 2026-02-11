import React, { useEffect, useState } from 'react';
import Section from './Section';
import { Star, GitFork, Book, Calendar, ExternalLink } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  homepage?: string; // Added homepage field
}

const GithubRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'codingsquid426'; 

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=6`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null; 

  return (
    <Section 
      id="github" 
      title="Open Source" 
      subtitle="Latest public repositories and contributions." 
      className="bg-slate-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div 
            key={repo.id} 
            className="group flex flex-col bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-accent-teal transition-all h-full"
          >
            <div className="flex items-center justify-between mb-4">
              <a 
                href={repo.html_url}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-oxford hover:underline"
              >
                <Book size={20} />
                <h3 className="font-serif font-bold truncate max-w-[180px]">{repo.name}</h3>
              </a>
            </div>
            
            {/* Removed h-12 and line-clamp-2 to allow full text preview */}
            <p className="text-slate-600 text-sm mb-6 flex-grow">
              {repo.description || "No description available."}
            </p>

            <div className="mt-auto space-y-4">
              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${repo.language ? 'bg-accent-teal' : 'bg-slate-300'}`}></div>
                    {repo.language || 'Code'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks_count}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-70">
                  <Calendar size={12} />
                  {new Date(repo.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Homepage Link (if available) */}
              {repo.homepage && (
                <div className="pt-4 border-t border-slate-100">
                  <a 
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-accent-teal hover:underline uppercase tracking-wider"
                  >
                    <ExternalLink size={14} />
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default GithubRepos;
import React, { useEffect, useState } from 'react';
import Section from './Section';
import { Star, GitFork, Book, Calendar } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string; // Added created_at to interface if needed for display, though logic uses API sort
}

const GithubRepos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const username = 'codingsquid426'; // CHANGE THIS IF NEEDED

  useEffect(() => {
    // CHANGED: sort=updated -> sort=created to order by creation date
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

  if (loading) return null; // Or a loading spinner if you prefer

  return (
    <Section 
      id="github" 
      title="Open Source" 
      subtitle="Latest public repositories and contributions." 
      className="bg-slate-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <a 
            key={repo.id} 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-accent-teal transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-oxford">
                <Book size={20} />
                <h3 className="font-serif font-bold truncate max-w-[180px]">{repo.name}</h3>
              </div>
            </div>
            
            <p className="text-slate-600 text-sm mb-6 h-12 overflow-hidden line-clamp-2">
              {repo.description || "No description available."}
            </p>

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
                {/* You might want to display created_at here now, or keep updated_at to show activity */}
                {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export default GithubRepos;
import React, { useEffect, useState } from 'react';
import Section from './Section';
import { Edit3, GitCommit, ArrowRight, Clock, Award, FileText, Calendar, Users } from 'lucide-react';

interface WikiEdit {
  pageid: number;
  title: string;
  timestamp: string;
  comment: string;
  revid: number;
}

interface WikiStats {
  editCount: number;
  registrationDate: string;
  groups: string[];
  articlesCreated: number;
}

const WikipediaEdits: React.FC = () => {
  const [edits, setEdits] = useState<WikiEdit[]>([]);
  const [stats, setStats] = useState<WikiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const username = "Squid45"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Recent Edits
        const editsRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&uclimit=3&ucprop=title|timestamp|comment|ids&format=json&origin=*`
        );
        const editsData = await editsRes.json();
        
        // 2. Fetch User Stats (Edit Count, Registration, Groups)
        const userRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=users&ususers=${username}&usprop=editcount|registration|groups&format=json&origin=*`
        );
        const userData = await userRes.json();

        // 3. Fetch "Articles Created" count (limit 500)
        const createdRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&ucshow=new&uclimit=500&format=json&origin=*`
        );
        const createdData = await createdRes.json();

        if (editsData.query?.usercontribs) {
          setEdits(editsData.query.usercontribs);
        }

        if (userData.query?.users?.[0]) {
          const user = userData.query.users[0];
          const createdCount = createdData.query?.usercontribs?.length || 0;
          
          setStats({
            editCount: user.editcount || 0,
            registrationDate: user.registration,
            groups: user.groups || [],
            articlesCreated: createdCount >= 500 ? 500 : createdCount // API limit is 500
          });
        }
      } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return null;
  // Don't return null here if edits are empty, we might still want to show stats if available
  if (!stats && edits.length === 0) return null;

  // Calculate years active
  const yearsActive = stats?.registrationDate 
    ? new Date().getFullYear() - new Date(stats.registrationDate).getFullYear() 
    : 0;

  return (
    <div className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Edit3 size={24} className="text-accent-teal" />
          Wikipedia Contributions
        </h3>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-blue-50 text-oxford rounded-full mb-2">
                <Edit3 size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats.editCount.toLocaleString()}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Edits</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-green-50 text-green-700 rounded-full mb-2">
                <FileText size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">
                {stats.articlesCreated}{stats.articlesCreated >= 500 ? '+' : ''}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Articles Created</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-amber-50 text-amber-700 rounded-full mb-2">
                <Calendar size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{yearsActive} Years</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Since {new Date(stats.registrationDate).getFullYear()}</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-purple-50 text-purple-700 rounded-full mb-2">
                <Award size={20} />
              </div>
              <span className="text-lg font-bold text-slate-900 leading-tight mt-1 mb-1">
                {stats.groups.includes('sysop') ? 'Administrator' : 
                 stats.groups.includes('extendedconfirmed') ? 'Ext. Confirmed' : 
                 'Editor'}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">User Status</span>
            </div>
          </div>
        )}
        
        {/* Recent Edits List */}
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Recent Activity</h4>
        <div className="grid gap-4">
          {edits.map((edit) => (
            <a 
              key={edit.revid}
              href={`https://en.wikipedia.org/w/index.php?diff=${edit.revid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-white border-l-4 border-slate-300 hover:border-accent-teal rounded shadow-sm hover:shadow-md transition-all group"
            >
              <GitCommit size={18} className="text-slate-400 group-hover:text-accent-teal flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1 gap-4">
                  <span className="font-bold text-slate-800 font-mono text-sm truncate">{edit.title}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    <Clock size={10} />
                    {new Date(edit.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-1 italic">
                  {edit.comment ? `"${edit.comment}"` : "Minor edit"}
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-accent-teal -ml-2 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
            </a>
          ))}
        </div>
        
        <div className="mt-6 text-right">
          <a 
            href={`https://en.wikipedia.org/wiki/Special:Contributions/${username}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-slate-400 hover:text-accent-teal transition-colors uppercase tracking-wider"
          >
            View all contributions →
          </a>
        </div>
      </div>
    </div>
  );
};

export default WikipediaEdits;
import React, { useEffect, useState } from 'react';
import { Edit3, GitCommit, ArrowRight, Clock, Award, FileText, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface DailyEdits {
  dateDisplay: string;
  isoDate: string;
  edits: WikiEdit[];
}

const WikipediaEdits: React.FC = () => {
  const [groupedEdits, setGroupedEdits] = useState<DailyEdits[]>([]);
  const [stats, setStats] = useState<WikiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const username = "Squid45"; 

  const toggleDay = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Recent Edits (Increased limit to ensure we span multiple days)
        const editsRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&uclimit=50&ucprop=title|timestamp|comment|ids&format=json&origin=*`
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

        // Process Edits into Days
        if (editsData.query?.usercontribs) {
          const rawEdits: WikiEdit[] = editsData.query.usercontribs;
          
          const groups: Record<string, WikiEdit[]> = {};
          
          rawEdits.forEach(edit => {
            const dateObj = new Date(edit.timestamp);
            const dateKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(edit);
          });

          // Convert to array, sort by date desc, take top 3
          const sortedDays = Object.keys(groups)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .slice(0, 3)
            .map(dateKey => ({
              isoDate: dateKey,
              dateDisplay: new Date(dateKey).toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }),
              edits: groups[dateKey]
            }));

          setGroupedEdits(sortedDays);
          
          // Default expand the most recent day
          if (sortedDays.length > 0) {
            setExpandedDates(new Set([sortedDays[0].isoDate]));
          }
        }

        if (userData.query?.users?.[0]) {
          const user = userData.query.users[0];
          const createdCount = createdData.query?.usercontribs?.length || 0;
          
          setStats({
            editCount: user.editcount || 0,
            registrationDate: user.registration,
            groups: user.groups || [],
            articlesCreated: createdCount >= 500 ? 500 : createdCount
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
  if (!stats && groupedEdits.length === 0) return null;

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
        
        {/* Daily Edits Groups */}
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Recent Activity (Last 3 Active Days)</h4>
        
        <div className="space-y-4">
          {groupedEdits.map((day) => {
            const isExpanded = expandedDates.has(day.isoDate);
            return (
              <div key={day.isoDate} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleDay(day.isoDate)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? <ChevronDown size={20} className="text-slate-400" /> : <ChevronRight size={20} className="text-slate-400" />}
                    <span className="font-bold text-slate-800">{day.dateDisplay}</span>
                  </div>
                  <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded-full">
                    {day.edits.length} edit{day.edits.length !== 1 && 's'}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-slate-100 divide-y divide-slate-100">
                        {day.edits.map((edit) => (
                          <a 
                            key={edit.revid}
                            href={`https://en.wikipedia.org/w/index.php?diff=${edit.revid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors group block"
                          >
                            <GitCommit size={16} className="text-slate-300 group-hover:text-accent-teal flex-shrink-0" />
                            <div className="flex-grow min-w-0">
                              <div className="flex items-center justify-between mb-1 gap-4">
                                <span className="font-medium text-slate-900 text-sm truncate">{edit.title}</span>
                                <span className="flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                                  <Clock size={10} />
                                  {new Date(edit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 italic">
                                {edit.comment ? `"${edit.comment}"` : "Minor edit"}
                              </p>
                            </div>
                            <ArrowRight size={14} className="text-slate-300 group-hover:text-accent-teal opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
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
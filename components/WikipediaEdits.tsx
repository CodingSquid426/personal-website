import React, { useEffect, useState } from 'react';
import Section from './Section';
import { Edit3, GitCommit, ArrowRight, Clock, Award, FileText, Calendar, ChevronDown, ChevronRight, Eye, Star, TrendingUp, BarChart3, Globe } from 'lucide-react';
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

interface FeaturedArticle {
  title: string;
  extract: string;
  imageUrl?: string;
  url: string;
  creationDate: string;
  lifetimeViews: number;
}

const WikipediaEdits: React.FC = () => {
  const [groupedEdits, setGroupedEdits] = useState<DailyEdits[]>([]);
  const [stats, setStats] = useState<WikiStats | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [totalLifetimeViews, setTotalLifetimeViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  
  const username = "Squid45"; 
  const featuredTitles = [
    "The_Muppet_Show_(2026_TV_special)",
    "Star_(Disney+)",
    "Block_by_Block_(program)"
  ];

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
        // --- 1. Basic User Stats & Recent Edits ---
        const editsRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&uclimit=50&ucprop=title|timestamp|comment|ids&format=json&origin=*`
        );
        const editsData = await editsRes.json();
        
        const userRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=users&ususers=${username}&usprop=editcount|registration|groups&format=json&origin=*`
        );
        const userData = await userRes.json();

        // --- 2. Created Articles (for Count & Lifetime Views) ---
        const createdRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=usercontribs&ucuser=${username}&ucshow=new&ucnamespace=0&uclimit=500&format=json&origin=*`
        );
        const createdData = await createdRes.json();
        const createdArticles = createdData.query?.usercontribs || [];

        // --- 3. Calculate Lifetime Views (Impact) ---
        const todayStr = new Date().toISOString().slice(0,10).replace(/-/g,'');
        
        const viewPromises = createdArticles.map(async (article: any) => {
          try {
            const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(article.title)}/monthly/2015010100/${todayStr}00`;
            const res = await fetch(url);
            if (!res.ok) return 0;
            const data = await res.json();
            return data.items ? data.items.reduce((acc: number, item: any) => acc + item.views, 0) : 0;
          } catch (e) {
            return 0;
          }
        });

        const viewsResults = await Promise.all(viewPromises);
        const totalViews = viewsResults.reduce((acc, views) => acc + views, 0);
        setTotalLifetimeViews(totalViews);

        // --- 4. Process Recent Edits Groups ---
        if (editsData.query?.usercontribs) {
          const rawEdits: WikiEdit[] = editsData.query.usercontribs;
          const groups: Record<string, WikiEdit[]> = {};
          
          rawEdits.forEach(edit => {
            const dateObj = new Date(edit.timestamp);
            const dateKey = dateObj.toISOString().split('T')[0];
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(edit);
          });

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
          if (sortedDays.length > 0) setExpandedDates(new Set([sortedDays[0].isoDate]));
        }

        // --- 5. Set Stats State ---
        if (userData.query?.users?.[0]) {
          const user = userData.query.users[0];
          setStats({
            editCount: user.editcount || 0,
            registrationDate: user.registration,
            groups: user.groups || [],
            articlesCreated: createdArticles.length >= 500 ? 500 : createdArticles.length
          });
        }

        // --- 6. Fetch Featured Articles Details ---
        const featuredData = await Promise.all(featuredTitles.map(async (title) => {
          try {
            // Fetch metadata + list of images on page
            const metaUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts|pageimages|info|revisions|images&titles=${encodeURIComponent(title)}&pithumbsize=600&exintro&explaintext&inprop=url&rvlimit=1&rvdir=newer&rvprop=timestamp`;
            const metaRes = await fetch(metaUrl);
            const metaJson = await metaRes.json();
            
            const pageId = Object.keys(metaJson.query.pages)[0];
            const page = metaJson.query.pages[pageId];
            if (page.missing) return null;

            let imageUrl = page.thumbnail?.source;

            // Fallback: If no main thumbnail, try to find a valid content image
            if (!imageUrl && page.images && page.images.length > 0) {
              try {
                // Filter out icons, logos, maintenance templates, etc.
                const badKeywords = ['icon', 'logo', 'symbol', 'flag', 'edit', 'stub', 'ambox', 'lock', 'wikiproject'];
                
                // Find the first image that doesn't contain bad keywords
                const validImage = page.images.find((img: any) => {
                  const lowerTitle = img.title.toLowerCase();
                  return !badKeywords.some(keyword => lowerTitle.includes(keyword)) && 
                         (lowerTitle.endsWith('.jpg') || lowerTitle.endsWith('.png'));
                });

                if (validImage) {
                  const imgInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(validImage.title)}`;
                  const imgInfoRes = await fetch(imgInfoUrl);
                  const imgInfoJson = await imgInfoRes.json();
                  const imgPageId = Object.keys(imgInfoJson.query.pages)[0];
                  const imgInfo = imgInfoJson.query.pages[imgPageId];
                  
                  if (imgInfo?.imageinfo?.[0]?.url) {
                    imageUrl = imgInfo.imageinfo[0].url;
                  }
                }
              } catch (e) {
                console.warn("Could not fetch fallback image for", title);
              }
            }

            // Lifetime Views
            const viewsUrl = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(title)}/monthly/2015070100/${todayStr}00`;
            const viewsRes = await fetch(viewsUrl);
            const viewsJson = await viewsRes.json();
            const lifetimeViews = viewsJson.items ? viewsJson.items.reduce((acc: number, item: any) => acc + item.views, 0) : 0;

            return {
              title: page.title,
              extract: page.extract,
              imageUrl: imageUrl,
              url: page.fullurl,
              creationDate: page.revisions?.[0]?.timestamp,
              lifetimeViews
            } as FeaturedArticle;

          } catch (error) {
            console.error(`Error fetching featured article ${title}:`, error);
            return null;
          }
        }));

        setFeaturedArticles(featuredData.filter((art): art is FeaturedArticle => art !== null));

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
    <Section 
      id="wikipedia-edits" 
      title="Digital Volunteering" 
      subtitle="Democratizing access to information through strategic contributions to the world's largest open-source encyclopedia."
      className="bg-slate-50"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Prominent Lifetime Views Box */}
        <div className="bg-slate-900 rounded-xl p-8 mb-10 shadow-xl border border-slate-800 text-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <BarChart3 className="w-full h-full text-accent-teal transform scale-150 translate-y-10" />
           </div>
           
           <div className="relative z-10 flex flex-col items-center">
             <div className="p-3 bg-slate-800 rounded-full mb-4 border border-slate-700 text-accent-teal">
               <TrendingUp size={32} />
             </div>
             
             <motion.span 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2"
             >
               {totalLifetimeViews > 0 ? totalLifetimeViews.toLocaleString() : "Loading..."}
             </motion.span>
             
             <span className="text-lg md:text-xl text-slate-400 font-medium">
               Lifetime Views <span className="text-slate-600 text-sm">(Created Articles)</span>
             </span>
           </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-accent-teal/50 transition-colors">
              <div className="p-2 bg-blue-50 text-oxford rounded-full mb-2">
                <Edit3 size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats.editCount.toLocaleString()}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Edits</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-accent-teal/50 transition-colors">
              <div className="p-2 bg-green-50 text-green-700 rounded-full mb-2">
                <FileText size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">
                {stats.articlesCreated}{stats.articlesCreated >= 500 ? '+' : ''}
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Articles Created</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-accent-teal/50 transition-colors">
              <div className="p-2 bg-amber-50 text-amber-700 rounded-full mb-2">
                <Calendar size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-900">{yearsActive} Years</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Since {new Date(stats.registrationDate).getFullYear()}</span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center text-center hover:border-accent-teal/50 transition-colors">
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
        
        {/* Recent Activity */}
        <div className="mb-16">
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
        </div>

        {/* Featured Contributions */}
        {featuredArticles.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
               <Star size={16} className="text-amber-500" />
               Featured (Articles Created & Edited)
            </h4>
            <div className="grid grid-cols-1 gap-8">
              {featuredArticles.map((article) => (
                <div key={article.title} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/3 h-48 md:h-auto bg-slate-100 relative p-4 flex items-center justify-center">
                    {article.imageUrl ? (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-300">
                        <FileText size={48} />
                      </div>
                    )}
                    {/* Lifetime Views Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-slate-900 z-10">
                      <Eye size={16} className="text-accent-teal" />
                      <div className="flex flex-col leading-none">
                         <span className="text-sm font-bold">{article.lifetimeViews.toLocaleString()}</span>
                         <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Lifetime Views</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:w-2/3 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">
                        <Calendar size={12} />
                        Created {new Date(article.creationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {article.extract}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 flex items-center justify-end">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-bold text-accent-teal hover:underline uppercase tracking-wider"
                      >
                        Read Article <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-right">
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
    </Section>
  );
};

export default WikipediaEdits;
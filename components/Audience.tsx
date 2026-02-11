import React from 'react';
import Section from './Section';
import { Smartphone, TrendingUp, Users, Heart, Play, BarChart2, ExternalLink } from 'lucide-react';

const contentStats = [
  {
    label: "Followers",
    value: "100+", // Update this with your actual follower count
    icon: <Users size={20} />
  },
  {
    label: "Total Likes",
    value: "1K+", // Update this with your actual total likes
    icon: <Heart size={20} />
  },
  {
    label: "Yearly Views",
    value: "117k", // Update based on your analytics
    icon: <BarChart2 size={20} />
  }
];

const topVideos = [
  {
    id: 1,
    title: "A Thousand Splendid Suns: Narrative Analysis",
    views: "262.2K",
    date: "January 2024",
    analysis: "Leveraged the #BookTok trend for historical fiction to drive engagement on feminist literature. Analyzed Hosseini's narrative structure, resulting in over 3,900 saves and high shareability.",
    link: "https://www.tiktok.com/@squidreads/video/7319225989282745632" 
  },
  {
    id: 2,
    title: "Ready Player Two: Sequel Critique",
    views: "50.1K",
    date: "January 2024",
    analysis: "Critiqued the sequel to a major sci-fi franchise, engaging with a highly active fan community. Facilitated debate on the evolution of cyberpunk tropes in modern media.",
    link: "https://www.tiktok.com/@squidreads/video/7319488631901572384"
  },
  {
    id: 3,
    title: "Hunger Games: Satire & Trend Cycle",
    views: "10K",
    date: "January 2025",
    analysis: "Satirical commentary on YA dystopian franchise expansion. Utilized viral audio formats to maximize algorithmic reach and spark community discussion on 'franchise fatigue'.",
    link: "https://www.tiktok.com/@squidreads/video/7593354820128427286"
  }
];

const Audience: React.FC = () => {
  return (
    <Section 
      id="audience" 
      title="Digital Engagement" 
      subtitle="Translating academic concepts for mass-market audiences." 
      isDark={true}
    >
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Column: Context & Stats */}
        <div className="lg:w-1/3 space-y-8">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-pink-600 rounded-lg text-white">
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif">@squidreads</h3>
                <p className="text-pink-400 text-sm font-medium">Content Strategy & Growth</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Leveraging algorithmic trends to promote literacy and critical thinking. My channel focuses on making high-level literary criticism accessible, demonstrating the ability to communicate complex ideas to Gen Z audiences at scale.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {contentStats.map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3 text-slate-300">
                    {stat.icon}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
               <a 
                 href="https://www.tiktok.com/@squidreads" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 font-bold py-3 rounded hover:bg-slate-200 transition-colors"
               >
                 View Channel <ExternalLink size={16} />
               </a>
            </div>
          </div>
        </div>

        {/* Right Column: Top Performing Content */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {topVideos.map((video) => (
            <div key={video.id} className="group relative h-full">
              {/* Phone Frame Aesthetic */}
              <div className="absolute inset-0 bg-slate-800 rounded-[2rem] border-8 border-slate-900 shadow-2xl -z-10"></div>
              
              <div className="h-full p-6 pt-12 pb-12 flex flex-col relative z-10">
                {/* Screen Header */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-1 bg-slate-700 rounded-full"></div>
                </div>

                <div className="mb-4">
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{video.date}</span>
                   <h4 className="text-lg font-bold text-white leading-tight mt-1 group-hover:text-pink-500 transition-colors">
                     {video.title}
                   </h4>
                </div>

                {/* Metric Hero */}
                <div className="py-6 border-y border-slate-700/50 my-4">
                  <div className="flex items-center gap-2 text-3xl font-bold text-white">
                    <Play size={24} className="fill-current text-pink-500" />
                    {video.views}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Lifetime Views</p>
                </div>

                <div className="flex-grow">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <span className="text-accent-teal font-bold text-xs uppercase block mb-1">Analysis</span>
                    {video.analysis}
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                   <a href={video.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-700 rounded-full text-white hover:bg-pink-600 transition-colors">
                     <ExternalLink size={16} />
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
};

export default Audience;
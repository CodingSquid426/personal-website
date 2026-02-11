import React from 'react';
import Section from './Section';
import { Newspaper, ExternalLink, Calendar, Award, Megaphone, Tv, Radio, PlayCircle } from 'lucide-react';

const pressItems = [
  {
    id: 'holles-2024',
    title: "Oxford University Lowdown: Guest Speaker",
    source: "Holles Connect (LEH)",
    date: "March 11, 2024",
    description: "Featured as a special guest at the Oxford University Lunch, advising Sixth Form pupils on undergraduate life and course selection.",
    url: "https://www.hollesconnect.org.uk/news/alumnae-news/537/537-Oxford-University-Lowdown-",
    icon: Megaphone
  },
  {
    id: 'ouccc-2023',
    title: "II-IVs Varsity 2023 Match Report",
    source: "Oxford University Cross Country Club",
    date: "November 30, 2023",
    description: "Detailed coverage of the Varsity match where the Oxford team secured a 3-2 victory over Cambridge at Priory Park.",
    url: "https://www.ouccc.org.uk/article/ii-ivs-varsity-2023",
    icon: Newspaper
  },
  {
    id: 'regatta-2019',
    title: "National Schools' Regatta 2019 Results",
    source: "Time-Team / Hampton School BC",
    date: "May 24, 2019",
    description: "Competed in the prestigious National Schools' Regatta as part of the Hampton School Boat Club B crew (Seat 3).",
    url: "https://regatta.time-team.nl/nsr/2019/entry/e4a3bb8b-0f22-41b1-b08a-93342be8361e.php",
    icon: Award
  },
  {
    id: 'hampton-2018',
    title: "2018 Entrance Scholarships",
    source: "Hampton School",
    date: "July 5, 2018",
    description: "Awarded the John Jones Scholarship for academic excellence upon entrance to Hampton School.",
    url: "https://hamptonschool.org.uk/2018/07/2018-entrance-scholarships/",
    icon: Award
  },
  {
    id: 'rotary-2018',
    title: "Rotary Prize for Environmental and Scientific Advancement",
    source: "Rotary International (GBI)",
    date: "March 29, 2018",
    description: "Winner of the Rotary Prize at the Big Bang Fair for an innovative environmental science project.",
    url: "https://www.rotarygbi.org/big-bang-rotary-award-2018/",
    icon: Award
  }
];

const Press: React.FC = () => {
  return (
    <Section 
      id="press" 
      title="Mentioned In News" 
      subtitle="Media coverage, awards, and external features." 
      className="bg-white"
    >
      <div className="space-y-8">
        
        {/* Featured Broadcast Box */}
        <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl group border border-slate-700">
          {/* Background Gradient/Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 opacity-90 z-10"></div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-teal/20 via-transparent to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Icon Column */}
            <div className="flex-shrink-0">
              <div className="p-4 bg-red-600 rounded-lg text-white shadow-lg shadow-red-900/20">
                <Tv size={32} />
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  Live Broadcast
                </span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={12} /> October 5, 2024 • 10:04 AM
                </span>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                  BBC News: Parkrun 20th Anniversary Coverage
                </h3>
                <h4 className="text-accent-teal font-medium text-lg">
                  Live Interview from Bushy Park
                </h4>
              </div>

              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                Interviewed live on national television at the birthplace of Parkrun. Provided expert commentary on the event's evolution from 13 runners to a global phenomenon, drawing on deep personal experience as a Varsity athlete and long-time volunteer coordinator to explain the logistics and community impact of the 20-year milestone.
              </p>

              <div className="pt-2">
                <a 
                  href="https://www.bbc.co.uk/programmes/m0023tpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-5 py-3 rounded-lg font-bold transition-all shadow hover:shadow-lg group-hover:scale-105 transform duration-300"
                >
                  <PlayCircle size={20} className="text-red-600" />
                  Watch Broadcast Info
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Press List */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Archive & Print</h4>
          {pressItems.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-slate-50 hover:bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full border border-slate-200 text-accent-teal group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-accent-teal transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 mb-2">
                      <span>{item.source}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} /> {item.date}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 self-start sm:self-center">
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-accent-teal" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Press;
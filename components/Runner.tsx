import React from 'react';
import Section from './Section';
import { Activity, MapPin } from 'lucide-react';

const Runner: React.FC = () => {
  return (
    <Section id="runner" title="The Runner" subtitle="Endurance and community service.">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
        
        {/* Photo Insert Placeholder */}
        <div className="md:w-1/2 bg-slate-200 relative min-h-[300px]">
           <img 
            src="https://picsum.photos/800/600" 
            alt="Running Context" 
            className="w-full h-full object-cover absolute inset-0"
           />
           <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-oxford flex items-center gap-1">
              <MapPin size={12} /> Bushy Park, London
           </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold uppercase tracking-wider text-sm">
            <Activity size={18} />
            <span>Varsity Athlete</span>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
            Oxford University Cross-Country Club
          </h3>
          
          <p className="text-slate-600 mb-6">
            Varsity runner representing the university in national competitions. 
            Combining the discipline of high-performance sport with academic rigor.
          </p>

          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-bold text-slate-900 mb-2">Community Leadership</h4>
            <p className="text-slate-600 text-sm mb-6">
              <span className="font-semibold text-oxford">Bushy Parkrun Volunteer:</span> Managed 1500+ runners for the world's original Parkrun event. Coordinated logistics, safety marshals, and timing systems.
            </p>
          </div>

          <a href="#" className="inline-block bg-[#fc4c02] text-white text-center py-2 rounded font-bold text-sm hover:bg-[#e34402] transition-colors w-fit px-6">
            Connect on Strava
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Runner;
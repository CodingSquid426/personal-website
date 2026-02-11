import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-accent-teal uppercase bg-teal-50 rounded-full border border-teal-100">
            Oxford • Aligned AI • UN IGF
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-oxford leading-tight mb-6">
            Bridging the Divide: <br/>
            <span className="text-slate-700 italic font-light">English Literature</span> & <span className="text-accent-teal">Computational Science.</span>
          </h1>
          <h2 className="text-lg md:text-xl text-slate-600 font-medium mb-8 border-l-4 border-accent-teal pl-4">
            Founder Associate at Aligned AI | Oxford English Undergraduate | UN IGF Private Sector Representative.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            I distinguish fact from fiction in criticism—a vital skill for confronting hallucinations in LLMs. My work combines linguistic expertise with high-performance computing to build ethical, human-centric AI.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#builder" className="group flex items-center gap-2 bg-oxford text-white px-6 py-3 rounded-md font-medium hover:bg-oxford-light transition-all">
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-4">
               <a href="https://github.com/CodingSquid426" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-oxford transition-colors"><Github size={24} /></a>
               <a href="https://www.linkedin.com/in/edward-mason-a4b97b327" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-oxford transition-colors"><Linkedin size={24} /></a>
               <a href="mailto:edwardalexandermason@gmail.com" className="text-slate-500 hover:text-oxford transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="relative hidden md:block"
        >
          <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://github.com/CodingSquid426.png" 
              alt="Edward Mason Portrait" 
              className="w-full h-auto object-cover colour hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Decorative background element */}
          <div className="absolute -top-6 -right-6 w-full h-full bg-accent-teal/10 rounded-lg -z-10"></div>
          <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-slate-200 rounded-lg -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
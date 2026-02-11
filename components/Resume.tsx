import React from 'react';
import Section from './Section';
import { Briefcase, GraduationCap, Download, Calendar, ArrowRight, Award, TrendingUp, Globe, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Data sourced from your uploaded CVs
const experiences = [
  {
    id: 'aligned-ai',
    role: "Founder Associate to CEO",
    company: "Aligned AI",
    period: "Oct 2024 – Mar 2025",
    description: "Key operational lead for a scaling research lab that raised $1M pre-seed. Retained following 30% headcount restructuring.",
    achievements: [
      "Led a 5-Day Go-to-Market Sprint for 'Defence Against the Dark Prompts' (jailbreaking defence API).",
      "Engineered Technical Compliance: Wrote custom HTML/JS to enforce T&C acceptance, ensuring legal compliance within 24 hours.",
      "Designed a solution addressing website user confusion, resulting in +380% weekly pageviews.",
      "Achieved two contract renewals to a total of six months by outperforming 8 other interns."
    ],
    icon: <Briefcase size={20} />,
    color: "bg-purple-600"
  },
  {
    id: 'un-policy',
    role: "Private Sector Representative",
    company: "UN Policy Network for AI",
    period: "Feb 2025 – Mar 2025",
    description: "Selected as one of ~40 private sector representatives for high-level policy dialogue.",
    achievements: [
      "Engaged in policy dialogue with over 50 international MPs.",
      "Voted on the official agenda after 6+ hours of stakeholder debate.",
      "Contributed to a 100+ page report on global AI governance."
    ],
    icon: <Globe size={20} />,
    color: "bg-blue-500"
  },
  {
    id: 'turl-street',
    role: "Treasurer",
    company: "Turl Street Orchestra",
    period: "Oct 2024 – Present",
    description: "Brought on to manage an internal financial crisis for a 15-year-old orchestra facing insolvency.",
    achievements: [
      "Executed forensic audit of historical income and formalized records.",
      "Reversed projected debt into a 49% Net Profit Margin for subsequent events.",
      "Increased concert revenue by 220%, allowing for a doubling of organizational headcount."
    ],
    icon: <TrendingUp size={20} />,
    color: "bg-emerald-600"
  },
  {
    id: 'lgbtq-soc',
    role: "Sponsorship Officer",
    company: "Oxford University LGBTQ+ Society",
    period: "Feb 2025 – Present",
    description: "Elected to resolve a liquidity emergency for Oxford's largest student society (3,500+ members).",
    achievements: [
      "Secured £150+ corporate sponsorships (e.g., BCG) to diversify revenue.",
      "Led a 4-person emergency sub-committee through a fund audit.",
      "Promoted to one of 5 executive roles from a pool of 28 general committee officers."
    ],
    icon: <Users size={20} />,
    color: "bg-pink-500"
  }
];

const education = [
  {
    id: 'oxford',
    degree: "BA English Literature and Language",
    institution: "University of Oxford",
    period: "2023 – 2026",
    details: "Focus on Computational Linguistics & Digital Stylistics. Developed quantitative model analyzing 1M+ AI chats.",
    grade: "Expected 2:1",
    awards: "Selected for externally accredited leadership certification (Top 20 of 100 applicants)."
  },
  {
    id: 'hampton',
    degree: "A Levels & GCSEs",
    institution: "Hampton School",
    period: "2018 – 2023",
    details: "A, A, A at A-Levels (Maths, Biology, English). 10 Grade 9s (A**) in GCSEs.",
    grade: "Academic Scholarship",
    awards: "Headmaster's Prize for Academics, Masonic Lodge Prize for Volunteering."
  }
];

const Resume: React.FC = () => {
  return (
    <Section 
      id="cv" 
      title="Experience & Qualifications" 
      subtitle="A track record of high-impact technical leadership and strategic governance."
      className="bg-white"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Header / Download Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 w-full">
           {/* Prominent Oxford Status - Stretched to fill space */}
           <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl shadow-sm w-full md:flex-1">
             <div className="bg-oxford text-white p-2 rounded-lg flex-shrink-0">
               <BookOpen size={20} />
             </div>
             <div>
               <h4 className="font-serif font-bold text-oxford text-lg leading-none">Finalist, University of Oxford</h4>
               <p className="text-sm text-slate-600 font-medium mt-1">BA English Language & Literature • Graduating June 2026</p>
             </div>
           </div>

           <a 
             href="/CV_AI_Jan_2026.docx"
             download
             className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all group whitespace-nowrap flex-shrink-0"
           >
             <Download size={18} className="group-hover:animate-bounce" />
             Download Full CV
           </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Experience Timeline */}
          <div className="lg:col-span-8 space-y-6 relative">
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200 hidden md:block"></div>
            
            {experiences.map((job, index) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-6 group"
              >
                {/* Icon Marker */}
                <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 bg-white border-4 border-slate-50 rounded-full z-10 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${job.color}`}>
                    {job.icon}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-grow bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent-teal transition-colors">
                        {job.company}
                      </h3>
                      <div className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        {job.role}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-600 shadow-sm whitespace-nowrap">
                      <Calendar size={12} />
                      {job.period}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight size={14} className="mt-1 text-accent-teal flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Education & Skills */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <GraduationCap size={18} /> Education
              </h3>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div 
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    className="bg-slate-900 text-white p-6 rounded-xl shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Award size={64} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-700 px-2 py-0.5 rounded">
                          {edu.period}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{edu.institution}</h4>
                      <div className="text-accent-teal font-medium text-sm mb-4">{edu.degree}</div>
                      
                      <p className="text-slate-300 text-xs leading-relaxed mb-3">
                        {edu.details}
                      </p>
                      
                      <div className="pt-3 border-t border-slate-700/50">
                        <div className="text-xs text-slate-400 flex items-start gap-2">
                           <Award size={12} className="mt-0.5 text-amber-400" />
                           {edu.awards}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Skills Box */}
              <div className="mt-8 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['AI Safety & Jailbreaking', 'Policy Governance', 'GTM Strategy', 'Python', 'SQL', 'HPC / Linux', 'Project Management'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Resume;
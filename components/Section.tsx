import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  isDark?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "", isDark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-20 px-6 md:px-12 lg:px-24 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-3 ${isDark ? 'text-white' : 'text-oxford'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg font-light ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {subtitle}
            </p>
          )}
          <div className={`h-1 w-20 mt-6 rounded-full ${isDark ? 'bg-accent-teal' : 'bg-oxford'}`}></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-serif font-bold text-white mb-6">Edward Mason</h2>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.linkedin.com/in/edward-mason-a4b97b327" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/CodingSquid426" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://independent.academia.edu/EdwardMason18" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Academia.edu</a>
          <a href="mailto:edwardalexandermason@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Edward Mason. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
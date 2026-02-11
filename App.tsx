import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './components/Resume'; // Moved up
import GithubRepos from './components/GithubRepos';
import KnowledgeCommons from './components/KnowledgeCommons';
import Journalism from './components/Journalism';
import Audience from './components/Audience';
import WikipediaEdits from './components/WikipediaEdits';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Resume /> {/* Moved to be immediately under Intro */}
        
        {/* Kept these as they were not requested to be removed */}
        <GithubRepos />
        <KnowledgeCommons />
        <Journalism />
        <Audience />
        <WikipediaEdits />
      </main>
      <Footer />
    </div>
  );
};

export default App;
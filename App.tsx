import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Resume from './components/Resume';
import GithubRepos from './components/GithubRepos';
import Scholar from './components/Scholar'; // Restored for "Academia"
import Press from './components/Press';
import WikipediaEdits from './components/WikipediaEdits';
import Audience from './components/Audience';
import Journalism from './components/Journalism';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Resume />          {/* Experience */}
        <GithubRepos />     {/* Coding */}
        <Scholar />         {/* Academia */}
        <Press />           {/* Mentioned in News */}
        <WikipediaEdits />  {/* Digital Volunteering */}
        <Audience />        {/* Digital Engagement */}
        <Journalism />      {/* Journalism */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
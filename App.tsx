import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Builder from './components/Builder';
import GithubRepos from './components/GithubRepos';
import KnowledgeCommons from './components/KnowledgeCommons';
import Scholar from './components/Scholar';
import Journalism from './components/Journalism';
import Leadership from './components/Leadership';
import WikipediaEdits from './components/WikipediaEdits'; // <--- Import
import Press from './components/Press'; // <--- Import
import Runner from './components/Runner';
import Resume from './components/Resume';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Builder />
        <GithubRepos />
        <KnowledgeCommons />
        <Scholar />
        <Journalism />
        <Leadership />
        <Journalism />
        <WikipediaEdits />
        <Runner />
        <Resume />
      </main>
      <Footer />
    </div>
  );
};

export default App;
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Builder from './components/Builder';
import GithubRepos from './components/GithubRepos';
import Scholar from './components/Scholar';
import Journalism from './components/Journalism';
import Leadership from './components/Leadership';
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
        <Scholar />
        <Journalism />
        <Leadership />
        <Runner />
        <Resume />
      </main>
      <Footer />
    </div>
  );
};

export default App;
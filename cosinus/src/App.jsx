import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import SupportSection from './components/SupportSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SupportSection />
        <PricingSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
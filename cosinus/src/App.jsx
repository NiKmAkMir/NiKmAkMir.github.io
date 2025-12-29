import Header from './components/Header/Header';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import SupportExpertise from './components/SupportExpertise';
import PricingSection from './components/PricingSection';
import CasesSection from './components/CasesSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import PartnersSection from './components/PartnersSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SupportExpertise />
        <PricingSection />
        <CasesSection />
        <TeamSection />
        <TestimonialsSection />
        <PartnersSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
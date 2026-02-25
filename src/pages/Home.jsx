import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WeddingHero from '../components/WeddingHero';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import WhyChooseUs from '../components/WhyChooseUs';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <main className="flex-1 overflow-x-hidden min-w-0 w-full">
      <WeddingHero />
      <ServicesSection />
      <PortfolioSection />
      <WhyChooseUs />
      <PricingSection />
      <ContactSection />
    </main>
  );
}

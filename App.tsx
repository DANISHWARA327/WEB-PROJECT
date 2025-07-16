import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { VehicleCollection } from './components/VehicleCollection';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'collection':
        return (
          <>
            <div className="pt-20">
              <VehicleCollection />
            </div>
            <Footer />
          </>
        );
      case 'services':
        return (
          <>
            <div className="pt-20">
              <Services />
            </div>
            <Footer />
          </>
        );
      case 'contact':
        return (
          <>
            <div className="pt-20">
              <ContactForm />
            </div>
            <Footer />
          </>
        );
      case 'dashboard':
        return <Dashboard />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <VehicleCollection />
            <Services />
            <ContactForm />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {renderContent()}
      </main>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}
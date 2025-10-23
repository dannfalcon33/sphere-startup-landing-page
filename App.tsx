import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Solutions from './components/Solutions';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen w-full overflow-hidden text-white relative">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Solutions />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
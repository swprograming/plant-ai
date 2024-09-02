import React, { useRef } from 'react';
import Hero from './Hero';
import Analytics from './Analytics';
import Cards from './Cards';
import Footer from './Footer';

const Home = () => {
  const cardsRef = useRef(null);

  const handleScrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      <Hero onGetStarted={handleScrollToCards} />
      <Analytics />
      <div ref={cardsRef}>
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
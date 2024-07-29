import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Places from './components/destinations/Places';
import AuthModal from './components/AuthModal'; // Adjust the path as needed

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthModalToggle = () => {
    setShowAuthModal(!showAuthModal);
  };

  return (
    <div className="relative">
      <div className={showAuthModal ? 'blur-sm' : ''}>
        <Navbar onAuthModalToggle={handleAuthModalToggle} />
        <Hero />
        <Places />
      </div>
      {showAuthModal && (
        <div className="fixed inset-0 z-50">
          <AuthModal isOpen={showAuthModal} onClose={handleAuthModalToggle} />
        </div>
      )}
    </div>
  );
}

export default App;

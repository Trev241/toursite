import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Places from './components/destinations/Places';
import AuthModal from './components/AuthModal';
import BookingPage from './components/BookingPage';


function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState(null); // Store email instead of username

  const handleAuthModalToggle = () => {
    setShowAuthModal(prev => !prev);
  };

  const handleLoginSuccess = (email) => {
    setEmail(email); // Update the state with the email
    setShowAuthModal(false); // Close the authentication modal on success
  };

 // const handleLogout = () => {
   // setUsername(null);
    // Optionally clear authentication tokens or user data here
   // localStorage.removeItem('authToken'); // Example: if you use local storage for tokens
  //};

  return (
    <Router>
      <div className="relative">
        <div className={showAuthModal ? 'blur-sm' : ''}>
          <Navbar 
          onAuthModalToggle={handleAuthModalToggle} username={email} /> {/* Pass email as username */}
          <Routes>
            <Route path="/" element={<><Hero /><Places /></>} />
            <Route path="/booking" element={<BookingPage />} /> {/* Add route for BookingPage */}
          </Routes>
        </div>
        {showAuthModal && (
          <div className="fixed inset-0 z-50">
            <AuthModal 
              isOpen={showAuthModal} 
              onClose={handleAuthModalToggle} 
              onLoginSuccess={handleLoginSuccess} // Pass handleLoginSuccess to AuthModal
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

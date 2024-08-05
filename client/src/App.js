// App.js

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarPages from "./components/NavbarPages"; // Import NavbarPages
import Hero from "./components/Hero";
import Places from "./components/destinations/Places";
import AuthModal from "./components/AuthModal";
import BookingPage from "./components/BookingPage";
import Profile from "./components/Profile"; // Import Profile
import SignIn from "./pages/Signin";
import { Booking } from "./components/Booking";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState(null); // Store email instead of username

  const handleAuthModalToggle = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleLoginSuccess = (email) => {
    setEmail(email); // Update the state with the email
    setShowAuthModal(false); // Close the authentication modal on success
  };

  // Create a component to conditionally render Navbar or NavbarPages
  const ConditionalNavbar = () => {
    const location = useLocation();
    // Render Navbar only if the path is "/"
    return location.pathname === "/" ? (
      <Navbar onAuthModalToggle={handleAuthModalToggle} username={email} />
    ) : (
      <NavbarPages
        onAuthModalToggle={handleAuthModalToggle}
        username={email}
        onLogout={() => setEmail(null)}
        isHeader={true}
      />
    );
  };

  return (
    <Router>
      <div className="relative">
        <div className={showAuthModal ? "blur-sm" : ""}>
          {/* Conditionally render Navbar or NavbarPages */}
          <ConditionalNavbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Places />
                </>
              }
            />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/pay" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />{" "}
            {/* Add this line */}
            <Route path="/signin" element={<SignIn />} />
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

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
import AdminProfile from "./components/AdminProfile"; // Import AdminProfile
import SignIn from "./pages/Signin";
import { SiteProvider } from "./components/SiteContext"; // Import SiteProvider

import { Booking } from "./pages/Booking";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnu3HEzAb5YQ6945hjMvX1PkIlvljVHjU",
  authDomain: "toursite-d133f.firebaseapp.com",
  projectId: "toursite-d133f",
  storageBucket: "toursite-d133f.appspot.com",
  messagingSenderId: "341982185720",
  appId: "1:341982185720:web:e73fea88fb98b4c8bc130d",
  measurementId: "G-DEFYXV5GKN",
};

const app = initializeApp(firebaseConfig);
const _ = getAnalytics(app);

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null); // Store user object instead of just email

  const handleAuthModalToggle = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleLoginSuccess = (user) => {
    setUser(user); // Update the state with the user object
    setShowAuthModal(false); // Close the authentication modal on success
  };

  // Create a component to conditionally render Navbar or NavbarPages
  const ConditionalNavbar = () => {
    const location = useLocation();
    // Render Navbar only if the path is "/"
    return location.pathname === "/" ? (
      <Navbar
        onAuthModalToggle={handleAuthModalToggle}
        username={user?.email}
      />
    ) : (
      <NavbarPages
        onAuthModalToggle={handleAuthModalToggle}
        username={user?.email}
        onLogout={() => setUser(null)}
        isHeader={true}
      />
    );
  };

  return (
    <Router>
      <SiteProvider>
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
              <Route
                path="/profile"
                element={<Profile />} // Render Profile component
              />
              <Route
                path="/admin-profile"
                element={<AdminProfile />} // Render AdminProfile component
              />
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
      </SiteProvider>
    </Router>
  );
}

export default App;

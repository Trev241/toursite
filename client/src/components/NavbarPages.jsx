import React, { useState, useContext, useRef, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Logo from "./Logo";

function NavbarPages({ onAuthModalToggle, username, isHeader }) {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { client, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); // Redirect to home page
  };

  // Determine the profile link based on the client's role
  const profileLink = client?.role === "admin" ? "/admin-profile" : "/profile";

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${
        location.pathname === "/"
          ? "bg-transparent absolute z-50 text-white"
          : "shadow-md bg-white"
      } flex w-full justify-between items-center p-4`}
    >
      <div className="flex items-center">
        <Link to="/" onClick={() => navigate("/")}>
          <Logo />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <BsPerson
            size={20}
            onClick={onAuthModalToggle}
            className="cursor-pointer"
          />
        </div>
        {client && client.email && (
          <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer" onClick={toggleDropdown}>
              <h2 className="text-sm">{client.email}</h2>
            </div>
            {dropdownOpen && (
              <div className="absolute z-50 top-full right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <div className="flex flex-col items-center">
                  <Link to={profileLink}>View Profile</Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* mobile menu */}
      <div className="md:hidden z-10">
        {nav ? (
          <AiOutlineClose className="text-black" size={20} />
        ) : (
          <HiOutlineMenuAlt4 size={20} />
        )}
      </div>
    </div>
  );
}

export default NavbarPages;

import React, { useState, useContext } from "react";
import { BsPerson } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


function NavbarPages({ onAuthModalToggle, username, isHeader }) {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { client, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); // Redirect to home page
  };
       // Determine the profile link based on the client's role
       const profileLink = client?.role === 'admin' ? '/admin-profile' : '/profile';

  return (
    <div className={`shadow-md flex w-full justify-between items-center p-5`}>
      <div className="flex items-center">
        <Link to="/" onClick={() => navigate("/")}>
          <div className="tracking-tighter text-4xl">
            tour<span className="font-bold px-1 tracking-tightest">SI</span>te
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <BiSearch className="hidden md:block" size={20} />
        <div className="relative">
          <BsPerson
            size={20}
            onClick={onAuthModalToggle}
            className="cursor-pointer"
          />
        </div>
        {client && client.email && (
          <div className="relative">
            <div className="cursor-pointer" onClick={toggleDropdown}>
              <h2 className="text-sm">{client.email}</h2>
            </div>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <div className="flex flex-col items-center">
                  <Link to="/profile">View Profile</Link>
                  <button
                    onClick={handleLogout} // Call handleLogout instead
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

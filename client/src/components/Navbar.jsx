// Navbar.jsx

import React, {useContext, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi'; 
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link
import { AuthContext  } from './AuthProvider';

function Navbar({ onAuthModalToggle, username, onLogout }) {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {client} = useContext(AuthContext);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div className='flex items-center'>
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>TOURSITE.</h1>
        <ul className='hidden md:flex ml-10'>
          <li className='mr-6'>Home</li>
          <li className='mr-6'>Destinations</li>
          <li className='mr-6'>Travel</li>
          <li className='mr-6'>About</li>
          <li className='mr-6'>Blogs</li>
        </ul>
      </div>
      <div className='flex items-center space-x-4'>
        <BiSearch className='hidden md:block' size={20} />
        <div className='relative'>
          <BsPerson size={20} onClick={onAuthModalToggle} className='cursor-pointer' />
        </div>
        {client && (
          <div className='relative'>
            <div className='cursor-pointer' onClick={toggleDropdown}>
              <h2 className='text-sm'>{client.email}</h2>
            </div>
            {dropdownOpen && (
              <div className='absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4'>
                <img 
                  src="https://via.placeholder.com/50" 
                  alt="Profile" 
                  className='w-12 h-12 rounded-full mx-auto mb-2'
                />
                <div className='flex flex-col items-center'>
                  <Link to="/profile" className='text-blue-500 hover:underline mb-2'>View Profile</Link>
                  <button 
                    onClick={() => {
                      onLogout(); // Call the logout function
                      setDropdownOpen(false); // Close the dropdown
                    }} 
                    className='text-red-500 hover:underline'
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
      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>
      <div onClick={handleNav} className={nav ? 'absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <h1>TOURSITE.</h1>
          <li className='border-b'>Home</li>
          <li className='border-b'>Destinations</li>
          <li className='border-b'>Travel</li>
          <li className='border-b'>About</li>
          <li className='border-b'>Blogs</li>
          <div className='flex flex-col'>
            <button className='my-6'>Search</button>
            <button onClick={onAuthModalToggle}>Account</button>
          </div>
          <div className='flex justify-around my-6'>
            <FaGithub />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

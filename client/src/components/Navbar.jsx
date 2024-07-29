import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi'; 
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import AuthModal from './AuthModal'; // Adjust the path as needed

function Navbar({ onAuthModalToggle }) {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div>
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>TOURSITE.</h1>
      </div>
      <ul className='hidden md:flex'>
        <li>Home</li>
        <li>Destinations</li>
        <li>Travel</li>
        <li>About</li>
        <li>Blogs</li>
      </ul>
      <div className='hidden md:flex'>
        <BiSearch className='mr-2' size={20} />
        <BsPerson size={20} onClick={onAuthModalToggle} className='cursor-pointer' />
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

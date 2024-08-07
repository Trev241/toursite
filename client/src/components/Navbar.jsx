import React, { useContext, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

function Navbar({ onAuthModalToggle, username, onLogout }) {
    const [nav, setNav] = useState(false);
    const [logo, setLogo] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { client, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNav = () => {
        setNav(!nav);
        setLogo(!logo);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/"); // Redirect to the home page
    };

    // Determine the profile link based on the client's role
    const profileLink = client?.role === 'admin' ? '/admin-profile' : '/profile';

    return (
        <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
            <div className='flex items-center'>
                <h1 className={logo ? 'hidden' : 'block'}>TOURSITE.</h1>
            </div>
            <div className='flex items-center space-x-4'>
                <BiSearch className='hidden md:block' size={20}/>
                <div className='relative'>
                    <BsPerson size={20} onClick={onAuthModalToggle} className='cursor-pointer'/>
                </div>
                {client && (
                    <div className='relative'>
                        <div className='cursor-pointer' onClick={toggleDropdown}>
                            <h2 className='text-sm'>{client.email}</h2>
                        </div>
                        {dropdownOpen && (
                            <div
                                className='absolute top-full right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4'>
                                <div className='flex flex-col items-center'>
                                    <Link to={profileLink} className='text-blue-500 hover:underline mb-2'>
                                        View Profile
                                    </Link>
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

            {/* Mobile menu */}
            <div onClick={handleNav} className='md:hidden z-10'>
                {nav ? <AiOutlineClose className='text-black' size={20}/> : <HiOutlineMenuAlt4 size={20}/>}
            </div>
            <div
                className={nav ? 'absolute left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
                <ul>
                    <h1>TOURSITE.</h1>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;

import React from 'react';
import profileImage from '../../assets/image_profile/noob.png';
import { NavLink } from "react-router-dom";
import { FaUserEdit, FaLock, FaListUl } from "react-icons/fa";

const SidebarProfile = () => {
    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-md h-screen">
            <img
                src={profileImage}
                alt="User"
                className="w-24 h-24 rounded-full mb-6"
            />

            <nav className="flex flex-col space-y-4 w-full">
                <NavLink
                    to="/profile/edit-profile"
                    className="flex items-center space-x-3 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-lg w-full"
                    activeClassName="bg-blue-100"
                >
                    <FaUserEdit className="text-xl" />
                    <span>Edit Profile</span>
                </NavLink>
                <NavLink
                    to="/profile/change-password"
                    className="flex items-center space-x-3 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-lg w-full"
                    activeClassName="bg-blue-100"
                >
                    <FaLock className="text-xl" />
                    <span>Change Password</span>
                </NavLink>
                <NavLink
                    to="/profile/view-trips"
                    className="flex items-center space-x-3 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-lg w-full"
                    activeClassName="bg-blue-100"
                >
                    <FaListUl className="text-xl" />
                    <span>View Trips</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default SidebarProfile;

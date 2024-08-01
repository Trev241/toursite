import React, { useState } from 'react';
import profileImage from '../assets/image_profile/noob.png'; // Adjust the path based on your file structure
import EditProfileForm from './EditProfileForm'; // Import the EditProfileForm component

const Profile = () => {
  const [activeSection, setActiveSection] = useState(''); // Manage which section is active

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-100 border-r border-blue-200 shadow-xl">
        <div className="p-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8 border-b border-blue-200 pb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full shadow-lg"
            />
            <h2 className="mt-4 text-xl font-semibold text-blue-800">User Name</h2>
          </div>
          {/* Dashboard Options */}
          <nav>
            <ul className="space-y-4">
              <li className="border-b border-blue-200 pb-2">
                <a
                  href="#edit-profile"
                  onClick={() => handleSectionChange('edit-profile')}
                  className="block p-2 text-teal-700 hover:bg-teal-100 rounded transition duration-150 ease-in-out"
                >
                  Edit Profile
                </a>
              </li>
              <li className="border-b border-blue-200 pb-2">
                <a
                  href="#change-password"
                  onClick={() => handleSectionChange('change-password')}
                  className="block p-2 text-teal-700 hover:bg-teal-100 rounded transition duration-150 ease-in-out"
                >
                  Change Password
                </a>
              </li>
              <li className="border-b border-blue-200 pb-2">
                <a
                  href="#view-trips"
                  onClick={() => handleSectionChange('view-trips')}
                  className="block p-2 text-teal-700 hover:bg-teal-100 rounded transition duration-150 ease-in-out"
                >
                  View Trips
                </a>
              </li>
              <li className="border-b border-blue-200 pb-2">
                <a
                  href="#downloads"
                  onClick={() => handleSectionChange('downloads')}
                  className="block p-2 text-teal-700 hover:bg-teal-100 rounded transition duration-150 ease-in-out"
                >
                  Downloads
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      
      {/* Right Section */}
      <main className="flex-1 p-6">
        {activeSection === 'edit-profile' && <EditProfileForm />}
        {/* Other sections like Change Password, View Trips, and Downloads can be added here */}
      </main>
    </div>
  );
};

export default Profile;

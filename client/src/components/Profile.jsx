// Profile.jsx
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SideBarProfile from './SideBarProfile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import ViewTrips from "./ViewTrips"

const Profile = () => {
    return (
        <div className="flex">
            <SideBarProfile/>
            <div className="flex-grow p-8">
                <Routes>
                    <Route path="/edit-profile" element={<EditProfile/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                    <Route path="/view-trips" element={<ViewTrips/>}/>

                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </div>
    );
};

export default Profile;

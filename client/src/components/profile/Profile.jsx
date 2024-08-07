import React from "react";
import { Routes, Route } from "react-router-dom";
import SideBarProfile from "./SideBarProfile";
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import ViewTrips from "./ViewTrips";
import BookingDetail from "./BookingDetail";

const Profile = () => {
    return (
        <div className="flex">
            <SideBarProfile />
            <div className="flex-grow p-8">
                <Routes>
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/view-trips" element={<ViewTrips />} />
                    <Route path="/booking-detail/:bookingId" element={<BookingDetail />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider'; // Adjust the import path as needed
import { API_BASE_URL } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';

const ViewTrips = () => {
    const { clientId } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filter, setFilter] = useState('upcoming');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/booking-all/${clientId}`);
                const tripsData = await response.json();
                setBookings(tripsData);
                applyFilter('upcoming', tripsData);
            } catch (err) {
                alert(err);
            }
        };

        if (clientId) {
            fetchTrips();
        }
    }, [clientId]);

    const applyFilter = (filter, trips) => {
        const today = new Date();
        let filtered;

        switch (filter) {
            case 'upcoming':
                filtered = trips.filter(trip => trip.status === 'CONFIRMED' && new Date(trip.checkInDate) > today);
                break;
            case 'processing':
                filtered = trips.filter(trip => trip.status === 'PROCESSING');
                break;
            case 'pending':
                filtered = trips.filter(trip => trip.status === 'PENDING');
                break;
            case 'cancelled':
                filtered = trips.filter(trip => trip.status === 'CANCELLED');
                break;
            case 'past':
                filtered = trips.filter(trip => trip.checkOutDate < today);
                break;
            default:
                filtered = trips;
        }

        setFilteredBookings(filtered);
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
        applyFilter(filter, bookings);
    };

    const handleCardClick = (bookingId) => {
        navigate(`/profile/booking-detail/${bookingId}`);
    };

    const renderTrips = (trips) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map(trip => (
                    <div
                        key={trip.id}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 cursor-pointer"
                        onClick={() => handleCardClick(trip.id)}
                    >
                        <h2 className="text-xl font-bold mb-2">Trip to {trip.city}, {trip.country}</h2>
                        <p className="text-gray-700 mb-2">Check-in: {(trip.checkInDate)}</p>
                        <p className="text-gray-700 mb-2">Check-out: {(trip.checkOutDate)}</p>
                        <p className="text-gray-700 mb-2">Price one night: ${trip.price.toFixed(2)}</p>
                        <p className="text-gray-700 mb-2">Net Total: ${trip.netTotal.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex justify-around mb-8">
                <button
                    onClick={() => handleFilterChange('upcoming')}
                    className={`py-2 px-4 rounded ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => handleFilterChange('processing')}
                    className={`py-2 px-4 rounded ${filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Processing
                </button>
                <button
                    onClick={() => handleFilterChange('pending')}
                    className={`py-2 px-4 rounded ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => handleFilterChange('cancelled')}
                    className={`py-2 px-4 rounded ${filter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Cancelled
                </button>
                <button
                    onClick={() => handleFilterChange('past')}
                    className={`py-2 px-4 rounded ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Past
                </button>
            </div>

            {filteredBookings.length > 0 ? renderTrips(filteredBookings) : <p>No trips found.</p>}
        </div>
    );
};

export default ViewTrips;

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Adjust the import path as needed
import { API_BASE_URL } from '../constants/Constants';

const ViewTrips = () => {
    const { clientId } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filter, setFilter] = useState('upcoming');

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
                filtered = trips.filter(trip => new Date(trip.checkOutDate) < today);
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

    const renderTrips = (trips) => {
        return trips.map(trip => (
            <div key={trip.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 mb-4 w-80 mx-2">
                <h2 className="text-lg font-bold mb-2">Trip to {trip.city}, {trip.country}</h2>
                <p className="text-gray-700 mb-1">Check-in: {new Date(trip.checkInDate).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-1">Check-out: {new Date(trip.checkOutDate).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-1">Net Total: ${trip.netTotal.toFixed(2)}</p>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => handleFilterChange('upcoming')}
                    className={`py-2 px-4 rounded-full ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => handleFilterChange('processing')}
                    className={`py-2 px-4 rounded-full ${filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Processing
                </button>
                <button
                    onClick={() => handleFilterChange('pending')}
                    className={`py-2 px-4 rounded-full ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Pending
                </button>
                <button
                    onClick={() => handleFilterChange('cancelled')}
                    className={`py-2 px-4 rounded-full ${filter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Cancelled
                </button>
                <button
                    onClick={() => handleFilterChange('past')}
                    className={`py-2 px-4 rounded-full ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Past
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredBookings.length > 0 ? renderTrips(filteredBookings) : <p>No trips found.</p>}
            </div>
        </div>
    );
};

export default ViewTrips;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_BASE_URL } from '../..//constants/Constants';
import Swal from 'sweetalert2';

const BookingDetail = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [price, setPrice] = useState(0);
    const [siteId, setSiteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/booking-detail/${bookingId}`);
                const bookingData = await response.json();
                setBooking(bookingData);
                setCheckInDate(new Date(bookingData.checkInDate));
                setCheckOutDate(new Date(bookingData.checkOutDate));
                setPrice(bookingData.price);
                setSiteId(bookingData.siteId);
            } catch (err) {
                console.error('Failed to fetch booking:', err);
            }
        };

        fetchBooking();
    }, [bookingId]);

    const handleSave = async () => {
        const updatedBooking = {
            bookingId: bookingId,
            checkInDate: checkInDate.toISOString().split('T')[0],
            checkOutDate: checkOutDate.toISOString().split('T')[0],
            price: price,
            siteId: siteId
        };
        console.log(updatedBooking)
        try {
            const response = await fetch(`${API_BASE_URL}/booking-update/${bookingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBooking),
            });

            if (response.ok) {
                const booking = await response.json();
                setBooking(booking);

                if (booking.status === 'PENDING') {
                    Swal.fire({
                        title: 'Date Occupied',
                        text: 'This date is already occupied. Your booking will be added to the waitlist and you will be notified when it is free.',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    });
                    navigate(`/profile/view-trips`)
                } else if (booking.status === 'PROCESSING') {
                    Swal.fire({
                        title: 'Success',
                        text: 'Booking updated successfully.',
                        icon: 'success',
                    });
                    navigate(`/pay?bookingId=${bookingId}`);
                }

            } else {
                throw new Error('Failed to update booking');
            }
        } catch (err) {
            console.error('Error updating booking:', err);
            Swal.fire({
                title: 'Error',
                text: 'There was an error updating the booking. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return booking ? (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 mb-4">
                <h2 className="text-xl font-bold mb-4">Booking Details</h2>
                <div className="mb-4">
                    <p className="text-gray-700 mb-2">City: {booking.city}</p>
                    <p className="text-gray-700 mb-2">Country: {booking.country}</p>
                    <div className="mb-4">
                        <label className="block text-gray-700">Check-in Date:</label>
                        <DatePicker
                            selected={checkInDate}
                            onChange={date => setCheckInDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Check-out Date:</label>
                        <DatePicker
                            selected={checkOutDate}
                            onChange={date => setCheckOutDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full mt-1 p-2 border rounded"
                        />
                    </div>
                    <p className="text-gray-700 mb-2">Price: {booking.price}</p>
                    <p className="text-gray-700 mb-2">Net Total: {booking.netTotal}</p>

                    {(booking.status === 'PROCESSING' || booking.status === 'PENDING') && (
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    )}
                    {booking.status === 'PROCESSING' && (
                        <button
                            onClick={() => navigate(`/pay?bookingId=${bookingId}`)}
                            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ml-4"
                        >
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <p>Loading booking details...</p>
    );
};

export default BookingDetail;

import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
  const location = useLocation();
  const { place } = location.state || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGuestsChange = (event) => {
    setGuests(parseInt(event.target.value, 10));
  };

  const addToCart = () => {
    // Implement Book now logic
  };

  const addToWishlist = () => {
    // Implement add to wishlist logic
  };

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-rows-1 gap-4">
        {/* Top Row: Image with Heart Icon */}
        <div className="relative w-[400px] mx-auto">
          <img src={place.img} alt={place.title} className="w-full h-auto object-cover" />
          <button 
            onClick={addToWishlist} 
            className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-50"
            style={{ border: 'none', outline: 'none' }}
          >
            <FaHeart size={24} className="text-red-500" />
          </button>
        </div>

        {/* Content and Booking Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Content Column */}
          <div className="md:col-span-1">
            <h1 className="text-2xl font-bold my-4">{place.title}</h1>
            <p className="text-gray-700">{place.description}</p>
          </div>

          {/* Booking Options Column */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 shadow-lg rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Book Your Trip</h2>
              <div className="mb-4">
                {/* Styled Date Range Picker */}
                <div className="bg-white p-4 shadow rounded-lg border border-gray-200">
                  <label className="block text-gray-700 mb-2 text-lg font-medium">Select Dates:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dateFormat="yyyy/MM/dd"
                    className="react-datepicker-wrapper"
                    calendarClassName="react-datepicker-calendar"
                    popperClassName="react-datepicker-popper"
                  />
                </div>
              </div>
              <div className="mb-4">
                {/* Guests Input */}
                <div className="flex items-center justify-between">
                  <label className="block text-gray-700">Number of Guests:</label>
                  <input
                    type="number"
                    value={guests}
                    onChange={handleGuestsChange}
                    className="w-full mt-2 p-2 border rounded"
                    min="1"
                  />
                </div>
              </div>
              {/* Move Book now Button Below */}
              <div className="mb-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                  onClick={addToCart}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for DatePicker */}
      <style jsx>{`
        .react-datepicker__header {
          background-color: #4a90e2; /* Header background color */
          color: white;
        }
        .react-datepicker__day {
          border-radius: 50%; /* Rounded day cells */
        }
        .react-datepicker__day--selected {
          background-color: #4a90e2; /* Selected day background color */
          color: white;
        }
        .react-datepicker__day--range-start,
        .react-datepicker__day--range-end {
          background-color: #4a90e2; /* Range start/end background color */
          color: white;
        }
        .react-datepicker__day--today {
          font-weight: bold;
          border: 1px solid #4a90e2; /* Border for today’s date */
        }
        .react-datepicker__day:hover {
          background-color: #e1e1e1; /* Hover background color */
        }
        .react-datepicker {
          border-radius: 8px; /* Calendar border radius */
          border: 1px solid #d1d5db; /* Calendar border color */
        }
        .react-datepicker__triangle {
          display: none; /* Hide the triangle pointer */
        }
      `}</style>
    </div>
  );
};

export default BookingPage;

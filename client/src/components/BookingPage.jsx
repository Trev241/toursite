import React, { useState, useEffect, useContext } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../constants/Constants";
import { AuthContext } from "./AuthProvider";

const BookingPage = () => {
  const { clientId, setClientId } = useContext(AuthContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [availableDates, setAvailableDates] = useState([]);
  const [site, setSite] = useState();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { place } = location.state || {};

  useEffect(() => {
    (async () => {
      // For testing purposes, we will hardcode the available dates
      // const testDates = [
      //   "2024-08-01",
      //   "2024-08-02",
      //   "2024-08-03",
      //   "2024-08-04",
      //   "2024-08-05",
      //   "2024-08-06",
      // ];

      // Convert the list of date strings to Date objects
      // const dates = testDates.map((dateString) => new Date(dateString));
      // setAvailableDates(dates);

      const siteId = searchParams.get("siteId");
      try {
        const response = await fetch(`${API_BASE_URL}/sites/${siteId}`);
        const site = await response.json();
        setSite(site);
      } catch (err) {
        alert(err);
      }
    })();
  }, [searchParams]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGuestsChange = (event) => {
    setGuests(parseInt(event.target.value, 10));
  };

  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1, 2);
    const day = pad(date.getDate(), 2);

    return `${year}-${month}-${day}`;
  };

  const addToCart = async () => {
    try {
      const checkInDateStr = formatDate(startDate);
      const checkOutDateStr = formatDate(endDate);

      let url = new URL(`${API_BASE_URL}/create-booking`);
      url.searchParams.set("clientId", clientId);
      url.searchParams.set("siteId", site.id);
      url.searchParams.set("checkInDate", checkInDateStr);
      url.searchParams.set("checkOutDate", checkOutDateStr);

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const booking = await response.json();

      navigate({
        pathname: "/pay",
        search: createSearchParams({
          bookingId: booking.id,
        }).toString(),
      });
    } catch (err) {
      alert(err);
    }
  };

  const addToWishlist = () => {
    // Implement add to wishlist logic
  };

  const isAvailableDate = (date) => {
    return availableDates.some(
      (availableDate) => date.toDateString() === availableDate.toDateString()
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid grid-rows-1 gap-4">
        {/* Top Row: Image with Heart Icon */}
        <div className="relative w-full max-w-full mx-auto">
          {/* <img
            src={place.img}
            alt={place.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          /> */}
          <button
            onClick={addToWishlist}
            className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 transition"
            style={{ border: "none", outline: "none" }}
          >
            <FaHeart size={24} className="text-red-500" />
          </button>
        </div>

        {/* Content and Booking Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Column */}
          {/* <div className="md:col-span-1">
            <h1 className="text-3xl font-bold my-4">{place.title}</h1>
            <p className="text-gray-700">{place.description}</p>
          </div> */}

          {/* Booking Options Column */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Book Your Trip</h2>
              <div className="mb-6">
                {/* Styled Date Range Picker */}
                <div className="bg-white p-4 shadow rounded-lg border border-gray-200 w-full">
                  <label className="block text-gray-700 mb-2 text-lg font-medium">
                    Select Dates:
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    dateFormat="yyyy/MM/dd"
                    className="w-full"
                    calendarClassName="w-full"
                    popperClassName="react-datepicker-popper"
                    // filterDate={isAvailableDate}
                  />
                </div>
              </div>
              <div className="mb-6">
                {/* Guests Input */}
                <div className="flex items-center justify-between">
                  <label className="block text-gray-700">
                    Number of Guests:
                  </label>
                  <input
                    type="number"
                    value={guests}
                    onChange={handleGuestsChange}
                    className="w-24 mt-2 p-2 border rounded"
                    min="1"
                  />
                </div>
              </div>
              {/* Move Add to Cart Button Below */}
              <div className="mb-4">
                <button
                  className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full transition"
                  onClick={addToCart}
                >
                  Add to Cart
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

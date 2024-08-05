import React, { useState, useEffect, useContext } from "react";
import {createSearchParams, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_BASE_URL } from "../constants/Constants";
import { AuthContext } from "./AuthProvider";
import Img1 from "./../assets/places/boat.jpg";

const BookingPage = () => {
  const { clientId } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [site, setSite] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { place } = location.state || {};

  useEffect(() => {
    (async () => {
      const siteId = searchParams.get("siteId");
      try {
        const response = await fetch(`${API_BASE_URL}/sites/${siteId}`);
        const siteData = await response.json();
        setSite(siteData);
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

  const reserve = async () => {
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
      console.log(booking);

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

  return (
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Top Row: Image with Heart Icon */}
        <div className="relative w-full h-64">
          <img
              src={site ? site.img : Img1}
              alt={site ? site.title : place?.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Content Column */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{site ? site.title : place?.title}</h1>
            <p className="text-gray-700 mb-6">{site ? site.description : place?.description}</p>
            <p className="text-gray-600 mb-4">{site?.address || place?.address}</p>
            <p className="text-gray-600">{site?.phone || place?.phone}</p>
          </div>

          {/* Booking Options Column */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Book Your Trip</h2>
              <div className="mb-6">
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
                      minDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      className="w-full"
                      calendarClassName="w-full text-lg"
                      popperClassName="react-datepicker-popper"
                  />
                </div>
              </div>
              <div className="mb-4">
                <button
                    className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 w-full transition"
                    onClick={reserve}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .react-datepicker__header {
            background-color: #4a90e2;
            color: white;
          }
          .react-datepicker__day {
            border-radius: 50%;
          }
          .react-datepicker__day--selected {
            background-color: #4a90e2;
            color: white;
          }
          .react-datepicker__day--range-start,
          .react-datepicker__day--range-end {
            background-color: #4a90e2;
            color: white;
          }
          .react-datepicker__day--today {
            font-weight: bold;
            border: 1px solid #4a90e2;
          }
          .react-datepicker__day:hover {
            background-color: #e1e1e1;
          }
          .react-datepicker {
            border-radius: 8px;
            border: 1px solid #d1d5db;
          }
          .react-datepicker__triangle {
            display: none;
          }
        `}</style>
      </div>
  );
};

export default BookingPage;

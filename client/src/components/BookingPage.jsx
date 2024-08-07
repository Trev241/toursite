import React, { useState, useEffect, useContext } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { API_BASE_URL } from "../constants/Constants";
import { AuthContext } from "./AuthProvider";

import "./BookingPage.css";
import { getImageURL } from "../utils/Utils";
import DefaultRoomImage from "../assets/default-room.jpg";

Modal.setAppElement("#root");

const BookingPage = () => {
  const { clientId } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [site, setSite] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

        siteData.url = await getImageURL(
          siteData.photos.length > 0 ? siteData.photos[0].url : null
        );

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
    if (!clientId) {
      setModalMessage("You need to log in before proceeding with the booking.");
      setModalIsOpen(true);
      return;
    }
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

      if (booking.status === "PENDING") {
        setModalMessage(
          "This site has already been reserved for one or more date(s) that you have chosen. You have been placed on a waiting list for now. We will send you an email once the location is available again."
        );
        setModalIsOpen(true);
      } else {
        navigate({
          pathname: "/pay",
          search: createSearchParams({
            bookingId: booking.id,
          }).toString(),
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Top Row: Image with Heart Icon */}
      <div className="relative w-full h-64">
        <img
          src={site ? site.url : DefaultRoomImage}
          alt={site ? site.title : place?.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Content Column */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">
            {site ? site.title : place?.title}
          </h1>
          <p className="text-gray-700 mb-6">
            {site ? site.description : place?.description}
          </p>
          <p className="text-gray-600 mb-4">
            {site?.address || place?.address}
          </p>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Booking Status"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Booking Status</h2>
          <p className="mb-6">{modalMessage}</p>
          <button
            onClick={closeModal}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;

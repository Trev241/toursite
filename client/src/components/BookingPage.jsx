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
import { getImageURL } from "../utils/Utils";
import DefaultRoomImage from "../assets/default-room.jpg";
import { Amount } from "./Amount";

Modal.setAppElement("#root");

const BookingPage = () => {
  const { clientId } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [site, setSite] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

        const imageUrls = await Promise.all(
          siteData.photos.map((photo) => getImageURL(photo.url))
        );

        setImages(imageUrls);
        setSite(siteData);
      } catch (err) {
        alert(err);
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(intervalId); // Clean up interval on component unmount
    }
  }, [images]);

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

  // Inline styles for the slideshow
  const slideshowContainerStyle = {
    position: "relative",
    width: "100%",
    height: "18rem",
    overflow: "hidden",
    borderRadius: "0.75rem",
  };

  const slideshowImageStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0,
    transition: "opacity 1s ease-in-out",
  };

  const activeImageStyle = {
    ...slideshowImageStyle,
    opacity: 1,
  };

  return (site && <div className="container mx-auto p-4 max-w-7xl">
      {/* Top Row: Image Slideshow */}
      <div style={slideshowContainerStyle} className="shadow-lg rounded-lg">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={site ? site.title : place?.title}
              style={
                index === currentImageIndex
                  ? activeImageStyle
                  : slideshowImageStyle
              }
            />
          ))
        ) : (
          <img
            src={DefaultRoomImage}
            alt={site ? site.title : place?.title}
            style={activeImageStyle}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Content Column */}
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-5xl font-extrabold mb-6 text-gray-900">
            {site ? site.city : place?.city}
          </h1>
          <Amount value={site.price} />
          <p className="text-gray-700 mt-4 mb-6 leading-relaxed">
            {site ? site.description : place?.description}
          </p>
          <div className="text-lg text-gray-600 space-y-2">
            <p>
              <strong>Address:</strong> {site?.street || place?.street + site?.city || place?.city + site?.zip || place?.zip  }
            </p>
            <p>
              <strong>Phone:</strong> {site?.phone || "not provided" }
            </p>
          </div>
        </div>

        {/* Booking Options Column */}
        <div className="md:col-span-1">
          <div className="bg-white p-8 shadow-xl rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Book Your Trip
            </h2>
            <div className="mb-6">
              <div className="bg-gray-100 p-4 shadow-inner rounded-lg border border-gray-300">
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
                  className="w-full text-lg"
                  calendarClassName="w-full text-lg"
                  popperClassName="react-datepicker-popper"
                />
              </div>
            </div>
            <div className="mb-4">
              <button
                className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 w-full transition duration-200 ease-in-out"
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
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Booking Status
          </h2>
          <p className="text-gray-700 mb-6">{modalMessage}</p>
          <button
            onClick={closeModal}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;

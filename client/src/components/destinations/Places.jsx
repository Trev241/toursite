import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import SiteContext from "../SiteContext";
import { getImageURL } from "../../utils/Utils";
import DefaultRoomImage from "../../assets/default-room.jpg";

const Places = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { sites, setSites } = useContext(SiteContext);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8081/api/v1/sites")
      .then((response) => response.json())
      .then(async (data) => {
        for (const item of data)
          item.url =
            item.photos.length > 0
              ? await getImageURL(item.photos[0].url)
              : null;

        setSites(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [setSites]);

  const handleBookClick = (place) => {
    navigate(`/booking?siteId=${place.id}`);
  };

  return (
    <div className="dark:bg-white dark:text-black bg-gray-50 py-10">
      <section className="container mx-auto max-w-screen-xl px-4">
        <h1 className="my-8 py-2 text-3xl font-bold text-center">
          Best Places to Visit
        </h1>
        <div className="space-y-6">
          {sites.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow-lg p-6 rounded-lg border border-gray-200"
            >
              <div className="w-64 h-40 flex items-center justify-center overflow-hidden rounded-md border border-gray-300">
                <img
                  src={item.url || DefaultRoomImage} // Use the image URL from the site object
                  alt={item.description}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="flex-grow px-6">
                <h2 className="text-2xl font-bold">
                  {item.city}, {item.country}
                </h2>
                <p className="text-gray-800 mb-4 min-h-30">
                  {item.description}
                </p>
                <p className="text-gray-600 mb-2">{item.phone}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-4">
                  ${item.price.toFixed(2)}
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600"
                  onClick={() => handleBookClick(item)}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Places;

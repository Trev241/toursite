import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SiteContext from "../SiteContext";
import { getImageURL } from "../../utils/Utils";
import DefaultRoomImage from "../../assets/default-room.jpg";
import { Amount } from "../Amount";

const Places = () => {
  const navigate = useNavigate();
  const { sites, setSites } = useContext(SiteContext);
  const [searchParams] = useSearchParams();
  const [allSites, setAllSites] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8081/api/v1/sites")
      .then((response) => response.json())
      .then(async (data) => {
        for (const item of data) {
          item.url =
            item.photos.length > 0
              ? await getImageURL(item.photos[0].url)
              : null;
        }
        setAllSites(data);
        setSites(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (searchParams.get("destination")) {
      const filteredSites = allSites.filter((item) => {
        let query = new RegExp(searchParams.get("destination"), "i");
        return (
          query.test(item.street) ||
          query.test(item.city) ||
          query.test(item.country)
        );
      });
      setSites(filteredSites);
    } else {
      setSites(allSites);
    }
  }, [searchParams, allSites, setSites]);

  const handleBookClick = (place) => {
    navigate(`/booking?siteId=${place.id}`);
  };

  return (
    <div className="dark:bg-white dark:text-black bg-gray-50 py-10">
      <section className="container mx-auto max-w-screen-xl px-4">
        <h1 className="my-8 py-2 text-4xl">We recommend checking out...</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          {sites.map((item) => (
            <div
              key={item.id}
              onClick={() => handleBookClick(item)}
              className="flex transition hover:bg-gray-200 items-center bg-white shadow-lg p-6 rounded-lg border border-gray-200"
            >
              <div className="w-64 h-40 flex items-center justify-center overflow-hidden rounded-md border border-gray-300">
                <img
                  src={item.url || DefaultRoomImage}
                  alt={item.description}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="flex flex-col flex-grow justify-between h-full px-5">
                <div>
                  <h2 className="text-3xl">{item.city}</h2>
                  <p>{item.country}</p>
                  <div className="flex items-end my-2">
                    <Amount size="" value={item.price} />
                    <p className="ps-2">/ night</p>
                  </div>
                </div>
                {/* <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 mt-2"
                  
                >
                  Book
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Places;

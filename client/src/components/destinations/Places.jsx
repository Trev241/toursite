import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";
import { useNavigate } from 'react-router-dom';


const PlacesData = [
  {
    img: Img1,
    title: "Boat",
    location: "USA",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img2,
    title: "Taj Mahal",
    location: "India",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the river Yamuna in the Indian city of Agra.",
    fullDiscription : "The Taj Mahal is located on the right bank of the Yamuna River in a vast Mughal garden that encompasses nearly 17 hectares, in the Agra District in Uttar Pradesh. It was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal with construction starting in 1632 AD and completed in 1648 AD, with the mosque, the guest house and the main gateway on the south, the outer courtyard and its cloisters were added subsequently and completed in 1653 AD. The existence of several historical and Quaranic inscriptions in Arabic script have facilitated setting the chronology of Taj Mahal. For its construction, masons, stone-cutters, inlayers, carvers, painters, calligraphers, dome builders and other artisans were requisitioned from the whole of the empire and also from the Central Asia and Iran. Ustad-Ahmad Lahori was the main architect of the Taj Mahal.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img3,
    title: "Underwater",
    location: "US",
    description: "An amazing underwater view.",
    description: "An amazing underwater view.",
    price: 6200,
    type: "Cultural Relax",
  },
  {
    img: Img4,
    title: "Sydney",
    location: "USA",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img5,
    title: "Los Angeles",
    location: "United states",
    description: "Explore the vibrant city of Los Angeles.",
    description: "Explore the vibrant city of Los Angeles.",
    price: 6700,
    type: "Cultural Relax",
  },
  {
    img: Img6,
    title: "Las Vegas",
    title: "Las Vegas",
    location: "California",
    description: "Experience the excitement of Las Vegas.",
    description: "Experience the excitement of Las Vegas.",
    price: 6200,
    type: "Cultural Relax",
  },
];


const Places = () => {
  const navigate = useNavigate();

  const handleBookClick = (place) => {
    // Navigates to BookingPage with place details
    navigate('/booking', { state: { place } });
  };

  return (
    <div className="dark:bg-white dark:text-black bg-gray-50 py-10">
      <section data-aos="fade-up" className="container mx-auto max-w-screen-lg px-4">
        <h1 className="my-8 py-2 text-3xl font-bold text-center">
          Best Places to Visit
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {PlacesData.map((item, index) => (
            <PlaceCard
              handleBookClick={() => handleBookClick(item)}
              key={index}
              {...item}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Places;

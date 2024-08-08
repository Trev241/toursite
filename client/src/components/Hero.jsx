import React, { useContext, useEffect, useState } from "react";
import video from "../assets/video.mp4";
import { useSearchParams } from "react-router-dom";
import SiteContext from "./SiteContext";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [_, setSearchParams] = useSearchParams();
  const [destinationPlaceholder, setDestinationPlaceholder] =
    useState("Toronto");
  const { sites } = useContext(SiteContext);

  let intervalTask;

  useEffect(() => {
    if (!intervalTask && sites.length > 0)
      intervalTask = setInterval(() => {
        let placeholder = sites[Math.floor(Math.random() * sites.length)].city;
        setDestinationPlaceholder(placeholder);
      }, 7000);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30">
        <div className="animate-fade absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 ">
          <div className="flex flex-col">
            <div className="w-max">
              <h1 className="text-8xl py-4 overflow-hidden whitespace-nowrap mb-2">
                Let's go on a tour
              </h1>
            </div>
            <p className="text-4xl text-start text-white ps-1 mb-4">
              Get started by typing in your dream destination.
            </p>
          </div>
          <form className="flex justify-start px-1">
            <div>
              <input
                className="w-96 bg-white text-black border-gray-200 focus:outline-none rounded p-2"
                type="text"
                placeholder={destinationPlaceholder}
                value={query}
                onChange={(e) => {
                  e.preventDefault();
                  setQuery(e.target.value);
                  setSearchParams({
                    destination: e.target.value,
                  });
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;

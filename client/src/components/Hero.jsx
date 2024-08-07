import React, { useState } from "react";
import video from "../assets/video.mp4";
import { useSearchParams } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [_, setSearchParams] = useSearchParams();

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
        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4 ">
          <h1 className="text-8xl animation-bounce mb-8">Let's take a tour</h1>
          <form className="flex justify-between items-center max-w-[500px] max-h-[45px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/85">
            <div>
              <input
                className="bg-transparent focus:outline-none p-2"
                type="text"
                placeholder="Search destinations"
                value={query}
                onChange={(e) => {
                  e.preventDefault();
                  setQuery(e.target.value);
                  setSearchParams({
                    destination: e.target.value
                  })
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

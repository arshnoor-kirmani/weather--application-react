import React from "react";

export default function CurrentWeather() {
  return (
    <div className=" size-full grid grid-cols-1 grid-rows-[35%_65%]  text-shades-5">
      <div className="grid grid-cols-2 grid-rows-1 items-center justify-between p-5  size-full border-b-1 pb-8">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-5xl text-shades-4 capitalize">Good Morning</h1>
          <div className="flex items-center justify-center gap-5 text-xl">
            <span>20-10-2025</span>
            <span>12:35</span>
          </div>
          <div>
            <span className="text-2xl capitalize">Lakhimpur-Kheri</span>
          </div>
        </div>
        <div className="flex items-center justify-end ">
          <h1 className="text-8xl text-right  text-shades-4 gap-5 relative">
            32
            <span className="text-[1.5rem] absolute top-2">°C</span>
            <span className="text-xl ml-4">Sunny</span>
            <span className="text-sm block text-shades-5 text-center">
              rain chanses : <span className="text-xl text-shades-4">10%</span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

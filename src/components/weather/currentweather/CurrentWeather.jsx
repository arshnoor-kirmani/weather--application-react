import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../../../FetchFunction";

export default function CurrentWeather() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.currentweather);
  // const hourly_weather = useSelector((state) => state.hourlyweather);
  useEffect(() => {
    fetchCurrentWeather(dispatch);
  }, []);
  console.log(weatherData);
  return (
    <h1>Arshnoor</h1>
    // <>
    //   {current_weather.success ? (
    //     <div className=" size-full lg:gap-0 md:gap-8 flex flex-col grid-cols-1 md:grid-rows-[35%_65%] grid-rows-[47dvh_auto]  text-shades-5">
    //       {/* First Part */}
    //       <div className="flex flex-col-reverse md:flex-row grid-cols-2 grid-rows-1 items-center justify-between p-5 pt-0  w-full md:h-[40%] m -b-1">
    //         <div className="flex flex-col md:items-start items-center justify-center gap-2">
    //           <h1 className="md:text-5xl text-4xl text-shades-4 capitalize">
    //             {current_weather.dt.wish ? current_weather.dt.wish : "-"}
    //           </h1>
    //           <div className="flex items-center justify-center gap-5 md:text-xl text-md">
    //             <span>
    //               {current_weather.dt.date ? current_weather.dt.date : "-"}
    //             </span>
    //             <span>
    //               {current_weather.dt.time ? current_weather.dt.time : "-"}
    //             </span>
    //           </div>
    //           <div>
    //             <span className="text-2xl capitalize">
    //               {current_weather.name ? current_weather.name : "-"}
    //             </span>
    //           </div>
    //         </div>
    //         <div className="flex items-center justify-end ">
    //           <h1 className="text-8xl text-right  text-shades-4 gap-5 relative">
    //             {current_weather.weather.temp
    //               ? unit_code == "standard"
    //                 ? current_weather.weather.temp.toFixed(0)
    //                 : unit_code == "metric"
    //                 ? (current_weather.weather.temp - 273.15).toFixed(0)
    //                 : unit_code == "imperial"
    //                 ? (
    //                     ((current_weather.weather.temp - 273.15) * 9) / 5 +
    //                     32
    //                   ).toFixed(0)
    //                 : "-"
    //               : "-"}
    //             <span className="text-[1.5rem] absolute top-2">
    //               {unit_code == "standard"
    //                 ? "K"
    //                 : unit_code == "metric"
    //                 ? "°C"
    //                 : "°F"}
    //             </span>
    //             <span className="text-xl ml-4">
    //               {current_weather.weather.weather_disc}
    //             </span>
    //             <span className="text-sm block text-shades-5 text-center">
    //               rain chanses :{" "}
    //               <span className="text-xl text-shades-4">
    //                 {current_weather.weather.feels_like
    //                   ? unit_code == "standard"
    //                     ? current_weather.weather.feels_like.toFixed(0)
    //                     : unit_code == "metric"
    //                     ? (current_weather.weather.feels_like - 273.15).toFixed(
    //                         0
    //                       )
    //                     : unit_code == "imperial"
    //                     ? (
    //                         ((current_weather.weather.feels_like - 273.15) *
    //                           9) /
    //                           5 +
    //                         32
    //                       ).toFixed(0)
    //                     : "-"
    //                   : "-"}
    //                 <span className="text-[.8rem] ml-1">
    //                   {unit_code
    //                     ? unit_code == "standard"
    //                       ? "K"
    //                       : unit_code == "metric"
    //                       ? "°C"
    //                       : "°F"
    //                     : "-"}
    //                 </span>
    //               </span>
    //             </span>
    //           </h1>
    //         </div>
    //       </div>
    //       {/* Secoand Part */}
    //       <div className=" grid lg:grid-rows-[60%_36%] lg:gap-2 md:gap-5 gap-6 p-1 mt-2 h-[70%] w-full">
    //         <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-8">
    //           <div className="flex flex-col gap-1  rounded-2xl lg:p-2 lg:px-3 p-4 md:gap-3 bg-shades-1/40">
    //             <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
    //               Air Conditon
    //             </h1>
    //             <ul
    //               id="aircondition"
    //               className=" grid grid-cols-2 md:grid-cols-4 gap-1 gap-x-5 "
    //             >
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   temp_min
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.temp_min
    //                     ? unit_code == "standard"
    //                       ? current_weather.weather.weatehr_condition.temp_min.toFixed(
    //                           0
    //                         )
    //                       : unit_code == "metric"
    //                       ? (
    //                           current_weather.weather.weatehr_condition
    //                             .temp_min - 273.15
    //                         ).toFixed(0)
    //                       : unit_code == "imperial"
    //                       ? (
    //                           ((current_weather.weather.weatehr_condition
    //                             .temp_min -
    //                             273.15) *
    //                             9) /
    //                             5 +
    //                           32
    //                         ).toFixed(0)
    //                       : "-"
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   {unit_code
    //                     ? unit_code == "standard"
    //                       ? "K"
    //                       : unit_code == "metric"
    //                       ? "°C"
    //                       : "°F"
    //                     : "-"}
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-md text-gray-200">
    //                   temp_max
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.temp_max
    //                     ? unit_code == "standard"
    //                       ? current_weather.weather.weatehr_condition.temp_max.toFixed(
    //                           0
    //                         )
    //                       : unit_code == "metric"
    //                       ? (
    //                           current_weather.weather.weatehr_condition
    //                             .temp_max - 273.15
    //                         ).toFixed(0)
    //                       : unit_code == "imperial"
    //                       ? (
    //                           ((current_weather.weather.weatehr_condition
    //                             .temp_max -
    //                             273.15) *
    //                             9) /
    //                             5 +
    //                           32
    //                         ).toFixed(0)
    //                       : "-"
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   {unit_code
    //                     ? unit_code == "standard"
    //                       ? "K"
    //                       : unit_code == "metric"
    //                       ? "°C"
    //                       : "°F"
    //                     : "-"}
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-md text-gray-200">
    //                   humidity
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.humidity
    //                     ? current_weather.weather.weatehr_condition.humidity.toFixed(
    //                         0
    //                       )
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   %
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-md text-gray-200">
    //                   pressure
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.pressure
    //                     ? current_weather.weather.weatehr_condition.pressure.toFixed(
    //                         0
    //                       )
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   hPa
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   wind speed
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.wind.speed
    //                     ? unit_code == "standard"
    //                       ? current_weather.weather.weatehr_condition.wind.speed.toFixed(
    //                           0
    //                         )
    //                       : unit_code == "metric"
    //                       ? (
    //                           current_weather.weather.weatehr_condition.wind
    //                             .speed * 3.6
    //                         ).toFixed(0)
    //                       : unit_code == "imperial"
    //                       ? (
    //                           current_weather.weather.weatehr_condition.wind
    //                             .speed * 2.23694
    //                         ).toFixed(0)
    //                       : "-"
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   {unit_code
    //                     ? unit_code == "standard"
    //                       ? "m/s"
    //                       : unit_code == "metric"
    //                       ? "km/h"
    //                       : "mph"
    //                     : "-"}
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   sea_level
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.sea_level
    //                     ? current_weather.weather.weatehr_condition.sea_level
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   hPa
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   visibility
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.visibility
    //                     ? unit_code == "standard"
    //                       ? current_weather.weather.weatehr_condition.visibility.toFixed(
    //                           0
    //                         )
    //                       : unit_code == "metric"
    //                       ? (
    //                           current_weather.weather.weatehr_condition
    //                             .visibility / 1000
    //                         ).toFixed(0)
    //                       : unit_code == "imperial"
    //                       ? (
    //                           current_weather.weather.weatehr_condition
    //                             .visibility / 1609.34
    //                         ).toFixed(0)
    //                       : "-"
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   {unit_code
    //                     ? unit_code == "standard"
    //                       ? "m"
    //                       : unit_code == "metric"
    //                       ? "km"
    //                       : "mi"
    //                     : "-"}
    //                 </span>
    //               </li>
    //               <li className=" text-center flex flex-col items-center justify-center">
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   grnd_level
    //                 </span>
    //                 <h2 className="lg:text-md md:text-xl text-shades-4">
    //                   {current_weather.weather.weatehr_condition.grnd_level
    //                     ? current_weather.weather.weatehr_condition.grnd_level
    //                     : "-"}
    //                 </h2>
    //                 <span className="lg:text-xs md:text-sm text-gray-200">
    //                   hPa
    //                 </span>
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="flex flex-col gap-1 bg-shades-1/40 rounded-2xl p-4 md:p-2 px-3">
    //             <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
    //               Hours Forcaste
    //             </h1>
    //             <ul
    //               id="hourlyforcaste"
    //               className=" grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 *:rounded-xl *: *:-gray-50/50 *:p-1"
    //             >
    //               {hourly_weather.hourly.map((hour, index) => (
    //                 <li className=" text-center flex flex-col items-center justify-center">
    //                   <span className="lg:text-xs md:text-md text-gray-200">
    //                     {hour.dt.day ? hour.dt.day : "-"}
    //                   </span>
    //                   <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                     {hour.weather.temp
    //                       ? unit_code == "standard"
    //                         ? hour.weather.temp.toFixed(0)
    //                         : unit_code == "metric"
    //                         ? (hour.weather.temp - 273.15).toFixed(0)
    //                         : unit_code == "imperial"
    //                         ? (
    //                             ((hour.weather.temp - 273.15) * 9) / 5 +
    //                             32
    //                           ).toFixed(0)
    //                         : "-"
    //                       : "-"}
    //                     <span className="text-xs absolute top-0 right-0">
    //                       {unit_code == "standard"
    //                         ? "K"
    //                         : unit_code == "metric"
    //                         ? "°C"
    //                         : "°F"}
    //                     </span>
    //                   </h2>
    //                   <span className="lg:text-[.6rem] md:text-md text-gray-200 text-nowrap">
    //                     {hour.weather.weather_desc
    //                       ? hour.weather.weather_desc
    //                       : "-"}
    //                   </span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //         {/* 7 Day Forcaste Section */}
    //         <div className="flex flex-col gap-2 md:gap-0  ">
    //           <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
    //             7 Day Forcast
    //           </h1>
    //           <ul className="grid grid-cols-2 md:grid-cols-7 gap-4 p-2">
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //             <li className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3">
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Tue
    //               </span>
    //               <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
    //                 30{" "}
    //                 <span className="text-xs absolute top-0 right-0">°C</span>
    //               </h2>
    //               <span className="lg:text-xs md:text-md text-gray-200">
    //                 Sunny
    //               </span>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="flex items-center justify-center h-full w-full">
    //       <h1 className="text-2xl text-red-500">Error fetching weather data</h1>
    //     </div>
    //   )}
    // </>
  );
}

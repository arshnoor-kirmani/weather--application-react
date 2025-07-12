import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../../../FetchFunction";
import { setCurrentWeather } from "../../../app/weatherInfo/CurrentWeatherSlice";

export default function CurrentWeather() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.currentweather);
  // Set your unit_code here, e.g. from props, state, or a selector
  const unit_code = "metric"; // or "standard" or "imperial"/metric
  const defaultSetting = useSelector((state) => state.setting);
  const [custm_units, setUnites] = useState({
    temp: defaultSetting.temperature == "celsius" ? "C" : "F",
    wind_speed: defaultSetting.speed,
    pressure: defaultSetting.pressure,
    precipitation: defaultSetting.precipitation,
    distance: defaultSetting.distance,
  });
  useEffect(() => {
    if (!weatherData?.current_weather?.dt?.time) {
      fetchCurrentWeather(
        {
          lat: 26.8393,
          lon: 80.9231,
        },
        dispatch,
        setCurrentWeather
      );
      let uniteSetting = JSON.parse(localStorage.getItem("unite_setting"));
      if (uniteSetting) {
        let obj = {
          temp: uniteSetting.temperature == "celsius" ? "C" : "F",
          wind_speed: uniteSetting.speed,
          pressure: uniteSetting.pressure,
          precipitation: uniteSetting.precipitation,
          distance: uniteSetting.distance,
        };
        setUnites(obj);
      }
    }
  }, []);
  // useEffect(() => {}, [weatherData]);
  if (weatherData.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <svg
          className="animate-spin h-10 w-10 text-shades-4 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <h1 className="text-xl text-shades-4">Loading weather data...</h1>
      </div>
    );
  } else {
  }
  return (
    <>
      {weatherData.success ? (
        <div className=" size-full lg:gap-0 md:gap-8 flex flex-col grid-cols-1 md:grid-rows-[35%_65%] grid-rows-[47dvh_auto]  text-shades-5">
          {/* First Part */}
          <div className="flex flex-col-reverse md:flex-row grid-cols-2 grid-rows-1 items-center justify-between p-5 pt-0  w-full md:h-[40%] m -b-1">
            <div className="flex flex-col md:items-start items-center justify-center gap-2">
              <h1 className="md:text-5xl text-4xl text-shades-4 capitalize">
                {weatherData.current_weather.dt.wish
                  ? weatherData.current_weather.dt.wish
                  : "-"}
              </h1>
              <div className="flex items-center justify-center gap-5 md:text-xl text-md">
                <span>
                  {weatherData.current_weather.dt.date
                    ? weatherData.current_weather.dt.date
                    : "-"}
                </span>
                <span>
                  {weatherData.current_weather.dt.time
                    ? weatherData.current_weather.dt.time
                    : "-"}
                </span>
              </div>
              <div>
                <span className="text-2xl capitalize">
                  {weatherData.location.city
                    ? weatherData.location.city
                    : "UnKown"}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end ">
              <h1 className="text-8xl text-right  text-shades-4 gap-5 relative">
                {weatherData.current_weather.weather.temp
                  ? custm_units.temp == "C"
                    ? weatherData.current_weather.weather.temp.toFixed(0)
                    : custm_units.temp == "F"
                    ? (
                        (weatherData.current_weather.weather.temp * 9) / 5 +
                        32
                      ).toFixed(0)
                    : custm_units.temp == "K"
                    ? (
                        weatherData.current_weather.weather.temp + 273.15
                      ).toFixed(0)
                    : "-"
                  : "-"}
                <span className="text-[1.5rem] absolute top-2">
                  {custm_units.temp
                    ? custm_units.temp == "K"
                      ? "K"
                      : custm_units.temp == "C"
                      ? "°C"
                      : "°F"
                    : "-"}
                </span>
                <span className="text-xl ml-4">
                  {weatherData.current_weather.weather.weather_main}
                </span>
                <span className="text-sm block text-shades-5 text-center">
                  Feel Like Temp :{" "}
                  <span className="text-xl text-shades-4">
                    {weatherData.current_weather.weather.feels_like
                      ? unit_code == "metric"
                        ? weatherData.current_weather.weather.feels_like.toFixed(
                            0
                          )
                        : unit_code == "imperial"
                        ? (
                            (weatherData.current_weather.feels_like * 9) / 5 +
                            32
                          ).toFixed(0)
                        : unit_code == "standard"
                        ? (
                            weatherData.current_weather.feels_like + 273.15
                          ).toFixed(0)
                        : "-"
                      : "-"}
                    <span className="text-[.8rem] ml-1">
                      {custm_units.temp
                        ? custm_units.temp == "K"
                          ? "K"
                          : custm_units.temp == "C"
                          ? "°C"
                          : "°F"
                        : "-"}
                    </span>
                  </span>
                </span>
              </h1>
            </div>
          </div>
          {/* Secoand Part */}
          <div className=" grid lg:grid-rows-[60%_36%] lg:gap-2 md:gap-5 gap-6 p-1 mt-2 h-[70%] w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-8">
              <div className="flex flex-col gap-1  rounded-2xl lg:p-2 lg:px-3 p-4 md:gap-3 bg-shades-1/40">
                <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
                  Air Conditon
                </h1>
                <ul
                  id="aircondition"
                  className=" grid grid-cols-2 md:grid-cols-4 gap-1 gap-x-5 "
                >
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-xs md:text-sm text-gray-200 capitalize">
                      min temp
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.temp_min
                        ? custm_units.temp == "C"
                          ? weatherData.current_weather.weather.temp_min.toFixed(
                              0
                            )
                          : custm_units.temp == "F"
                          ? (
                              (weatherData.current_weather.weather.temp_min *
                                9) /
                                5 +
                              32
                            ).toFixed(0)
                          : custm_units.temp == "K"
                          ? (
                              weatherData.current_weather.weather.temp_min +
                              273.15
                            ).toFixed(0)
                          : "-"
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units.temp
                        ? custm_units.temp == "K"
                          ? "K"
                          : custm_units.temp == "C"
                          ? "°C"
                          : "°F"
                        : "-"}
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                      max temp
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.temp_max
                        ? custm_units.temp == "C"
                          ? weatherData.current_weather.weather.temp_max.toFixed(
                              0
                            )
                          : custm_units.temp == "F"
                          ? (
                              (weatherData.current_weather.weather.temp_max *
                                9) /
                                5 +
                              32
                            ).toFixed(0)
                          : custm_units.temp == "K"
                          ? (
                              weatherData.current_weather.weather.temp_max +
                              273.15
                            ).toFixed(0)
                          : "-"
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units.temp
                        ? custm_units.temp == "K"
                          ? "K"
                          : custm_units.temp == "C"
                          ? "°C"
                          : "°F"
                        : "-"}
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                      humidity
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.humidity
                        ? weatherData.current_weather.weather.humidity.toFixed(
                            0
                          )
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      %
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                      precipitation
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.precipitation
                        ? custm_units.precipitation == "mm"
                          ? weatherData.current_weather.weather.precipitation.toFixed(
                              0
                            )
                          : weatherData.current_weather.weather.precipitation /
                            25.4
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units.precipitation
                        ? custm_units.precipitation == "mm"
                          ? "mm"
                          : "inch"
                        : "-"}
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-[.7rem] md:text-sm text-gray-200 capitalize">
                      wind speed
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.wind.speed
                        ? custm_units.wind_speed == "km/h"
                          ? weatherData.current_weather.weather.wind.speed.toFixed(
                              1
                            )
                          : custm_units.wind_speed == "m/s"
                          ? (
                              weatherData.current_weather.weather.wind.speed /
                              3.6
                            ).toFixed(1)
                          : custm_units.wind_speed == "knots"
                          ? (
                              weatherData.current_weather.weather.wind.speed /
                              1.852
                            ).toFixed(1)
                          : "-"
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units
                        ? custm_units.wind_speed == "m/s"
                          ? "m/s"
                          : custm_units.wind_speed == "km/h"
                          ? "km/h"
                          : "mph"
                        : "-"}
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-[.7rem] md:text-sm text-gray-200  capitalize text-nowrap">
                      sea pressure
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4 normal-case">
                      {weatherData.current_weather.weather.sea_level
                        ? custm_units.pressure == "hpa"
                          ? weatherData.current_weather.weather.sea_level
                          : custm_units.pressure == "kpa"
                          ? weatherData.current_weather.weather.sea_level / 10
                          : custm_units.pressure == "inch"
                          ? (
                              weatherData.current_weather.weather.sea_level *
                              0.0295
                            ).toFixed(2)
                          : (
                              weatherData.current_weather.weather.sea_level *
                              0.75
                            ).toFixed(2)
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units
                        ? custm_units.pressure == "hpa"
                          ? "hPa"
                          : custm_units.pressure == "kpa"
                          ? "kPa"
                          : custm_units.pressure == "inch"
                          ? "inch"
                          : "mm"
                        : "-"}
                    </span>
                  </li>
                  <li className=" text-center flex flex-col items-center justify-center capitalize">
                    <span className="lg:text-[.7rem] md:text-sm text-gray-200 capitalize text-nowrap">
                      surface pressure
                    </span>
                    <h2 className="lg:text-md md:text-xl text-shades-4">
                      {weatherData.current_weather.weather.grnd_level
                        ? custm_units.pressure == "hpa"
                          ? weatherData.current_weather.weather.grnd_level
                          : custm_units.pressure == "kpa"
                          ? weatherData.current_weather.weather.grnd_level / 10
                          : custm_units.pressure == "inch"
                          ? (
                              weatherData.current_weather.weather.grnd_level *
                              0.0295
                            ).toFixed(2)
                          : (
                              weatherData.current_weather.weather.grnd_level *
                              0.75
                            ).toFixed(2)
                        : "-"}
                    </h2>
                    <span className="lg:text-xs md:text-sm text-gray-200 normal-case">
                      {custm_units
                        ? custm_units.pressure == "hpa"
                          ? "hPa"
                          : custm_units.pressure == "kpa"
                          ? "kPa"
                          : custm_units.pressure == "inch"
                          ? "inch"
                          : "mm"
                        : "-"}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-1 bg-shades-1/40 rounded-2xl p-4 md:p-2 px-3">
                <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
                  Hours Forcaste
                </h1>
                <ul
                  id="hourlyforcaste"
                  className=" grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 *:rounded-xl *: *:-gray-50/50 *:p-1"
                >
                  {weatherData.hourly_weather.hourly
                    .filter((hour, idx) => idx % 3 === 0)
                    .slice(0, 8)
                    .map((hour, index) => (
                      <li
                        className=" text-center flex flex-col items-center justify-center"
                        key={index + "Arshnoor"}
                      >
                        <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                          {hour.dt.day ? hour.dt.time : "-"}
                        </span>
                        <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
                          {hour.weather.temp
                            ? custm_units.temp == "C"
                              ? hour.weather.temp.toFixed(0)
                              : custm_units.temp == "F"
                              ? ((hour.weather.temp * 9) / 5 + 32).toFixed(0)
                              : custm_units.temp == "K"
                              ? (hour.weather.temp - 273.15).toFixed(0)
                              : "-"
                            : "-"}
                          <span className="text-xs absolute top-0 right-0">
                            {custm_units.temp
                              ? custm_units.temp == "K"
                                ? "K"
                                : custm_units.temp == "C"
                                ? "°C"
                                : "°F"
                              : "-"}
                          </span>
                        </h2>
                        <span className="lg:text-[.6rem] md:text-md text-gray-200 text-nowrap">
                          {hour.weather.weather_main
                            ? hour.weather.weather_main
                            : "-"}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {/* 7 Day Forcaste Section */}
            <div className="flex flex-col gap-2 md:gap-0  ">
              <h1 className="lg:text-sm md:text-md text-shades-4 text-left">
                7 Day Forcast
              </h1>
              <ul className="grid grid-cols-2 md:grid-cols-7 gap-4 p-2">
                {weatherData.week_weather.weekly_data
                  .slice(2)
                  .map((item, i) => (
                    <li
                      key={i}
                      className="flex flex-col items-center justify-center bg-shades-1/40 rounded-xl py-2 px-3"
                    >
                      <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                        {i == 0 ? "Todya" : item?.dt.day ?? "-"}
                      </span>
                      <h2 className="lg:text-xl md:text-2xl relative pr-3 left-1 inline text-shades-4">
                        {item?.weather.temperature_2m_max
                          ? custm_units.temp == "C"
                            ? (
                                (item.weather.temperature_2m_max +
                                  item.weather.temperature_2m_min) /
                                2
                              ).toFixed(0)
                            : custm_units.temp == "F"
                            ? (
                                (((item.weather.temperature_2m_max +
                                  item.weather.temperature_2m_min) /
                                  2) *
                                  9) /
                                  5 +
                                32
                              ).toFixed(0)
                            : custm_units.temp == "K"
                            ? (
                                (item.weather.temperature_2m_max +
                                  item.weather.temperature_2m_min) /
                                  2 +
                                273.15
                              ).toFixed(0)
                            : "-"
                          : "-"}
                        <span className="text-xs absolute top-0 right-0">
                          {custm_units.temp
                            ? custm_units.temp == "K"
                              ? "K"
                              : custm_units.temp == "C"
                              ? "°C"
                              : "°F"
                            : "-"}
                        </span>
                      </h2>
                      <span className="lg:text-xs md:text-md text-gray-200 capitalize">
                        {item.weather.weather_main}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-2xl text-red-500">Error fetching weather data</h1>
        </div>
      )}
    </>
  );
}

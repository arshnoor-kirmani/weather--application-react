import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchCurrentWeather } from "../../../FetchFunction";
import { useDispatch, useSelector } from "react-redux";
import { setMapWeather } from "../../../app/weatherInfo/MapWeatherSlice";
import { SearchBox } from "../cites/CitesWeather";

const OpenStreetMapClick = () => {
  const [x, setlocatio] = useState({ lat: 20.5937, lng: 78.9629 });
  const dispatch = useDispatch();
  const defaultSetting = useSelector((state) => state.setting);
  const [custm_units, setUnites] = useState({
    temp: defaultSetting.temperature == "celsius" ? "C" : "F",
    wind_speed: defaultSetting.speed,
    pressure: defaultSetting.pressure,
    precipitation: defaultSetting.precipitation,
    distance: defaultSetting.distance,
  });
  const mapRef = useRef(null);
  const [isFocused, setIsFocused] = useState("second");
  const LocationWeather = useSelector((state) => state.mapweather);
  const inputRef = useRef();
  async function MapLocationWeather(params) {
    fetchCurrentWeather({ lat: x.lat, lon: x.lng }, dispatch, setMapWeather);
  }
  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([x.lat, x.lng], 5); // Center: India

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">Arshnoor</a> contributors',
      }).addTo(map);

      let marker = null;

      map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = L.marker([lat, lng]).addTo(map);
        }
        setlocatio({
          lat: lat,
          lng: lng,
        });
      });
    }
  }, []);
  useEffect(() => {
    MapLocationWeather();
  }, [x]);
  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-1 size-full">
      <div className="grid lg:grid-rows-1 grid-rows-2 lg:grid-cols-[68%_30%] gap-4 lg:h-full z-1">
        <div
          ref={mapRef}
          id="map"
          className="w-full h-full rounded-2xl border-1 border-shades-4"
        />
        {LocationWeather.success ? (
          <div className="border size-full grid grid-cols-1 grid-rows-3 px-2 py-1 rounded-3xl text-shades-5/90 gap-1         ">
            <div className="flex flex-col-reverse justify-center items-center border-b-1 pb-1">
              <div className="self-start">
                <h1 className="text-shades-5/80 text-2xl">
                  {LocationWeather.location?.display_name.split(",")[0] ||
                    "Unkown"}
                </h1>
                <span className="text-xs ">
                  {LocationWeather.current_weather?.dt.time ?? "-"}
                </span>
              </div>
              <div>
                <h1 className="text-4xl text-shades-4/85">
                  {LocationWeather.current_weather?.weather.temp
                    ? custm_units.temp == "C"
                      ? LocationWeather.current_weather?.weather.temp.toFixed(0)
                      : custm_units.temp == "F"
                      ? (
                          (LocationWeather.current_weather?.weather.temp * 9) /
                            5 +
                          32
                        ).toFixed(0)
                      : custm_units.temp == "K"
                      ? (
                          LocationWeather.current_weather?.weather.temp + 273.15
                        ).toFixed(0)
                      : "-"
                    : "-" ?? "-"}{" "}
                  <span className="text-xl">
                    {custm_units.temp
                      ? custm_units.temp == "K"
                        ? "K"
                        : custm_units.temp == "C"
                        ? "°C"
                        : "°F"
                      : "-"}
                  </span>
                </h1>
                <span className="text-sm text-shades-5/50">
                  {LocationWeather.current_weather.weather.weather_main}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-b-1">
              <h1 className="text-sm">Time Forcaste</h1>
              <ul className="flex justify-evenly items-center">
                {LocationWeather.hourly_weather.hourly
                  .slice(0, 3)
                  .map((itme, i) => (
                    <li className="text-center" key={i}>
                      <span className="text-xs">{itme.dt.time}</span>
                      <h1 className="text-shades-4 relative">
                        {itme?.weather.temp
                          ? custm_units.temp == "C"
                            ? itme?.weather.temp.toFixed(0)
                            : custm_units.temp == "F"
                            ? ((itme?.weather.temp * 9) / 5 + 32).toFixed(0)
                            : custm_units.temp == "K"
                            ? (itme?.weather.temp + 273.15).toFixed(0)
                            : "-"
                          : "-"}{" "}
                        <span className="text-xs absolute top-0 -right-0.5">
                          {custm_units.temp
                            ? custm_units.temp == "K"
                              ? "K"
                              : custm_units.temp == "C"
                              ? "°C"
                              : "°F"
                            : "-"}
                        </span>
                      </h1>
                      <span className="text-xs">
                        {itme.weather.weather_main}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex flex-col gap-1.5">
              <h1 className="text-sm">Day Forcaste</h1>
              <ul className="flex justify-evenly items-center">
                {LocationWeather.week_weather.weekly_data
                  .slice(3, 6)
                  .map((items, i) => (
                    <li key={i} className="text-center">
                      <span className="text-sm">{items.dt.day ?? "-"}</span>
                      <h1 className="text-shades-4 relative">
                        {items?.weather.temperature_2m_max
                          ? custm_units.temp == "C"
                            ? (
                                (items.weather.temperature_2m_max +
                                  items.weather.temperature_2m_min) /
                                2
                              ).toFixed(0)
                            : custm_units.temp == "F"
                            ? (
                                (((items.weather.temperature_2m_max +
                                  items.weather.temperature_2m_min) /
                                  2) *
                                  9) /
                                  5 +
                                32
                              ).toFixed(0)
                            : custm_units.temp == "K"
                            ? (
                                (items.weather.temperature_2m_max +
                                  items.weather.temperature_2m_min) /
                                  2 +
                                273.15
                              ).toFixed(0)
                            : "-"
                          : "-"}
                        <span className="text-xs absolute top-0 -right-0.5">
                          {custm_units.temp
                            ? custm_units.temp == "K"
                              ? "K"
                              : custm_units.temp == "C"
                              ? "°C"
                              : "°F"
                            : "-"}
                        </span>
                      </h1>
                      <span className="text-xs">
                        {items.weather.weather_main}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default function MapWeather() {
  return <OpenStreetMapClick />;
}

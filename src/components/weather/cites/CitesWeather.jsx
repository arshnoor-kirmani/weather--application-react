import { useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { fetchCurrentWeather } from "../../../FetchFunction";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setCitesWeather } from "../../../app/weatherInfo/CitesWeatherSlice";
export default function CitesWeather() {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const CitesWeather = useSelector((state) => state.citeweather);
  const custm_units = {
    temp: "C",
    wind_speed: "km/h",
    pressure: "hpa",
    precipitation: "mm",
    distance: "km",
  };
  console.log("slice", CitesWeather);
  return (
    <div className="grid grid-cols-1 lg:grid-rows-[10%_90%] grid-rows-[5%_95%] w-full h-fit gap-4">
      <div
        id="searchbar"
        className={`relative w-full h-8 flex bg-shades-5/20 rounded-md  pr-3 text-shades-5 p-0.5 ${
          isFocused ? "outline-1 outline-shades-4" : ""
        }`}
      >
        <SearchBox setIsFocused={setIsFocused} ref={inputRef} />
      </div>
      {CitesWeather.success ? (
        <div
          id="container"
          className="grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 grid-rows-[37%_72%] size-full lg:gap-2 gap-3 "
        >
          <div className=" size-full">
            <ul className="grid grid-cols-1 grid-rows-2 gap-3 size-full ">
              {CitesWeather.hourly_weather.hourly.slice(0, 2).map((item) => (
                <li
                  key={nanoid.apply()}
                  className="flex justify-between items-center px-2 py-3  border-shades-5 bg-shades-1/30 text-shades-5/90 rounded-xl "
                >
                  <div>
                    <h1 className="text-xl capitalize grid gap-1">
                      {CitesWeather.location?.display_name.split(",")[0] ||
                        "Unknown"}
                      <span className="text-xs  text-shades-5/70">
                        {item.dt.wish ?? "-"} ({item.dt.time})
                      </span>
                    </h1>
                  </div>
                  <div>
                    <h1 className=" text-3xl relative pr-2 text-shades-4/90">
                      {item?.weather.temp
                        ? custm_units.temp == "C"
                          ? item?.weather.temp.toFixed(0)
                          : custm_units.temp == "F"
                          ? ((item?.weather.temp * 9) / 5 + 32).toFixed(0)
                          : custm_units.temp == "K"
                          ? (item?.weather.temp + 273.15).toFixed(0)
                          : "-"
                        : "-"}{" "}
                      <span className="inline text-xs absolute top-0 right-1  text-shades-5/70">
                        {custm_units.temp
                          ? custm_units.temp == "K"
                            ? "K"
                            : custm_units.temp == "C"
                            ? "°C"
                            : "°F"
                          : "-"}
                      </span>
                      <span className="text-sm block text-shades-5/50">
                        Sunny
                      </span>
                    </h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-2 grid grid-cols-1 grid-rows-3 gap-2 rounded-2xl bg-shades-1/20 text-shades-5/85">
            <div className=" flex justify-between px-2 p-1 text-shades-5/90 border-b-1 border-shades-5/50">
              <div className="size-full flex flex-col justify-center">
                <h1 className="text-xl">
                  {CitesWeather.location?.display_name.split(",")[0] ||
                    "Unkown"}
                </h1>
                <span className="text-xs">
                  {CitesWeather.current_weather?.dt.wish || "-"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl text-shades-4/90 relative pr-1">
                  {" "}
                  {CitesWeather.current_weather?.weather.temp
                    ? custm_units.temp == "C"
                      ? CitesWeather.current_weather?.weather.temp.toFixed(0)
                      : custm_units.temp == "F"
                      ? (
                          (CitesWeather.current_weather?.weather.temp * 9) / 5 +
                          32
                        ).toFixed(0)
                      : custm_units.temp == "K"
                      ? (
                          CitesWeather.current_weather?.weather.temp + 273.15
                        ).toFixed(0)
                      : "-"
                    : "-"}
                  <span className="text-xs absolute top-0 -right-1">
                    {custm_units.temp
                      ? custm_units.temp == "K"
                        ? "K"
                        : custm_units.temp == "C"
                        ? "°C"
                        : "°F"
                      : "-"}
                  </span>
                </h1>

                <span className="text-xs text-shades-5/50">
                  {CitesWeather.current_weather?.weather.weather_main}
                </span>
              </div>
            </div>
            <div className=" grid border-b-1 px-2 border-shades-5/50">
              <h1 className="text-sm">Today Forcaste</h1>

              <ul className="grid grid-cols-4 gap-2 grid-rows-1 justify-center items-center lg:px-2 lg:pb-1">
                {CitesWeather?.hourly_weather?.hourly
                  .slice(0, 4)
                  .map((item, idx) => (
                    <li
                      className={`px-4 text-center  ${
                        idx != 3 ? "border-r-1" : ""
                      } border-shades-5/40`}
                      key={nanoid.apply()}
                    >
                      <span className="text-xs">{item.dt?.time || "-"}</span>
                      <h1 className="text-2xl relative pr-2 text-shades-4/90">
                        {item?.weather.temp
                          ? custm_units.temp == "C"
                            ? item?.weather.temp.toFixed(0)
                            : custm_units.temp == "F"
                            ? ((item?.weather.temp * 9) / 5 + 32).toFixed(0)
                            : custm_units.temp == "K"
                            ? (item?.weather.temp + 273.15).toFixed(0)
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
                      </h1>
                      <span className="text-xs text-shades-5/50">
                        {item.weather.weather_main ?? "-"}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="grid px-2">
              <h1 className="text-sm">3Day forcaste</h1>
              <ul className="grid grid-cols-4 gap-2 grid-rows-1 justify-center items-center px-2 pb-1">
                <li className="px-4 text-center border rounded-xl border-shades-5/40">
                  <span className="text-xs">Today</span>
                  <h1 className="text-2xl relative pr-2 text-shades-4/90">
                    {CitesWeather?.week_weather.weekly_data[0]?.weather
                      .temperature_2m_max
                      ? custm_units.temp == "C"
                        ? (
                            (CitesWeather?.week_weather.weekly_data[0].weather
                              .temperature_2m_max +
                              CitesWeather?.week_weather.weekly_data[0].weather
                                .temperature_2m_min) /
                            2
                          ).toFixed(0)
                        : custm_units.temp == "F"
                        ? (
                            (((CitesWeather?.week_weather.weekly_data[0].weather
                              .temperature_2m_max +
                              CitesWeather?.week_weather.weekly_data[0].weather
                                .temperature_2m_min) /
                              2) *
                              9) /
                              5 +
                            32
                          ).toFixed(0)
                        : custm_units.temp == "K"
                        ? (
                            (CitesWeather?.week_weather.weekly_data[0].weather
                              .temperature_2m_max +
                              CitesWeather?.week_weather.weekly_data[0].weather
                                .temperature_2m_min) /
                              2 +
                            273.15
                          ).toFixed(0)
                        : "-"
                      : "-"}{" "}
                    <span className="text-xs absolute top-0 right-0">
                      {" "}
                      {custm_units.temp
                        ? custm_units.temp == "K"
                          ? "K"
                          : custm_units.temp == "C"
                          ? "°C"
                          : "°F"
                        : "-"}
                    </span>
                  </h1>
                  <span className="text-xs text-shades-5/50">
                    {
                      CitesWeather.week_weather.weekly_data[0].weather
                        .weather_main
                    }
                  </span>
                </li>
                {CitesWeather.week_weather.weekly_data
                  .slice(1, 4)
                  .map((item) => (
                    <li
                      className="px-4 text-center border rounded-xl border-shades-5/40"
                      key={nanoid.apply()}
                    >
                      <span className="text-xs">{item.dt.day}</span>
                      <h1 className="text-2xl relative pr-2 text-shades-4/90">
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
                      </h1>
                      <span className="text-xs text-shades-5/50 overflow-hidden text-ellipsis w-fite">
                        {item.weather.weather_main}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="size-full flex justify-center items-center">
          <h1 className="text-shades-4/70 text-3xl">
            Search Your Cite Weather. . . .
          </h1>
        </div>
      )}
    </div>
  );
}

function SearchBox({ setIsFocused, ref }) {
  const [searchValue, setValue] = useState("Lucknow");
  const [input_location, setInput_location] = useState("");
  const dispatch = useDispatch();
  // Debounce timer state
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [addressList, setAddressList] = useState({
    succes: 0,
    data: [],
  });
  const handleChange = (input_value) => {
    setValue(input_value);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    // if ((value = "")) return;
    let timer;
    if (input_value != "" && input_value != /\s+/g) {
      timer = setTimeout(() => {
        // document.querySelector("button#searchbtn").classList.remove("hidden");
        let query = input_value.replace(/\s+/g, "+");
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?addressdetails=5&q=${query}&format=jsonv2&limit=10`
          )
          .then((response) => {
            setAddressList({
              succes: response.status,
              data: response.data,
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, 600);
    } else {
      setAddressList({
        succes: 0,
      });
    }
    setDebounceTimer(timer);
  };
  const fetch_cite_weather = async (input_location) => {
    const cite_location = JSON.parse(input_location);
    fetchCurrentWeather(
      { lon: cite_location.lon, lat: cite_location.lat },
      dispatch,
      setCitesWeather
    );
  };
  return (
    <>
      <input
        type="text"
        id="search_box"
        className="w-full h-full px-2 outline-none rounded-md"
        placeholder="Search Cite..."
        value={searchValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        ref={ref}
        data_location={input_location}
      />
      <button
        id="searchBtn"
        className={`px-1 cursor-pointer active:scale-98 transition-all duration-100 ease-in-out ${
          addressList.succes == 200 ? "hidden" : "inline"
        }`}
        onClick={(e) => {
          // handleChange(ref.current.value);
          setValue(ref.current.value);
          fetch_cite_weather(
            input_location ||
              JSON.stringify({
                lat: 26.8393,
                lon: 80.9231,
              })
          );

          // e.target.classList.add("hidden");
        }}
      >
        <IoIosSearch />
      </button>
      <button
        id="cutBtn"
        className={`px-1 cursor-pointer active:scale-98 transition-all duration-100 ease-in-out ${
          addressList.succes == 200 ? "inline" : "hidden"
        }`}
        onClick={(e) => {
          setValue("");
          e.target.classList.add("hidden");
          setAddressList({
            succes: 0,
          });
          // ref.current && ref.current.blur(); // Remove focus to hide outline
        }}
      >
        <MdOutlineCancel />
      </button>
      <select
        className={`absolute top-full left-0 w-full z-10 h-${
          addressList.data?.length * 10
        } bg-shades-1/95 mt-0.5 transition-all duration-200 ease-in-out ${
          addressList.succes == 200 ? "inline" : "hidden"
        }`}
        multiple
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        onWheel={(e) => e.currentTarget.blur()} // Optional: disables scroll wheel
        onSelect={() => {
          alert();
        }}
      >
        {addressList?.data?.map((item) => (
          <option
            key={nanoid()}
            className="px-2 py-2 hover:bg-shades-5/40 cursor-pointer transition-all duration-100 ease-in-out active:scale-99"
            value={item.display_name}
            data_location={JSON.stringify(item)}
            onClick={(e) => {
              setValue(e.target.value);
              e.target.parentElement.classList.toggle("inline");
              e.target.parentElement.classList.toggle("hidden");
              setInput_location(e.target.attributes.data_location.value);
              fetch_cite_weather(e.target.attributes.data_location.value);
            }}
          >
            {item.display_name}
          </option>
        ))}
      </select>
    </>
  );
}
export { SearchBox };

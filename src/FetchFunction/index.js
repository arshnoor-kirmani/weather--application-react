import axios from "axios";
// Current Section initial object
let current = {
  generationtime_ms: null,
  utc_offset_seconds: null,
  timezone: null,
  timezone_abbreviation: null,
  elevation: null,
  location: {
    lon: null,
    lat: null,
    city: null,
    country: null,
    country_code: null,
  },
  current_weather: {
    units: {},
    weather: {
      weather_main: null,
      weather_disc: null,
      temp: null,
      temp_min: null,
      temp_max: null,
      feels_like: null,
      humidity: null,
      sea_level: null,
      grnd_level: null,
      visibility: null,
      wind: { speed: null, deg: null, gust: null },
      clouds: { all: null },
      time: null,
      interval: null,
      is_day: null,
      precipitation: null,
      rain: null,
      sunset: null,
      sunrise: null,
    },
    dt: {
      date: null,
      time: null,
      wish: null,
      day: null,
    },
    success: true,
  },
  hourly_weather: {
    units: {},
    hourly: [
      {
        time: null,
        dt: {
          date: null,
          time: null,
          wish: null,
          day: null,
        },
        weather: {
          temperature_2m: null,
          weather_code: null,
          is_day: null,
        },
      },
    ],
  },
  week_weather: {
    units: {},
    weekly_data: [
      {
        time: null,
        dt: {
          date: null,
          time: null,
          wish: null,
          day: null,
        },
        weather: {
          temperature_2m: null,
          weather_code: null,
          is_day: null,
        },
      },
    ],
  },
};
async function fetchCurrentWeather(coord, dispatch, Function) {
  try {
    const Base_Url = `https://api.open-meteo.com/v1/forecast`;
    // const Base_Url = `./dev_asserts/`;
    //current weather params
    const params = {
      latitude: coord.lat,
      longitude: coord.lon,
      current_weather_param: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "wind_speed_10m",
        "wind_direction_10m",
        "wind_gusts_10m",
        "precipitation",
        "rain",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "surface_pressure",
      ],
      hourly_weather_param: ["temperature_2m", "weather_code", "is_day"],
      week_weather_param: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weather_code",
      ],
      past_days: 2,
      timezone: "auto",
    };
    function getCurrentWeatherUrl() {
      // return `${Base_Url}current.json`; //remove this line before deploy
      return `${Base_Url}?latitude=${params.latitude}&longitude=${
        params.longitude
      }&current=${params.current_weather_param.join(",")}&timezone=${
        params.timezone
      }&past_days=${params.past_days}`;
    }
    function getHourlyWeatherUrl() {
      // return `${Base_Url}hourly.json`; //remove this line before deploy
      return `${Base_Url}?latitude=${params.latitude}&longitude=${
        params.longitude
      }&hourly=${params.hourly_weather_param.join(",")}&timezone=${
        params.timezone
      }&past_days=${params.past_days}`;
    }
    function getWeeklyWeatherUrl() {
      // return `${Base_Url}test.json`; //remove this line before deploy

      return `${Base_Url}?latitude=${params.latitude}&longitude=${
        params.longitude
      }&daily=${params.week_weather_param.join(",")}&timezone=${
        params.timezone
      }&past_days=${params.past_days}`;
    }
    // Wish function to get the wish based on the time
    function getWish(time) {
      try {
        if (!time) return "";
        const date = new Date(time);
        if (isNaN(date.getTime())) return "";
        const currentHour = date.getHours();
        if (currentHour >= 5 && currentHour < 12) {
          return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 17) {
          return "Good Afternoon";
        } else if (currentHour >= 17 && currentHour < 21) {
          return "Good Evening";
        } else {
          return "Good Night";
        }
      } catch (err) {
        return "";
      }
    }
    // Function to get short weather description from weather code
    function getWeatherMainAndDescription(code) {
      // Open-Meteo weather codes mapping (main + short description)
      const weatherMap = {
        0: { main: "Clear", disc: "Clear sky" },
        1: { main: "Clear", disc: "Mainly clear" },
        2: { main: "Clouds", disc: "Partly cloudy" },
        3: { main: "Clouds", disc: "Overcast" },
        45: { main: "Fog", disc: "Fog" },
        48: { main: "Fog", disc: "Rime fog" },
        51: { main: "Drizzle", disc: "Light drizzle" },
        53: { main: "Drizzle", disc: "Moderate drizzle" },
        55: { main: "Drizzle", disc: "Dense drizzle" },
        56: { main: "Drizzle", disc: "Freezing light drizzle" },
        57: { main: "Drizzle", disc: "Freezing dense drizzle" },
        61: { main: "Rain", disc: "Slight rain" },
        63: { main: "Rain", disc: "Moderate rain" },
        65: { main: "Rain", disc: "Heavy rain" },
        66: { main: "Rain", disc: "Freezing light rain" },
        67: { main: "Rain", disc: "Freezing heavy rain" },
        71: { main: "Snow", disc: "Slight snow" },
        73: { main: "Snow", disc: "Moderate snow" },
        75: { main: "Snow", disc: "Heavy snow" },
        77: { main: "Snow", disc: "Snow grains" },
        80: { main: "Rain", disc: "Slight rain showers" },
        81: { main: "Rain", disc: "Moderate rain showers" },
        82: { main: "Rain", disc: "Violent rain showers" },
        85: { main: "Snow", disc: "Slight snow showers" },
        86: { main: "Snow", disc: "Heavy snow showers" },
        95: { main: "Thunderstorm", disc: "Thunderstorm" },
        96: { main: "Thunderstorm", disc: "Thunderstorm with hail" },
        99: { main: "Thunderstorm", disc: "Thunderstorm with heavy hail" },
      };
      return weatherMap[code] || { main: "Unknown", disc: "Unknown" };
    }

    // Fetching current weather data
    const currentWeatherUrl = getCurrentWeatherUrl();
    const fetchCurrentWeatherData = async (currentWeatherUrl) => {
      try {
        const response = await axios.get(currentWeatherUrl);
        const data = response.data || {};
        const currentData = data.current || {};
        const currentWeather = {
          generationtime_ms: data.generationtime_ms ?? "N/A",
          utc_offset_seconds: data.utc_offset_seconds ?? "N/A",
          timezone: data.timezone ?? "N/A",
          timezone_abbreviation: data.timezone_abbreviation ?? "N/A",
          elevation: data.elevation ?? "N/A",
          location: {
            lon: data.longitude ?? "N/A",
            lat: data.latitude ?? "N/A",
          },
          current_weather: {
            units: data.current_units ?? {},
            weather: {
              weather_code: currentData.weather_code ?? "N/A",
              weather_main: getWeatherMainAndDescription(
                currentData.weather_code
              ).main,
              weather_disc: getWeatherMainAndDescription(
                currentData.weather_code
              ).disc,
              temp: currentData.temperature_2m ?? "N/A",
              temp_min: "N/A",
              temp_max: "N/A",
              feels_like: currentData.apparent_temperature ?? "N/A",
              humidity: currentData.relative_humidity_2m ?? "N/A",
              sea_level: currentData.pressure_msl,
              grnd_level: currentData.surface_pressure,
              visibility: "N/A",
              wind: {
                speed: currentData.wind_speed_10m ?? "N/A",
                deg: currentData.wind_direction_10m ?? "N/A",
                gust: currentData.wind_gusts_10m ?? "N/A",
              },
              clouds: { all: "N/A" },
              time: currentData.time
                ? new Date(currentData.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
              interval: currentData.time
                ? new Date(currentData.time).toLocaleDateString("en-US")
                : "N/A",
              is_day:
                typeof currentData.is_day === "number"
                  ? currentData.is_day === 1
                  : "N/A",
              precipitation: currentData.precipitation ?? 0,
              rain: currentData.rain ?? 0,
              sunset: currentData.sunset
                ? new Date(currentData.sunset).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
              sunrise: currentData.sunrise
                ? new Date(currentData.sunrise).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
            },
            dt: {
              date: currentData.time
                ? new Date(currentData.time).toLocaleDateString("en-US")
                : "N/A",
              time: currentData.time
                ? new Date(currentData.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
              wish: getWish(currentData.time),
              day: currentData.time
                ? new Date(currentData.time).toLocaleDateString("en-US", {
                    weekday: "short",
                  })
                : "N/A",
            },
            success: true,
          },
        };
        current = { ...current, ...currentWeather };
        return current;
      } catch (err) {
        current.current_weather.success = false;
        return { error: true, message: err.message };
      }
    };

    fetchCurrentWeatherData(currentWeatherUrl)
      // Fetching hourly weather data
      .then((currentWeatherData) => {
        if (currentWeatherData.error) {
          return;
        }
        const hourlyWeatherUrl = getHourlyWeatherUrl();
        return axios.get(hourlyWeatherUrl);
      })
      .then((hourlyResponse) => {
        if (!hourlyResponse) return;
        const hourlyData = hourlyResponse.data || {};
        const times = hourlyData.hourly?.time || [];
        const temperature_2m = hourlyData.hourly?.temperature_2m || [];
        const weather_code = hourlyData.hourly?.weather_code || [];
        const is_day = hourlyData.hourly?.is_day || [];
        const hourlyWeather = {
          units: hourlyData.hourly_units || {},
          hourly: times
            .map((item, idx) => {
              let date = new Date(item).toLocaleDateString("en-US");
              // Only include hours for the current day and every 3 hours
              // Only include hours from current time onwards, and every hour
              const currentDate = current.current_weather.dt.date;
              const currentTime = current.current_weather.dt.time;
              const itemDate = date;
              const itemTime = item
                ? new Date(item).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A";
              // Compare dates and times
              if (
                itemDate > currentDate ||
                (itemDate === currentDate && itemTime >= currentTime)
              ) {
                return {
                  time: item
                    ? new Date(item).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        // hour12: true, // Add AM/PM
                      })
                    : "N/A",
                  dt: {
                    date: item
                      ? new Date(item).toLocaleDateString("en-US")
                      : "N/A",
                    time: item
                      ? new Date(item).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          // hour12: true, // Add AM/PM
                        })
                      : "N/A",
                    wish: getWish(item),
                    day: item
                      ? new Date(item).toLocaleDateString("en-US", {
                          weekday: "short",
                        })
                      : "N/A",
                  },
                  weather: {
                    temp: temperature_2m[idx] ?? "N/A",
                    weather_main:
                      getWeatherMainAndDescription(weather_code[idx]).main ||
                      "N/A",
                    weather_code: weather_code[idx] ?? "N/A",
                    is_day:
                      typeof is_day[idx] === "number"
                        ? is_day[idx] === 1
                        : "N/A",
                  },
                };
              }
              return undefined;
            })
            .filter(Boolean),
        };
        // Merge the hourly weather data with the current object
        current.hourly_weather = hourlyWeather;

        // Fetch weekly weather data
        return fetchWeeklyData();
      })
      .finally(() => {
        console.log("SuccesFully Data Fetch");
        if (dispatch) {
          let locationData;
          async function getLocationinfo(lat, lon) {
            try {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
              );
              locationData = response.data;
              current.location = {
                ...current.location,
                city: locationData?.address.city ?? "N/A",
                country: locationData?.address.country ?? "N/A",
                country_code: locationData?.address.country_code ?? "N/A",
                display_name: locationData.display_name,
              };
            } catch (err) {
              console.error(err);
              locationData = null;
            }
          }
          getLocationinfo(params.latitude, params.longitude).finally(() => {
            dispatch(Function(current));
          });
        }
      })
      .catch(() => {});

    // Fetch weekly weather data function
    async function fetchWeeklyData() {
      try {
        const weeklyWeatherUrl = getWeeklyWeatherUrl();
        const response = await axios.get(weeklyWeatherUrl);
        const data = response.data || {};
        const weekly_weather = data.daily || {};
        const times = weekly_weather.time || [];
        const temperature_2m_max = weekly_weather.temperature_2m_max || [];
        const temperature_2m_min = weekly_weather.temperature_2m_min || [];
        const weather_code = weekly_weather.weather_code || [];
        current.current_weather.weather.temp_min =
          temperature_2m_min[2] ?? "N/A";
        current.current_weather.weather.temp_max =
          temperature_2m_max[2] ?? "N/A";
        current.week_weather = {
          units: data.daily_units || {},
          weekly_data: times.map((item, idx) => ({
            time: item
              ? new Date(item).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            dt: {
              date: item ? new Date(item).toLocaleDateString("en-US") : "N/A",
              time: item
                ? new Date(item).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A",
              wish: getWish(item),
              day: item
                ? new Date(item).toLocaleDateString("en-US", {
                    weekday: "short",
                  })
                : "N/A",
            },
            weather: {
              temperature_2m_max: temperature_2m_max[idx] ?? "N/A",
              temperature_2m_min: temperature_2m_min[idx] ?? "N/A",
              weather_code: weather_code[idx] ?? "N/A",
              weather_main:
                getWeatherMainAndDescription(weather_code[idx]).main || "N/A",
            },
          })),
        };
        return current.week_weather;
      } catch (err) {
        console.log(err);
        return [];
      }
    }
    // Only dispatch if dispatch is provided
  } catch (error) {}
  return {};
}
// Do not call fetchCurrentWeather() without dispatch argument
export { fetchCurrentWeather };

import axios from "axios";
import { setCurrentWeather } from "../app/weatherInfo/CurrentWeatherSlice";
import { setHourlyWeather } from "../app/weatherInfo/HourlyWeatherSlice";
const fetchCurrentWeather = async (dispatch) => {
  try {
    const response = await axios
      .get(
        `./dev_asserts/current.json` // Replace with your actual API endpoint
        // `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure`
      )
      .then((res) => res.data);
    if (!response || !response.current || !response.current.temperature_2m) {
      throw new Error("Malformed or missing current weather data.");
    }
    console.log("Current Weather Response:", response);
    // Define dateObj and index for current weather
    const dateObj = new Date(response?.current?.time);
    // Find the index of the current time in the hourly array, if available
    let index = 0;
    if (response.hourly && Array.isArray(response.hourly.time)) {
      index = response.hourly.time.findIndex(
        (t) => new Date(t).getTime() === dateObj.getTime()
      );
      if (index === -1) index = 0;
    }
    let wish = "";
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const temp = response.hourly?.temperature_2m?.[index] ?? 0;
    const uv = response.hourly?.uv_index?.[index] ?? 0;
    const rain = response.hourly?.rain?.[index] ?? 0;
    const cloud = response.hourly?.cloud_cover?.[index] ?? 0;
    const wind = response.hourly?.wind_speed_80m?.[index] ?? 0;
    if (hour >= 5 && hour < 12) {
      if (hour === 11 && minute >= 30) {
        wish = "Almost Noon";
      } else if (rain > 0 && temp < 10) {
        wish = "Cold Rainy Morning";
      } else if (rain > 0) {
        wish = "Rainy Morning";
      } else if (cloud > 70) {
        wish = "Cloudy Morning";
      } else if (uv > 7) {
        wish = "Bright Morning";
      } else if (temp < 5) {
        wish = "Chilly Morning";
      } else {
        wish = "Good Morning";
      }
    } else if (hour === 12) {
      if (minute < 30) {
        wish = "Good Noon";
      } else if (rain > 0) {
        wish = "Rainy Afternoon";
      } else if (uv > 7) {
        wish = "Sunny Noon";
      } else {
        wish = "Good Afternoon";
      }
    } else if (hour > 12 && hour < 17) {
      if (uv > 8 && temp > 28) {
        wish = "Hot Sunny Afternoon";
      } else if (uv > 7) {
        wish = "Sunny Afternoon";
      } else if (rain > 0 && temp < 15) {
        wish = "Cool Rainy Afternoon";
      } else if (rain > 0) {
        wish = "Rainy Afternoon";
      } else if (cloud > 70) {
        wish = "Cloudy Afternoon";
      } else if (wind > 20) {
        wish = "Windy Afternoon";
      } else {
        wish = "Good Afternoon";
      }
    } else if (hour === 17) {
      if (minute < 30) {
        wish = "Good Afternoon";
      } else if (cloud > 70) {
        wish = "Cloudy Evening";
      } else if (rain > 0) {
        wish = "Rainy Evening";
      } else {
        wish = "Good Evening";
      }
    } else if (hour > 17 && hour < 20) {
      if (rain > 0 && temp < 10) {
        wish = "Cold Rainy Evening";
      } else if (rain > 0) {
        wish = "Rainy Evening";
      } else if (cloud > 70) {
        wish = "Cloudy Evening";
      } else if (wind > 20) {
        wish = "Windy Evening";
      } else {
        wish = "Good Evening";
      }
    } else if (hour >= 20 && hour < 22) {
      if (cloud > 70 && rain > 0) {
        wish = "Stormy Night";
      } else if (cloud > 70) {
        wish = "Cloudy Night";
      } else if (rain > 0) {
        wish = "Rainy Night";
      } else if (temp < 5) {
        wish = "Cold Night";
      } else {
        wish = "Good Night";
      }
    } else if (hour >= 22 || hour < 5) {
      if (rain > 0 && temp < 5) {
        wish = "Cold Rainy Night";
      } else if (rain > 0) {
        wish = "Rainy Night";
      } else if (cloud > 70) {
        wish = "Cloudy Night";
      } else if (temp < 0) {
        wish = "Freezing Night";
      } else {
        wish = "Sleep Well";
      }
    } else {
      wish = "Hello";
    }
    // Initialize weather description
    // Default weather description
    let weatherDescription = "";
    const code = response?.current?.weather_code;
    const tempC = response?.current?.temperature_2m ?? 0;
    const rainVal = response?.current?.rain ?? 0;
    const cloudVal = response?.current?.cloud_cover ?? 0;
    const windVal = response?.current?.wind_speed_10m ?? 0;
    const isDay = !!response?.current?.is_day;

    // Weather code mapping (WMO codes)
    const weatherCodeMap = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      56: "Light freezing drizzle",
      57: "Dense freezing drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      66: "Light freezing rain",
      67: "Heavy freezing rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    // Compose advanced description
    if (typeof code === "number" && weatherCodeMap[code]) {
      weatherDescription = weatherCodeMap[code];
      // Add rain/snow intensity
      if ([61, 63, 65, 80, 81, 82].includes(code) && rainVal > 0) {
        if (rainVal > 10) weatherDescription += ", heavy rain";
        else if (rainVal > 2) weatherDescription += ", moderate rain";
        else weatherDescription += ", light rain";
      }
      if (
        [71, 73, 75, 85, 86].includes(code) &&
        response?.current?.snowfall > 0
      ) {
        if (response.current.snowfall > 5) weatherDescription += ", heavy snow";
        else if (response.current.snowfall > 1)
          weatherDescription += ", moderate snow";
        else weatherDescription += ", light snow";
      }
      // Add wind
      if (windVal > 40) weatherDescription += ", very windy";
      else if (windVal > 20) weatherDescription += ", breezy";
      // Add cloud
      if (cloudVal > 80 && ![3, 45, 48].includes(code))
        weatherDescription += ", mostly cloudy";
      // Add temperature
      if (tempC <= 0) weatherDescription += ", freezing";
      else if (tempC < 10) weatherDescription += ", cold";
      else if (tempC > 30) weatherDescription += ", hot";
      // Add day/night
      if (!isDay && !weatherDescription.toLowerCase().includes("night"))
        weatherDescription += ", at night";
    } else if (rainVal > 0) {
      if (rainVal > 10) weatherDescription = "Heavy rain";
      else if (rainVal > 2) weatherDescription = "Moderate rain";
      else weatherDescription = "Light rain";
      if (cloudVal > 80) weatherDescription += ", overcast";
      if (windVal > 20) weatherDescription += ", windy";
      if (!isDay) weatherDescription += ", at night";
    } else if (cloudVal > 80) {
      weatherDescription = isDay ? "Overcast" : "Cloudy night";
      if (windVal > 20) weatherDescription += ", windy";
    } else if (tempC <= 0) {
      weatherDescription = isDay ? "Freezing day" : "Freezing night";
      if (cloudVal > 50) weatherDescription += ", cloudy";
      if (windVal > 20) weatherDescription += ", windy";
    } else if (tempC < 10) {
      weatherDescription = isDay ? "Cold day" : "Cold night";
      if (cloudVal > 50) weatherDescription += ", cloudy";
      if (windVal > 20) weatherDescription += ", windy";
    } else if (tempC > 30) {
      weatherDescription = isDay ? "Hot and sunny" : "Hot night";
      if (cloudVal > 50) weatherDescription += ", partly cloudy";
      if (windVal > 20) weatherDescription += ", breezy";
    } else {
      weatherDescription = isDay ? "Fair weather" : "Calm night";
      if (cloudVal > 50) weatherDescription += ", some clouds";
      if (windVal > 20) weatherDescription += ", breezy";
    }
    // Initialize the object with default values
    const currentWeather = {
      coord: {
        latitude: response?.latitude || 0,
        longitude: response?.longitude || 0,
      },
      generationtime_ms: response?.generationtime_ms || 0,
      utc_offset_seconds: response?.utc_offset_seconds || 0,
      timezone: response?.timezone || "GMT",
      timezone_abbreviation: response?.timezone_abbreviation || "GMT",
      elevation: response?.elevation || 0,
      current_units: response?.current_units || {},
      weather: {
        weather_main: response?.current?.weather_code || 0,
        weather_disc: weatherDescription,
        temp: response?.current?.temperature_2m || 0,
        humidity: response?.current?.relative_humidity_2m || 0,
        feels_like: response?.current?.apparent_temperature || 0,
        pressure: response?.current?.pressure_msl || 0,
        wind: {
          speed: response?.current?.wind_speed_10m || 0,
          deg: response?.current?.wind_gusts_10m || 0,
          gust: response?.current?.wind_direction_10m || 0,
        },
        grnd_level: response?.current?.surface_pressure || 0,
        clouds: {
          all: response?.current?.cloud_cover || 0,
        },

        time: response?.current?.time || "",
        interval: response?.current?.interval || 0,
        is_day: !!response?.current?.is_day,
        precipitation: response?.current?.precipitation || 0,
        rain: response?.current?.rain || 0,
        showers: response?.current?.showers || 0,
        snowfall: response?.current?.snowfall || 0,
      },
      dt: {
        date: new Date(response?.current?.time).toLocaleDateString("en-US"),
        day: new Date(response?.current?.time).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        time: new Date(response?.current?.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        wish: wish,
      },
      success: true,
    };
    console.log("Current Weather Data:", currentWeather);
    // Dispatch the current weather data to the Redux store
    dispatch(setCurrentWeather(currentWeather));
  } catch (error) {
    console.error("Error fetching current weather data:", error);
  }
};

const fetchHourlyWeather = async (dispatch) => {
  try {
    const response = await axios
      .get(`./dev_asserts/hourly.json`)
      .then((res) => res.data);

    if (!response || !response.hourly || !Array.isArray(response.hourly.time)) {
      throw new Error("Malformed or missing hourly weather data.");
    }
    // Initialize the object and its hourly array
    const obj = {
      coord: {
        latitude: response?.latitude || 0,
        longitude: response?.longitude || 0,
      },
      generationtime_ms: response?.generationtime_ms || 0,
      utc_offset_seconds: response?.utc_offset_seconds || 0,
      timezone: response?.timezone || "GMT",
      timezone_abbreviation: response?.timezone_abbreviation || "GMT",
      elevation: response?.elevation || 0,
      hourly_units: response?.hourly_units || {},
      hourly: [],
    };

    response.hourly.time.forEach((item, index) => {
      const dateObj = new Date(item);
      let wish = "";
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      const temp = response.hourly?.temperature_2m?.[index] ?? 0;
      const uv = response.hourly?.uv_index?.[index] ?? 0;
      const rain = response.hourly?.rain?.[index] ?? 0;
      const cloud = response.hourly?.cloud_cover?.[index] ?? 0;
      const wind = response.hourly?.wind_speed_80m?.[index] ?? 0;

      // Advanced greeting logic with more weather context
      if (hour >= 5 && hour < 12) {
        if (hour === 11 && minute >= 30) {
          wish = "Almost Noon";
        } else if (rain > 0 && temp < 10) {
          wish = "Cold Rainy Morning";
        } else if (rain > 0) {
          wish = "Rainy Morning";
        } else if (cloud > 70) {
          wish = "Cloudy Morning";
        } else if (uv > 7) {
          wish = "Bright Morning";
        } else if (temp < 5) {
          wish = "Chilly Morning";
        } else {
          wish = "Good Morning";
        }
      } else if (hour === 12) {
        if (minute < 30) {
          wish = "Good Noon";
        } else if (rain > 0) {
          wish = "Rainy Afternoon";
        } else if (uv > 7) {
          wish = "Sunny Noon";
        } else {
          wish = "Good Afternoon";
        }
      } else if (hour > 12 && hour < 17) {
        if (uv > 8 && temp > 28) {
          wish = "Hot Sunny Afternoon";
        } else if (uv > 7) {
          wish = "Sunny Afternoon";
        } else if (rain > 0 && temp < 15) {
          wish = "Cool Rainy Afternoon";
        } else if (rain > 0) {
          wish = "Rainy Afternoon";
        } else if (cloud > 70) {
          wish = "Cloudy Afternoon";
        } else if (wind > 20) {
          wish = "Windy Afternoon";
        } else {
          wish = "Good Afternoon";
        }
      } else if (hour === 17) {
        if (minute < 30) {
          wish = "Good Afternoon";
        } else if (cloud > 70) {
          wish = "Cloudy Evening";
        } else if (rain > 0) {
          wish = "Rainy Evening";
        } else {
          wish = "Good Evening";
        }
      } else if (hour > 17 && hour < 20) {
        if (rain > 0 && temp < 10) {
          wish = "Cold Rainy Evening";
        } else if (rain > 0) {
          wish = "Rainy Evening";
        } else if (cloud > 70) {
          wish = "Cloudy Evening";
        } else if (wind > 20) {
          wish = "Windy Evening";
        } else {
          wish = "Good Evening";
        }
      } else if (hour >= 20 && hour < 22) {
        if (cloud > 70 && rain > 0) {
          wish = "Stormy Night";
        } else if (cloud > 70) {
          wish = "Cloudy Night";
        } else if (rain > 0) {
          wish = "Rainy Night";
        } else if (temp < 5) {
          wish = "Cold Night";
        } else {
          wish = "Good Night";
        }
      } else if (hour >= 22 || hour < 5) {
        if (rain > 0 && temp < 5) {
          wish = "Cold Rainy Night";
        } else if (rain > 0) {
          wish = "Rainy Night";
        } else if (cloud > 70) {
          wish = "Cloudy Night";
        } else if (temp < 0) {
          wish = "Freezing Night";
        } else {
          wish = "Sleep Well";
        }
      } else {
        wish = "Hello";
      }

      obj.hourly[index] = {
        time: item,
        dt: {
          date: dateObj.toLocaleDateString(),
          time: dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          wish,
          day: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
        },
        weather: {
          temperature_2m: response.hourly?.temperature_2m?.[index] ?? 0,
          relative_humidity_2m:
            response.hourly?.relative_humidity_2m?.[index] ?? 0,
          dew_point_2m: response.hourly?.dew_point_2m?.[index] ?? 0,
          apparent_temperature:
            response.hourly?.apparent_temperature?.[index] ?? 0,
          precipitation_probability:
            response.hourly?.precipitation_probability?.[index] ?? 0,
          precipitation: response.hourly?.precipitation?.[index] ?? 0,
          rain: response.hourly?.rain?.[index] ?? 0,
          showers: response.hourly?.showers?.[index] ?? 0,
          snowfall: response.hourly?.snowfall?.[index] ?? 0,
          snow_depth: response.hourly?.snow_depth?.[index] ?? 0,
          weather_code: response.hourly?.weather_code?.[index] ?? 0,
          pressure_msl: response.hourly?.pressure_msl?.[index] ?? 0,
          surface_pressure: response.hourly?.surface_pressure?.[index] ?? 0,
          cloud_cover: response.hourly?.cloud_cover?.[index] ?? 0,
          visibility: response.hourly?.visibility?.[index] ?? 0,
          vapour_pressure_deficit:
            response.hourly?.vapour_pressure_deficit?.[index] ?? 0,
          temperature_80m: response.hourly?.temperature_80m?.[index] ?? 0,
          wind_direction_80m: response.hourly?.wind_direction_80m?.[index] ?? 0,
          wind_speed_80m: response.hourly?.wind_speed_80m?.[index] ?? 0,
          evapotranspiration: response.hourly?.evapotranspiration?.[index] ?? 0,
          uv_index: response.hourly?.uv_index?.[index] ?? 0,
          uv_index_clear_sky: response.hourly?.uv_index_clear_sky?.[index] ?? 0,
          lifted_index: response.hourly?.lifted_index?.[index] ?? 0,
          is_day: !!response.hourly?.is_day?.[index],
          sunshine_duration: response.hourly?.sunshine_duration?.[index] ?? 0,
        },
      };
    });
    dispatch(setHourlyWeather(obj));
    return obj;
  } catch (error) {
    console.error(
      "Error fetching hourly weather data:",
      error?.message || error
    );
    // Optionally, return a default object or rethrow
    return null;
  }
};
export { fetchCurrentWeather, fetchHourlyWeather };

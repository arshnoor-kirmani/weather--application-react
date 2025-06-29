import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: null,
  timezone: null,
  unit_code: null,
  hourly: [
    {
      dt: {
        date: null,
        time: null,
        wish: null,
        day: null,
      },
      weather: {
        temp: null,
        feels_like: null,
        pressure: null,
        humidity: null,
        wind: {
          wind_speed: null,
          wind_deg: null,
          gust: null,
        },
        visibility: null,
        clouds: { all: null },
        weather_main: null,
        weather_desc: null,
        icon: null,
        pop: 0.32,
        rain: {
          "3h": null,
        },
      },
    },
  ],

  id: null,
  cod: null,
  sys: {
    country: null,
    sunrise: null,
    sunset: null,
  },
  coord: { lon: null, lat: null },
};
const HourlyWeather = createSlice({
  name: "hourlyweather",
  initialState,
  reducers: {
    setHourlyWeather: (state, actions) => {
      const resp = actions.payload;
      state.name = resp?.city?.name || null;
      state.timezone = resp?.city?.timezone || null;
      state.unit_code = resp?.city?.unit_code || null;
      state.id = resp?.city?.id || null;
      state.cod = resp?.city?.cod || null;
      state.sys = {
        country: resp?.city?.country || null,
        sunrise: resp?.city?.sunrise
          ? new Date(resp.city.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
        sunset: resp?.city?.sunset
          ? new Date(resp.city.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : null,
      };
      state.coord = {
        lon: resp?.coord?.lon || null,
        lat: resp?.coord?.lat || null,
      };
      state.hourly = Array.isArray(resp?.list)
        ? resp.list.map((hour) => ({
            dt: {
              date: hour?.dt
                ? new Date(hour.dt * 1000).toLocaleDateString()
                : null,
              time: hour?.dt
                ? new Date(hour.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : null,
              wish: hour?.dt
                ? new Date(hour.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : null,
              day: hour?.dt
                ? new Date(hour.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })
                : null,
            },
            weather: {
              temp: hour?.main?.temp ?? null,
              feels_like: hour?.main?.feels_like ?? null,
              pressure: hour?.main?.pressure ?? null,
              humidity: hour?.main?.humidity ?? null,
              wind: {
                wind_speed: hour?.wind?.speed ?? null,
                wind_deg: hour?.wind?.deg ?? null,
                gust: hour?.wind?.gust ?? null,
              },
              visibility: hour?.visibility ?? null,
              clouds: { all: hour?.clouds?.all ?? null },
              weather_main: hour?.weather?.[0]?.main ?? null,
              weather_desc: hour?.weather?.[0]?.description ?? null,
              icon: hour?.weather?.[0]?.icon ?? null,
              pop: hour?.pop ?? 0.32,
              rain: { "3h": hour?.rain?.["3h"] ?? null },
            },
          }))
        : [];
    },
  },
});

export const { setHourlyWeather } = HourlyWeather.actions;
export default HourlyWeather.reducer;

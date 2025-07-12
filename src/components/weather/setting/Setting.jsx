import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreSetting,
  setSetting,
} from "../../../app/weatherInfo/SettingSlice";

export default function Setting() {
  const defultSetting = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    const preSetting = JSON.parse(localStorage.getItem("unite_setting"));
    if (preSetting) {
      dispatch(setPreSetting(preSetting));
    } else {
      dispatch(
        setPreSetting({
          temperature: "celsius",
          speed: "km/h",
          precipitation: "inch",
          pressure: "hpa",
          distance: "miles",
        })
      );
    }
  }, []);
  return (
    <div className=" size-full grid grid-cols-1 grid-rows-[">
      <ul className=" size-full grid grid-cols-1 grid-rows-4 gap-2">
        <SettingComp
          dispatch={dispatch}
          defultSetting={defultSetting}
          title={"temperature"}
          settingValue={["Celsius", "Fehrenheit"]}
        />{" "}
        <SettingComp
          dispatch={dispatch}
          defultSetting={defultSetting}
          title={"speed"}
          settingValue={["miles", "Km/H", "M/S", "Knots"]}
        />{" "}
        <SettingComp
          dispatch={dispatch}
          defultSetting={defultSetting}
          title={"precipitation"}
          settingValue={["MM", "Inch"]}
        />{" "}
        <SettingComp
          dispatch={dispatch}
          defultSetting={defultSetting}
          title={"pressure"}
          settingValue={["hPa", "Inch", "kPa", "MM"]}
        />
        <SettingComp
          title={"distance"}
          settingValue={["Km", "Miles"]}
          dispatch={dispatch}
          defultSetting={defultSetting}
        />
      </ul>
      <div className=" size-full"></div>
    </div>
  );
}

function SettingComp({ title, settingValue, dispatch, defultSetting }) {
  function SettingValueChanger(e) {
    const elm = e.target;
    Array.from(elm.parentNode.children).forEach((child) => {
      child.classList.remove("bg-shades-5/70", "text-shades-1");
    });
    elm.classList.add("bg-shades-5/70", "text-shades-1");
    let newSetting = elm.attributes.data_value.value.split(" ");
    dispatch(setSetting(newSetting));
  }
  return (
    <li className=" gap-0.5 grid">
      <h1 className="text-shades-4 text-md capitalize">{title}</h1>
      <ul
        className={`grid grid-cols-${
          settingValue.length ?? 2
        } grid-rows-1 gap-2 bg-shades-2 p-1 text-center rounded-2xl items-center text-shades-5`}
      >
        {settingValue.map((e, i) => (
          <li
            key={e}
            onClick={(e) => {
              SettingValueChanger(e);
            }}
            className={`${
              defultSetting[title.toLowerCase()] == e.toLowerCase()
                ? "bg-shades-5/70 text-shades-1"
                : ""
            } rounded-2xl  size-full p-1 transition-all duration-200 ease-in-out`}
            data_value={title + " " + e.toLowerCase()}
          >
            {e}
          </li>
        ))}
      </ul>
    </li>
  );
}

import React, { useState } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="nav-lg nav-mobile size-full grid">
      <div className="size-full items-center justify-center " id="logo">
        <Link to="/" className="size-full flex items-center justify-center">
          <img
            src="./logo_circle.png"
            alt="logo"
            className="size-10 cursor-pointer"
          />
        </Link>
      </div>
      <div className="size-full md:text-4xl text-2xl lg:text-3xl text-shades-5 flex justify-center lg:pt-4">
        <ul
          className="flex *:flex *:items-center *:justify-center md:gap-30 gap-14 lg:gap-15 *:cursor-pointer *:text-shades-5 *:hover:text-shades-4 *:transition-all *:duration-200 *:ease-in-out  *:[&>li]:size-10 *:[&>li]:flex *:[&>li]:items-center *:[&>li]:justify-center"
          id="nav-links"
        >
          <li className="text-3xl md:text-5xl lg:text-4xl">
            <Link to="/" className="size-full">
              <TiWeatherWindyCloudy />
            </Link>
          </li>
          <li className="">
            <Link to="/cites" className="size-full">
              <MdOutlineLocationCity />
            </Link>
          </li>
          <li>
            <Link to="/map" className="size-full">
              <FaMapLocationDot />
            </Link>
          </li>
          <li>
            <Link to="/setting" className="size-full">
              <GiSettingsKnobs />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import React from "react";

import banner from "../../assets/banner.png";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import { u } from "framer-motion/client";
import { useSelector } from "react-redux";

const Banner = () => {
  const user = useSelector((state) => state.auth?.user);
  return (
    <div id="home" className="container p-4 mx-auto mt-12 lg:mt-32">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center">
        {/*  content  */}
        <Slide
          direction="left"
          triggerOnce
          className="flex flex-col items-center w-full gap-6 lg:items-start lg:w-1/2"
        >
          <div>
            <h1 className="poppins text-5xl lg:text-6xl main-color font-extrabold leading-[110%] mt-2 mb-6 text-[#828282] flex flex-col gap-3">
              Track Every Purchase, <br />
              <span className="text-[#1F762C] mt-3 ">
                Never Miss a Warranty
              </span>
            </h1>
            <p className=" text-lg lg:text-3xl text-[#979797] font-normal leading-[160%] mt-9 rubik  ">
              Automatically track purchases, manage warranties, and get timely
              reminders for maintenance and renewals. Take control of your
              product lifecycle
            </p>
            <NavLink to={user ? "/dashboard" : "/login"}>
              <div className="mt-9">
                <button className="py-4 px-6 bg-gradient-to-r from-[#1F762C] to-[#16A34A] text-white poppins rounded-2xl font-bold">
                  {user ? "Go to Dashboard" : "Get Started"}
                </button>
              </div>
            </NavLink>
          </div>
        </Slide>
        {/* img */}
        <Slide className="w-full lg:w-1/2 " direction="right" triggerOnce>
          <div>
            <img src={banner} alt="banner" />
          </div>
        </Slide>
        {/* img */}
      </div>
    </div>
  );
};

export default Banner;

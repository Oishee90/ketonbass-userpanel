import React from "react";

import banner from "../../assets/banner.png";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";

const Banner = () => {
  return (
    <div id="home" className="container mx-auto mt-12 lg:mt-32 p-4">
      <div className="flex lg:flex-row flex-col items-center lg:items-center justify-between gap-10">
        {/*  content  */}
        <Slide
          direction="left"
          triggerOnce
          className="flex flex-col items-center lg:items-start  gap-6 lg:w-1/2 w-full"
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
            <NavLink to="/Signup">
              <div className="mt-9">
                <button className="py-4 px-6 bg-gradient-to-r from-[#1F762C] to-[#16A34A] text-white poppins  rounded-2xl font-bold">
                  Get Started
                </button>
              </div>
            </NavLink>
          </div>
        </Slide>
        {/* img */}
        <Slide className="lg:w-1/2 w-full " direction="right" triggerOnce>
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

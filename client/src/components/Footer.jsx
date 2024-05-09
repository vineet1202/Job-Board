import React from "react";

const Footer = () => {
  return (
    <div className=" bg-black *:text-white mt-20 lg:mt-24 ">
      <div className="  md:flex w-11/12 p-8 mx-auto justify-between boder border-white">
        <p className="text-4xl">Job.</p>
        <div className="flex  w-3/4 mt-3 md:mt-0 md:w-1/4 justify-around ">
          <div>
            <h1 className="font-medium text-lg">For Candidates</h1>
            <p>Overview</p>
            <p>Remote</p>
            <p>Tech Startups</p>
          </div>
          <div>
            <h1 className="font-medium text-lg">For Recruiters</h1>
            <p>Overview</p>
            <p>Hire Develoeprs</p>
            <p>Tech Pricing</p>
          </div>
        </div>
      </div>
      <p className="w-11/12 pb-4 text-center mx-auto underline">
        Copyright © 2024 JOB. (Developed By Vineet). All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

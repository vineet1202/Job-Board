import React from "react";
import Navbar from "../components/Navbar";
import Button from "./User/Components/Button";
import { GoVerified as CheckedIcon } from "react-icons/go";
import { FaArrowCircleDown as DownIcon } from "react-icons/fa";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className=" w-11/12 mx-auto  px-8 lg:mt-12">
        <div className="flex  rounded-md mb-12">
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/7f3bd1116742363.606826988a570.jpg"
            className="hidden lg:block lg:w-1/2"
          />
          <div className=" items-center pt-8 ">
            <p className="text-3xl lg:text-5xl font-medium mt-4">
              Find a perfect Job for <span className="italic">YOU</span>
            </p>
            <p className="text-2xl lg:text-3xl my-6 ">
              Explore Over 1000+ opportunities
            </p>

            <p className="text-3xl my-4 font-thin">
              Modern, Easy and Efficient
            </p>
            <Link to="/auth/login?redirect=/profile/edit">
              <Button value="Get Started" size="lg" />
            </Link>
            <div className="mt-4 *:flex *:my-3">
              <div>
                <CheckedIcon className="text-2xl mr-1 lg:mr-3" />
                <p>Connect directly with founders at top sddddd ddd tartups.</p>
              </div>
              <div>
                <CheckedIcon className="text-4xl mr-1 md:text-2xl lg:mr-3" />
                <p>
                  Everything you need to know, all upfront. View salary and more
                  before applying.
                </p>
              </div>
              <div>
                <CheckedIcon className="text-3xl mr-1 md:text-2xl lg:mr-3" />
                <p>
                  Unique jobs at startups and tech companies you can’t find
                  anywhere else.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="hidden lg:block w-fit mx-auto text-2xl">
          <DownIcon className="text-blue-700 text-3xl animate-bounce" />
        </p>
        <div className="px-8 py-8 flex mb-8 md:px-20 border mt-12 md:py-32  bg-cyan-950 rounded-xl text-white">
          <div>
            <p className="text-2xl lg:text-5xl font-medium ">Need talent?</p>
            <p className="text-2xl mt-4 font-medium">
              Find a perfect candidate for your <i>Job</i>
            </p>
            <p className="text-xl mt-4">
              Everything you need to kickstart your recruiting — set up job
              posts, company branding, and more.
            </p>
            <div className="flex mt-8">
              <CheckedIcon className="text-2xl mr-3" />
              <p>Connect with 1000+ candidates.</p>
            </div>
            <div className="flex mt-3">
              <CheckedIcon className="text-2xl mr-3" />
              <p>Get Filtered Application based on you choice.</p>
            </div>
            <div className="flex mt-3">
              <CheckedIcon className="text-2xl mr-3" />
              <p>A free applicant tracking system.</p>
            </div>
            <Link to="/auth/login?redirect=/profile/job/post">
              <button className="mt-6 py-1.5 text-base font-medium px-4 bg-white text-black  rounded mx-3 hover:bg-blue-100 hover:text-blue-700">
                Post a Job
              </button>
            </Link>
          </div>
          <img
            className="hidden lg:block lg:w-1/2 rounded-md"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/780596165568189.6409ad37c3767.jpg"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

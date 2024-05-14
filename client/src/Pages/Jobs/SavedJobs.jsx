import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrLocation as LocationIcon } from "react-icons/gr";
import { IoMdTime as TimeIcon } from "react-icons/io";
import { FaFireAlt as FireIcon } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  const getSavedJobs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/getSavedJobs`,
        {
          withCredentials: true,
        }
      );
      setSavedJobs(response.data.data);
    } catch (e) {
      toast.error("Failed. Please Try again later !", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  const getDays = (str) => {
    var today = new Date();

    const specifiedDate = new Date(str);

    const differenceMs = today - specifiedDate;

    const daysPassed = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  const handleBookmark = async (jobId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/removeJob`,
        {
          jobId,
        },
        {
          withCredentials: true,
        }
      );

      getSavedJobs();
      if (response.status === 200) {
        toast.success("Job Removed! ", {
          position: "top-right",
        });
      }
    } catch (e) {
      toast.error("Something went wrong! ", {
        position: "top-right",
      });
      console.error(e);
    }
  };

  return (
    <div className=" w-5/6 md:w-3/4 mx-auto z-auto mt-16 mb-16 ">
      <h1 className="text-4xl font-medium">MY JOBS</h1>
      <section className=" border mt-8 pb-8 px-4 md:px-12 pt-4 rounded-md md:flex ">
        <div className="  w-11/12 md:w-4/5 lg:w-3/5 md:ml-8 mx-4 md:mr-0">
          <h1 className="text-xl font-medium mb-6">
            {!loading && savedJobs.length > 0
              ? savedJobs.length + " Jobs found"
              : ""}
          </h1>
          {!loading && savedJobs.length === 0 && (
            <div>
              <h1 className="text-5xl font-medium mb-12">No Jobs Saved</h1>
              <Link
                to="/profile/jobs"
                className="text-2xl hover:text-blue-700 underline "
              >
                Search Jobs
              </Link>
            </div>
          )}
          {!loading ? (
            savedJobs.map((item) => (
              <div className="  p-2  rounded mb-6  border border-slate-300 shadow-md">
                <div className="sm:flex justify-between items-center">
                  <div className="flex">
                    <img
                      src={item.logo}
                      className="w-16 h-16  rounded-md mr-4 bg-slate-100"
                    />
                    <div>
                      <p className="text-2xl font-medium hover:underline hover:curor-pointer">
                        {item.title}
                      </p>
                      <h1 className="text-lg text-slate-600">{item.company}</h1>
                    </div>
                  </div>
                  <div className=" *:my-2 mt-2  h-full ">
                    <p className="border font-medium bg-blue-100 rounded px-1.5 py-0.5 w-fit">
                      {item.type}
                    </p>
                    <p className="border  text-center font-medium bg-blue-100 rounded px-1.5 py-0.5 w-fit sm:w-full">
                      {item.location_type}
                    </p>
                  </div>
                </div>
                <div className="flex p-1 items-center mt-4  text-lg text-slate-600">
                  <LocationIcon />
                  <p>{item.location}</p>
                </div>
                {item.max_salary !== null && item.min_salary !== null && (
                  <p className="flex p-1 items-center text-lg text-slate-600">
                    ₹{item.min_salary} - ₹{item.max_salary}
                  </p>
                )}
                <p className="flex text-lg items-center text-slate-600  pl-1">
                  {getDays(item.updatedAt) === 0 ? (
                    <>
                      <FireIcon />
                      Posted Today
                    </>
                  ) : (
                    <>
                      <TimeIcon />
                      Posted {getDays(item.updatedAt)} days ago
                    </>
                  )}
                </p>
                <p className="border-t p-1 text-slate-600 flex justify-end">
                  <button
                    className="float-right  hover:cursor-pointer  px-2 py-0.5 bg-blue-950 text-white rounded hover:bg-blue-600"
                    onClick={() => handleBookmark(item._id)}
                  >
                    Remove Saved
                  </button>
                </p>
                <ToastContainer autoClose={3000} />
              </div>
            ))
          ) : (
            <>
              <div
                role="status"
                class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
                  <svg
                    class="w-10 h-10 text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div class="w-full">
                  <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                  <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
                  <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SavedJobs;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditResume = () => {
  const [pdfData, setPdfData] = useState({ pdf: null });
  const handleFile = (e) => {
    e.preventDefault();
    setPdfData({
      pdf: e.target.files[0],
    });
  };

  const saveFile = async (e) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile/update`,
        pdfData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Resume Uploaded!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  };
  return (
    <div className="  w-11/12 md:w-3/4 mx-auto z-auto mt-16 border p-3 mb-32 bg-slate-50">
      <h1 className="text-4xl font-medium">Edit your Resume</h1>
      <div className="flex">
        <Link to="/profile/edit">
          <p className="text-xl font-mono my-4 mr-6">Profile</p>
        </Link>
        <Link to="/profile/edit/resume">
          <p className="text-xl font-mono my-4 border-b-2 border-red-700">
            Resume/CV
          </p>
        </Link>
      </div>
      <section className=" border-slate-300 px-6 py-4 lg:flex">
        <div className=" lg:w-2/5">
          <h1 className="text-lg font-medium">Upload your resume or CV</h1>
        </div>
        <div className=" mt-4 lg:mt-0 lg:w-4/5">
          <div class="flex items-center justify-center w-full">
            <label
              for="resume_file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">
                    {pdfData.pdf?.name ? pdfData.pdf.name : "Click to upload"}
                  </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  JPG or PDF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="resume_file"
                name="resume_file"
                type="file"
                class="hidden"
                accept=".pdf"
                onChange={handleFile}
              />
            </label>
          </div>
        </div>
      </section>
      <div className=" mx-auto w-fit">
        <button
          className="bg-black text-white px-4 py-2 text-lg rounded hover:bg-blue-700 mt-3"
          onClick={saveFile}
        >
          Save File
        </button>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default EditResume;

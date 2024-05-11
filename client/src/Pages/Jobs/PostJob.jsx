import React, { useState } from "react";
import styles from "../User/User.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostJob = () => {
  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/postJob`,
        {
          data,
          desc: value,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Job Posted !", {
          position: "top-right",
        });
        reset();
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed. Please Try again later !", {
        position: "top-right",
      });
    }
  };

  return (
    <div className=" w-5/6 md:w-1/2 mx-auto z-auto mt-16 mb-16 ">
      <h1 className="text-4xl font-medium  text-center">Post a Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="border border-slate-300 px-6 py-4 mt-8 rounded-md">
          <h1 className="  justify-center text-lg  font-medium ">Job Title*</h1>
          <input
            className={styles.input}
            type="text"
            {...register("title")}
            required
          />

          <h1 className="  justify-center text-lg  font-medium ">
            Company Name*
          </h1>
          <input
            className={styles.input}
            type="text"
            {...register("company")}
            required
          />
          <h1 className="   justify-center text-lg  font-medium ">
            Company Logo
          </h1>
          <input
            className={styles.input}
            type="text"
            {...register("logo")}
            placeholder="url"
          />

          <h1 className="  justify-center text-lg  font-medium ">
            Job Location*
          </h1>
          <input
            className={styles.input}
            type="text"
            {...register("location")}
            placeholder="e.g. Delhi"
            required
          />

          <h1 className="  justify-center text-lg  font-medium ">
            Location Type*
          </h1>
          <select
            {...register("type")}
            className=" mb-4 w-full border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            required
          >
            <option>Hybrid</option>

            <option>On-Site</option>
            <option>Remote</option>
          </select>
          <h1 className="  justify-center text-lg  font-medium ">Job Type*</h1>
          <select
            {...register("location_type")}
            className=" mb-4 w-full border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            required
          >
            <option>Full-Time</option>

            <option>Internship</option>
          </select>
          <h1 className="   justify-center text-lg  font-medium ">
            Job Salary
          </h1>
          <input
            className={styles.input}
            type="text"
            {...register("salary")}
            placeholder="in Rupees "
          />

          <h1 className="   justify-center text-lg  font-medium ">
            Minimum Salary (optional)
          </h1>
          <input
            className={styles.input}
            type="number"
            {...register("min_salary")}
          />

          <h1 className="   justify-center text-lg  font-medium ">
            Maximum Salary (optional)
          </h1>
          <input
            className={styles.input}
            type="number"
            {...register("max_salary")}
          />

          <h1 className="   justify-center text-lg  font-medium ">
            Apply Link*
          </h1>
          <input
            className={styles.input}
            type="text"
            {...register("job_link")}
            required
          />

          <h1 className="  justify-center text-lg  font-medium ">
            Job Description
          </h1>

          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-52 mb-16"
            required
          />
        </section>
        <div className="w-fit mx-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            className="  mt-6 w-72 bg-black text-white  py-3 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default PostJob;

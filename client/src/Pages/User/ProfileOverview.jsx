import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineModeEdit as EditIcon } from "react-icons/md";
import axios from "axios";
import styles from "./User.module.css";
import { FaLinkedinIn as LinkedinIcon } from "react-icons/fa";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { FaLink as LinkIcon } from "react-icons/fa6";

const ProfileOverview = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        {
          withCredentials: true,
        }
      );
      setUserDetails(response.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" w-5/6 md:w-3/4 mx-auto z-auto mt-16 mb-16 ">
      <h1 className="text-4xl font-medium">
        How Recruiters see your <i>Profile</i>
      </h1>
      <p className="text-xl font-mono my-4">Overview</p>
      <Link
        to="/profile/edit"
        className="text-3xl  h-fit w-fit flex  items-center"
      >
        <EditIcon />
        <p className="text-xl ml-3 font-medium">
          Edit your Profile To improve your resume
        </p>
      </Link>
      {!loading ? (
        <section className="border mt-8 pb-8 px-4 md:px-16 pt-4 rounded-md">
          <div className="border-b border-slate-300 mb-4 py-3 md:flex justify-between">
            <div>
              <p className="text-3xl font-medium">{userDetails.name}</p>
              <p className={styles.small}>{userDetails.email}</p>
              <p className={styles.small}>{userDetails.role}</p>

              <p className={styles.small}>{userDetails.location}</p>
            </div>
            <div className="flex mt-2 md:p-2 h-fit *:mx-1 items-center">
              <Link to={userDetails.linkedin}>
                <LinkedinIcon className="text-sm sm:text-xl text-blue-700" />
              </Link>
              <Link to={userDetails.github}>
                <GithubIcon className="text-sm sm:text-xl" />
              </Link>
              <Link
                to={userDetails.website}
                className="text-sm sm:text-base rounded border p-0.5 bg-slate-200 text-slate-800"
              >
                Website
              </Link>
              <Link
                to={userDetails.resume}
                className="text-sm sm:text-base rounded border p-0.5 bg-slate-200 text-slate-800"
              >
                Resume
              </Link>
            </div>
          </div>
          <div className="border-b border-slate-300 mb-4 pb-3">
            <h1 className={styles.profile_header}>Bio</h1>
            <p className="text-lg">{userDetails.bio}</p>
          </div>

          <div className="border-b border-slate-300 mb-4 pb-3">
            <h1 className={styles.profile_header}>Education</h1>
            <p className="text-slate-600 text-lg">{userDetails.college_name}</p>
            <p className=" text-lg font-medium">
              {userDetails.degree} {userDetails.major}
            </p>
            <p className="text-lg">GPA: {userDetails.gpa}</p>
          </div>

          <div className="border-b border-slate-300 mb-4 pb-3">
            <h1 className={styles.profile_header}>Skills</h1>
            <div className=" flex">
              {!loading &&
                userDetails.skills.map((item, i) => (
                  <p
                    key={i}
                    className="m-1 rounded border p-1 w-fit bg-slate-200 text-slate-800"
                  >
                    {item}
                  </p>
                ))}
            </div>
          </div>
          <div className="border-b border-slate-300 mb-4 pb-3">
            <h1 className={styles.profile_header}>Projects</h1>
            <div className="mt-2 rounded w-1/2 flex items-center  justify-between hover:bg-slate-100 px-1.5 ">
              <p className="text-lg  pl-4">Project 1</p>
              <Link
                className="text-lg text-slate-600 hover:underline hover:text-blue-700 font-medium"
                to={userDetails.project_link_1}
              >
                <LinkIcon />
              </Link>
            </div>
            <div className="mt-2 rounded w-1/2 flex items-center justify-between hover:bg-slate-100 px-1.5 ">
              <p className="text-lg  pl-4">Project 2</p>
              <Link
                className="text-lg text-slate-600 hover:underline hover:text-blue-700 font-medium"
                to={userDetails.project_link_2}
              >
                <LinkIcon />
              </Link>
            </div>
            <div className="mt-2 rounded w-1/2 flex items-center  justify-between hover:bg-slate-100 px-1.5 ">
              <p className="text-lg  pl-4">Project 3</p>
              <Link
                className="text-lg text-slate-600 hover:underline hover:text-blue-700 font-medium"
                to={userDetails.project_link_3}
              >
                <LinkIcon />
              </Link>
            </div>
          </div>
          <div className=" mb-4 pb-3">
            <h1 className={styles.profile_header}>Achievments</h1>
            <div className=" flex">
              <p className="text-lg  pl-4">{userDetails.achievements}</p>
            </div>
          </div>
        </section>
      ) : (
        <div role="status" className=" mt-32 w-fit mx-auto">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;

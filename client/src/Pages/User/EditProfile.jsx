import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.css";
import { FaLinkedinIn as LinkedinIcon } from "react-icons/fa";
import { FaGithub as GithubIcon } from "react-icons/fa";
import { TbWorldSearch as WorldIcon } from "react-icons/tb";
import { IoSchoolOutline as SchoolIcon } from "react-icons/io5";
import Skills from "./Components/Skills";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile/edit`,
        {
          data,
          skills: tags,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Details Saved!", {
          position: "top-right",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Try again Later", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const [userData, setUserData] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserData(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("location", userData.location);
      setValue("bio", userData.location);
      setValue("role", userData.role);
      setValue("experience", userData.experience);
      setValue("linkedin", userData.linkedin);
      setValue("github", userData.github);
      setValue("website", userData.website);
      setValue("college_name", userData.college_name);
      setValue("degree", userData.degree);
      setValue("major", userData.major);
      setValue("gpa", userData.gpa);
      setValue("skills", userData.skills);
      setValue("achievments", userData.achievements);
      setValue("projects", userData.projects);
    }
  }, [userData]);

  return (
    <div className="border w-11/12 md:w-3/4 mx-auto z-auto mt-16  sm:p-3 bg-slate-50 p-2">
      <h1 className="text-4xl font-medium">Edit your Job. Profile</h1>
      <div className="flex">
        <Link to="/profile/edit">
          <p className="text-xl font-mono my-4 mr-6 border-b-2 border-red-700">
            Profile
          </p>
        </Link>
        <Link to="/profile/edit/resume">
          <p className="text-xl font-mono my-4">Resume/CV</p>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="border-b border-slate-300 px-6 py-4 lg:flex">
          <div className=" w-2/5">
            <h1 className="text-lg font-medium">About</h1>
          </div>
          <div className="  w-11/12 lg:w-4/5">
            <p className={styles.label}>Your name*</p>
            <input className={styles.input} type="text" {...register("name")} />
            <p className={styles.label}>Where are you based?*</p>
            <input
              className={styles.input}
              type="text"
              {...register("location")}
            />
            <p className={styles.label}>Select your primary role*</p>
            <select
              {...register("role")}
              className="w-1/2 border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            >
              <option selected>Choose role</option>
              <option className="border-2 border-black ">
                Mobile Developer
              </option>
              <option>Android Developer</option>
              <option>Full Stack Developer</option>
              <option>Machine learning Engineer</option>
              <option>Data Developer</option>
              <option>DevOps</option>
            </select>
            <p className={`${styles.label} mt-4`}>Years of experience*</p>
            <select
              {...register("experience")}
              className=" border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            >
              <option selected>Less than 1 Year</option>
              <option className="border-2 border-black ">1 Year</option>
              <option className="border-2 border-black ">2 Years</option>
              <option className="border-2 border-black ">3 Years</option>
              <option className="border-2 border-black ">4 Years</option>
              <option className="border-2 border-black ">5 Years</option>
              <option className="border-2 border-black ">5+ Years</option>
            </select>
            <p className={`${styles.label} mt-4`}>Your bio</p>
            <textarea
              {...register("bio")}
              className={styles.input}
              rows="6"
              placeholder="CS Grad, Full stack; launched a successful andriod app, worked at Google"
            />
          </div>
        </section>
        <section className="border-b px-6 py-4 lg:flex ">
          <div className=" w-2/5">
            <h1 className="text-lg font-medium">Social Profiles</h1>
          </div>
          <div className=" w-11/12 lg:w-4/5">
            <p
              className={`${styles.label} flex items-center  w-24 justify-around`}
            >
              <WorldIcon />
              Website
            </p>
            <input
              className={styles.input}
              type="text"
              {...register("website")}
            />
            {errors.website && (
              <span className="text-red-600">Enter a valid url</span>
            )}
            <p
              className={`${styles.label} flex items-center  w-24 justify-around`}
            >
              <LinkedinIcon />
              Linkedin
            </p>
            <input
              className={styles.input}
              type="text"
              {...register("linkedin")}
            />
            <p
              className={`${styles.label} flex items-center  w-24 justify-around`}
            >
              <GithubIcon />
              Github
            </p>
            <input
              className={styles.input}
              type="text"
              {...register("github")}
            />
            {errors.github && (
              <span className="text-red-600">Enter a valid github url</span>
            )}
          </div>
        </section>
        <section className="border-b px-6 py-4 lg:flex">
          <div className=" w-2/5">
            <h1 className="text-lg font-medium">Education</h1>
          </div>
          <div className="w-11/12 lg:w-4/5">
            <p
              className={`${styles.label} flex items-center  w-28 justify-around`}
            >
              <SchoolIcon />
              Education
            </p>
            <input
              className={styles.input}
              type="text"
              {...register("college_name")}
            />
            <p className={styles.label}>Degree & Major</p>

            <select
              {...register("degree")}
              className=" w-full border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            >
              <option className="border-2 border-black ">
                Bachelor's Degree
              </option>
              <option className="border-2 border-black ">Honours</option>
              <option className="border-2 border-black ">Master</option>
              <option className="border-2 border-black ">Doctorate</option>
            </select>
            <select
              {...register("major")}
              className=" w-full border text-lg my-1 px-4 py-1.5 rounded border-slate-400 "
            >
              <option className="border-2 border-black ">
                Computer Science
              </option>
              <option className="border-2 border-black ">Chemical</option>
              <option className="border-2 border-black ">Mechanical</option>
              <option className="border-2 border-black ">Electrical</option>
            </select>
            <p className={styles.label}>GPA</p>
            <input
              className={styles.input}
              type="number"
              {...register("gpa", { min: 0, max: 10 })}
            />
            {errors.gpa && (
              <span className="text-red-600">Enter a valid gpa (0-10)</span>
            )}
          </div>
        </section>
        <section className="border-b px-6 py-4 lg:flex">
          <Skills tags={tags} setTags={setTags} />
        </section>

        <section className="border-b px-6 py-4 lg:flex">
          <div className=" w-2/5">
            <h1 className="text-lg font-medium">Projects</h1>
          </div>
          <div className="w-11/12 lg:w-4/5 *:mb-2">
            <p className={`${styles.label} items-center`}>Project Details</p>
            <input
              className={styles.input}
              type="text"
              {...register("project_link_1", {
                pattern:
                  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
              })}
              placeholder="Project 1 Link"
            />
            {errors.project_link_1 && (
              <span className="text-red-600">Enter a valid url</span>
            )}
            <input
              className={styles.input}
              type="text"
              {...register("project_link_2", {
                pattern:
                  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
              })}
              placeholder="Project 2 Link"
            />
            {errors.project_link_2 && (
              <span className="text-red-600">Enter a valid url</span>
            )}
            <input
              className={styles.input}
              type="text"
              {...register("project_link_3", {
                pattern:
                  /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
              })}
              placeholder="Project 3 Link"
            />
            {errors.project_link_3 && (
              <span className="text-red-600">Enter a valid url</span>
            )}
          </div>
        </section>
        <section className=" px-6 py-4 lg:flex">
          <div className=" w-2/5">
            <h1 className="text-lg font-medium">Achievments</h1>
          </div>
          <div className="w-11/12 lg:w-4/5">
            <textarea
              className={styles.input}
              type="text"
              {...register("achievements", {
                maxLength: {
                  value: "250",
                  message: "Too many characters",
                },
              })}
              placeholder="Won 2 Hackathons"
              rows="5"
            />
            <span className="text-lg float-right">
              {watch("achievements")
                ? 250 - watch("achievements").length + " chars"
                : ""}
            </span>
            {errors.achievements?.message && (
              <p className="text-red-600 ">{errors.achievements?.message}</p>
            )}
          </div>
        </section>

        <div className="w-fit mx-auto mt-8">
          {loading ? (
            <button
              disabled
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className=" mb-2 w-72 bg-black text-white text-lg py-3 rounded hover:bg-blue-700 "
            >
              Save
            </button>
          )}
        </div>
      </form>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default EditProfile;

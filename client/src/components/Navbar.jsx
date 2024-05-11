import React, { useEffect, useState, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { removeItem } from "../Functions/storage";
import { useDispatch } from "react-redux";
import { reset } from "../store/features/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const [showProfile, setShowProfile] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        removeItem("info");
        removeItem("token");
        dispatch(reset());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowProfile(!showProfile);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !showProfile);

    return () => {
      document.removeEventListener("click", handleClickOutside, !showProfile);
    };
  });

  useEffect(() => {
    const handleOverflow = () => {
      document.body.style.overflow = isOpen ? "hidden" : "unset";
    };

    handleOverflow();

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleScreenNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" lg:w-11/12  mx-auto sm:flex px-8 py-4 sm:py-3  sm:justify-between items-center bg-white">
      <div className="flex justify-between text-2xl ">
        <Link to="/">
          <div>
            <p className="font-bold text-3xl ">Job.</p>
          </div>
        </Link>
        {!user.token && (
          <div className="sm:hidden z-40  ">
            <button onClick={handleScreenNav}>
              {!isOpen ? <IoMenu /> : <IoClose />}
            </button>
          </div>
        )}
      </div>
      {!user.token && (
        <nav
          className={`${
            isOpen ? `block h-screen sm:h-auto` : `hidden `
          }   sm:flex sm:p-0 text-2xl  lg:text-xl transition ease-in-out duration-500  py-12 text-center`}
        >
          <Link to="/profile/jobs ">
            <p className="mt-32 sm:mt-0 font-medium block w-fit mx-auto px-3 py-2 rounded-lg lg:rounded-none hover:cursor-pointer hover:text-blue-700 hover:underline">
              Find Jobs
            </p>
          </Link>
          <Link to="/profile/job/post">
            <p className="   font-medium  block w-fit mx-auto px-3 py-2 rounded-lg lg:rounded-none hover:cursor-pointer hover:text-blue-700 hover:underline">
              For Companies
            </p>
          </Link>
          <Link to="/auth/login">
            <p className=" font-medium sm:hidden block w-fit mx-auto px-3 py-2 rounded-lg  hover:cursor-pointer hover:text-blue-700 hover:underline">
              Log in
            </p>
          </Link>
        </nav>
      )}
      {user.token ? (
        <>
          <div
            className="top-3 right-5 absolute sm:static flex items-center border px-2 py-2 rounded-md w-20 justify-around hover:bg-slate-100 cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
            ref={ref}
          >
            <IoPersonCircle className="text-3xl text-slate-300" />
            <IoIosArrowDown className="text-xl" />
          </div>
          <div
            className={`${
              showProfile ? `block` : `hidden`
            } bg-white pt-4 pb-2 px-4 border rounded shadow-md shadow-slate-100 absolute right-5 sm:right-24 top-20 w-64`}
          >
            <div className="py-3">
              <p className="font-medium text-xl">
                {capitalizeFirstLetter(user.name)}
              </p>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <div className="border-t py-2 ">
              <p className="text-slate-700 text-xs">Personal</p>
              <Link to="/profile/edit">
                <p className="pt-1 font-mono  rounded px-2 hover:bg-cyan-100 hover:cursor-pointer">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className="md:hidden border-t py-2 ">
              <p className="text-slate-700 text-xs">View</p>
              <Link to="/profile/jobs">
                <p className="pt-1 font-mono  rounded px-2 hover:bg-cyan-100 hover:cursor-pointer">
                  Jobs
                </p>
              </Link>

              <Link to="/profile/jobs/saved">
                <p className="pt-1 font-mono  rounded px-2 hover:bg-cyan-100 hover:cursor-pointer">
                  Saved
                </p>
              </Link>
            </div>
            <div className="border-t py-2 ">
              <p className="text-slate-700 text-xs">Support</p>
              <p
                onClick={handleLogout}
                className="pt-1 font-mono  rounded px-2 hover:bg-cyan-100 hover:cursor-pointer"
              >
                Log out
              </p>
            </div>
            <Link to="/profile/job/post">
              <button className=" mx-2 w-full text-sm py-1  font-medium  bg-blue-100 rounded  hover:bg-blue-100 hover:text-blue-700">
                POST A JOB
              </button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="hidden sm:flex ">
            <Link to="/auth/login">
              <button className="py-1.5 text-base font-medium px-4 border border-slate-900 rounded mx-3 hover:bg-blue-100 hover:text-blue-700">
                Log In
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className=" py-1.5 text-base font-medium px-4 border rounded mx-3 bg-black text-white hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;

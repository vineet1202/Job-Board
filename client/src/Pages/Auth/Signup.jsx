import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 200) {
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-right",
      });

      console.error(error);
    }
  };
  return (
    <div className="flex  h-screen ">
      <div className="w-full  flex mx-auto rounded-lg h-fit ">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/96701e99535677.5ef4c71eb11ca.jpg"
          className=" h-screen rounded-lg w-3/5 xl:w-1/2 hidden lg:block "
        />
        <div className=" mt-16 h-fit lg:w-1/4 px-4 py-8  bg-white  flex flex-col mx-auto   ">
          <Link to="/">
            <div>
              <p className="font-bold text-2xl mb-6">
                <span className="text-3xl">J</span>ob.
              </p>
            </div>
          </Link>
          <h1 className="text-3xl  font-medium mb-2 ">Create Account</h1>
          <p className="mb-6 text-md font-medium">
            Find your next opportunity.
          </p>
          <input
            type="text"
            className=" focus:shadow-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 my-2 px-4 py-2 rounded border border-slate-600  text-lg focus:outline-none"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className=" focus:shadow-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 my-2 px-4 py-2 rounded border border-slate-600  text-lg focus:outline-none"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className=" focus:shadow-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 my-2 px-4 py-2 rounded border border-slate-600  text-lg focus:outline-none"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className=" mt-6 px-2 py-2.5 rounded-sm text-white bg-black hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          <p className="mx-2 mt-4  text-center font-medium">
            Already have an account?
            <Link to="/auth/login" className="underline hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

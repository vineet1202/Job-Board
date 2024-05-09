import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../store/features/userSlice";
import { setItem } from "../Functions/storage";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (user.token) {
      navigate("/profile/jobs");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const data = response.data.user;

      const userData = {
        name: data.name,
        email: data.email,
      };

      if (response.status === 200) {
        setItem("token", data.accessToken);
        setItem("info", JSON.stringify(userData));
        dispatch(update({ token: data.accessToken, ...userData }));
      }
    } catch (error) {
      toast.error("Password Invalid!", {
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
          {/* <p className="text-center mt-14">react icon</p> */}
          {/* <BsFillShieldLockFill className="text-center my-8 text-2xl  mx-auto " /> */}
          <Link to="/">
            <div>
              <p className="font-bold text-2xl mb-6">
                <span className="text-3xl">J</span>ob.
              </p>
            </div>
          </Link>
          <h1 className="text-4xl  font-medium mb-4">Login</h1>
          <p className="mb-6 text-lg font-medium">Your search ends here!</p>
          {/* input -- padding, text size, border */}
          <input
            type="text"
            className=" focus:shadow-lg focus:border-sky-500 focus:ring-1 focus:ring-sky-500 my-2 px-4 py-2 rounded border border-slate-600  text-lg focus:outline-none"
            placeholder="Email"
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
            Log in
          </button>
          <p className="mx-2 mt-4  text-center font-medium">
            Not registered?{" "}
            <a href="/auth/signup" className="underline hover:text-blue-700">
              Create an Account
            </a>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Login;

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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
      if (error.response.status === 401) {
        toast.error("Invalid Credentials!", {
          position: "top-right",
        });
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
        });
      }

      console.error(error);
    } finally {
      setLoading(false);
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
          {!loading ? (
            <button
              type="submit"
              className=" mt-6 px-2 py-2.5 rounded-sm text-white bg-black hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Log in
            </button>
          ) : (
            <div role="status" className=" mx-auto mt-3">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

          <p className="mx-2 mt-4  text-center font-medium">
            Not registered?{" "}
            <Link to="/auth/signup" className="underline hover:text-blue-700">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Login;

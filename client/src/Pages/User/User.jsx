import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import EditProfile from "./EditProfile";
import EditResume from "./EditResume";
import { useLocation, useNavigate } from "react-router-dom";
import Jobs from "../Jobs";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import ErrorPage from "../../components/ErrorPage";
import PostJob from "../Jobs/PostJob";
import SavedJobs from "../Jobs/SavedJobs";
import { getItem } from "../../Functions/storage";
// import { refreshAccessToken } from "./utils";
import { reset, update } from "../../store/features/userSlice";
import { setItem } from "../../Functions/storage";
import axios from "axios";

const User = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isUserAuthenticated = getItem("isAuthenticated");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token || !user.name) {
      const redirect = path;
      navigate(`/auth/login?redirect=${redirect}`);
    }
  });

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/refresh-token`,
        null,
        { withCredentials: true }
      );

      const { accessToken, expiresAt } = response.data;

      if (response.status === 200) {
        setItem("token", accessToken);
        setItem("expiresAt", expiresAt);
        dispatch(update({ token: accessToken, expiresAt: expiresAt }));
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        dispatch(reset());
      }
    }
  };

  useEffect(() => {
    let refreshAccessTokenTimerId;

    if (isUserAuthenticated) {
      refreshAccessTokenTimerId = setTimeout(() => {
        refreshAccessToken();
      }, new Date(user.expiresAt).getTime() - Date.now() - 10 * 1000);
    }

    return () => {
      if (isUserAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    };
  }, [user.expiresAt, isUserAuthenticated]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar path={path} />
        <Routes>
          <Route path="/overview" element={<ProfileOverview />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/edit/resume" element={<EditResume />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/jobs/saved" element={<SavedJobs />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default User;

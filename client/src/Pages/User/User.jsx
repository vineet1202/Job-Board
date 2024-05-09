import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import EditProfile from "./EditProfile";
import EditResume from "./EditResume";
import { useLocation } from "react-router-dom";
import Jobs from "../Jobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ErrorPage from "../../components/ErrorPage";
import PostJob from "../Jobs/PostJob";
import SavedJobs from "../Jobs/SavedJobs";

const User = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token || !user.name) {
      const redirect = path;

      navigate(`/auth/login?redirect=${redirect}`);
    }
  }, []);

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

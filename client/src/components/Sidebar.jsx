import React from "react";

import { IoMdMailOpen as JobIcon } from "react-icons/io";

import { Link } from "react-router-dom";
import { IoPersonOutline as PersonIcon2 } from "react-icons/io5";
import { FaRegBookmark as BookmarkedIcon } from "react-icons/fa";

const Sidebar = ({ path }) => {
  const link1 = "/profile/overview";
  const link2 = "/profile/jobs";
  const link3 = "/profile/jobs/saved";

  return (
    <div className="hidden md:block relative ">
      <div className="  bg-white z-50 sticky top-10 w-28 text-center mt-12 mx-1 ">
        <Link to={link1}>
          <div
            className={`${
              path === link1 ? `bg-blue-100 text-blue-700` : `text-slate-600`
            } text-center  p-2 rounded-md my-2 `}
          >
            <PersonIcon2
              className="
              text-2xl mx-auto"
            />
            <p>Profile</p>
          </div>
        </Link>

        <Link to={link2}>
          <div
            className={`${
              path === link2 ? `bg-blue-100 text-blue-700` : `text-slate-600`
            } text-center  p-2 rounded-md my-2`}
          >
            <JobIcon className="text-2xl mx-auto" />
            <p>Jobs</p>
          </div>
        </Link>

        <Link to={link3}>
          <div
            className={`${
              path === link3 ? `bg-blue-100 text-blue-700` : `text-slate-600`
            } text-center  p-2 rounded-md my-2`}
          >
            <BookmarkedIcon className="text-2xl  mx-auto" />
            <p>Saved</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

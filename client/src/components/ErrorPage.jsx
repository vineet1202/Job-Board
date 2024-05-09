import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" w-5/6 md:w-3/4 mx-auto z-auto mt-16 mb-16 ">
      <section className=" mt-8 pb-8 px-4 md:px-12 pt-4 rounded-md text-center">
        <h1 className="text-6xl   font-medium">ERROR</h1>

        <p className="font-mono text-4xl mt-8"> 404</p>
        <Link to="/" className="text-2xl mt-20 hover:text-blue-700  underline">
          Go back to Home
        </Link>
      </section>
    </div>
  );
};

export default ErrorPage;

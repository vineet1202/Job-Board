import React from "react";

const Button = ({ value, size }) => {
  return (
    <>
      <button
        className={`bg-black text-white px-4 py-2 text-${size} rounded hover:bg-blue-700 mt-3`}
      >
        {value}
      </button>
    </>
  );
};

export default Button;

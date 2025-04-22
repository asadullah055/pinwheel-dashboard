import React from "react";

const Loading = ({ text }) => {
  return (
    <div>
      <span className="loading loading-spinner loading-md text-white"></span>
      <span className="ms-2 font-medium">{text}</span>
    </div>
  );
};

export default Loading;

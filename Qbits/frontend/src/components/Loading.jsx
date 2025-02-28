import React from "react";
import { FaLeaf } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-50">
      <FaLeaf className="animate-spin text-green-500 text-6xl mb-4" />
      <p className="text-green-700 font-semibold">Loading... Please wait</p>
    </div>
  );
};

export default Loading;

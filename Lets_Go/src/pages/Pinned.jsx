import React from "react";
import Lottie from "lottie-react";
import animationData from "../Main Scene.json"


const PinnedAnimationCard = () => {
  return (
    <div className="absolute right-[100px] top-[300px] size-30 w-80 p-6 bg-gray-100 rounded-lg shadow-lg rotate-/2">
      {/* Pushpin Icon */}
      <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
        📌
      </div>

       <div className="flex justify-center">
        <Lottie animationData={animationData} loop={true} className="w-40 h-40 relative bottom-15" />
      </div>
    </div>
  );
};

export default PinnedAnimationCard;
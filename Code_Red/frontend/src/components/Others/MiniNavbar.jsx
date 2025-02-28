import React from "react";

const MiniNavbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md px-6 flex justify-center">
      <a
        href="#"
        className="text-5xl font-extrabold text-primary transition-all duration-[700ms] cursor-pointer px-3 py-2"
        style={{
          textShadow: "0 0 3px rgba(255, 255, 255, 0.2)",
        }}
        onMouseEnter={(e) =>
          (e.target.style.textShadow =
            "0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)")
        }
        onMouseLeave={(e) =>
          (e.target.style.textShadow = "0 0 3px rgba(255, 255, 255, 0.2)")
        }
      >
        HandyGo
      </a>
    </div>
  );
};
export default MiniNavbar;


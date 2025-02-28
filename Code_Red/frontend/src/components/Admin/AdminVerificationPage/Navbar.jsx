import React from "react";

const Navbar = () => {
  return (
    <div className="navbar h-16 bg-base-200 shadow-md px-6 flex justify-between items-center">
      {/* Left: HandyGo Logo */}
      <h1 className="text-3xl font-bold text-primary">HandyGo</h1>

      {/* Right: Logout Button (Size remains unchanged) */}
      <button className="btn btn-error text-xl px-8 py-3">Logout</button>
    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // Import icons
import MiniNavbar from "../../components/Others/MiniNavbar";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <MiniNavbar />

      {/* Login Box */}
      <div className="flex items-center justify-center h-[85vh]">
        <div className="card w-[500px] p-10 bg-base-300 shadow-lg shadow-[0_0_40px_rgba(34,197,94,0.2)] rounded-lg">
          <h2 className="text-4xl font-bold text-center text-base-content">
            Admin Login
          </h2>

          <form className="space-y-8 mt-8">
            {/* Email Input */}
            <div>
              <label className="label">
                <span className="text-lg font-semibold text-base-content">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full bg-base-100 text-lg p-3 pl-12"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div>
              <label className="label">
                <span className="text-lg font-semibold text-base-content">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-base-100 text-lg p-3 pl-12 pr-12"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {/* Login Button (Centered) */}
            <div className="flex justify-center">
              <button className="btn btn-primary text-lg px-12 py-3">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

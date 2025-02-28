import React, { useState } from "react";
import { Phone, Lock, ChevronDown, Eye, EyeOff } from "lucide-react"; // Using Lucide for icons
import MiniNavbar from "../components/Others/MiniNavbar";

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation: Ensure all fields are filled
    if (!loginData.phone || !loginData.password || !loginData.role) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage(""); // Clear error if valid
    console.log("Login Data:", loginData);
    alert("Login Successful!");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mini Navbar */}
      <MiniNavbar />

      {/* Login Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-lg bg-base-300 shadow-lg p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-base-content mb-6">Login</h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center font-semibold mb-4">{errorMessage}</div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-lg font-semibold">Phone Number <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="input input-bordered w-full pl-10 mt-2"
                  onChange={handleChange}
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Password with Show/Hide Toggle */}
            <div>
              <label className="block text-lg font-semibold">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full pl-10 pr-10 mt-2"
                  onChange={handleChange}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {/* Role Selection - Dropdown */}
            <div>
              <label className="block text-lg font-semibold">Role <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  name="role"
                  className="select select-bordered w-full mt-2 appearance-none pr-10"
                  onChange={handleChange}
                  value={loginData.role}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>
            </div>

            {/* Login Button (Centered) */}
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary text-lg px-12">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

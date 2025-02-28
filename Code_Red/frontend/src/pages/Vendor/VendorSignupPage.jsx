import React, { useState } from "react";
import { User, Phone, Lock, Eye, EyeOff } from "lucide-react"; // Icons from lucide-react
import MiniNavbar from "../../components/Others/MiniNavbar"; // Import Mini Navbar

const VendorSignup = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!vendorData.name || !vendorData.phone || !vendorData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage(""); // Clear error if valid
    console.log("Vendor Signup Data:", vendorData);
    alert("Vendor Signup Successful!");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mini Navbar */}
      <MiniNavbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-lg bg-base-300 shadow-lg p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-base-content mb-6">Vendor Signup</h2>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-center font-semibold mb-4">{errorMessage}</div>
          )}

          {/* Vendor Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-semibold">Full Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="input input-bordered w-full pl-10 mt-2"
                  onChange={handleChange}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            {/* Submit Button (Centered) */}
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary text-lg px-12">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;

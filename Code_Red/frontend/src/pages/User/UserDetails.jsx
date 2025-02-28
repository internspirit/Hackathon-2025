import React, { useState } from "react";
import { Home, Phone, UserCheck, MapPin, Pencil, CheckCircle, Image } from "lucide-react";
import { toast } from "react-hot-toast"; // Import toast
import Navbar from "../../components/User/UserHomePage/Navbar";

const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
];

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    address: "123 Street, Goa",
    city: "Panaji",
    phone: "+91 98765 43210",
    profilePhoto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Default dummy image
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle profile updates
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle profile photo upload
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prevData) => ({ ...prevData, profilePhoto: imageUrl }));
    }
  };

  // Toggle edit mode & show success message
  const handleEditClick = () => {
    if (isEditing) {
      toast.success("Profile updated successfully!"); // Show success toast
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl bg-base-300 shadow-lg p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-base-content mb-6">User Profile</h2>

          {/* Profile Photo (Bigger Size) */}
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36">
              <label htmlFor="profileUpload" className="cursor-pointer">
                <img
                  src={userData.profilePhoto}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border border-base-content object-cover"
                />
                {/* Edit Profile Photo Icon */}
                {isEditing && (
                  <div className="absolute bottom-2 right-2 bg-base-100 p-2 rounded-full shadow-md">
                    <Image className="w-5 h-5 text-primary" />
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePhotoChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Full Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">{userData.name}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Address:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">{userData.address}</p>
              )}
            </div>

            {/* City (Dropdown) */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">City:</span>
              {isEditing ? (
                <select
                  name="city"
                  value={userData.city}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  {goaCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-base text-base-content">{userData.city}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Phone:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">{userData.phone}</p>
              )}
            </div>
          </div>

          {/* Edit / Submit Button (Moved to Bottom) */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleEditClick}
              className="btn btn-primary flex items-center gap-2 text-lg px-6 py-2"
            >
              {isEditing ? <CheckCircle className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
              {isEditing ? "Submit" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState } from "react";
import { Home, Phone, UserCheck, MapPin, Pencil, CheckCircle, Image, Briefcase, ClipboardList, IndianRupee } from "lucide-react";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar";

const serviceOptions = ["Plumber", "Carpenter", "Home Appliances Repair", "Home Maintenance", "Electrician"];
const experienceOptions = ["None", "1 Year", "1-3 Years", "3-5 Years", "More than 5 Years"];
const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
];

const languageOptions = ["Konkani", "Marathi", "Hindi", "English"]; // Added language dropdown


const VendorProfile = () => {
  const [vendorData, setVendorData] = useState({
    profilePhoto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Default dummy image
    name: "John Doe",
    phone: "+91 98765 43210",
    location: "Panaji",
    language: "English",
    serviceType: "Plumber",
    experience: "None",
    description: "Expert in pipe repair and maintenance",
    hourlyWage: "500",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  // Handle profile photo upload
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setVendorData((prevData) => ({ ...prevData, profilePhoto: imageUrl }));
    }
  };

  // Toggle edit mode & show success message
  const handleEditClick = () => {
    if (isEditing) {
      toast.success("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-2xl bg-base-300 shadow-lg p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-base-content mb-6">Vendor Profile</h2>

          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36">
              <label htmlFor="profileUpload" className="cursor-pointer">
                <img
                  src={vendorData.profilePhoto}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border border-base-content object-cover"
                />
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

          {/* Vendor Details */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Full Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={vendorData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">{vendorData.name}</p>
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
                  value={vendorData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">{vendorData.phone}</p>
              )}
            </div>

           {/* Language (Dropdown) */}
           <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Language:</span>
              {isEditing ? (
                <select
                  name="language"
                  value={vendorData.language}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  {languageOptions.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-base text-base-content">{vendorData.language}</p>
              )}
            </div>

            {/* City (Dropdown) */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">City:</span>
              {isEditing ? (
                <select
                  name="location"
                  value={vendorData.location}
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
                <p className="text-base text-base-content">{vendorData.location}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Service Type:</span>
              {isEditing ? (
                <select
                  name="serviceType"
                  value={vendorData.serviceType}
                  onChange={handleInputChange}
                  className="select select-bordered w-full max-w-xs"
                >
                  {serviceOptions.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-base text-base-content">{vendorData.serviceType}</p>
              )}
            </div>

            {/* Charges per Hour */}
            <div className="flex items-center gap-3">
              <IndianRupee className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Charges per Hour:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="hourlyWage"
                  value={vendorData.hourlyWage}
                  onChange={handleInputChange}
                  className="input input-bordered w-full max-w-xs"
                />
              ) : (
                <p className="text-base text-base-content">₹{vendorData.hourlyWage}/hr</p>
              )}
            </div>
          </div>

          {/* Edit / Submit Button */}
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

export default VendorProfile;

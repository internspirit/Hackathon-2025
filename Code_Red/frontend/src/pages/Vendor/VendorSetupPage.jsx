import React, { useState } from "react";
import { Upload, User, MapPin, Phone, FileText, Briefcase, IndianRupee, ClipboardList } from "lucide-react";
import MiniNavbar from "../../components/Others/MiniNavbar";

const serviceOptions = ["Plumber", "Carpenter", "Home Appliances Repair", "Home Maintenance", "Electrician"];
const experienceOptions = ["None", "1 Year", "1-3 Years", "3-5 Years", "More than 5 Years"];

const languageOptions = ["Konkani", "Marathi", "Hindi", "English"];

const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna",  "Assagao",
];

const VendorProfileSetup = () => {
  const [vendorData, setVendorData] = useState({
    profilePhoto: null,
    language: "",
    location: "",
    phone: "",
    serviceType: "",
    experience: "None", // Default value
    description: "",
    hourlyWage: "",
    aadharCard: null,
    certificates: [],
  });

  const handleInputChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVendorData({ ...vendorData, [name]: files.length ? files[0] : null });
  };

  const handleMultiFileChange = (e) => {
    const { name, files } = e.target;
    setVendorData({ ...vendorData, [name]: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Profile Data:", vendorData);
    alert("Profile Submitted Successfully!");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <MiniNavbar />

      <div className="container mx-auto p-8">
        <h2 className="text-5xl font-bold text-base-content text-center mb-8">
          Vendor Profile Setup
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-base-300 shadow-lg p-8 rounded-lg space-y-6">
          {/* Profile Photo */}
          <div>
            <label className="block text-xl font-semibold">Profile Photo <span className="text-red-500">*</span></label>
            <input type="file" name="profilePhoto" accept="image/jpeg" required onChange={handleFileChange} className="file-input w-full mt-2" />
          </div>

          {/* Language (Dropdown) */}
           <div>
             <label className="block text-xl font-semibold">
              Language <span className="text-red-500">*</span>
              </label>
           <select
               name="language"
               value={vendorData.language}
               onChange={handleInputChange}
               className="select select-bordered w-full mt-2"
               required
           >
             <option value="">Select Language</option>
             {languageOptions.map((language, index) => (
               <option key={index} value={language}>
             {language}
              </option>
                ))}
               </select>
           </div>

          {/* Location (City) - Styled Dropdown */}
          <div>
            <label className="block text-xl font-semibold">Location (City) <span className="text-red-500">*</span></label>
            <select
              name="location"
              value={vendorData.location}
              onChange={handleInputChange}
              className="select select-bordered w-full mt-2"
              required
            >
              <option value="">Select City</option>
              {goaCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xl font-semibold">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" name="phone" required placeholder="Enter your phone number" onChange={handleInputChange} className="input input-bordered w-full mt-2" />
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-xl font-semibold">Service Type <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-4 mt-2">
              {serviceOptions.map((service, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="serviceType" value={service} required onChange={handleInputChange} className="radio radio-primary" />
                  {service}
                </label>
              ))}
            </div>
          </div>

          {/* Experience (Dropdown) */}
          <div>
            <label className="block text-xl font-semibold">Experience <span className="text-red-500">*</span></label>
            <select
              name="experience"
              value={vendorData.experience}
              onChange={handleInputChange}
              className="select select-bordered w-full mt-2"
              required
            >
              {experienceOptions.map((exp, index) => (
                <option key={index} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xl font-semibold">Work Description</label>
            <textarea name="description" placeholder="Describe your work" onChange={handleInputChange} className="textarea textarea-bordered w-full mt-2"></textarea>
          </div>

          {/* Charges per Hour */}
          <div>
            <label className="block text-xl font-semibold">Charges per Hour (₹)</label>
            <input type="number" name="hourlyWage" placeholder="Enter your charges per hour" onChange={handleInputChange} className="input input-bordered w-full mt-2" />
          </div>

          {/* Aadhar Card Upload */}
          <div>
            <label className="block text-xl font-semibold">Aadhar Card (JPEG) <span className="text-red-500">*</span></label>
            <input type="file" name="aadharCard" accept="image/jpeg" required onChange={handleFileChange} className="file-input w-full mt-2" />
          </div>

          {/* Certificates Upload */}
          <div>
            <label className="block text-xl font-semibold">Certificates (JPEG) (Optional)</label>
            <input type="file" name="certificates" accept="image/jpeg" multiple onChange={handleMultiFileChange} className="file-input w-full mt-2" />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary text-lg px-8 py-3">Submit Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorProfileSetup;

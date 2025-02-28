import React from "react";
import { CheckCircle, XCircle, FileText, BadgeCheck, Phone, User } from "lucide-react"; 
import { motion } from "framer-motion"; 
import Navbar from "../../components/Admin/AdminVerificationPage/Navbar";

const vendors = [
  {
    id: 1,
    name: "John's Plumbing",
    phone: "+91 98765 43210",
    type: "Plumber",
    skills: ["Pipe Repair", "Leak Fixing", "Bathroom Fittings"],
    certificate: "https://via.placeholder.com/200",
    verificationProof: "https://via.placeholder.com/200",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sara's Carpentry",
    phone: "+91 91234 56789",
    type: "Carpenter",
    skills: ["Furniture Making", "Wood Polishing", "Cabinet Repairs"],
    certificate: "https://via.placeholder.com/200",
    verificationProof: "https://via.placeholder.com/200",
    status: "Pending",
  },
  {
    id: 3,
    name: "Mike's Electricals",
    phone: "+91 99887 66554",
    type: "Electrician",
    skills: ["Wiring", "Lighting Installation", "Fuse Repair"],
    certificate: "https://via.placeholder.com/200",
    verificationProof: "https://via.placeholder.com/200",
    status: "Pending",
  },
];

const VendorRequests = () => {
  const handleAccept = (vendorName) => {
    console.log(`${vendorName} accepted.`);
  };

  const handleReject = (vendorName) => {
    console.log(`${vendorName} rejected.`);
  };

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="container mx-auto p-6">
       <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
          Vendor Verification Requests
        </h2>

        {/* List Layout for Vendor Requests (Centered Cards) */}
        <div className="flex flex-col items-center gap-4">
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              className="card bg-base-300 shadow-md p-4 rounded-lg w-full max-w-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vendor Details */}
              <div>
                <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> {vendor.name}
                </h3>
                <p className="text-sm text-base-content flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-secondary" /> {vendor.phone}
                </p>
                <p className="text-sm text-base-content flex items-center gap-2 mt-1">
                  <BadgeCheck className="w-4 h-4 text-accent" /> {vendor.type}
                </p>
                <p className="text-sm text-base-content mt-1">
                  <span className="font-semibold">Skills:</span> {vendor.skills.join(", ")}
                </p>
              </div>

              {/* Verification Documents - Side by Side */}
              <div className="flex justify-start gap-3 mt-4">
                <button
                  className="btn btn-outline btn-info text-sm flex items-center gap-2 w-1/2 px-3 py-2"
                  onClick={() => handleViewImage(vendor.certificate)}
                >
                  <FileText className="w-4 h-4" /> View Certificate
                </button>
                <button
                  className="btn btn-outline btn-primary text-sm flex items-center gap-2 w-1/2 px-3 py-2"
                  onClick={() => handleViewImage(vendor.verificationProof)}
                >
                  <BadgeCheck className="w-4 h-4" /> View Personal Proof
                </button>
              </div>

              {/* Bottom - Action Buttons (Aligned to Right) */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="btn btn-success text-sm px-3 py-2 flex items-center gap-2"
                  onClick={() => handleAccept(vendor.name)}
                >
                  <CheckCircle className="w-4 h-4" /> Accept
                </button>
                <button
                  className="btn btn-error text-sm px-3 py-2 flex items-center gap-2"
                  onClick={() => handleReject(vendor.name)}
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorRequests;

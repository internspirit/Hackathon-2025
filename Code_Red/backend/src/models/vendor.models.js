import mongoose from "mongoose";

const languages = [
  "English", "Hindi", "Marathi", "Konkani",];

const VendorSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true }, // Auth0 ID for login
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    photo: { type: String }, // URL of profile photo
    city: { type: String, required: true },
    language: { type: String, enum:languages }, // List of languages spoken
    serviceType: { type: String, required: true }, // e.g., plumber, electrician
    experience: { type: Number, required: true }, // In years
    workDescription: { type: String },
    chargePerHour: { type: Number, required: true },
    documents: { 
      aadhar: { type: String, required: true },  // Aadhar card link
      pan: { type: String, required: false }     // PAN card link (optional)
    }, 
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    isAvailable: { type: Boolean, default: false }, // Online/offline toggle
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    completedBookings: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    totalWorkHours: {
      type: Number,
      default: 0
    },


    createdAt: { type: Date, default: Date.now }
  });
export const Vendor = mongoose.model("Vendor", VendorSchema);  
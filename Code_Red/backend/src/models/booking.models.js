import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // Example: "10:00 AM - 11:00 AM"
  workDescription: { type: String },
  status: {type: String,enum: ["pending", "confirmed", "completed", "cancelled"],default: "pending",},
  //new changes
  workStartTime: {type: Date,default: null,},
  workEndTime: {type: Date,default: null,},
  isUrgent: {type: Boolean,default: false,},
  // New field to track if review has been submitted
  isReviewed: {type: Boolean,default: false,},
  charge: { type: Number, required: true }, // Vendor's charge per hour
  paymentMethod: { type: String, enum: ["cash", "qr"], default: "cash" }, // Payment method
  transactionId: { type: String }, // Store transaction ID for online payments
  createdAt: { type: Date, default: Date.now },
});
export const Booking = mongoose.model("Booking", BookingSchema);

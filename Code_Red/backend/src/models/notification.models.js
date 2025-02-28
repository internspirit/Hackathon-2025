import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: false },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true }, // Reference booking
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, enum: ["booking", "alert"], required: true },
    bookingStatus: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"], default: "PENDING" }, // Track booking status
  });
export const Notification = mongoose.model("Notification", NotificationSchema);  

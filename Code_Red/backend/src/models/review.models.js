import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

     // New field to reference the booking
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String },
    createdAt: { type: Date, default: Date.now }
  });

export const Review = mongoose.model("Review", ReviewSchema);
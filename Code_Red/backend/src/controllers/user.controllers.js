import { User } from "../models/user.models.js";
import { Notification } from "../models/notification.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";   
import { ApiErrors } from "../utils/apiError.utils.js";
import { Booking } from "../models/booking.models.js";
import { Vendor } from "../models/vendor.models.js";


//profile page
export const setupProfile = asyncHandler(async (req, res) => {
    const auth0Id = req.user.auth0Id;
    const { phone, address, city } = req.body;

    if (!phone || !address || !city) {
        throw new ApiError(400, "All fields are required");
    }

    const updatedUser = await User.findOneAndUpdate(
        { auth0Id },
        { phone, address, city },
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, updatedUser, "Profile setup completed"));
});

//get profile
export const getProfile = asyncHandler(async (req, res) => {
    const auth0Id = req.user.auth0Id;
    const user = await User.findOne({ auth0Id }).select("-__v");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

//edit profile

//add profile pic

export const editprofile= asyncHandler(async (req, res) => {
    const auth0Id = req.user.auth0Id;
    const { phone, address, city } = req.body;

    const updateData = {};
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (city) updateData.city = city;

    // If no valid field is provided, return error
    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "At least one field (phone, address, or city) must be updated");
    }

    const updatedUser = await User.findOneAndUpdate(
        { auth0Id },
        updateData,
        { new: true } // Return updated document
    );

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});


//get all vendors 
export const getAllVendors = asyncHandler(async (req, res) => {
    const { jobType, city, rating, language } = req.query;

    let filter = { role: "vendor", verified: true }; // Only show verified vendors

    if (jobType) {
        filter.jobType = jobType;
    }
    if (city) {
        filter.city = city;
    }
    if (rating) {
        filter.rating = { $gte: rating }; // Get vendors with rating >= selected rating
    }
    if (language) {
        filter.language = language;
    }

    const vendors = await User.find(filter);

    if (!vendors.length) {
        throw new ApiErrors(404, "No vendors found.");
    }

    res.status(200).json(new ApiResponse(200, vendors, "List of vendors"));
});

//details page which will show the vendor details
export const getVendorDetails = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    // Find vendor by ID and exclude sensitive data if needed
    const vendor = await Vendor.findById(vendorId).select("-password -someSensitiveField");

    if (!vendor) {
        throw new ApiError(404, "Vendor not found");
    }

    res.status(200).json(new ApiResponse(200, vendor, "Vendor details fetched successfully"));
});

//book now(logic for extra charges) or book later option 
export const bookVendor = asyncHandler(async (req, res) => {
    const { vendorId, serviceDate, serviceTime, workDescription, bookNow } = req.body;
    const auth0Id =  req.auth.sub; // Authenticated User

    if (!vendorId || !serviceDate || !serviceTime) {
        throw new ApiErrors(400, "Missing required fields");
    }

    //check for same day booking
    const today = moment().format("YYYY-MM-DD");
    const selectedDate = moment(serviceDate, "YYYY-MM-DD").format("YYYY-MM-DD");

    
    if (selectedDate === today && !bookNow) {
        throw new ApiError(400, "Same-day bookings must select 'Book Now' with extra charges");
    }



    const vendor=await Vendor.findById(vendorId);
    if (!vendor) {
        throw new ApiErrors(404, "Vendor not found");
    }

    let totalPrice =vendor.chargePerHour;

    if (bookNow) {
        const extraCharge = 40; // Fixed extra charge for immediate bookings
        totalPrice += extraCharge;
    }






    const newBooking = await Booking.create({
        userId:req.auth.sub,
        vendorId,
        serviceDate,
        serviceTime,
        workDescription,
        bookNow,
        totalPrice,
        status: "pending" // Default status
    });


    //send booking notification to user 
    await Notification.create({
        userId: auth0Id,
        bookingId: newBooking._id, // Linking notification to the booking
        message: `Your booking for ${vendor.name} on ${serviceDate} at ${serviceTime} is pending confirmation.`,
        type: "booking",
       
        bookingStatus: "PENDING", // Track booking status
        createdAt: new Date()
    });

-
    //send booking notification to vendor

    await Notification.create({
        userId: vendor.auth0Id,  // Vendor receives the notification
        bookingId: newBooking._id,
        message: `You have received a new booking request from ${req.user.name} for ${serviceDate} at ${serviceTime}.`,
        type: "booking",
        status: "unread",
        bookingStatus: "PENDING",
        createdAt: new Date()
    });


    res.status(201).json(new ApiResponse(201, newBooking, "Booking request sent to vendor"));
});

//get all notifications for a user 
export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ userId:  req.auth.sub }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, notifications, "User notifications fetched successfully"));
});

//get user bookings
export const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ userId: req.auth.sub }).populate("vendorId", "name phone charge");

    res.status(200).json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
});












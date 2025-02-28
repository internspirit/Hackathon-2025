import { Vendor } from "../models/vendor.models.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";   
import { ApiErrors } from "../utils/apiError.utils.js";
import { User } from "../models/user.models.js";
import { Notification } from "../models/notification.models.js";
import { Booking } from "../models/booking.models.js";

import {Review} from "../models/review.models.js"

//todos 
//  profile setup 
//Photo, language which the vendor knows, location->city, service type (eg plumber,electrician), experience , work description , charge per hour which vendor charges, anddocuments needed for verification , and he needs to wait until the validation from the admincomes



//get specific vendor
export const getVendorById = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) throw new ApiErrors(404, "Vendor not found");
    res.status(200).json(new ApiResponse(200, "Vendor fetched successfully", vendor));
  });
//do we need a register vendor? or only update is okay?

//update vendor or setup vendor 

//also add multer for photo upload

export const vendorProfile = asyncHandler(async (req, res) => {
    const updateData = req.body; // Get only the fields sent in request

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new ApiErrors(400, "No data provided for update");
  }

  if (updateData.status) {
    delete updateData.status;
  }

  // Find vendor by auth0Id and update the provided fields
  const vendor = await Vendor.findOneAndUpdate(
    { auth0Id: req.auth.sub }, // Find vendor by Auth0 ID
    { $set: updateData }, // Update only the provided fields
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  if (!vendor) throw new ApiErrors(404, "Vendor not found");

  res.status(200).json(new ApiResponse(200, "Vendor profile updated successfully", vendor));
});
//test data 



  //toggle availability

  export const toggleAvailability = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) throw new ApiErrors(404, "Vendor not found");
  
    if (vendor.auth0Id !== req.auth.sub) throw new ApiErrors(403, "Unauthorized");
  
    vendor.isAvailable = !vendor.isAvailable;
    await vendor.save();
    res.status(200).json(new ApiResponse(200, "Availability status updated", vendor));
  });
  
  
  //upload documents 
  export const uploadDocuments = asyncHandler(async (req, res) => {
    const documentPaths = req.files.map(file => file.path);
    const vendor = await Vendor.findOneAndUpdate(
      { auth0Id: req.auth.sub },
      { $set: { documents: documentPaths } },
      { new: true }
    );
    if (!documents || documents.length === 0) {
      throw new ApiErrors(400, "No documents provided");

      
    }

    if (!vendor) throw new ApiErrors(404, "Vendor not found");

    await Notification.create({
      message: `Vendor ${vendor.name} has uploaded documents for verification`,
      // Admin notification doesn't have userId or vendorId
    });
  
    
  
    
  
    res.status(200).json(new ApiResponse(200, "Documents uploaded successfully", vendor));
  
  });



  //get upcoming bookings

  export const getUpcomingBookings = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findOne({ auth0Id: req.auth.sub }).populate("bookings");
    if (!vendor) throw new ApiErrors(404, "Vendor not found");
  
    const bookings = await Booking.find({
      vendorId: vendor._id,
      status: { $in: ['pending', 'confirmed'] },
      date: { $gte: new Date() }
    }).populate('userId', 'name phone address city');
    if (!bookings || bookings.length === 0) throw new ApiErrors(404, "No upcoming bookings found");

  
    res.status(200).json(new ApiResponse(200, "Upcoming bookings fetched successfully", upcomingBookings));
  });


  //respond to booking request

  export const  respondToBookingRequest = asyncHandler(async (req, res) => {
      const { bookingId } = req.params;
        const vendorId = req.auth.sub;
        const { response } = req.body;

    
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.vendorId.toString() !== vendorId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (response === "ACCEPTED") {
            booking.status = "ACCEPTED";
        } else if (response === "REJECTED") {
            booking.status = "REJECTED";
        } else {
            return res.status(400).json({ message: "Invalid response" });
        }

        await booking.save();
        res.status(200).json(new ApiResponse(200, "Booking status updated successfully", booking));
  })


  //timer controller 

 export const startTimer =asyncHandler(async (req,res)=>{
  const { bookingId } = req.params;
  const vendorId = req.auth.sub; // Ensure consistent auth handling

  const booking = await Booking.findById(bookingId);
  if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.vendorId.toString() !== vendorId) {
      return res.status(403).json({ message: "Unauthorized" });
  }

  booking.workStartTime = new Date(); // Use consistent naming
  await booking.save();

  

    return res.status(200).json(new ApiResponse(200, "Timer started successfully", booking));
 })

 //stop timer 

 export const stopTimer = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;
    const vendorId= req.auth.sub;
   
    

    const booking = await Booking.findOne({
      _id: bookingId,
      vendorId: vendorId,
      status: 'confirmed',
      workStartTime: { $ne: null }
    });
    if (!booking) throw new ApiErrors(404, "Booking not found or work not started ");

    if (booking.vendorId.toString() !== vendorId.toString()) {
      throw new ApiErrors(403, "Unauthorized");
    }

    booking.workEndTime = new Date();


    const durationMs = booking.workEndTime - booking.workStartTime;
    const durationHours = durationMs / (1000 * 60 * 60);

    //booking charge logic change
    booking.charge = Math.max(vendor.chargePerHour, vendor.chargePerHour * durationHours);


    booking.status = "completed"; // Mark as completed
    await booking.save();

    res.status(200).json(new ApiResponse(200,{booking}, "Timer stopped successfully"));

 })

 //complete booking 

 export const completeBooking=asyncHandler(async(req,res)=>{

//give transaction id for online payments 
  const { bookingId, paymentMethod, transactionId } = req.body;
  const vendorId = req.auth.sub; 
    
  if (!['cash', 'qr'].includes(paymentMethod)) {
    throw new ApiErrors(400,"invalid payment method");
  }
  
  const vendor = await Vendor.findOne({ auth0Id: req.params.auth0Id });
  
  if (!vendor) {
    throw new ApiErrors(400,"vendor not found")
  }
  
  const booking = await Booking.findOne({
    _id: bookingId,
    vendorId: vendorId,
    status: 'confirmed',
    workEndTime: { $ne: null }
  });
  
  if (!booking) {
   throw new ApiErrors(400,"no booking found")
  }
  
  booking.status = 'completed';
  booking.paymentMethod = paymentMethod;

  if (transactionId) booking.transactionId = transactionId;
  
  await booking.save();
  
  // Notify user
  await Notification.create({
    userId: booking.userId,
    message: `Your booking for ${vendor.serviceType} has been completed. Payment of ₹${booking.charge} received through ${paymentMethod}`,
    status: 'unread'
  });
  
  // Create notification for vendor
  await Notification.create({
    vendorId: vendor._id,
    message: `You've completed the booking and received payment of ₹${booking.charge}`,
    status: 'unread'
  });

  return res.status(200).json(new ApiResponse(200,booking,"success"))

 })

 //stats controller 

 export const statsController= asyncHandler(async(req,res)=>{
  
  const vendor = await Vendor.findOne({ auth0Id: req.params.auth0Id });

  if(!vendor){
    throw new ApiErrors(400,"vendor not found")
  }

  const completedBookings = await Booking.find({
    vendorId: vendor._id,
    status: 'completed'
  });

  const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.charge, 0);

   // Calculate total work hours
   const totalWorkHours = completedBookings.reduce((sum, booking) => {
    if (booking.workStartTime && booking.workEndTime) {
      return sum + (booking.workEndTime - booking.workStartTime) / (1000 * 60 * 60);
    }
    return sum;
  }, 0);

  const reviews = await Review.find({ vendorId: vendor._id });

  const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;


 })


 //get vendor notifications
export const getVendorNotifications=asyncHandler(async(req,res)=>{

  const vendor = await Vendor.findOne({ auth0Id: req.params.auth0Id });
  if(!vendor){
    throw new ApiErrors(400,"vendor not found")
  }


  const notifications = await Notification.find({
    vendorId: vendor._id
  }).sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200,notifications,"notifications fetched successfully "))
    

})



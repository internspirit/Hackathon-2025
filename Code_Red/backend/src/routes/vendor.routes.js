import { Router } from "express";
import {
  getVendorById,
  vendorProfile,
  toggleAvailability,
  getVendorNotifications,
  startTimer,
  stopTimer,
  completeBooking,
  respondToBookingRequest,
  getUpcomingBookings,
  statsController,
  
} from "../controllers/vendor.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();


router.get("/:id", getVendorById); // Public
router.put("/profile/:id", authMiddleware, vendorProfile); // Protected
router.patch("/availability/:id", authMiddleware, toggleAvailability); // Protected

router.get("/bookings/:auth0Id", authMiddleware, getUpcomingBookings); // Protected
router.post("/booking-response/:id", authMiddleware, respondToBookingRequest); // Protected
router.post("/start-timer/:id", authMiddleware, startTimer); // Protected
router.post("/stop-timer/:id", authMiddleware, stopTimer); // Protected
router.post("/complete-work/:id", authMiddleware, completeBooking); // Protected

router.get("/stats/:id", authMiddleware, statsController); // Protected

router.get("/notifications/:id", authMiddleware, getVendorNotifications); // Protected
export default router;

import {Router} from "express"
import { getAllVendors,setupProfile,getProfile,editprofile,bookVendor,getNotifications,getMyBookings,getVendorDetails } from "../controllers/user.controllers.js"

const router = Router();    
router.get("/vendors",getAllVendors)
router.post("/profile/setup", verifyAuth0, setupProfile);
router.get("/profile", verifyAuth0, getProfile);
router.patch("/profile/edit", verifyAuth0, editprofile);
router.get("/vendor/details/:id", getVendorDetails);
router.post("/book-vendor",verifyAuth0, bookVendor);
router.get("/notifications",verifyAuth0, getNotifications);
router.get("/bookings",verifyAuth0, getMyBookings);



export default router;  

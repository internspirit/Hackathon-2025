import  {Router} from "express" 
import { getUnverifiedVendors,verifyVendor,rejectVendor } from "../controllers/admin.controllers.js"

const router = Router();


router.get("/unverified-vendors", getUnverifiedVendors); 
router.post("/verify-vendor/:vendorId", verifyVendor);
router.post("/reject-vendor/:vendorId", rejectVendor);


export default router;

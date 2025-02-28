// import { Router } from "express";
// import asyncHandler from "../utils/asyncHandler.utils.js";
// import ApiResponse from "../utils/apiResponse.utils.js";
// import verifyJWT from "../middlewares/auth.middlewares.js";
// import {User} from "../models/user.models.js";
// import {Vendor} from "../models/vendor.models.js";

// const router =Router();


// router.get("/user", verifyJWT, asyncHandler(async (req, res) => {
//   let user = await User.findOne({ auth0Id: req.user.sub });

//   if (!user) {
//     user = new User({ auth0Id: req.user.sub, email: req.user.email });
//     await user.save();
//   }

//   res.status(200).json(new ApiResponse(200, "User authenticated", user));
// }));


// router.get("/vendor", verifyJWT, asyncHandler(async (req, res) => {
//   let vendor = await Vendor.findOne({ auth0Id: req.user.sub });

//   if (!vendor) {
//     vendor = new Vendor({ auth0Id: req.user.sub, email: req.user.email });
//     await vendor.save();
//   }

//   res.status(200).json(new ApiResponse(200, "Vendor authenticated", vendor));
// }));

// export default router;



import express from "express";
import { handleAuth0Login } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", handleAuth0Login);

export default router;

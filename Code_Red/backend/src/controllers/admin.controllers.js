import {Admin} from '../models/admin.models.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';
import { ApiResponse } from '../utils/apiResponse.utils.js';
import { ApiErrors } from '../utils/apiError.utils.js';
import { Vendor } from '../models/vendor.models.js';



export const getUnverifiedVendors = asyncHandler(async (req, res) => {
    const vendors = await Vendor.find({ isVerified: false });

    if (!vendors.length) {
        return next(new ApiErrors(404, "No unverified vendors found"));
    }

    return res.status(200).json(new ApiResponse(200, vendors, "Unverified vendors fetched successfully"));
});

export const verifyVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        return next(new ApiErrors(404, "Vendor not found"));
    }

    if (vendor.status === "verified") {
        return next(new ApiErrors(400, "Vendor is already verified"));
    }

    vendor.status = "verified";
    await vendor.save();

    return res.status(200).json(new ApiResponse(200, vendor, "Vendor verified successfully"));
});

export const rejectVendor = asyncHandler(async (req, res) => {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
        return next(new ApiErrors(404, "Vendor not found"));
    }

    if (vendor.status === "rejected") {
        return next(new ApiErrors(400, "Vendor is already rejected"));
    }

    vendor.status = "rejected";
    await vendor.save();

    return res.status(200).json(new ApiResponse(200, vendor, "Vendor rejected successfully"));
});
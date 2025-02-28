import React from "react";
import {FaRecycle, FaWeightHanging, FaCalendarAlt, FaClock } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="rounded-lg transition-shadow duration-300 border p-4 shadow-md hover:shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-green-600">{product?.points} Points</h3>
        </div>

        <div className="space-y-2 mt-1">
          <div className="flex items-start space-x-2">
            <FaRecycle className="text-green-500 mt-1 flex-shrink-0" />
            <div className="flex flex-col text-sm">
              <span className="font-medium">Product: {product?.productName}</span>
              <span className="text-gray-600">{product?.description}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <FaWeightHanging className="text-blue-500" />
            <span>Weight: {product?.weight} kg</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <FaCalendarAlt className="text-blue-500" />
            <span>{product?.listedDate ? formatDate(product?.listedDate) : "Date not available"}</span>
            <FaClock className="text-orange-500 ml-2" />
            <span>Available until: {product?.availableUntil ? formatDate(product?.availableUntil) : "Ongoing"}</span>
          </div>

          <div className="text-xs text-gray-500 flex flex-wrap gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded">Category: {product?.category}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Condition: {product?.condition}</span>
            {product?.ecoFriendly && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Eco-Friendly</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <button
            className="flex items-center justify-center font-bold uppercase py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all text-sm"
            type="button"
          >
            Redeem Now
          </button>
          <button
            className="flex items-center justify-center font-bold uppercase py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm"
            type="button"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTrash, FaUserAlt, FaWeightHanging, FaRecycle } from "react-icons/fa";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ScrapCard = ({ scrap }) => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Create WhatsApp message
  const createWhatsAppMessage = () => {
    const message = `Hello ${scrap?.sellerName}, I'm interested in purchasing your ${scrap?.materialType} scrap from ${scrap?.pickupLocation}. Is it still available for ₹${scrap?.price}/kg?`;
    return encodeURIComponent(message);
  };

  // Initialize map when showing it
  useEffect(() => {
    if (showMap && !mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      if (scrap?.locationCoordinates) {
        try {
          const { lat, lng } = scrap.locationCoordinates;
          L.marker([lat, lng]).addTo(mapRef.current)
            .bindPopup(`<b>Pickup Location:</b> ${scrap.pickupLocation}`)
            .openPopup();
          mapRef.current.setView([lat, lng], 14);
        } catch (err) {
          console.error("Error displaying location:", err);
        }
      }
    }

    return () => {
      if (mapRef.current && !showMap) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [showMap, scrap]);

  return (
    <div className="rounded-lg transition-shadow duration-300 border p-4 shadow-md hover:shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-green-600">₹{scrap?.price}/kg</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <FaUserAlt size={14} />
            <span className="text-sm font-medium">{scrap?.sellerName}</span>
          </div>
        </div>

        <div className="space-y-2 mt-1">
          <div className="flex items-start space-x-2">
            <FaRecycle className="text-green-500 mt-1 flex-shrink-0" />
            <div className="flex flex-col text-sm">
              <span className="font-medium">Material: {scrap?.materialType}</span>
              <span className="text-gray-600">{scrap?.materialDescription}</span>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
            <div className="flex flex-col text-sm">
              <span className="font-medium">Pickup Location: {scrap?.pickupLocation}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <FaWeightHanging className="text-blue-500" />
            <span>Quantity: {scrap?.quantity} kg</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <FaCalendarAlt className="text-blue-500" />
            <span>{scrap?.listedDate ? formatDate(scrap?.listedDate) : 'Date not available'}</span>
            <FaClock className="text-orange-500 ml-2" />
            <span>Available until: {scrap?.availableUntil ? formatDate(scrap?.availableUntil) : 'Ongoing'}</span>
          </div>

          <div className="text-xs text-gray-500 flex flex-wrap gap-2">
            <span className="bg-gray-100 px-2 py-1 rounded">
              Category: {scrap?.category}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              Condition: {scrap?.condition}
            </span>
            {scrap?.needsTransport && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Transport needed
              </span>
            )}
          </div>
        </div>

        <button
          className="mt-2 flex items-center justify-center w-full font-sans text-sm py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          type="button"
          onClick={() => setShowMap(prev => !prev)}
        >
          {showMap ? 'Hide Map' : 'Show Pickup Location'}
        </button>

        {showMap && (
          <div className="my-2">
            <div ref={mapContainerRef} className="h-48 rounded-lg border border-gray-300 overflow-hidden shadow-inner" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-3">
          <a
            className="flex items-center justify-center font-bold uppercase py-3 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all text-sm"
            href={`https://wa.me/${scrap?.phoneNumber}?text=${createWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Seller
          </a>
          <button
            className="flex items-center justify-center font-bold uppercase py-3 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrapCard;
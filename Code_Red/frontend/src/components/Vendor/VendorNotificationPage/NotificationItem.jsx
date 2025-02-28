import React, { useState } from "react";
import { LucideCalendar } from "lucide-react";

const NotificationItem = ({ notification }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#1a2332] bg-opacity-80 backdrop-blur-lg p-5 rounded-lg shadow-md flex items-center justify-between border border-transparent transition hover:border-purple-500 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Icon for Booking */}
        <LucideCalendar size={24} className="text-blue-400" />
        
        {/* Notification Content */}
        <div>
          <h3 className="text-lg font-semibold">New Booking</h3>
          <p className="text-gray-400 text-sm">You have received a new booking for {notification.date}</p>
        </div>
      </div>
      
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="text-gray-500 hover:text-red-500 transition text-xl"
      >
        ✖
      </button>
    </div>
  );
};

export default NotificationItem;

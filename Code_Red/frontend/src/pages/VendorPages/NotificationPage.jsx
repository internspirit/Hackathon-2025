import React, { useState } from "react";
import NotificationList from "../../components/Vendor/VendorNotificationPage/NotificationList";

const NotificationPage = () => {
  // Static notifications (Replace with real-time data later)
  const [notifications, setNotifications] = useState([
    { id: 1, date: "Feb 29, 2024" },
    { id: 2, date: "Mar 1, 2024" },
    { id: 3, date: "Mar 2, 2024" },
    { id: 4, date: "Mar 3, 2024" },
    { id: 5, date: "Mar 4, 2024" },
    { id: 6, date: "Mar 5, 2024" },
  ]);

  return (
    <div className="relative bg-[#0b0f19] text-white min-h-screen flex flex-col items-center p-8 overflow-hidden">
      <h2 className="text-4xl font-bold text-primary mb-6">Notifications</h2>
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default NotificationPage;

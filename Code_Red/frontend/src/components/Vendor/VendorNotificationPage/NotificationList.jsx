import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications }) => {
  return (
    <div className="w-full max-w-3xl space-y-6">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      ) : (
        <p className="text-gray-400 text-center text-lg">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationList;

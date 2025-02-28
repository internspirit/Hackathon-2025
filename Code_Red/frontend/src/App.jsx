import React from "react";
import {Toaster} from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import UserSetupPage from "./pages/User/UserSetupPage";
import LoginPage from "./pages/LoginPage"
import UserHomePage from "./pages/UserPages/UserHomePage"
import ServicePage from "./pages/UserPages/ServicePage"
import BookingPage from "./pages/UserPages/BookingPage"
import UserDetails from "./pages/User/UserDetails"
import VendorSignupPage from "./pages/Vendor/VendorSignupPage"
import VendorSetupPage from "./pages/Vendor/VendorSetupPage"
import VendorHomePage from "./pages/VendorPages/VendorHomePage"
import NotifPage from "./pages/UserPages/NotifPage"
import NotificationPage from "./pages/VendorPages/NotificationPage"
import VendorDetails from "./pages/Vendor/VendorDetails"
import HelpPage from "./pages/UserPages/HelpPage"
import VendorHelpPage from "./pages/VendorPages/VendorHelpPage"
import VendorCheckoutPage from "./pages/VendorPages/VendorCheckoutPage"
import VendorWorkPage from "./pages/VendorPages/VendorWorkPage"

function App() {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Global Toaster for notifications */}
      <Toaster position="center" reverseOrder={false} />

      <Routes>
      <Route index path="/" element={<LandingPage />} />
      <Route path="/user/setup" element={<UserSetupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/home" element={<UserHomePage />} />
      <Route path="/user/service" element={<ServicePage />} />
      <Route path="/user/notifications" element={<NotifPage />} />
      <Route path="/user/booking" element={<BookingPage />} />
      <Route path="/user/profile" element={<UserDetails />} />
      <Route path="/user/help" element={<HelpPage/>} />
      <Route path="/vendor/signup" element={<VendorSignupPage />} />
      <Route path="/vendor/setup" element={<VendorSetupPage />} />
      <Route path="/vendor/home" element={<VendorHomePage />} />
      <Route path="/vendor/work" element={<VendorWorkPage />} />
      <Route path="/vendor/notifications" element={<NotificationPage />} />
      <Route path="/vendor/profile" element={<VendorDetails />} />
      <Route path="/vendor/work" element={<VendorWorkPage />} />
      <Route path="/vendor/help" element={<VendorHelpPage />} />
      <Route path="/vendor/checkout" element={<VendorCheckoutPage />} />
    </Routes>

    </div>
  );
}

export default App;
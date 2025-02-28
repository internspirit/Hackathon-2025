import React, { useState } from 'react';
import BookingCard from '../../components/User/BookingPage/BookingCard';
import WorkDesc from '../../components/User/BookingPage/WorkDesc';
import DateTime from '../../components/User/BookingPage/DateTime';
import MiniNavbar from '../../components/Others/MiniNavbar'
import { useNavigate } from "react-router-dom";

// Mock vendor data (in a real app this would come from props or context)
const mockVendor = {
  id: 1,
  name: "Amit Kumar",
  phone: "+91 9876543210",
  rating: 4.8,
  serviceType: "Plumbing",
  price: "₹500/hr",
  image: "https://placehold.co/200x200/252836/e2e8f0?text=Vendor",
  city: "Panaji",
  languages: ["English", "Hindi", "Konkani"]
};

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [workDescription, setWorkDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const handleBook = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirm = (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      setBookingSuccess(true);
      setBookingConfirmed(true);
    }
  };
  
  const handleGoHome = () => {
    navigate("/user/home");
    window.scrollTo(0, 0); // Scrolls to the top
  };
  
  
  return (
   
    <>
    <MiniNavbar/>
    <div className="container mx-auto px-4 py-6 max-w-2xl">
    
    <h1 className="text-2xl font-bold mb-6">Book a Service</h1>
    
    {/* Vendor Card Component */}
    <BookingCard vendor={mockVendor} />
    
    {/* Work Description Component */}
    <WorkDesc onSave={setWorkDescription} />
    
    {/* DateTime Component for booking options, date and time selection */}
    <DateTime onDateTimeSelect={setBookingDetails} />
    
    {/* Booking Summary */}
    {bookingDetails && (
      <div className="card bg-base-200 shadow-xl mt-6">
        <div className="card-body">
          <h3 className="card-title text-lg">
            {bookingConfirmed ? 
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Booking Confirmed
              </div>
              : 
              "Booking Summary"
            }
          </h3>
          
          {/* Vendor Name at the top */}
          <div className="flex items-center mb-3 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="font-medium">Vendor: {mockVendor.name}</p>
          </div>
          
          <div className="py-2">
            {/* Service Type */}
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>Service: {mockVendor.serviceType}</p>
            </div>
            
            {/* Date */}
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Date: {formatDate(bookingDetails.date)}</p>
            </div>
            
            {/* Time */}
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Time: {bookingDetails.time}</p>
            </div>
            
            {/* Service Charge */}
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Service charge: {mockVendor.price}</p>
            </div>
            
            {/* Work Description */}
            {workDescription && (
              <div className="mb-2 mt-2">
                <div className="flex items-center mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="font-medium">Work Description:</p>
                </div>
                <p className="text-sm opacity-80 ml-7">{workDescription}</p>
              </div>
            )}
            
            {/* Extra Charge for Now Booking */}
            {bookingDetails.bookingType === "now" && (
              <div className="flex items-center mb-1 text-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Extra charge: ₹{bookingDetails.extraCharge}</p>
              </div>
            )}
            
            {/* Status indicator for confirmed bookings */}
            {bookingConfirmed && (
              <div className="flex items-center mt-3 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">Status: Confirmed</p>
              </div>
            )}
          </div>
          <div className="card-actions justify-end mt-2">
            {!bookingConfirmed ? (
              <button 
                className="btn btn-primary"
                onClick={handleBook}
              >
                Book Now
              </button>
            ) : (
              <button 
                className="btn btn-accent"
                onClick={handleGoHome}
              >
                Go Back to Home
              </button>
            )}
          </div>
        </div>
      </div>
    )}
    
    {/* Confirmation Modal */}
    {showConfirmation && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Booking</h3>
          <p className="py-4">Are you sure you want to confirm this booking?</p>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={() => handleConfirm(false)}>No</button>
            <button className="btn btn-primary" onClick={() => handleConfirm(true)}>Yes</button>
          </div>
        </div>
      </div>
    )}
    
    {/* Success Modal */}
    {bookingSuccess && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="modal-box">
          <div className="flex flex-col items-center">
            <div className="text-5xl text-success mb-4">✓</div>
            <h3 className="font-bold text-xl mb-2">Booking Request Sent!</h3>
            <p className="text-center mb-4">Your booking request has been sent. Please wait for vendor confirmation. Check notifications page for more details.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setBookingSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  </>
  );
};

export default BookingPage;
import React, { useState } from "react";
import QRCode from "react-qr-code";
import MiniNavbar from "../../components/Others/MiniNavbar"; // Adjust path if needed

const VendorCheckout = ({ totalTime, totalCost, jobDescription }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showToast, setShowToast] = useState(false);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="bg-base-300 text-base-content min-h-screen flex flex-col relative">
      {/* Mini Navbar */}
      <MiniNavbar />

      {/* Toast Notification - Top Center near navbar */}
      {showToast && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-50 mt-16 px-4 pointer-events-none">
          <div className="bg-base-100 text-primary shadow-lg rounded-lg p-3 transform transition-all duration-300 border-2 border-primary flex items-center gap-3 max-w-md backdrop-blur-sm bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">Payment Confirmed!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {/* Job Details Card */}
          <div className="bg-base-200 p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">Job Summary</h3>
            <div className="bg-base-100 p-3 rounded-lg space-y-2">
              <p><span className="font-semibold">Total Time:</span> {totalTime}</p>
              <p><span className="font-semibold">Total Cost:</span> ₹{totalCost}</p>
              <p><span className="font-semibold">Job Description:</span> {jobDescription}</p>
            </div>
          </div>

          {/* Payment Selection Card */}
          <div className="bg-base-200 p-4 rounded-xl shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <div className="flex flex-col gap-3">
              {/* QR Code Payment */}
              <label className={`flex items-center justify-between bg-base-100 p-3 rounded-lg 
                                transition cursor-pointer border-2 
                                ${paymentMethod === "qr" ? "border-primary" : "border-transparent"} 
                                hover:border-primary`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="qr" 
                    checked={paymentMethod === "qr"} 
                    onChange={() => handlePaymentChange("qr")} 
                    className="radio radio-primary" 
                  />
                  <span>Pay via QR Code</span>
                </div>
                {paymentMethod === "qr" && <QRCode value="https://your-payment-link.com" size={70} />}
              </label>

              {/* Cash Payment */}
              <label className={`flex items-center justify-between bg-base-100 p-3 rounded-lg 
                                transition cursor-pointer border-2 
                                ${paymentMethod === "cash" ? "border-primary" : "border-transparent"} 
                                hover:border-primary`}>
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cash" 
                    checked={paymentMethod === "cash"} 
                    onChange={() => handlePaymentChange("cash")} 
                    className="radio radio-primary" 
                  />
                  <span>Pay with Cash</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-base-200 p-4 rounded-xl shadow-lg mt-4 max-w-5xl mx-auto border-2 border-transparent hover:border-primary transition-all duration-300">
          <h3 className="text-lg font-semibold mb-2">Confirm Your Payment</h3>
          <p className="mb-3 text-base-content/70">
            Please review your order details and payment method before confirming.
          </p>
          
          <div className="bg-base-100 border-l-4 border-warning text-base-content p-3 mb-3 rounded">
            <p className="font-medium flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Important:
            </p>
            <p>Only click the button when payment is physically confirmed.</p>
          </div>
          
          <button 
            className="btn btn-primary w-full font-semibold"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCheckout;
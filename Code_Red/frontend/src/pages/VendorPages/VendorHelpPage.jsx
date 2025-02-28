import React from "react";
import VendorHomeNavbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar";
import FAQItem from "../../components/Vendor/VendorHelpPage/FAQItem";

const faqs = [
  { 
    question: "How do I accept or reject a work request?", 
    answer: "You can view all new work requests on your dashboard. Click 'Accept' to take the job or 'Reject' if you're unavailable." 
  },
  { 
    question: "How is my payment processed?", 
    answer: "Payments are securely processed through our platform. You will receive your earnings directly in your linked bank account after job completion." 
  },
  { 
    question: "What if a customer cancels after I accept a job?", 
    answer: "If a customer cancels, you will be notified immediately. In some cases, you may receive partial compensation for your time." 
  },
  { 
    question: "How can I update my availability?", 
    answer: "You can toggle your availability status in the top right of your dashboard using the 'Online/Offline' switch." 
  },
  { 
    question: "What should I do if I have an issue with a customer?", 
    answer: "If you face any issues, contact our support team using the details below." 
  },
];

const VendorHelpPage = () => {
  return (
    <div className="relative bg-[#0b0f19] text-white font-poppins min-h-screen overflow-hidden">
      {/* Navbar */}
      <VendorHomeNavbar />

      {/* Help Page Content */}
      <section className="px-8 pt-28 pb-16 relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-primary text-center mb-8">Help & Support</h2>

        {/* FAQ Section */}
        <div className="bg-[#1a2332] p-6 rounded-lg shadow-lg
                      border-2 border-transparent hover:border-primary 
                      transition-all duration-300 ease-in-out 
                      hover:shadow-xl hover:shadow-primary/20 
                      animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 bg-[#1a2332] p-6 rounded-lg shadow-lg
                      border-2 border-transparent hover:border-primary 
                      transition-all duration-300 ease-in-out 
                      hover:shadow-xl hover:shadow-primary/20 
                      animate-fadeIn">
          <h3 className="text-2xl font-semibold mb-4">Contact Support</h3>
          <p className="text-gray-400 mb-2">
            If you need further assistance, feel free to reach out to us:
          </p>
          <div className="space-y-2">
            <p className="text-lg"><span className="font-semibold text-primary">📞 Phone:</span> +91 98765 43210</p>
            <p className="text-lg"><span className="font-semibold text-primary">📞 Alternate:</span> +91 87654 32109</p>
            <p className="text-lg"><span className="font-semibold text-primary">📧 Email:</span> support@handygo.com</p>
            <p className="text-lg"><span className="font-semibold text-primary">📧 Alternate:</span> help@handygo.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// CSS Animation keyframes - add to your global CSS file
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

/* If you need to specifically define the primary color in OKLCH format */
:root {
  --p: 0.6 0.2 290; /* This is an example OKLCH value, adjust to match your theme */
}
`;

export default VendorHelpPage;
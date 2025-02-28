import React from "react";
import VendorHomeNavbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar";
import WorkDetails from "../../components/Vendor/VendorWorkPage/WorkDetails";
import WorkTimer from "../../components/Vendor/VendorWorkPage/WorkTimer";

const job = {
  title: "Plumbing Service",
  description: "Fixing leaking pipes and checking water flow issues in the bathroom.",
  location: "123, Green Street, New Delhi",
  time: "March 5, 2024 - 10:30 AM",
};

const VendorWorkPage = () => {
  return (
    <div className="bg-[#0b0f19] text-white font-poppins min-h-screen">
      <VendorHomeNavbar />

      {/* Work Details */}
      <section className="px-8 pt-28 pb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-primary text-center mb-8">Work Details</h2>
        <WorkDetails job={job} />
        <WorkTimer />
      </section>
    </div>
  );
};

export default VendorWorkPage;

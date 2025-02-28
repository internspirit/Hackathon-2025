import React from "react";
import VendorHomeNavbar from "../../components/Vendor/VendorHomePage/VendorHomeNavbar";
import WorkStats from "../../components/Vendor/VendorHomePage/WorkStats";
import WorkList from "../../components/Vendor/VendorHomePage/WorkList";
import { LucideArrowDown } from "lucide-react";

const VendorHomePage = () => {
  // Function to smoothly scroll to "Your Stats" section
  const scrollToStats = () => {
    document.getElementById("your-stats").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-[#0b0f19] text-white font-poppins min-h-screen overflow-hidden">
      {/* Navbar */}
      <VendorHomeNavbar />

      {/* Work Requests Section (Job Cards Pushed Down) */}
      <section id="work-requests" className="flex flex-col justify-start px-8 pt-28 pb-10 relative z-10">
        <WorkList />

        {/* Downward Arrow - Visible on Page Load */}
        <div className="flex justify-center mt-6">
          <button onClick={scrollToStats} className="animate-bounce">
            <LucideArrowDown size={40} className="text-gray-400 hover:text-primary transition" />
          </button>
        </div>
      </section>

      {/* Your Stats Section */}
      <section id="your-stats" className="min-h-screen flex flex-col justify-center px-8 py-16 relative z-10">
        <WorkStats />
      </section>
    </div>
  );
};

export default VendorHomePage;

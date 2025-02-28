import { useState, useEffect } from "react";
import MiniNavbar from "../../components/Others/MiniNavbar";
import VendorCard from "../../components/User/ServicePage/VendorCard";
import FilterComp from "../../components/User/ServicePage/FilterComp";
import { Filter, Home } from "lucide-react";
import axiosInstance from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const ServicePage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    workType: [],
    location: [],
    rating: [],
    chargePerHour: [],
    languagesKnown: [],
  });

  const [vendors, setVendors] = useState([]);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/user/home");
    window.scrollTo(0, 0); // Scrolls to the top
  };
  useEffect(() => {
    fetchVendors();
  }, [filters.workType]); // Fetch when workType changes

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get("/api/vendors", {
        params: { jobType: filters.workType[0] || "" },
      });
      setVendors(response.data.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setVendors([]);
    }
  };

  const handleServiceClick = (service) => {
    setFilters({ ...filters, workType: [service] });
  };

  return (
    <div className="min-h-screen bg-base-200 text-white flex flex-col">
      <MiniNavbar />

      <div className="flex">
        {showFilter && (
          <FilterComp 
            applyFilters={(selectedFilters) => setFilters(selectedFilters)}
            closeFilter={() => setShowFilter(false)} 
            currentFilters={filters} 
          />
        )}

        <div className={`transition-all duration-300 ${showFilter ? "ml-96" : "ml-0"} flex-1`}>
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
              <button
                className="bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus flex items-center gap-2 text-base"
                onClick={handleGoHome}
              >
                <Home size={20} />
                <span>Go Back to Home</span>
              </button>

              <button onClick={() => setShowFilter(!showFilter)} className="p-3 flex items-center gap-2 rounded-lg hover:bg-base-300 text-base">
                <Filter size={24} />
                <span>Filter</span>
              </button>
            </div>

            {vendors.length > 0 ? (
              <div className="flex flex-col gap-4">
                {vendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl">No vendors match your filter criteria</p>
                <button 
                  className="mt-6 bg-primary px-6 py-3 rounded-lg text-white hover:bg-primary-focus text-base"
                  onClick={() => setFilters({ workType: [], location: [], rating: [], chargePerHour: [], languagesKnown: [] })}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

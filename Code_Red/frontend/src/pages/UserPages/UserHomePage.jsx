import { useNavigate } from "react-router-dom";
import Footer from "../../components/Others/Footer";
import Navbar from "../../components/User/UserHomePage/Navbar";
import ServiceCard from "../../components/User/UserHomePage/ServiceCard";
import { Wrench, Zap, Hammer, MonitorSmartphone, Home } from "lucide-react";

const services = [
  { title: "Plumbing", icon: Wrench, description: "Leak repairs, pipe fittings, and more." },
  { title: "Electrical Work", icon: Zap, description: "Wiring, installations, and safety checks." },
  { title: "Carpentry", icon: Hammer, description: "Furniture repairs and woodwork solutions." },
  { title: "Appliance Repairs", icon: MonitorSmartphone, description: "Fixing home appliances efficiently." },
  { title: "Home Maintenance", icon: Home, description: "General upkeep and handyman services." },
];

const UserHomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (serviceTitle) => {
    navigate(`/user/service?name=${serviceTitle.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>
      <Navbar />
      <div className="text-center my-6 mt-11">
        <p className="text-3xl text-primary">HandyGo – Handy Help, On the Go!</p>
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="mt-9 grid grid-cols-3 gap-10">
          {services.slice(0, 3).map((service, index) => (
            <ServiceCard key={index} {...service} onClick={() => handleCardClick(service.title)} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-8">
          {services.slice(3, 5).map((service, index) => (
            <ServiceCard key={index} {...service} onClick={() => handleCardClick(service.title)} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHomePage;

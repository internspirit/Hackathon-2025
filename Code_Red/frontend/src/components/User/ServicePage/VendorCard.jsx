import { MapPin, Briefcase, Star, IndianRupee, Languages } from "lucide-react";

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold mb-3">{vendor.name}</h3>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <Briefcase size={18} />
          <span>{vendor.service}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <Languages size={18} />
          <span>{vendor.languagesKnown.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span>{vendor.location}</span>
        </div>
        <div className="col-span-2 flex justify-between items-center mt-1">
          <div className="flex items-center gap-2 text-yellow-400">
            <Star size={18} />
            <span>{vendor.rating} Stars</span>
          </div>
          <div className="flex items-center gap-2 text-green-500 font-bold text-base">
            <IndianRupee size={18} />
            <span>₹{vendor.chargePerHour} / hour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;

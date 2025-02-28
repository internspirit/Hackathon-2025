import React from "react";
import { LucideClock, LucideMapPin, LucideClipboardList } from "lucide-react";

const WorkDetails = ({ job }) => {
  return (
    <div className="bg-[#1a2332] p-6 rounded-lg shadow-lg
                    border-2 border-transparent 
                    hover:border-[oklch(var(--p))]  
                    transition-all duration-300 ease-in-out 
                    hover:shadow-xl hover:shadow-purple-500/20 
                    animate-fadeIn">
      <h3 className="text-2xl font-semibold text-primary">{job.title}</h3>
      <div className="mt-4 space-y-3">
        <p className="text-gray-400 flex items-center gap-2 group">
          <LucideClipboardList 
            size={20} 
            className="text-blue-400 group-hover:scale-110 transition-transform" 
          />
          <span className="group-hover:text-blue-300 transition-colors">{job.description}</span>
        </p>
        <p className="text-gray-400 flex items-center gap-2 group">
          <LucideMapPin 
            size={20} 
            className="text-green-400 group-hover:scale-110 transition-transform" 
          />
          <span className="group-hover:text-green-300 transition-colors">{job.location}</span>
        </p>
        <p className="text-gray-400 flex items-center gap-2 group">
          <LucideClock 
            size={20} 
            className="text-yellow-400 group-hover:scale-110 transition-transform" 
          />
          <span className="group-hover:text-yellow-300 transition-colors">{job.time}</span>
        </p>
      </div>
    </div>
  );
};

export default WorkDetails;

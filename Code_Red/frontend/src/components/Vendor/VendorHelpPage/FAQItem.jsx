import React, { useState } from "react";
import { LucideChevronDown, LucideChevronUp } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-[#252f3f] transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-lg font-semibold text-left focus:outline-none"
      >
        {question}
        {isOpen ? <LucideChevronUp size={20} /> : <LucideChevronDown size={20} />}
      </button>
      {isOpen && <p className="text-gray-400 mt-2">{answer}</p>}
    </div>
  );
};

export default FAQItem;

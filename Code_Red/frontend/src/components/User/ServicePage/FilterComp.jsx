import { X } from "lucide-react";
import { useState, useEffect } from "react";

const workTypes = ["Plumbing", "Electrical Work", "Carpentry", "Appliance Repairs", "Home Maintenance"];
const locations = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
];
const ratings = [1, 2, 3, 4, 5];
const languages = ["English", "Hindi", "Marathi", "Konkani"];

const FilterComp = ({ applyFilters, closeFilter, currentFilters }) => {
  const [selectedFilter, setSelectedFilter] = useState("Work Type");
  const [selectedOptions, setSelectedOptions] = useState({
    workType: currentFilters?.workType || [],
    location: currentFilters?.location || [],
    rating: currentFilters?.rating || [],
    languagesKnown: currentFilters?.languagesKnown || [],
  });

  useEffect(() => {
    setSelectedOptions({
      workType: currentFilters?.workType || [],
      location: currentFilters?.location || [],
      rating: currentFilters?.rating || [],
      languagesKnown: currentFilters?.languagesKnown || [],
    });
  }, [currentFilters]);

  const handleOptionChange = (category, option) => {
    setSelectedOptions((prev) => {
      const updatedCategory = prev[category] ? [...prev[category]] : [];
      const updatedOptions = updatedCategory.includes(option)
        ? updatedCategory.filter((item) => item !== option)
        : [...updatedCategory, option];
  
      return {
        ...prev,
        [category]: category === "rating" ? updatedOptions.map((r) => parseInt(r)) : updatedOptions,
      };
    });
  };

  const handleApplyFilters = () => {
    applyFilters({
      workType: selectedOptions.workType,
      location: selectedOptions.location,
      rating: selectedOptions.rating.map((r) => parseInt(r)),
      languagesKnown: selectedOptions.languagesKnown,
    });
  };

  return (
    <div className="fixed left-0 top-20 h-full w-96 bg-base-300 p-4 shadow-lg flex">
      <div className="w-1/2 pr-2 border-r border-gray-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={closeFilter} className="p-2 hover:bg-base-400 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-2">
          {["Work Type", "Location", "Rating", "Languages"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`w-full p-3 rounded-md text-left text-lg ${
                selectedFilter === filter ? "bg-primary text-white" : "bg-base-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="w-full p-3 bg-primary text-white text-lg rounded-lg hover:bg-primary-focus"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="w-1/2 pl-2">
        <h4 className="text-lg font-semibold mb-3">{selectedFilter} Options</h4>
        <div className="space-y-2 text-md">
          {selectedFilter === "Work Type" &&
            workTypes.map((option) => (
              <label key={option} className="flex items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={selectedOptions.workType.includes(option)}
                  onChange={() => handleOptionChange("workType", option)}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}

          {selectedFilter === "Location" &&
            locations.map((option) => (
              <label key={option} className="flex items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={selectedOptions.location.includes(option)}
                  onChange={() => handleOptionChange("location", option)}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}

          {selectedFilter === "Rating" &&
            ratings.map((option) => (
              <label key={option} className="flex items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={selectedOptions.rating.includes(option)}
                  onChange={() => handleOptionChange("rating", option)}
                  className="w-5 h-5"
                />
                {option}+
              </label>
            ))}

          {selectedFilter === "Languages" &&
            languages.map((option) => (
              <label key={option} className="flex items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={selectedOptions.languagesKnown.includes(option)}
                  onChange={() => handleOptionChange("languagesKnown", option)}
                  className="w-5 h-5"
                />
                {option}
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComp;

import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-green-800">{label}</label>
      <select
        {...register(name, { required: true })}
        className="w-full p-2 border border-green-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 transition-shadow"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-green-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

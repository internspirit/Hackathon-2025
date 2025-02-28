import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-green-800">{label}</label>
      <input
        type={type}
        {...register(name, { required: true })}
        className="p-2 border border-green-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 transition-shadow"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

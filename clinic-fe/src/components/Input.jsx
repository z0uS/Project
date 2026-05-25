import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  icon: Icon,
  className = "",
  ...rest
}) => (
  <div className={`mb-5 ${className}`}>
    {label && (
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400 pointer-events-none">
          <Icon className="w-5 h-5" />
        </span>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all ${
          Icon ? "pl-10" : ""
        }`}
        {...rest}
      />
    </div>
  </div>
);

export default Input;

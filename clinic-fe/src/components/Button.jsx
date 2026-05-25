import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl focus:outline-none transition-all duration-200 shadow-sm disabled:opacity-60 disabled:pointer-events-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
    secondary: "bg-gray-100 text-blue-700 hover:bg-blue-100 focus:ring-2 focus:ring-blue-200",
    outline: "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-3 text-lg",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

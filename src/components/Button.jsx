import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`min-h-[44px] px-4 py-2 rounded-lg text-base font-semibold transition ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

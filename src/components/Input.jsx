import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = "text",
  className = "",
  ...props
}, ref) {
  const id = useId()
  return (
    <div className="w-full mb-2">
      {label && (
        <label
          className="block text-sm font-medium mb-1 pl-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          min-h-[44px] w-full px-3 py-2 rounded-lg 
          bg-white text-black text-base 
          outline-none focus:bg-gray-50 duration-200 
          border border-gray-200 
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
});

export default Input

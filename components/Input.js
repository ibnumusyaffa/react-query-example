import React from "react";
import clx from "clsx";
import PropTypes from "prop-types";

function Input({
  error,
  disabled,
  leftIcon,
  rightIcon,
  size = "base",
  value = "",
  variant = "outline",
  className,
  ...props
}) {
  let cl = clx(
    `appearance-none transition-all duration-300 ease-in-out rounded  px-3 text-gray-800  leading-tight outline-none  w-full  focus:border-2 ${className}`,
    {
      "bg-gray-100 cursor-not-allowed": disabled,
      "border border-red-400": error,
      "h-8 text-xs": size === "sm",
      "h-10 text-sm": size == "base",
      "h-12 text-base": size == "lg",

      "pl-10": leftIcon,
      "pr-10": rightIcon,

      "bg-blueGray-100 focus:border focus:border-blueGray-300":
        variant == "filled" && !error,
      "border border-gray-300 focus:border-blue-500":
        variant == "outline" && !error,
      "border-none":
        variant == "file" && !error,
    }
  );

  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute text-gray-600 w-10  left-0 top-0   flex justify-center items-center h-full">
          <div className="w-5 h-5">{leftIcon}</div>
        </div>
      )}

      <input disabled={disabled} value={value} className={cl} {...props} />
      {rightIcon && (
        <div className="absolute text-gray-600 w-10  right-0 top-0   flex justify-center items-center h-full">
          <div className="w-5 h-5">{rightIcon}</div>
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  leftIcon: PropTypes.any,
  rightIcon: PropTypes.any,
  size: PropTypes.oneOf(["sm", "base", "lg"]),
  value: PropTypes.any,
  variant: PropTypes.oneOf(["outline", "filled"]),
};

export default Input;

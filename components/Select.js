import React from "react";
import PropTypes from "prop-types";
import clx from "clsx";

function Select({
  size = "default",
  error = false,
  disabled = false,
  children,
  value = "",
  ...props
}) {
  let classNames = clx(
    "block appearance-none transition-all duration-300 ease-in-out w-full bg-white border border-gray-200  px-4 py-2 pr-8 rounded text-gray-800  leading-tight outline-none focus:border-blue-500  focus:border-2 z-0",
    {
      "opacity-50 bg-gray-200 cursor-not-allowed": disabled,
      "border-red-500": error,
      "h-8 text-xs": size === "sm",
      "h-10 text-sm": size == "base",
      "h-12 text-base": size == "lg",
    }
  );
  return (
    <div className="block w-full relative ">
      <select
        className={classNames}
        disabled={disabled}
        value={value}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}

Select.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  value: PropTypes.any,
  size: PropTypes.oneOf(["default", "large", "small"]),
};

export default Select;

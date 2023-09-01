import React from "react";
import cx from "clsx";
import PropTypes from "prop-types";
import Loading from "./Loading";

function Button({
  size = "base",
  children,
  leftIcon,
  rightIcon,
  onClick,
  block,
  disabled,
  htmlType = "button",
  loading,
  variant = "solid",
  color = "blue",
  loadingText = "Loading...",
  ...props
}) {
  let rootClass = cx(
    `rounded  transition-all duration-200 ease-out focus:outline-none focus:shadow-outline`,
    {
      "opacity-50 pointer-events-none": disabled,
      //col start

      //size
      "h-8 text-sm": size == "sm",
      "h-12 text-base": size == "base",
      "h-14 text-lg": size == "lg",
      "w-full": block,

      //variant solid
      "bg-red-500 text-white": variant == "solid" && color == "red",
      "bg-sky-500 text-white hover:bg-sky-600 text-white":
        variant == "solid" && color == "blue",
      "bg-secondary text-gray-800 hover:opacity-75 text-white":
        variant == "solid" && color == "secondary",

      //variant light
      "bg-sky-100 text-sky-700": variant == "light" && color == "blue",

      //variant outline
      "border border-sky-300 text-sky-500 bg-white hover:border-2 hover:border-sky-400":
        variant == "outline" && color == "blue",
      "border border-red-200 text-red-600 bg-white hover:border-2  hover:border-red-500":
        variant == "outline" && color == "red",
      "border border-gray-200 text-gray-500 bg-white  hover:text-gray-700 hover:border-gray-500":
        variant == "outline" && color == "gray",

      //link
      "text-sky-500 bg-white": variant == "link" && color == "blue",
      "text-gray-500 bg-white": variant == "link" && color == "gray",
      "bg-red-600 bg-white": variant == "link" && color == "red",
    }
  );

  let insideClass = cx({
    "flex items-center justify-center px-3 space-x-5": variant != "link",
    "flex items-center justify-center": variant == "link",
  });

  return (
    <button
      type={htmlType}
      disabled={disabled}
      className={rootClass}
      onClick={onClick}
      {...props}
    >
      <div className={insideClass}>
        {leftIcon && !loading ? (
          <div className="w-4 h-4">{leftIcon}</div>
        ) : null}
        {loading ? loadingText : <div>{children}</div>}
        {rightIcon && !loading ? (
          <div className="ml-2 w-4 h-4">{rightIcon}</div>
        ) : null}
      </div>
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
  leftIcon: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  rightIcon: PropTypes.node,
  size: PropTypes.oneOf(["sm", "base", "lg"]),
  variant: PropTypes.oneOf(["solid", "light", "outline", "link"]),
  color: PropTypes.oneOf(["red", "green", "blue", "yellow"]),
  loadingText: PropTypes.string,
};
export default Button;

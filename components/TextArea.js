import React from "react";
import clsx from "clsx";

function TextArea({
  error,
  disabled,
  leftOutside,
  leftIcon,
  rightOutside,
  rightIcon,
  size = "md",
  color = "sky",
  rounded = "sm",
  variant = "outline",
  rows = "3",
  ...props
}) {
  return (
    <textarea
      disabled={disabled}
      rows={rows}
      className={clsx(
        // base style
        "z-10 w-full flex-1 px-3 py-2 outline-none transition-all duration-200 ease-in-out",
        // variant style
        {
          "border-0 bg-gray-100 focus:bg-white": variant === "filled",
          "bg-white-100 border border-gray-200": variant === "outline",
          "!border border-red-500 ": error,

          "cursor-not-allowed bg-gray-100 opacity-75": disabled,
        },
        //color style
        {
          "focus:border-blue-500  focus:ring-blue-500": color === "blue",
          "focus:border-sky-500  focus:ring-sky-500": color === "sky",
        },
        //size style
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
        },
        {
          // rounded all side when leftOutside and rightOutside is false
          "rounded-none": rounded === "none",
          "rounded": rounded === "sm",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-xl": rounded === "xl",
          "rounded-full": rounded === "full",
        },
      )}
      {...props}
    />
  );
}

export default TextArea;

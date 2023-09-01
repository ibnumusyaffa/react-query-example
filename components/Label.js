import React from "react";
import clx from "clsx";
import PropTypes from "prop-types";

function Label({ size = "base", htmlFor, required, children }) {
  let labelClass = clx("block text-gray-600  mb-2", {
    "text-xs": size === "xs",
    "text-sm": size === "sm",
    "text-base": size === "base",
  });

  return (
    <label className={labelClass} htmlFor={htmlFor}>
      {children} {required && <span className="text-red-600">*</span>}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["xs", "sm", "base", "lg"]),
};

export default Label;

import React from "react";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
function ViewLink({ href, disabled }) {
  let className = clsx("w-4 h-4 ", {
    "text-gray-400 cursor-not-allowed": disabled,
    "text-blue-500 cursor-pointer": !disabled,
  });

  if (disabled) {
    return (
      <a  className={className}>
        <EyeIcon></EyeIcon>
      </a>
    );
  }
  return (
    <Link href={href}>
      <a  className={className}>
        <EyeIcon></EyeIcon>
      </a>
    </Link>
  );
}

ViewLink.propTypes = {
  disabled: PropTypes.any,
  href: PropTypes.any,
};

export default ViewLink;

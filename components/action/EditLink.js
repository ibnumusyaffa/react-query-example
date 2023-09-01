import React from "react";
import Link from "next/link";

import { PencilIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import PropTypes from "prop-types";
function EditLink({ href, disabled }) {
  let className = clsx("w-4 h-4 ", {
    "text-gray-400 cursor-not-allowed": disabled,
    "text-green-500 cursor-pointer": !disabled,
  });

  if (disabled) {
    return (
      <a className={className}>
        <PencilIcon></PencilIcon>
      </a>
    );
  }
  return (
    <Link href={href}>
      <a className={className}>
        <PencilIcon></PencilIcon>
      </a>
    </Link>
  );
}

EditLink.propTypes = {
  disabled: PropTypes.any,
  href: PropTypes.any,
};

export default EditLink;

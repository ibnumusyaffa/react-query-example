import PropTypes from "prop-types";
import React from "react";
import { TrashIcon } from "@heroicons/react/outline";
import clsx from "clsx";

function DeleteButton({ disabled, onClick }) {
  let className = clsx("w-4 h-4 ", {
    "text-gray-400 cursor-not-allowed": disabled,
    "text-red-500 cursor-pointer": !disabled,
  });

  return (
    <button type="button" disabled={disabled} className={className} onClick={onClick}>
      <TrashIcon></TrashIcon>
    </button>
  );
}

DeleteButton.propTypes = {
  disabled: PropTypes.any,
  onClick: PropTypes.any,
};

export default DeleteButton;

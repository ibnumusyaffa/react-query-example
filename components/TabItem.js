import React from "react";
import clx from "clsx";
import PropTypes from "prop-types";
function TabItem({ active, onClick, children }) {
  let className = clx(
    "flex justify-center items-center px-5 text-sm text-gray-600  hover:bg-gray-100 cursor-pointer box-border",
    {
      "border-b-4 border-dark text-gray-800": active,
    }
  );
  return (
    <div className={className} onClick={onClick}>
      <div>{children}</div>
    </div>
  );
}

TabItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default TabItem;

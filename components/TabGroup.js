import React from "react";
import PropTypes from "prop-types";
import cl from "clsx";
function TabGroup({ children, center = false }) {
  let className = cl("flex  border-b",{
    "justify-center": center
  })
  return (
    <div style={{ height: "3.5rem" }} className={className}>
      {children}
    </div>
  );
}

TabGroup.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
};

export default TabGroup;

import React from "react";
import PropTypes from "prop-types";
function Alert(props) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm mb-5"
      role="alert"
    >
      <p>{props.children}</p>
    </div>
  );
}

Alert.propTypes = {
  children: PropTypes.any,
};

export default Alert;
